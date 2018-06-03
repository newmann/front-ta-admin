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
import {
    ACTION_CANCEL, ACTION_CHECK,
    ACTION_DELETE,
    ACTION_MODIFY,
    ACTION_SUBMIT,
    BylTableClickAction,
    BylTableDefine
} from "../../../common/list-form-table-item/table.formitem";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {BylBorrowMoneyQualificationPool} from "../../../../service/project/model/borrow-money-qualification-pool.model";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylProject} from "../../../../service/project/model/project.model";
import {Observable} from "rxjs/Observable";
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";

@Component({
  selector: 'byl-borrow-money-ticket-list',
  templateUrl: './list.component.html',
})
export class BylBorrowMoneyTicketListComponent  extends BylListComponentBasePro<BylBorrowMoneyTicket> {

    // statusList: BylIStatusItem[]; //状态

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public borrowMoneyTicketService: BylBorrowMoneyTicketService) {
        super(message, configService, modalService, router);

        this.businessService = borrowMoneyTicketService;
        this.crudUrl = '/project/borrow-money-ticket/crud';
        // this.businessCrudComponent = BylPersonCrudComponent;
        this.querySchema.properties['status'].enum.push(...BylBorrowMoneyTicketStatusManager.getSFSelectDataArray()); //设置查询条件中的状态字段
    }

    genListData(findResult: Array<BylBorrowMoneyTicket>): Array<BylListFormData<BylBorrowMoneyTicket>> {
        console.table(findResult);
        return findResult.map(data => {
            let item = new BylListFormData<BylBorrowMoneyTicket>();
            item.checked = false;
            // item.disabled = (data.status === BylRoleStatus.SUBMITED_DELETED);
            item.item = new BylBorrowMoneyTicket();
            Object.assign(item.item, data);
            return item;
        });
    }

    genQueryModel(): any {
        let result = new BylBorrowMoneyTicketQuery();
        if (this.listQuery.queryData.billNo) result.billNo = this.listQuery.queryData.billNo;
        if (this.listQuery.queryData.reason) result.reason = this.listQuery.queryData.reason;

        if (this.listQuery.queryData.project) {
            result.projectId = this.listQuery.queryData.project.id;
        }

        if (this.listQuery.queryData.modifyDateRange) {
            if (this.listQuery.queryData.modifyDateRange.length>0){
                result.modifyDateBegin = moment(moment(this.listQuery.queryData.modifyDateRange[0]).format(BylDatetimeUtils.formatDateString)).valueOf();
                result.modifyDateEnd = moment(moment(this.listQuery.queryData.modifyDateRange[1]).format(BylDatetimeUtils.formatDateString))
                    .add(1, 'days').valueOf();//第二天的零点
            }
        }
        if (this.listQuery.queryData.status) {
            result.status = [];
            result.status.push(...this.listQuery.queryData.status);
        }

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
        modifyDateRange: [moment(moment.now()).subtract(6,"month").format(BylDatetimeUtils.formatDateString),
             moment(moment.now()).format(BylDatetimeUtils.formatDateString)]
    };
    queryUiSchema: SFUISchema = {};
    querySchema: SFSchema = {
        properties: {
            billNo: {
                type: 'string',
                title: '单号类似于'
            },
            reason: {
                type: 'string',
                title: '借款原因类似于'
            },
            project: {
                type: 'string',
                title: '所属项目',
                ui: {
                    widget: 'bylProjectSelect',
                    fetchAll: 'true',
                    placeholder: '请输入项目代码或名称，系统自动查找',
                    allowClear: 'true',
                    serverSearch: 'true',
                    showSearch: 'true',

                }
            },
            status: {
                type: 'string',
                title: '状态',
                enum: [],
                ui: {
                    widget: 'tag'
                }
            },
            modifyDateRange: {
                type: 'string',
                title: '最后修改日期',
                ui: { widget: 'date', mode: 'range' }
            }
        },
        required: []
    };
//#endregion
    BORROW_MONEY_CONFIRM = "收款确认";

    tableDefine:BylTableDefine ={
        showCheckbox: true,
        entityAction: [
            {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylBorrowMoneyTicketStatusEnum.UNSUBMITED },
            {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylBorrowMoneyTicketStatusEnum.SUBMITED },
            {actionName: ACTION_DELETE,checkFieldPath: "status" ,checkValue: BylBorrowMoneyTicketStatusEnum.UNSUBMITED },
            {actionName: ACTION_SUBMIT,checkFieldPath: "status" ,checkValue: BylBorrowMoneyTicketStatusEnum.UNSUBMITED },

            {actionName: ACTION_CHECK,checkFieldPath: "status" ,checkValue: BylBorrowMoneyTicketStatusEnum.SUBMITED },
            {actionName: ACTION_CANCEL,checkFieldPath: "status" ,checkValue: BylBorrowMoneyTicketStatusEnum.CHECKED },

            {actionName: this.BORROW_MONEY_CONFIRM,checkFieldPath: "status" ,checkValue: BylBorrowMoneyTicketStatusEnum.CHECKED },
            {actionName: ACTION_CANCEL,checkFieldPath: "status" ,checkValue: BylBorrowMoneyTicketStatusEnum.CONFIRMED }
        ],
        columns:[
            {label:"单号", fieldPath: "billNo" },
            {label:"借款人", fieldPath: "borrowerDisplay" },
            {label:"所属项目", fieldPath: "projectDisplay" },
            {label:"借款原因", fieldPath: "reason" },
            {label:"借款日期", fieldPath: "borrowDateTimeDisplay" },
            {label:"借款金额", fieldPath: "amount" },
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
        super.entityAction(action);

        switch(action.actionName){
            // case ACTION_MODIFY:
            //     this.modifyEntity(action.rowItem.id);
            //     break;
            // case ACTION_DELETE:
            //     this.deleteEntity(action.rowItem);
            //     break;
            // case ACTION_SUBMIT:
            //     this.submitEntity(action.rowItem);
            //     break;
            case this.BORROW_MONEY_CONFIRM:
                this.showConfirmEntity(action.rowItem);
                break;
            // case ACTION_CANCEL:
            //     this.cancelEntity(action.rowItem);
            //     break;

            default:
                console.warn("当前的Action为：" + action.actionName + "，没有对应的处理过程。");
        }

    }

    deleteEntity(entity: any){

        this.borrowMoneyTicketService.delete(entity).subscribe(
            data => {
                // option.loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {

                    //将显示界面中的数据删除掉
                    this.listData =this.listData.filter(item =>{
                        return item.item.id !== entity.id
                    });

                    // console.log(filterData);

                } else {
                    this.message.error(data.msg);
                }
            },
            err => {
                // option.loading = false;
                this.message.error(err.toString());
            }
        );
    }

    submitEntity(entity: any){
        // let saveResult$: Observable<BylResultBody<BylBorrowMoneyTicket>>;
        //
        // saveResult$ = this.borrowMoneyTicketService.submit(entity);
        // this.actionFollowProcess(saveResult$);

        this.actionResult$ = this.borrowMoneyTicketService.submit(entity);
        this.actionFollowProcess(this.actionResult$);

    }



    cancelEntity(entity: any){
        // let saveResult$: Observable<BylResultBody<BylBorrowMoneyTicket>>;
        //
        // saveResult$ = this.borrowMoneyTicketService.cancel(entity);
        //
        // this.actionFollowProcess(saveResult$);

        this.actionResult$ = this.borrowMoneyTicketService.cancel(entity);
        this.actionFollowProcess(this.actionResult$);

    }

    showConfirmEntity(entity: any){
        this.modalService.confirm({
            nzTitle: '确认要进行确认操作吗?',
            nzContent: '<b style="color: red;">一般在收到借款之后进行确认操作。</b>',
            nzOkText: '提交',
            nzOkType: 'primary',
            nzOnOk: () => {
                this.actionResult$ = this.borrowMoneyTicketService.confirm(entity);
                this.actionFollowProcess(this.actionResult$);

                // let saveResult$: Observable<BylResultBody<BylBorrowMoneyTicket>>;
                //
                // saveResult$ = this.borrowMoneyTicketService.confirm(entity);
                //
                // this.actionFollowProcess(saveResult$);

            },
            nzCancelText: '取消',
            nzOnCancel: () => console.log('confirmEntity Cancel')
        });

    }


    // private followProcess(call$: Observable<BylResultBody<BylBorrowMoneyTicket>> ){
    //     call$.subscribe(
    //         data => {
    //             // this._loading = false;
    //             if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
    //                 //将显示界面中的数据修改
    //                 this.updateListData(data.data);
    //
    //             } else {
    //
    //                 this.message.error(data.msg);
    //             }
    //             this.loading = false;
    //         },
    //         err => {
    //             this.message.error(err.toString());
    //         }
    //     );
    // }


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
