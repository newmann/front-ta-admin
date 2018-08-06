import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {BylListFormData} from "../../../../service/model/list-form-data.model";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {BylConfigService} from "../../../../service/constant/config.service";
import {BylBorrowMoneyTicketQuery} from "../../../../service/project/query/borrow-money-ticket-query.model";
import * as moment from "moment";
import {SFSchema, SFUISchema} from "@delon/form";
import {
    ACTION_CANCEL,
    ACTION_CHECK,
    ACTION_DELETE,
    ACTION_MODIFY,
    ACTION_SUBMIT,
    BylTableDefine
} from "../../../common/list-form-table-item/table.formitem";
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylTicketListComponentBasePro} from "../../../common/ticket-list-component-base";
import {BylProjectProgressAssessTicket} from "../../../../service/project/model/project-progress-assess-ticket.model";
import {BylProjectProgressAssessTicketService} from "../../../../service/project/service/project-progress-assess-ticket.service";
import {
    BylProjectProgressAssessTicketStatusEnum,
    BylProjectProgressAssessTicketStatusManager
} from "../../../../service/project/model/project-progress-assess-ticket-status.enum";
import {BylProjectProgressAssessTicketQuery} from "../../../../service/project/query/project-progress-assess-ticket-query.model";

@Component({
  selector: 'byl-project-progress-assess-ticket-list',
  templateUrl: './list.component.html',
})
export class BylProjectProgressAssessTicketListComponent  extends BylTicketListComponentBasePro<BylProjectProgressAssessTicket> {

    // statusList: BylIStatusItem[]; //状态

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public borrowMoneyTicketService: BylProjectProgressAssessTicketService) {
        super(message, configService, modalService, router);

        this.businessService = borrowMoneyTicketService;
        this.crudUrl = '/project/project-progress-assess-ticket/crud';
        // this.businessCrudComponent = BylPersonCrudComponent;
        this.querySchema.properties['status'].enum.push(...BylProjectProgressAssessTicketStatusManager.getSFSelectDataArray()); //设置查询条件中的状态字段
    }

    genListData(findResult: Array<BylProjectProgressAssessTicket>): Array<BylListFormData<BylProjectProgressAssessTicket>> {
        console.table(findResult);
        return findResult.map(data => {
            let item = new BylListFormData<BylProjectProgressAssessTicket>();
            item.checked = false;
            // item.disabled = (data.status === BylRoleStatus.SUBMITED_DELETED);
            item.item = new BylProjectProgressAssessTicket();
            Object.assign(item.item, data);
            return item;
        });
    }

    genQueryModel(): any {
        let result = new BylBorrowMoneyTicketQuery();
        // if (this.listQuery.queryData.billNo) result.billNo = this.listQuery.queryData.billNo;
        // if (this.listQuery.queryData.reason) result.reason = this.listQuery.queryData.reason;
        simpleDeepCopy(result, this.listQuery.queryData);

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
        // if (this.listQuery.queryData.status) {
        //     result.status = [];
        //     result.status.push(...this.listQuery.queryData.status);
        // }

        return result;
    }

    updateListData(newData: BylProjectProgressAssessTicket) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item, newData);
            });
    }
    /**
     * 设置查询缺省值
     */
    setQDataDefaultValue(){
        let q = new BylProjectProgressAssessTicketQuery();
        this.qData.billNo = q.billNo ? q.billNo : null;
        this.qData.modifyDateBegin = q.modifyDateBegin ? q.modifyDateBegin : null;
        this.qData.modifyDateEnd = q.modifyDateEnd ? q.modifyDateEnd : null;
        this.qData.status = q.status ? [...q.status] : null;

        Object.assign(this.qData,q);
    }
    //#region 查询条件
    queryDefaultData: any = {
        status: [1,2, 10,30],
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
            {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylProjectProgressAssessTicketStatusEnum.UNSUBMITED },
            {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylProjectProgressAssessTicketStatusEnum.SUBMITED },
            {actionName: ACTION_DELETE,checkFieldPath: "status" ,checkValue: BylProjectProgressAssessTicketStatusEnum.UNSUBMITED },
            {actionName: ACTION_SUBMIT,checkFieldPath: "status" ,checkValue: BylProjectProgressAssessTicketStatusEnum.UNSUBMITED },

            {actionName: ACTION_CHECK,checkFieldPath: "status" ,checkValue: BylProjectProgressAssessTicketStatusEnum.SUBMITED },
            {actionName: ACTION_CANCEL,checkFieldPath: "status" ,checkValue: BylProjectProgressAssessTicketStatusEnum.CHECKED }

        ],
        columns:[
            {label:"单号", fieldPath: "billNo" },
            {label:"所属项目", fieldPath: "projectDisplay" },
            {label:"业务期间", fieldPath: "operationPeriodDisplay" },
            {label:"预计已完成金额", fieldPath: "amount" },
            {label:"审核信息", fieldPath: "checkActionDisplay" },
            {label:"结算信息", fieldPath: "settlementDisplay" },
            {label:"备注", fieldPath: "remarks" },
            {label:"状态", fieldPath: "statusDisplay" },
            {label:"最后修改时间", fieldPath: "modifyDateTimeDisplay" }
        ]};


}
