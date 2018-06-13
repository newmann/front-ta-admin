import {Component} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylIStatusItem} from '../../../../service/model/status.model';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {BylListFormData} from '../../../../service/model/list-form-data.model';
import {SFSchema, SFUISchema} from "@delon/form";
import {BylWorkTypeQuery} from "../../../../service/project/query/work-type-query.model";
import {
    ACTION_BROWSE,
    ACTION_CONFIRM,
    ACTION_DELETE,
    ACTION_LOCK,
    ACTION_MODIFY,
    ACTION_SUBMIT,
    ACTION_UNCONFIRM,
    ACTION_UNLOCK,
    BylTableClickAction,
    BylTableDefine
} from "../../../common/list-form-table-item/table.formitem";
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";
import {BylMasterDataListComponentBasePro} from "../../../common/master-data-list-component-base";
import {BylOperationPeriod} from "../../../../service/project/model/operation-period.model";
import {BylOperationPeriodService} from "../../../../service/project/service/operation-period.service";
import {
    BylOperationPeriodStatusEnum,
    BylOperationPeriodStatusManager
} from "../../../../service/project/model/operation-period-status.enum";


@Component({
    selector: 'byl-operation-period-list',
    templateUrl: './list.component.html',
})
export class BylOperationPeriodListComponent extends BylMasterDataListComponentBasePro<BylOperationPeriod> {


    statusList: BylIStatusItem[]; //状态

    // public normalWorkTypeStatus: number = BylOperationPeriodStatusEnum.CONFIRMED;

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public operationPeriodService: BylOperationPeriodService) {
        super(message, configService, modalService, router);

        this.businessService = operationPeriodService;
        this.crudUrl = '/project/operation-period/crud';
        // this.businessCrudComponent = BylPersonCrudComponent;

        // this.statusList = BylMasterDataStatusManager.getArray();
        this.querySchema.properties['status'].enum.push(...BylOperationPeriodStatusManager.getSFSelectDataArray()); //设置查询条件中的状态字段
    }

    /**
     * 根据查询的结果，生成界面显示的内容，重点是处理好checkec和disabled字段的值。
     * @param {Array<BylOperationPeriod>} findResult
     * @returns {Array<BylListFormData<BylOperationPeriod>>}
     */
    genListData(findResult: Array<BylOperationPeriod>): Array<BylListFormData<BylOperationPeriod>> {
        return findResult.map(data => {
            let item = new BylListFormData<BylOperationPeriod>();
            item.checked = false;
            item.disabled = (data.status === BylOperationPeriodStatusEnum.SUBMITED_DELETED);
            item.item = new BylOperationPeriod();
            Object.assign(item.item, data);
            return item;
        });
    }

    /**
     *
     * @param q
     * @returns {BylWorkTypeQuery}
     */
    genQueryModel(): any {
        let result = new BylWorkTypeQuery();
        // if (this.qData.name) result.name = this.qData.name;
        // if (this.qData.modifyDateBegin) result.modifyDateBegin = moment(this.qData.modifyDateBegin).valueOf();
        // if (this.qData.modifyDateEnd) result.modifyDateEnd = moment(this.qData.modifyDateEnd).add(1, 'days').valueOf(); // 第二天的零点
        // if (this.qData.status) result.status = this.qData.status;
        if (this.listQuery.queryData.code) result.code = this.listQuery.queryData.code;
        if (this.listQuery.queryData.name) result.name = this.qData.name;
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
        return result;
    }


    batchDelete() {

    }

    batchApproval() {

    }


    updateListData(newData: BylOperationPeriod) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item, newData);
            });
    }

    // getStatusCaption(status: number): string {
    //     return BylMasterDataStatusManager.getCaption(status);
    // }

    /**
     * 设置查询缺省值
     */
    setQDataDefaultValue(){
        let q = new BylWorkTypeQuery();

        Object.assign(this.qData,q);
    }

    //#region 查询条件
    queryDefaultData: any = {
        status:[BylOperationPeriodStatusEnum.UNSUBMITED,BylOperationPeriodStatusEnum.SUBMITED,BylOperationPeriodStatusEnum.CONFIRMED,BylOperationPeriodStatusEnum.CLOSE]
        // modifyDateBegin: moment(moment.now()).subtract(6,"month").format("YYYY-MM-DD"),
        // modifyDateEnd: moment(moment.now()).format("YYYY-MM-DD")
    };
    queryUiSchema: SFUISchema = {};
    querySchema: SFSchema = {
        properties: {
            code: { type: 'string',
                title: '代码类似于'
            },
            name: { type: 'string',
                title: '名称类似于'
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
    OPERATION_PERIOD_CLOSE = "关账";
    tableDefine:BylTableDefine ={
        showCheckbox: true,
        entityAction: [
            {actionName: ACTION_DELETE,checkFieldPath: "status" ,checkValue: BylOperationPeriodStatusEnum.UNSUBMITED },
            {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylOperationPeriodStatusEnum.SUBMITED },
            {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylOperationPeriodStatusEnum.UNSUBMITED },
            {actionName: ACTION_SUBMIT,checkFieldPath: "status" ,checkValue: BylOperationPeriodStatusEnum.UNSUBMITED },
            {actionName: ACTION_CONFIRM,checkFieldPath: "status" ,checkValue: BylOperationPeriodStatusEnum.SUBMITED },
            {actionName: ACTION_UNCONFIRM,checkFieldPath: "status" ,checkValue: BylOperationPeriodStatusEnum.CONFIRMED },
            {actionName: ACTION_UNLOCK,checkFieldPath: "status" ,checkValue: BylOperationPeriodStatusEnum.LOCKED },
            {actionName: ACTION_LOCK,checkFieldPath: "status" ,checkValue: BylOperationPeriodStatusEnum.CONFIRMED },
            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylOperationPeriodStatusEnum.CONFIRMED },
            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylOperationPeriodStatusEnum.LOCKED },
            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylOperationPeriodStatusEnum.SUBMITED_DELETED },
            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylOperationPeriodStatusEnum.CLOSE },
            {actionName: this.OPERATION_PERIOD_CLOSE,checkFieldPath: "status" ,checkValue: BylOperationPeriodStatusEnum.CONFIRMED },
        ],
        columns:[
            {label:"代码", fieldPath: "code" },
            {label:"名称", fieldPath: "name" },
            {label:"起始日期", fieldPath: "beginDateDisplay" },
            {label:"截止日期", fieldPath: "endDateDisplay" },
            {label:"备注", fieldPath: "remarks" },
            {label:"状态", fieldPath: "statusDisplay" },
            {label:"最后修改时间", fieldPath: "modifyDateTimeDisplay" }
        ]};


    entityAction(action: BylTableClickAction){
        super.entityAction(action);

        switch(action.actionName){
            case this.OPERATION_PERIOD_CLOSE:
                this.showCloseEntity(action.rowItem);
                break;
            default:
                console.warn("当前的Action为：" + action.actionName + "，没有对应的处理过程。");
        }

    }
    showCloseEntity(entity: BylOperationPeriod){
        this.modalService.confirm({
            nzTitle: '确认要进行关账操作吗?',
            nzContent: '<b style="color: red;">业务期间在关账之后不能录入和本业务期间相关的单据，请谨慎操作。</b>',
            nzOkText: '关账',
            nzOkType: 'primary',
            nzOnOk: () => {
                this.actionResult$ = this.operationPeriodService.close(entity);
                this.actionFollowProcess(this.actionResult$);
            },
            nzCancelText: '取消',
            nzOnCancel: () => console.log('confirmEntity Cancel')
        });

    }
}
