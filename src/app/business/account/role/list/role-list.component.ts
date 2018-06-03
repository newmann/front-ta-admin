import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {BylRoleService} from '../../../../service/account/service/role.service';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylResultBody} from '../../../../service/model/result-body.model';
import {BylRole} from '../../../../service/account/model/role.model';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {BylRoleQuery} from '../../../../service/account/query/role-query.model';
import {BylListFormData} from '../../../../service/model/list-form-data.model';
import {BylMasterDataStatusEnum, BylMasterDataStatusManager} from '../../../../service/model/master-data-status.enum';
import {SFSchema, SFUISchema} from "@delon/form";
import {
    ACTION_BROWSE,
    ACTION_CONFIRM, ACTION_DELETE, ACTION_LOCK,
    ACTION_MODIFY,
    ACTION_SUBMIT, ACTION_UNCONFIRM,
    ACTION_UNLOCK,
    BylTableDefine
} from "../../../common/list-form-table-item/table.formitem";
import {BylListComponentBasePro} from "../../../common/list-component-base-pro";
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";
import {BylMasterDataListComponentBasePro} from "../../../common/master-data-list-component-base";

@Component({
    selector: 'byl-role-list',
    templateUrl: './role-list.component.html',
})
export class BylRoleListComponent extends BylMasterDataListComponentBasePro<BylRole> {


    // statusList: BylIStatusItem[]; //状态

    public normalRoleStatus: number = BylMasterDataStatusEnum.CONFIRMED;

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public roleService: BylRoleService) {
        super(message, configService, modalService, router);

        this.businessService = roleService;
        this.crudUrl = '/account/role/crud';
        // this.businessCrudComponent = BylPersonCrudComponent;

        // this.statusList = BylMasterDataStatusManager.getArray();
        this.querySchema.properties['status'].enum.push(...BylMasterDataStatusManager.getSFSelectDataArray()); //设置查询条件中的状态字段
    }

    // checkAll(value: boolean) {
    //     this.listData.forEach(item => {
    //         if (!item.disabled) item.checked = value;
    //     });
    //     this.refreshStatus();
    // }

    // refreshStatus() {
    //     const allChecked = this.listData.every(value => value.disabled || value.checked);
    //     const allUnChecked = this.listData.every(value => value.disabled || !value.checked);
    //     this.allChecked = allChecked;
    //     this.indeterminate = (!allChecked) && (!allUnChecked);
    //     this.selectedRows = this.listData.filter(value => value.checked);
    //     // this.totalCallNo = this.selectedRows.reduce((total, cv) => total + cv.callNo, 0);
    // }







    /**
     * 根据查询的结果，生成界面显示的内容，重点是处理好checkec和disabled字段的值。
     * @param {Array<BylRole>} findResult
     * @returns {Array<BylListFormData<BylRole>>}
     */
    genListData(findResult: Array<BylRole>): Array<BylListFormData<BylRole>> {
        return findResult.map(data => {
            let item = new BylListFormData<BylRole>();
            item.checked = false;
            item.disabled = (data.status === BylMasterDataStatusEnum.SUBMITED_DELETED);
            item.item = new BylRole();
            Object.assign(item.item, data);
            return item;
        });
    }

    /**
     *
     * @param q
     * @returns {BylRoleQuery}
     */
    genQueryModel(): any {
        let result = new BylRoleQuery();
        // if (this.qData.name) result.name = this.qData.name;
        // if (this.qData.modifyDateBegin) result.modifyDateBegin = moment(this.qData.modifyDateBegin).valueOf();
        // if (this.qData.modifyDateEnd) result.modifyDateEnd = moment(this.qData.modifyDateEnd).add(1, 'days').valueOf(); // 第二天的零点
        // if (this.qData.status) result.status = this.qData.status;

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

    // reset() {
    //     this.qData.name = '';
    //     this.qData.modifyDate = Date();
    //
    // }

    batchDelete() {

    }

    batchApproval() {

    }


    /**
     * 将当前记录锁定
     * @param {string} id
     */
    // lockRole(id: string) {
    //     let lockItem = new BylRole();
    //     this.listData.forEach(item => {
    //         if (item.item.id === id) {
    //             Object.assign(lockItem, item.item);
    //         }
    //     });
    //
    //     console.log('lockItem: ' + lockItem);
    //     if (!lockItem) return;
    //
    //     lockItem.status = BylMasterDataStatusEnum.LOCKED.valueOf();
    //
    //     this.roleService.update(lockItem).subscribe(
    //         data => {
    //             this.loading = false;
    //             if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
    //
    //                 // this.listData = Array.from(data.data.rows);
    //                 this.updateListData(data.data);
    //
    //             } else {
    //                 this.showMsg(data.msg);
    //             }
    //         },
    //         err => {
    //             this.loading = false;
    //             console.log(err);
    //             this.showMsg(err.toString());
    //         }
    //     );
    // }

    updateListData(newData: BylRole) {
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
    // setQDataDefaultValue(){
    //     let q = new BylRoleQuery();
    //
    //     Object.assign(this.qData,q);
    // }

    //#region 查询条件
    queryDefaultData: any = {
        status:[BylMasterDataStatusEnum.CONFIRMED]
        // modifyDateBegin: moment(moment.now()).subtract(6,"month").format("YYYY-MM-DD"),
        // modifyDateEnd: moment(moment.now()).format("YYYY-MM-DD")
    };
    queryUiSchema: SFUISchema = {};
    querySchema: SFSchema = {
        properties: {
            name: { type: 'string',
                title: '角色名称类似于'
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
                title: '最后修改日期大于等于',
                ui: { widget: 'date',mode: 'range' }
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
            {label:"名称", fieldPath: "name" },
            {label:"备注", fieldPath: "remarks" },
            {label:"状态", fieldPath: "statusDisplay" },
            {label:"最后修改时间", fieldPath: "modifyDateTimeDisplay" }
        ]};

}
