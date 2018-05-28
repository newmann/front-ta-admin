import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {BylListFormData} from "../../../../service/model/list-form-data.model";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {BylConfigService} from "../../../../service/constant/config.service";
import {BylBorrowMoneyTicketService} from "../../../../service/project/service/borrow-money-ticket.service";
import {BylBorrowMoneyTicket} from "../../../../service/project/model/borrow-money-ticket.model";
import {BylBorrowMoneyTicketQuery} from "../../../../service/project/query/borrow-money-ticket-query.model";
import {BylIStatusItem} from '../../../../service/model/status.model';
import * as moment from "moment";
import {SFSchema, SFUISchema} from "@delon/form";
import {BylMasterDataStatusEnum, BylMasterDataStatusManager} from "../../../../service/model/master-data-status.enum";
import {
    BylBorrowMoneyTicketStatusEnum,
    BylBorrowMoneyTicketStatusManager
} from "../../../../service/project/model/borrow-money-ticket-status.enum";
import {BylListComponentBasePro} from "../../../common/list-component-base-pro";
import {ACTION_MODIFY, BylTableClickAction, BylTableDefine} from "../../../common/list-form-table-item/table.formitem";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {BylBorrowMoneyQualificationPool} from "../../../../service/project/model/borrow-money-qualification-pool.model";

@Component({
  selector: 'byl-borrow-money-ticket-list',
  templateUrl: './list.component.html',
})
export class BylBorrowMoneyTicketListComponent  extends BylListComponentBasePro<BylBorrowMoneyTicket> {

    statusList: BylIStatusItem[]; //状态

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public borrowMoneyTicketService: BylBorrowMoneyTicketService) {
        super(message, configService, modalService, router);

        this.businessService = borrowMoneyTicketService;
        this.crudUrl = '/project/borrow-money-ticket/crud';
        // this.businessCrudComponent = BylPersonCrudComponent;
        this.statusList = BylBorrowMoneyTicketStatusManager.getArray();
        this.querySchema.properties['status'].enum.push(...this.statusList); //设置查询条件中的状态字段
    }

    genListData(findResult: Array<BylBorrowMoneyTicket>): Array<BylListFormData<BylBorrowMoneyTicket>> {
        console.table(findResult);
        return findResult.map(data => {
            let item = new BylListFormData<BylBorrowMoneyTicket>();
            item.checked = false;
            // item.disabled = (data.status === BylRoleStatus.DELETED);
            item.item = new BylBorrowMoneyTicket();
            Object.assign(item.item, data);
            return item;
        });
    }

    genQueryModel(): any {
        let result = new BylBorrowMoneyTicketQuery();
        // if (qData.name) result.name = qData.name;
        // if (qData.modifyDateBegin) result.modifyDateBegin = moment(qData.modifyDateBegin).valueOf();
        // if (qData.modifyDateEnd) result.modifyDateEnd = moment(qData.modifyDateEnd).add(1,'days').valueOf();//第二天的零点
        // if (qData.status) result.status = qData.status;
        return result;
    }

    updateListData(newData: BylBorrowMoneyTicket) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item, newData);
            });
    }
    /**
     * 设置查询缺省值
     */
    setQDataDefaultValue(){
        let q = new BylBorrowMoneyTicketQuery();
        this.qData.billNo = q.billNo ? q.billNo : null;
        this.qData.reason = q.reason ? q.reason : null;
        this.qData.modifyDateBegin = q.modifyDateBegin ? q.modifyDateBegin : null;
        this.qData.modifyDateEnd = q.modifyDateEnd ? q.modifyDateEnd : null;
        this.qData.status = q.status ? [...q.status] : null;

        Object.assign(this.qData,q);
    }
    //#region 查询条件
    queryDefaultData: any = {
        status: [1,2, 10,20,30],
        modifyDateBegin: moment(moment.now()).subtract(6,"month").format("YYYY-MM-DD"),
        modifyDateEnd: moment(moment.now()).format("YYYY-MM-DD") };
    queryUiSchema: SFUISchema = {};
    querySchema: SFSchema = {
        properties: {
            billNo: { type: 'string',
                title: '单号类似于'
            },
            reason: { type: 'string',
                title: '借款原因类似于'
            },
            project: { type: 'string',
                title: '所属项目'
            },
            status: {
                type: 'string',
                title: '状态',
                enum: [],
                ui: {
                    widget: 'tag'
                }
            },
            modifyDateBegin: { type: 'string',
                title: '最后修改日期大于等于',
                ui: { widget: 'date' }
            },
            modifyDateEnd: { type: 'string',
                title: '最后修改日期小于等于',
                ui: { widget: 'date' }
            }
        },
        required: []
    };
//#endregion
    BORROW_MONEY_SUBMIT = "提交";
    BORROW_MONEY_CHECK = "审核";
    BORROW_MONEY_CONFIRM = "收款确认";
    BORROW_MONEY_DELETE = "删除";
    BORROW_MONEY_CANCEL = "作废";

    tableDefine:BylTableDefine ={
        showCheckbox: true,
        entityAction: [
            {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylBorrowMoneyTicketStatusEnum.UNSUBMITED },
            {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylBorrowMoneyTicketStatusEnum.SUBMITED },
            {actionName: this.BORROW_MONEY_DELETE,checkFieldPath: "status" ,checkValue: BylBorrowMoneyTicketStatusEnum.UNSUBMITED },
            {actionName: this.BORROW_MONEY_SUBMIT,checkFieldPath: "status" ,checkValue: BylBorrowMoneyTicketStatusEnum.UNSUBMITED },

            {actionName: this.BORROW_MONEY_CHECK,checkFieldPath: "status" ,checkValue: BylBorrowMoneyTicketStatusEnum.SUBMITED },
            {actionName: this.BORROW_MONEY_CANCEL,checkFieldPath: "status" ,checkValue: BylBorrowMoneyTicketStatusEnum.CHECKED },

            {actionName: this.BORROW_MONEY_CONFIRM,checkFieldPath: "status" ,checkValue: BylBorrowMoneyTicketStatusEnum.CHECKED },
            {actionName: this.BORROW_MONEY_CANCEL,checkFieldPath: "status" ,checkValue: BylBorrowMoneyTicketStatusEnum.CONFIRMED }
        ],
        columns:[
            {label:"单号", fieldPath: "billNo" },
            {label:"所属项目", fieldPath: "projectDisplay" },
            {label:"借款原因", fieldPath: "reason" },
            {label:"借款金额", fieldPath: "amount" },
            {label:"借款信息", fieldPath: "borrorActionDisplay" },
            {label:"审核信息", fieldPath: "checkActionDisplay" },
            {label:"收款信息", fieldPath: "receiveActionDisplay" },
            {label:"结算信息", fieldPath: "settlementDisplay" },
            {label:"备注", fieldPath: "remarks" },
            {label:"状态", fieldPath: "statusDisplay" },
            {label:"最后修改时间", fieldPath: "modifyDateTimeDisplay" }
        ]};



    // pageChange(item: BylPageReq){
    //     this.page = item;
    //     this.search();
    // }
    //
    // selectedChange(data: BylListFormData<BylBorrowMoneyTicket>[]){
    //     this.selectedRows = data;
    //
    // }

    entityAction(action: BylTableClickAction){
        switch(action.actionName){
            case ACTION_MODIFY:
                this.modifyEntity(action.rowItem.id);
                break;
            case this.BORROW_MONEY_DELETE:
                this.deleteEntity(action.rowItem);
                break;
            case this.BORROW_MONEY_SUBMIT:
                this.submitEntity(action.rowItem);
                break;
            case this.BORROW_MONEY_CONFIRM:
                this.confirmEntity(action.rowItem);
                break;
            case this.BORROW_MONEY_CANCEL:
                this.cancelEntity(action.rowItem);
                break;

            default:
                console.warn("当前的Action为：" + action.actionName + "，没有对应的处理过程。");
        }

    }

    deleteEntity(entity: any){

    }
    submitEntity(entity: any){

    }
    confirmEntity(entity: any){

    }
    cancelEntity(entity: any){

    }

    add(){
        this.borrowMoneyTicketService.getNewTicket().subscribe((data) => {
            if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                //调出新生成的单据进行修改和调整
                this.router.navigate([this.crudUrl, data.data.id]);
                } else {
                    this.message.error(data.msg);

                }
        },err =>{
            this.message.error(err);
        });
    }
}
