import {Component} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {BylConfigService} from '../../../../service/constant/config.service';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {BylListFormData} from '../../../../service/model/list-form-data.model';

import {SFSchema, SFUISchema} from "@delon/form";
import {
    ACTION_BROWSE,
    ACTION_CANCEL, ACTION_CONFIRM,
    ACTION_DELETE, ACTION_LOCK,
    ACTION_MODIFY,
    ACTION_SUBMIT, ACTION_UNCONFIRM, ACTION_UNLOCK,
    BylTableClickAction,
    BylTableDefine
} from "../../../common/list-form-table-item/table.formitem";
import {BylEmployeeService} from "../../../../service/project/service/employee.service";
import {BylEmployee} from '../../../../service/project/model/employee.model';
import {BylEmployeeStatusEnum, BylEmployeeStatusManager} from "../../../../service/project/model/employee-status.enum";
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";
import {BylMasterDataListComponentBasePro} from "../../../common/master-data-list-component-base";
import {BylEmployeeQuery} from "../../../../service/project/query/employee-query.model";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";

@Component({
    selector: 'byl-empoloyee-list',
    templateUrl: './list.component.html',
})
export class BylEmployeeListComponent extends BylMasterDataListComponentBasePro<BylEmployee> {



    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public employeeService: BylEmployeeService) {
        super(message, configService, modalService, router);

        this.businessService = employeeService;
        this.crudUrl = '/project/employee/crud';
        // this.businessCrudComponent = BylPersonCrudComponent;

        this.querySchema.properties['status'].enum.push(...BylEmployeeStatusManager.getSFSelectDataArray()); //设置查询条件中的状态字段
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
            // item.disabled = (data.status !== BylEmployeeStatusEnum.NORMAL);
            item.item = new BylEmployee();
            simpleDeepCopy(item.item, data);
            return item;
        });
    }

    /**
     *
     * @param q
     * @returns {BylEmployeeQuery}
     */
    genQueryModel(): any {
        let result = new BylEmployeeQuery();
        simpleDeepCopy(result, this.listQuery.queryData);

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


    updateListData(newData: BylEmployee) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                simpleDeepCopy(item.item, newData);
            });
    }

    // getStatusCaption(status: number): string {
    //     return BylEmployeeStatusEnum.getCaption(status);
    // }

    /**
     * 设置查询缺省值
     */
    // setQDataDefaultValue(){
    //     let q = new BylWorkTypeQuery();
    //
    //     Object.assign(this.qData,q);
    // }

    //#region 查询条件
    queryDefaultData: any = {
        status:[BylEmployeeStatusEnum.UNSUBMITED,BylEmployeeStatusEnum.SUBMITED,BylEmployeeStatusEnum.CONFIRMED]
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
                title: '最后修改日期大于等于',
                ui: { widget: 'date', mode: 'range' }
            }
        },
        required: []
    };
//#endregion
    EMPLOYEE_LEAVE = "离职";

    tableDefine:BylTableDefine ={
        showCheckbox: true,
        entityAction: [
            {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.UNSUBMITED },
            {actionName: ACTION_DELETE,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.UNSUBMITED },
            {actionName: ACTION_SUBMIT,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.UNSUBMITED },

            {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.SUBMITED },
            {actionName: ACTION_CANCEL,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.SUBMITED },
            {actionName: ACTION_CONFIRM,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.SUBMITED },

            {actionName: this.EMPLOYEE_LEAVE,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.CONFIRMED },

            {actionName: ACTION_CANCEL,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.CONFIRMED },
            {actionName: ACTION_UNCONFIRM,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.CONFIRMED },
            {actionName: ACTION_LOCK,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.CONFIRMED },
            {actionName: ACTION_UNLOCK,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.LOCKED },

            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.CONFIRMED },
            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.LOCKED },
            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.SUBMITED_DELETED },
            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.LEAVE },

            // {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.NORMAL }
        ],
        columns:[
            {label:"代码", fieldPath: "code" },
            {label:"姓名", fieldPath: "name" },
            {label:"关联个体", fieldPath: "personDisplay" },
            {label:"入职日期", fieldPath: "enterDateDisplay" },
            {label:"离职日期", fieldPath: "leaveDateDisplay" },
            {label:"当前工种", fieldPath: "workTypeDisplay" },
            {label:"状态", fieldPath: "statusDisplay" },
            {label:"最后修改时间", fieldPath: "modifyDateTimeDisplay" }
        ]};


    entityAction(action: BylTableClickAction){
        super.entityAction(action);

        switch(action.actionName){
            case this.EMPLOYEE_LEAVE:
                this.showLeaveEntity(action.rowItem);
                break;
            default:
                console.warn("当前的Action为：" + action.actionName + "，没有对应的处理过程。");
        }

    }

    showLeaveEntity(entity: BylEmployee){
        this.modalService.confirm({
            nzTitle: '确认要进行离职操作吗?',
            nzContent: '<b style="color: red;">员工在正式离开之后再完成离职操作。</b>',
            nzOkText: '离职',
            nzOkType: 'primary',
            nzOnOk: () => {
                this.actionResult$ = this.employeeService.leave(entity);
                this.actionFollowProcess(this.actionResult$);
            },
            nzCancelText: '取消',
            nzOnCancel: () => console.log('confirmEntity Cancel')
        });

    }
}
