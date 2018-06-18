import {Component} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {BylConfigService} from '../../../../service/constant/config.service';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {BylListFormData} from '../../../../service/model/list-form-data.model';
import {BylMasterDataStatusEnum} from '../../../../service/model/master-data-status.enum';
import {SFSchema, SFUISchema} from "@delon/form";
import {
    ACTION_BROWSE,
    ACTION_CANCEL,
    ACTION_CHECK,
    ACTION_DELETE,
    ACTION_MODIFY,
    ACTION_SUBMIT,
    BylTableDefine
} from "../../../common/list-form-table-item/table.formitem";
import {BylExpenseTypeQuery} from "../../../../service/project/query/expense-type-query.model";
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";
import {BylTicketListComponentBasePro} from "../../../common/ticket-list-component-base";
import {BylWorkloadTicket} from "../../../../service/project/model/workload-ticket.model";
import {
    BylWorkloadTicketStatusEnum,
    BylWorkloadTicketStatusManager
} from "../../../../service/project/model/workload-ticket-status.enum";
import {BylWorkloadTicketQuery} from "../../../../service/project/query/workload-ticket-query.model";
import {BylWorkloadTicketService} from "../../../../service/project/service/workload-ticket.service";

@Component({
    selector: 'byl-workload-ticket-list',
    templateUrl: './list.component.html',
})
export class BylWorkloadTicketListComponent extends BylTicketListComponentBasePro<BylWorkloadTicket> {


    // statusList: BylIStatusItem[]; //状态

    // public normalWorkTypeStatus: number = BylMasterDataStatusEnum.CONFIRMED;

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public workloadTicketService: BylWorkloadTicketService) {
        super(message, configService, modalService, router);

        this.businessService = workloadTicketService;
        this.crudUrl = '/project/workload-ticket/crud';
        // this.businessCrudComponent = BylPersonCrudComponent;

        // this.statusList = BylMasterDataStatusManager.getArray();
        this.querySchema.properties['status'].enum.push(...BylWorkloadTicketStatusManager.getSFSelectDataArray()); //设置查询条件中的状态字段
    }

    /**
     * 根据查询的结果，生成界面显示的内容，重点是处理好checkec和disabled字段的值。
     * @param {Array<BylWorkloadTicket>} findResult
     * @returns {Array<BylListFormData<BylWorkloadTicket>>}
     */
    genListData(findResult: Array<BylWorkloadTicket>): Array<BylListFormData<BylWorkloadTicket>> {
        return findResult.map(data => {
            let item = new BylListFormData<BylWorkloadTicket>();
            item.checked = false;
            item.disabled = (data.status === BylWorkloadTicketStatusEnum.SUBMITED_DELETED);
            item.item = new BylWorkloadTicket();
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
        let result = new BylWorkloadTicketQuery();
        if (this.listQuery.queryData.billNo) result.billNo = this.listQuery.queryData.billNo;
        if (this.listQuery.queryData.projectId) result.projectId = this.qData.projectId;
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

        // if (this.qData.name) result.name = this.qData.name;
        // if (this.qData.modifyDateBegin) result.modifyDateBegin = moment(this.qData.modifyDateBegin).valueOf();
        // if (this.qData.modifyDateEnd) result.modifyDateEnd = moment(this.qData.modifyDateEnd).add(1, 'days').valueOf(); // 第二天的零点
        // if (this.qData.status) result.status = this.qData.status;
        return result;
    }


    batchDelete() {

    }

    batchApproval() {

    }



    updateListData(newData: BylWorkloadTicket) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item, newData);
            });
    }


    /**
     * 设置查询缺省值
     */
    setQDataDefaultValue(){
        let q = new BylWorkloadTicketQuery();
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
            {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylWorkloadTicketStatusEnum.UNSUBMITED },
            {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylWorkloadTicketStatusEnum.SUBMITED },
            {actionName: ACTION_DELETE,checkFieldPath: "status" ,checkValue: BylWorkloadTicketStatusEnum.UNSUBMITED },
            {actionName: ACTION_SUBMIT,checkFieldPath: "status" ,checkValue: BylWorkloadTicketStatusEnum.UNSUBMITED },

            {actionName: ACTION_CHECK,checkFieldPath: "status" ,checkValue: BylWorkloadTicketStatusEnum.SUBMITED },

            {actionName: ACTION_CANCEL,checkFieldPath: "status" ,checkValue: BylWorkloadTicketStatusEnum.CHECKED },
            {actionName: ACTION_CANCEL,checkFieldPath: "status" ,checkValue: BylWorkloadTicketStatusEnum.SUBMITED },

            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylWorkloadTicketStatusEnum.CHECKED },
            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylWorkloadTicketStatusEnum.CHECKED_DELETED },
            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylWorkloadTicketStatusEnum.SUBMITED_DELETED },
            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylWorkloadTicketStatusEnum.SETTLED },

            ],

        columns:[
            {label:"单号", fieldPath: "billNo" },
            {label:"所属项目", fieldPath: "projectDisplay" },
            {label:"是否内部员工", fieldPath: "insiderDisplay" },
            {label:"外包团队", fieldPath: "outsourcerDisplay" },
            {label:"业务期间", fieldPath: "operationPeriodDisplay" },
            // {label:"开始日期", fieldPath: "beginDateDisplay" },
            // {label:"截止日期", fieldPath: "endDateDisplay" },
            {label:"审核信息", fieldPath: "checkActionDisplay" },
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