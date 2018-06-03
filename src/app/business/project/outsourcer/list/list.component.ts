import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylResultBody} from '../../../../service/model/result-body.model';
import {BylIStatusItem} from '../../../../service/model/status.model';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {BylListFormData} from '../../../../service/model/list-form-data.model';

import {SFSchema, SFUISchema} from "@delon/form";
import {BylListComponentBasePro} from "../../../common/list-component-base-pro";
import {BylWorkTypeQuery} from "../../../../service/project/query/work-type-query.model";
import {
    ACTION_DELETE, ACTION_MODIFY, BylTableClickAction,
    BylTableDefine
} from "../../../common/list-form-table-item/table.formitem";
import {BylPageReq} from "../../../../service/model/page-req.model";
import {BylOutsourcer} from '../../../../service/project/model/outsourcer.model';
import {BylEmployeeStatusEnum, BylEmployeeStatusManager} from "../../../../service/project/model/employee-status.enum";
import {BylOutsourcerService} from "../../../../service/project/service/outsourcer.service";
import {BylMasterDataStatusEnum, BylMasterDataStatusManager} from "../../../../service/model/master-data-status.enum";
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";

@Component({
    selector: 'byl-oursourcer-list',
    templateUrl: './list.component.html',
})
export class BylOutsourcerListComponent extends BylListComponentBasePro<BylOutsourcer> {


    // statusList: BylIStatusItem[]; //状态


    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public outsourcerService: BylOutsourcerService) {
        super(message, configService, modalService, router);

        this.businessService = outsourcerService;
        this.crudUrl = '/project/outsourcer/crud';
        // this.businessCrudComponent = BylPersonCrudComponent;


        this.querySchema.properties['status'].enum.push(...BylEmployeeStatusManager.getSFSelectDataArray()); //设置查询条件中的状态字段
    }

    /**
     * 根据查询的结果，生成界面显示的内容，重点是处理好checkec和disabled字段的值。
     * @param {Array<BylOutsourcer>} findResult
     * @returns {Array<BylListFormData<BylOutsourcer>>}
     */
    genListData(findResult: Array<BylOutsourcer>): Array<BylListFormData<BylOutsourcer>> {
        return findResult.map(data => {
            let item = new BylListFormData<BylOutsourcer>();
            item.checked = false;
            item.disabled = (data.status !== BylEmployeeStatusEnum.NORMAL);
            item.item = new BylOutsourcer();
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


    /**
     * 将当前记录锁定
     * @param {string} id
     */
    lockRole(id: string) {
        let lockItem = new BylOutsourcer();
        this.listData.forEach(item => {
            if (item.item.id === id) {
                Object.assign(lockItem, item.item);
            }
        });

        console.log('lockItem: ' + lockItem);
        if (!lockItem) return;

        lockItem.status = BylMasterDataStatusEnum.LOCKED.valueOf();

        this.outsourcerService.update(lockItem).subscribe(
            data => {
                this.loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {

                    // this.listData = Array.from(data.data.rows);
                    this.updateListData(data.data);

                } else {
                    this.showMsg(data.msg);
                }
            },
            err => {
                this.loading = false;
                console.log(err);
                this.showMsg(err.toString());
            }
        );
    }

    updateListData(newData: BylOutsourcer) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item, newData);
            });
    }

    // getStatusCaption(status: number): string {
    //     return BylEmployeeStatusEnum.getCaption(status);
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
            {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylMasterDataStatusEnum.CONFIRMED }
        ],
        columns:[
            {label:"代码", fieldPath: "code" },
            {label:"名称", fieldPath: "name" },
            {label:"状态", fieldPath: "statusDisplay" },
            {label:"最后修改时间", fieldPath: "modifyDateTimeDisplay" }
        ]};


    // pageChange(item: BylPageReq){
    //     this.page = item;
    //     this.search();
    // }
    //
    // selectedChange(data: BylListFormData<BylOutsourcer>[]){
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
