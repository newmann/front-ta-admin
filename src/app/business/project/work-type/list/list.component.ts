import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylResultBody} from '../../../../service/model/result-body.model';
import {BylIStatusItem} from '../../../../service/model/status.model';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {BylListFormData} from '../../../../service/model/list-form-data.model';
import {BylMasterDataStatusEnum, BylMasterDataStatusManager} from '../../../../service/model/master-data-status.enum';
import {SFSchema, SFUISchema} from "@delon/form";
import {BylListComponentBasePro} from "../../../common/list-component-base-pro";
import {BylWorkTypeService} from "../../../../service/project/service/work-type.service";
import {BylWorkType} from "../../../../service/project/model/work-type.model";
import {BylWorkTypeQuery} from "../../../../service/project/query/work-type-query.model";
import {
    ACTION_BROWSE,
    ACTION_CONFIRM,
    ACTION_DELETE, ACTION_LOCK, ACTION_MODIFY, ACTION_SUBMIT, ACTION_UNCONFIRM, ACTION_UNLOCK, BylTableClickAction,
    BylTableDefine
} from "../../../common/list-form-table-item/table.formitem";
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";
import {BylMasterDataListComponentBasePro} from "../../../common/master-data-list-component-base";


@Component({
    selector: 'byl-work-type-list',
    templateUrl: './list.component.html',
})
export class BylWorkTypeListComponent extends BylMasterDataListComponentBasePro<BylWorkType> {


    statusList: BylIStatusItem[]; //状态

    public normalWorkTypeStatus: number = BylMasterDataStatusEnum.CONFIRMED;

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public workTypeService: BylWorkTypeService) {
        super(message, configService, modalService, router);

        this.businessService = workTypeService;
        this.crudUrl = '/project/work-type/crud';
        // this.businessCrudComponent = BylPersonCrudComponent;

        // this.statusList = BylMasterDataStatusManager.getArray();
        this.querySchema.properties['status'].enum.push(...BylMasterDataStatusManager.getSFSelectDataArray()); //设置查询条件中的状态字段
    }

    /**
     * 根据查询的结果，生成界面显示的内容，重点是处理好checkec和disabled字段的值。
     * @param {Array<BylWorkType>} findResult
     * @returns {Array<BylListFormData<BylWorkType>>}
     */
    genListData(findResult: Array<BylWorkType>): Array<BylListFormData<BylWorkType>> {
        return findResult.map(data => {
            let item = new BylListFormData<BylWorkType>();
            item.checked = false;
            item.disabled = (data.status === BylMasterDataStatusEnum.SUBMITED_DELETED);
            item.item = new BylWorkType();
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


    updateListData(newData: BylWorkType) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item, newData);
            });
    }

    getStatusCaption(status: number): string {
        return BylMasterDataStatusManager.getCaption(status);
    }

    /**
     * 设置查询缺省值
     */
    setQDataDefaultValue(){
        let q = new BylWorkTypeQuery();

        Object.assign(this.qData,q);
    }

    //#region 查询条件
    queryDefaultData: any = {
        status:[BylMasterDataStatusEnum.UNSUBMITED,BylMasterDataStatusEnum.SUBMITED,BylMasterDataStatusEnum.CONFIRMED]
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

    tableDefine:BylTableDefine ={
        showCheckbox: true,
        entityAction: [
            {actionName: ACTION_DELETE,checkFieldPath: "status" ,checkValue: BylMasterDataStatusEnum.UNSUBMITED },
            {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylMasterDataStatusEnum.SUBMITED },
            {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylMasterDataStatusEnum.UNSUBMITED },
            {actionName: ACTION_SUBMIT,checkFieldPath: "status" ,checkValue: BylMasterDataStatusEnum.UNSUBMITED },
            {actionName: ACTION_CONFIRM,checkFieldPath: "status" ,checkValue: BylMasterDataStatusEnum.SUBMITED },
            {actionName: ACTION_UNCONFIRM,checkFieldPath: "status" ,checkValue: BylMasterDataStatusEnum.CONFIRMED },
            {actionName: ACTION_UNLOCK,checkFieldPath: "status" ,checkValue: BylMasterDataStatusEnum.LOCKED },
            {actionName: ACTION_LOCK,checkFieldPath: "status" ,checkValue: BylMasterDataStatusEnum.CONFIRMED },
            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylMasterDataStatusEnum.CONFIRMED },
            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylMasterDataStatusEnum.LOCKED },
            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylMasterDataStatusEnum.SUBMITED_DELETED },

        ],
        columns:[
            {label:"代码", fieldPath: "code" },
            {label:"名称", fieldPath: "name" },
            {label:"考情类型", fieldPath: "checkTypeDisplay" },
            {label:"标准工作时长", fieldPath: "standardTimeLength" },
            {label:"备注", fieldPath: "remarks" },
            {label:"状态", fieldPath: "statusDisplay" },
            {label:"最后修改时间", fieldPath: "modifyDateTimeDisplay" }
        ]};


    // pageChange(item: BylPageReq){
    //     this.page = item;
    //     this.search();
    // }
    //
    // selectedChange(data: BylListFormData<BylWorkType>[]){
    //     this.selectedRows = data;
    //
    // }
    // entityAction(action: BylTableClickAction){
    //     switch(action.actionName){
    //         case ACTION_MODIFY:
    //             this.modifyEntity(action.id);
    //             break;
    //         default:
    //             console.warn("当前的Action为：" + action.actionName + "，没有对应的处理过程。");
    //     }
    //
    // }

}
