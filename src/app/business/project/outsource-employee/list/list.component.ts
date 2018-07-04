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
    ACTION_BROWSE,
    ACTION_CONFIRM,
    ACTION_DELETE, ACTION_LOCK, ACTION_MODIFY, ACTION_SUBMIT, ACTION_UNCONFIRM, ACTION_UNLOCK, BylTableClickAction,
    BylTableDefine
} from "../../../common/list-form-table-item/table.formitem";
import {BylPageReq} from "../../../../service/model/page-req.model";
import {BylOutsourceEmployee} from '../../../../service/project/model/outsource-employee.model';
import {BylEmployeeStatusEnum, BylEmployeeStatusManager} from "../../../../service/project/model/employee-status.enum";
import {BylOutsourcerService} from "../../../../service/project/service/outsourcer.service";
import {BylMasterDataStatusEnum, BylMasterDataStatusManager} from "../../../../service/model/master-data-status.enum";
import {BylOutsourceEmployeeService} from "../../../../service/project/service/outsource-employee.service";
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";
import {BylMasterDataListComponentBasePro} from "../../../common/master-data-list-component-base";
import {BylOutsourceEmployeeQuery} from "../../../../service/project/query/outsource-employee-query.model";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";

@Component({
    selector: 'byl-oursourcer-employee-list',
    templateUrl: './list.component.html',
})
export class BylOutsourceEmployeeListComponent extends BylMasterDataListComponentBasePro<BylOutsourceEmployee> {


    // statusList: BylIStatusItem[]; //状态


    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public outsourceEmployeeService: BylOutsourceEmployeeService) {
        super(message, configService, modalService, router);

        this.businessService = outsourceEmployeeService;
        this.crudUrl = '/project/outsource-employee/crud';
        // this.businessCrudComponent = BylPersonCrudComponent;

        // this.statusList = BylEmployeeStatusManager.getArray();
        this.querySchema.properties['status'].enum.push(...BylEmployeeStatusManager.getSFSelectDataArray()); //设置查询条件中的状态字段
    }

    /**
     * 根据查询的结果，生成界面显示的内容，重点是处理好checkec和disabled字段的值。
     * @param {Array<BylOutsourceEmployee>} findResult
     * @returns {Array<BylListFormData<BylOutsourceEmployee>>}
     */
    genListData(findResult: Array<BylOutsourceEmployee>): Array<BylListFormData<BylOutsourceEmployee>> {
        return findResult.map(data => {
            let item = new BylListFormData<BylOutsourceEmployee>();
            item.checked = false;
            // item.disabled = (data.status !== BylEmployeeStatusEnum.NORMAL);
            item.item = new BylOutsourceEmployee();
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
        let result = new BylOutsourceEmployeeQuery();
        simpleDeepCopy(result, this.listQuery.queryData);

        if (this.listQuery.queryData.outsourcerWidget)
            result.outsourcerId = this.listQuery.queryData.outsourcerWidget.id;


        // if (this.listQuery.queryData.code) result.code = this.listQuery.queryData.code;
        // if (this.listQuery.queryData.name) result.name = this.qData.name;
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


    updateListData(newData: BylOutsourceEmployee) {
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
        status: [BylEmployeeStatusEnum.UNSUBMITED,BylEmployeeStatusEnum.SUBMITED,BylEmployeeStatusEnum.CONFIRMED]
        // modifyDateBegin: moment(moment.now()).subtract(6,"month").format("YYYY-MM-DD"),
        // modifyDateEnd: moment(moment.now()).format("YYYY-MM-DD")

    };
    queryUiSchema: SFUISchema = {};
    querySchema: SFSchema = {
        properties: {
            "outsourcerWidget":{
                "type": 'string',
                "title": '所属外包商',
                "ui": {
                    widget: 'bylOutsourcerSelect',
                    placeholder: '请输入外包商的代码或名称，系统自动查找',
                    allowClear: 'true',
                    serverSearch: 'true',
                    showSearch: 'true'
                }
            },
            code: { type: 'string',
                title: '代码类似于'
            },
            name: { type: 'string',
                title: '姓名类似于'
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
            {actionName: ACTION_DELETE,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.UNSUBMITED },
            {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.SUBMITED },
            {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.UNSUBMITED },
            {actionName: ACTION_SUBMIT,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.UNSUBMITED },
            {actionName: ACTION_CONFIRM,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.SUBMITED },
            {actionName: ACTION_UNCONFIRM,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.CONFIRMED },
            {actionName: ACTION_UNLOCK,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.LOCKED },
            {actionName: ACTION_LOCK,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.CONFIRMED },
            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.CONFIRMED },
            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.LOCKED },
            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.SUBMITED_DELETED },

        ],
        columns:[
            {label:"所属外包商", fieldPath: "outsourcerDisplay" },
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
    // selectedChange(data: BylListFormData<BylOutsourceEmployee>[]){
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
