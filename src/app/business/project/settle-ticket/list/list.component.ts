import {Component} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {BylConfigService} from '../../../../service/constant/config.service';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {BylListFormData} from '../../../../service/model/list-form-data.model';
import {SFSchema, SFUISchema} from "@delon/form";
import {
    ACTION_BROWSE,
    ACTION_CANCEL,
    ACTION_CHECK,
    ACTION_DELETE,
    ACTION_MODIFY,
    ACTION_SUBMIT, BylTableClickAction,
    BylTableDefine
} from "../../../common/list-form-table-item/table.formitem";
import {BylExpenseTypeQuery} from "../../../../service/project/query/expense-type-query.model";
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";
import {BylListComponentTicket} from "../../../common/list-component-ticket";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylSettleTicket} from "../../../../service/project/model/settle-ticket.model";
import {BylSettleTicketService} from "../../../../service/project/service/settle-ticket.service";
import {
    BylSettleTicketStatusEnum,
    BylSettleTicketStatusManager
} from "../../../../service/project/model/settle-ticket-status.enum";
import {BylSettleTicketQuery} from "../../../../service/project/query/settle-ticket-query.model";
import {BylBorrowMoneyTicket} from "../../../../service/project/model/borrow-money-ticket.model";

@Component({
    selector: 'byl-settle-ticket-list',
    templateUrl: './list.component.html',
})
export class BylSettleTicketListComponent extends BylListComponentTicket<BylSettleTicket> {


    // statusList: BylIStatusItem[]; //状态

    // public normalWorkTypeStatus: number = BylMasterDataStatusEnum.CONFIRMED;

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public settleTicketService: BylSettleTicketService) {
        super(message, configService, modalService, router);

        this.businessService = settleTicketService;
        this.crudUrl = '/project/settle-ticket/crud';
        // this.businessCrudComponent = BylPersonCrudComponent;

        // this.statusList = BylMasterDataStatusManager.getArray();
        this.querySchema.properties['status'].enum.push(...BylSettleTicketStatusManager.getSFSelectDataArray()); //设置查询条件中的状态字段
    }

    /**
     * 根据查询的结果，生成界面显示的内容，重点是处理好checkec和disabled字段的值。
     * @param {Array<BylSettleTicket>} findResult
     * @returns {Array<BylListFormData<BylSettleTicket>>}
     */
    genListData(findResult: Array<BylSettleTicket>): Array<BylListFormData<BylSettleTicket>> {
        return findResult.map(data => {
            let item = new BylListFormData<BylSettleTicket>();
            item.checked = false;
            item.disabled = (data.status === BylSettleTicketStatusEnum.SUBMITED_DELETED);
            item.item = new BylSettleTicket();
            Object.assign(item.item, data);
            return item;
        });
    }

    /**
     *
     * @param q
     * @returns {BylExpenseTypeQuery}
     */
    genQueryModel(): any {
        let result = new BylSettleTicketQuery();
        simpleDeepCopy(result, this.listQuery.queryData);
        // if (this.listQuery.queryData.billNo) result.billNo = this.listQuery.queryData.billNo;
        // if (this.listQuery.queryData.projectId) result.projectId = this.qData.projectId;
        if (this.listQuery.queryData.modifyDateRange) {
            if (this.listQuery.queryData.modifyDateRange.length>0){
                result.modifyDateBegin = moment(moment(this.listQuery.queryData.modifyDateRange[0]).format(BylDatetimeUtils.formatDateString)).valueOf();
                result.modifyDateEnd = moment(moment(this.listQuery.queryData.modifyDateRange[1]).format(BylDatetimeUtils.formatDateString))
                    .add(1, 'days').valueOf();//第二天的零点
            }
        }
        // if (this.listQuery.queryData.status) {
        //     result.status = [];
        //     result.status.push(...this.listQuery.queryData.status);
        // }
        return result;
    }


    batchDelete() {

    }

    batchApproval() {

    }



    updateListData(newData: BylSettleTicket) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item, newData);
            });
    }


    /**
     * 设置查询缺省值
     */
    setQDataDefaultValue(){
        let q = new BylSettleTicketQuery();
        this.qData.billNo = q.billNo ? q.billNo : null;
        this.qData.modifyDateBegin = q.modifyDateBegin ? q.modifyDateBegin : null;
        this.qData.modifyDateEnd = q.modifyDateEnd ? q.modifyDateEnd : null;
        this.qData.status = q.status ? [...q.status] : null;

        Object.assign(this.qData,q);
    }

    //#region 查询条件
    queryDefaultData: any = {
        status: [1,2, 10],
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
    ACTION_SETTLE = "结算";

    tableDefine:BylTableDefine ={
        showCheckbox: true,
        entityAction: [
            {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylSettleTicketStatusEnum.UNSUBMITED },
            {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylSettleTicketStatusEnum.SUBMITED },
            {actionName: ACTION_DELETE,checkFieldPath: "status" ,checkValue: BylSettleTicketStatusEnum.UNSUBMITED },
            {actionName: ACTION_SUBMIT,checkFieldPath: "status" ,checkValue: BylSettleTicketStatusEnum.UNSUBMITED },

            {actionName: ACTION_CHECK,checkFieldPath: "status" ,checkValue: BylSettleTicketStatusEnum.SUBMITED },

            {actionName: ACTION_CANCEL,checkFieldPath: "status" ,checkValue: BylSettleTicketStatusEnum.CHECKED },
            {actionName: ACTION_CANCEL,checkFieldPath: "status" ,checkValue: BylSettleTicketStatusEnum.SUBMITED },
            {actionName: ACTION_CANCEL,checkFieldPath: "status" ,checkValue: BylSettleTicketStatusEnum.SETTLED },

            {actionName: this.ACTION_SETTLE,checkFieldPath: "status" ,checkValue: BylSettleTicketStatusEnum.CHECKED },

            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylSettleTicketStatusEnum.CHECKED },
            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylSettleTicketStatusEnum.CHECKED_DELETED },
            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylSettleTicketStatusEnum.SUBMITED_DELETED },
            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylSettleTicketStatusEnum.SETTLED },
            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylSettleTicketStatusEnum.SETTLED_DELETED },

            ],

        columns:[
            {label:"单号", fieldPath: "billNo" },
            {label:"结算对象", fieldPath: "settleResourseDisplay" },
            {label:"实付金额", fieldPath: "payed" },
            {label:"付款日期", fieldPath: "payDateDisplay" },
            // {label:"开始日期", fieldPath: "beginDateDisplay" },
            // {label:"截止日期", fieldPath: "endDateDisplay" },
            {label:"审核信息", fieldPath: "checkActionDisplay" },
            {label:"结算信息", fieldPath: "settleActionDisplay" },
            {label:"备注", fieldPath: "remarks" },
            {label:"状态", fieldPath: "statusDisplay" },
            {label:"最后修改时间", fieldPath: "modifyDateTimeDisplay" }
        ]};


    // add(){
        // this.expenseTicketService.getNewTicket().subscribe((data) => {
        //     if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
        //         //调出新生成的单据进行修改和调整
        //         this.router.navigate([this.crudUrl, data.data.id]);
        //     } else {
        //         this.message.error(data.msg);
        //
        //     }
        // },err =>{
        //     this.message.error(err);
        // });
    // }
    entityAction(action: BylTableClickAction){
        super.entityAction(action);

        switch(action.actionName){
            case this.ACTION_SETTLE:
                this.showSettleEntity(action.rowItem);
                break;
            default:
                console.warn("当前的Action为：" + action.actionName + "，没有对应的处理过程。");
        }

    }

    showSettleEntity(entity: BylSettleTicket){
        this.modalService.confirm({
            nzTitle: '确认要进行结算操作吗?',
            nzContent: '<b style="color: red;">在结算完成之后执行本操作。</b>',
            nzOkText: '确认',
            nzOkType: 'primary',
            nzOnOk: () => {
                this.actionResult$ = this.settleTicketService.settle(entity);
                this.actionFollowProcess(this.actionResult$);
            },
            nzCancelText: '取消',
            nzOnCancel: () => console.log('settleEntity Cancel')
        });

    }

}
