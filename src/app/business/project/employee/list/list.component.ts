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
import {BylEmployeeService} from "../../../../service/project/service/employee.service";
import {BylEmployee} from '../../../../service/project/model/employee.model';
import {BylEmployeeStatusEnum, BylEmployeeStatusManager} from "../../../../service/project/model/employee-status.enum";

@Component({
    selector: 'byl-empoloyee-list',
    templateUrl: './list.component.html',
})
export class BylEmployeeListComponent extends BylListComponentBasePro<BylEmployee> {


    statusList: BylIStatusItem[]; //状态


    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public employeeService: BylEmployeeService) {
        super(message, configService, modalService, router);

        this.businessService = employeeService;
        this.crudUrl = '/project/employee/crud';
        // this.businessCrudComponent = BylPersonCrudComponent;

        this.statusList = BylEmployeeStatusManager.getArray();
        this.querySchema.properties['status'].enum.push(...this.statusList); //设置查询条件中的状态字段
    }

    /**
     * 根据查询的结果，生成界面显示的内容，重点是处理好checkec和disabled字段的值。
     * @param {Array<BylEmployee>} findResult
     * @returns {Array<BylListFormData<BylEmployee>>}
     */
    genListData(findResult: Array<BylEmployee>): Array<BylListFormData<BylEmployee>> {
        return findResult.map(data => {
            let item = new BylListFormData<BylEmployee>();
            item.checked = false;
            item.disabled = (data.status !== BylEmployeeStatusEnum.NORMAL);
            item.item = new BylEmployee();
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
        if (this.qData.name) result.name = this.qData.name;
        if (this.qData.modifyDateBegin) result.modifyDateBegin = moment(this.qData.modifyDateBegin).valueOf();
        if (this.qData.modifyDateEnd) result.modifyDateEnd = moment(this.qData.modifyDateEnd).add(1, 'days').valueOf(); // 第二天的零点
        if (this.qData.status) result.status = this.qData.status;
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
        let lockItem = new BylEmployee();
        this.listData.forEach(item => {
            if (item.item.id === id) {
                Object.assign(lockItem, item.item);
            }
        });

        console.log('lockItem: ' + lockItem);
        if (!lockItem) return;

        lockItem.status = BylEmployeeStatusEnum.LOCKED.valueOf();

        this.employeeService.update(lockItem).subscribe(
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

    updateListData(newData: BylEmployee) {
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
        modifyDateBegin: moment(moment.now()).subtract(6,"month").format("YYYY-MM-DD"),
        modifyDateEnd: moment(moment.now()).format("YYYY-MM-DD") };
    queryUiSchema: SFUISchema = {};
    querySchema: SFSchema = {
        properties: {
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
            modifyDateBegin: { type: 'string',
                title: '最后修改日期大于等于',
                ui: { widget: 'date' }
            },
            modifyDateEnd: { type: 'string',
                title: '最后修改日期小于等于',
                ui: { widget: 'date' }
            }
        },
        required: []
    };
//#endregion

    tableDefine:BylTableDefine ={
        showCheckbox: true,
        entityAction: [
            {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.NORMAL }
        ],
        columns:[
            {label:"代码", fieldPath: "code" },
            {label:"姓名", fieldPath: "name" },
            {label:"入职日期", fieldPath: "enterDate" },
            {label:"离职日期", fieldPath: "leaveDate" },
            {label:"状态", fieldPath: "statusDisplay" },
            {label:"最后修改时间", fieldPath: "modifyDateTimeDisplay" }
        ]};


    pageChange(item: BylPageReq){
        this.page = item;
        this.search();
    }

    selectedChange(data: BylListFormData<BylEmployee>[]){
        this.selectedRows = data;

    }
    entityAction(action: BylTableClickAction){
        switch(action.actionName){
            case ACTION_MODIFY:
                this.modifyEntity(action.id);
                break;
            default:
                console.warn("当前的Action为：" + action.actionName + "，没有对应的处理过程。");
        }

    }

}