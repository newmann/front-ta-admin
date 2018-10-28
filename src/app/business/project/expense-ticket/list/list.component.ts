import {Component} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {BylConfigService} from '../../../../service/constant/config.service';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {BylListFormData} from '../../../../service/model/list-form-data.model';
import {BylMasterDataStatusEnum} from '../../../../service/model/master-data-status.enum';
import {SFSchema, SFUISchema} from "@delon/form";
import {
    ACTION_CANCEL,
    ACTION_CHECK,
    ACTION_DELETE,
    ACTION_MODIFY,
    ACTION_SUBMIT,
    BylTableDefine
} from "../../../common/list-form-table-item/table.formitem";
import {BylExpenseTypeQuery} from "../../../../service/project/query/expense-type-query.model";
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";
import {
    BylExpenseTicketStatusEnum,
    BylExpenseTicketStatusManager
} from "../../../../service/project/model/expense-ticket-status.enum";
import {BylExpenseTicketQuery} from "../../../../service/project/query/expense-ticket-query.model";
import {BylExpenseTicket} from "../../../../service/project/model/expense-ticket.model";
import {BylExpenseTicketService} from "../../../../service/project/service/expense-ticket.service";
import {BylListComponentTicket} from "../../../common/list-component-ticket";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";

@Component({
    selector: 'byl-expense-ticket-list',
    templateUrl: './list.component.html',
})
export class BylExpenseTicketListComponent extends BylListComponentTicket<BylExpenseTicket> {


    // statusList: BylIStatusItem[]; //状态

    public normalWorkTypeStatus: number = BylMasterDataStatusEnum.CONFIRMED;

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public expenseTicketService: BylExpenseTicketService) {
        super(message, configService, modalService, router);

        this.businessService = expenseTicketService;
        this.crudUrl = '/project/expense-ticket/crud';
        // this.businessCrudComponent = BylPersonCrudComponent;

        // this.statusList = BylMasterDataStatusManager.getArray();
        this.querySchema.properties['status'].enum.push(...BylExpenseTicketStatusManager.getSFSelectDataArray()); //设置查询条件中的状态字段
    }

    /**
     * 根据查询的结果，生成界面显示的内容，重点是处理好checkec和disabled字段的值。
     * @param {Array<BylExpenseTicket>} findResult
     * @returns {Array<BylListFormData<BylExpenseTicket>>}
     */
    genListData(findResult: Array<BylExpenseTicket>): Array<BylListFormData<BylExpenseTicket>> {
        return findResult.map(data => {
            let item = new BylListFormData<BylExpenseTicket>();
            item.checked = false;
            item.disabled = (data.status === BylExpenseTicketStatusEnum.SUBMITED_DELETED);
            item.item = new BylExpenseTicket();
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
        let result = new BylExpenseTicketQuery();
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



    updateListData(newData: BylExpenseTicket) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item, newData);
            });
    }


    /**
     * 设置查询缺省值
     */
    setQDataDefaultValue(){
        let q = new BylExpenseTicketQuery();
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

    tableDefine:BylTableDefine ={
        showCheckbox: true,
        entityAction: [
            {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylExpenseTicketStatusEnum.UNSUBMITED },
            {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylExpenseTicketStatusEnum.SUBMITED },
            {actionName: ACTION_DELETE,checkFieldPath: "status" ,checkValue: BylExpenseTicketStatusEnum.UNSUBMITED },
            {actionName: ACTION_SUBMIT,checkFieldPath: "status" ,checkValue: BylExpenseTicketStatusEnum.UNSUBMITED },

            {actionName: ACTION_CHECK,checkFieldPath: "status" ,checkValue: BylExpenseTicketStatusEnum.SUBMITED },

            {actionName: ACTION_CANCEL,checkFieldPath: "status" ,checkValue: BylExpenseTicketStatusEnum.CHECKED },
            {actionName: ACTION_CANCEL,checkFieldPath: "status" ,checkValue: BylExpenseTicketStatusEnum.SUBMITED },

            ],

        columns:[
            {label:"单号", fieldPath: "billNo" },
            {label:"所属项目", fieldPath: "projectDisplay" },
            {label:"业务期间", fieldPath: "operationPeriodDisplay" },
            // {label:"开始日期", fieldPath: "beginDateDisplay" },
            // {label:"截止日期", fieldPath: "endDateDisplay" },
            {label:"费用金额", fieldPath: "amount" },
            {label:"审核信息", fieldPath: "checkActionDisplay" },
            {label:"结算信息", fieldPath: "settlementDisplay" },
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


}
