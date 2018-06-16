import {Component, Input} from '@angular/core';
import {NzMessageService, NzModalRef, NzModalService} from 'ng-zorro-antd';
import {BylConfigService} from '../../../../service/constant/config.service';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {
    BylAccountAvailablePoolsInterface,
    BylFindEntityAccountInterface,
    BylSaveAccountRelationInterface
} from '../../../../service/account/service/account-related.interface';
import {BylListComponentBasePro} from "../../../common/list-component-base-pro";
import {BylEmployee} from "../../../../service/project/model/employee.model";
import {SFSchema, SFUISchema} from "@delon/form";
import {BylTableDefine} from "../../../common/list-form-table-item/table.formitem";
import {BylEmployeeStatusEnum, BylEmployeeStatusManager} from "../../../../service/project/model/employee-status.enum";
import {BylEmployeeService} from "../../../../service/project/service/employee.service";
import {BylWorkTypeQuery} from "../../../../service/project/query/work-type-query.model";
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";
import {BylListFormData} from "../../../../service/model/list-form-data.model";
import {BylEmployeeQuery} from "../../../../service/project/query/employee-query.model";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylEmployeeAvailablePoolsInterface} from "../../../../service/project/service/employee-related.interface";
import {BylResultBody} from "../../../../service/model/result-body.model";

// export const enum AccountEntityTypeEnum{
//     ROLE = 1,
//     DEPARTMENT = 2
// }

@Component({
    selector: 'byl-Employee-item-list',
    templateUrl: './item-list.component.html',
})
export class BylEmployeeItemListComponent
    extends BylListComponentBasePro<BylEmployee>{

    private _masterId: string;
    @Input()
    set masterId(value: string) {
        this._masterId = value;
    }

    @Input() findAvailablePoolsService: BylEmployeeAvailablePoolsInterface; //调用方，用户调出选择添加账户的窗口
    //
    // @Input() saveAccountRelationService: BylSaveAccountRelationInterface; //调用方传入查询函数
    // @Input() findEntityAccountService: BylFindEntityAccountInterface; //调用方传入查询已经对应的账户

    // public listData: Array<BylListFormData<BylAccount>> = []; // 显示内容
    //
    // public selectedRows: Array<BylListFormData<BylAccount>> = []; //被选中的数据
    // public indeterminate = false;
    // public allChecked = false; //是否全部选中


    // public addForm: NzModalRef; //维护界面
    //
    // public loading = false;

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public employeeService: BylEmployeeService,
                public modalRef: NzModalRef
    ) {
        super(message,configService,modalService,router);
        this.businessService = employeeService;
        this.querySchema.properties['status'].enum.push(
            {value: BylEmployeeStatusEnum.CONFIRMED, label: BylEmployeeStatusManager.getCaption(BylEmployeeStatusEnum.CONFIRMED)}
        ); //设置查询条件中的状态字段
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

    updateListData(newData: BylEmployee) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                simpleDeepCopy(item.item, newData);
            });
    }

    /**
     * 查找
     */
    search() {
        this.loading = true;

        this.listWidget.clearGrid();

        this.findAvailablePoolsService.findAvailableEmployeePoolsPage(this.genQueryModel(), this.page, this._masterId).subscribe(
            data => {
                this.loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                    // 正确获取数据
                    this.total = data.data.total;

                    // this.listData = Array.from(data.data.rows);
                    this.listData = this.genListData(Array.from(data.data.rows));

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

    //#region 查询条件
    queryDefaultData: any = {
        status:[BylEmployeeStatusEnum.CONFIRMED]
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

    tableDefine:BylTableDefine ={
        showCheckbox: true,
        entityAction: [
            // {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylEmployeeStatusEnum.NORMAL }
        ],
        columns:[
            {label:"代码", fieldPath: "code" },
            {label:"姓名", fieldPath: "name" },
            {label:"入职日期", fieldPath: "enterDateDisplay" },
            {label:"离职日期", fieldPath: "leaveDateDisplay" },
            {label:"当前工种", fieldPath: "workTypeDisplay" },
            {label:"状态", fieldPath: "statusDisplay" },
            {label:"最后修改时间", fieldPath: "modifyDateTimeDisplay" }
        ]};

    addSelected(){
        let  result:Array<BylEmployee>;
        result = this.selectedRows.map(item => item.item);

        this.modalRef.destroy(result);

    }
}
