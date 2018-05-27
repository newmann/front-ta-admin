import {Component} from '@angular/core';
import {BylListComponentBase} from '../../../common/list-component-base';
import {BylProject} from '../../../../service/project/model/project.model';
import {Router} from '@angular/router';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylProjectService} from '../../../../service/project/service/project.service';
import {BylListFormData} from '../../../../service/model/list-form-data.model';
import {BylProjectQuery} from '../../../../service/project/query/project-query.model';
import {BylIStatusItem} from '../../../../service/model/status.model';
import {BylProjectStatusManager} from '../../../../service/project/model/project-status.enum';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {SFSchema, SFUISchema} from '@delon/form';
import {BylListComponentBasePro} from "../../../common/list-component-base-pro";
import {BylMasterDataStatusEnum} from "../../../../service/model/master-data-status.enum";
import {BylPageReq} from "../../../../service/model/page-req.model";
import {ACTION_MODIFY, BylTableClickAction, BylTableDefine} from "../../../common/list-form-table-item/table.formitem";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
})
export class BylProjectListComponent extends BylListComponentBasePro<BylProject> {

    public statusList: BylIStatusItem[] = [];

    public queryForm: FormGroup;

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public projectService: BylProjectService,
                public fb: FormBuilder) {
        super(message, configService, modalService, router);

        this.businessService = projectService;
        this.crudUrl = '/project/project/crud';

        this.statusList = BylProjectStatusManager.getArray();
        this.querySchema.properties['status'].enum.push(...this.statusList);

        // this.defineQueryForm();

        // this.businessCrudComponent = BylPersonCrudComponent;
    }

    genListData(findResult: Array<BylProject>): Array<BylListFormData<BylProject>> {
        console.table(findResult);
        return findResult.map(data => {
            let item = new BylListFormData<BylProject>();
            item.checked = false;
            // item.disabled = (data.status === BylRoleStatus.DELETED);
            item.item = new BylProject();
            Object.assign(item.item, data);
            return item;
        });
    }

    /**
     * 生成查询条件
     * @returns {any}
     */
    genQueryModel(): any {
        let result = new BylProjectQuery();
        if (this.qData.code) result.code = this.qData.code;
        if (this.qData.name) result.name = this.qData.name;
        if (this.qData.modifyDateBegin) result.modifyDateBegin = moment(this.qData.modifyDateBegin).valueOf();
        if (this.qData.modifyDateEnd) result.modifyDateEnd = moment(this.qData.modifyDateEnd).add(1, 'days').valueOf();//第二天的零点
        if (this.qData.status) result.status = this.qData.status;
        return result;
    }

    updateListData(newData: BylProject) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item, newData);
            });
    }

    /**
     * 设置查询缺省值
     */
    setQDataDefaultValue() {

        let q = new BylProjectQuery();
        this.qData.name = q.name ? q.name : null;
        this.qData.code = q.code ? q.code : null;
        this.qData.modifyDateBegin = q.modifyDateBegin ? q.modifyDateBegin : null;
        this.qData.modifyDateEnd = q.modifyDateEnd ? q.modifyDateEnd : null;
        this.qData.status = q.status ? [...q.status] : null;

        // console.log(this.qData);
        // console.log(q);
        // Object.assign(this.qData,q);
    }

//#region 查询条件
    queryDefaultData: any = {
        status: [2, 10],
        modifyDateBegin: moment(moment.now()).subtract(6, 'month').format('YYYY-MM-DD'),
        modifyDateEnd: moment(moment.now()).format('YYYY-MM-DD')
    };
    queryUiSchema: SFUISchema = {};
    querySchema: SFSchema = {
        properties: {
            code: {
                type: 'string',
                title: '代码类似于'
            },
            name: {
                type: 'string',
                title: '名称类似于'
            },
            status: {
                type: 'string',
                title: '项目状态',
                enum: [],
                ui: {
                    widget: 'tag'
                }
            },
            modifyDateBegin: {
                type: 'string',
                title: '最后修改日期大于等于',
                ui: {widget: 'date'}
            },
            modifyDateEnd: {
                type: 'string',
                title: '最后修改日期小于等于',
                ui: {widget: 'date'}
            }
        },
        required: []
    };
//#endregion


    tableDefine:BylTableDefine ={
        showCheckbox: true,
        entityAction: [
            {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylMasterDataStatusEnum.NORMAL }
        ],
        columns:[
            {label:"代码", fieldPath: "code" },
            {label:"名称", fieldPath: "name" },
            {label:"地址", fieldPath: "addressDisplay" },
            {label:"项目经理", fieldPath: "managerDisplay" },
            {label:"联系方式", fieldPath: "fullContactMethod" },
            {label:"计划开始日期", fieldPath: "planBeginDateDisplay" },
            {label:"计划结束日期", fieldPath: "planEndDateDisplay" },
            {label:"状态", fieldPath: "statusDisplay" },
            {label:"最后修改时间", fieldPath: "modifyDateTimeDisplay" }
        ]};


    pageChange(item: BylPageReq){
        this.page = item;
        this.search();
    }

    selectedChange(data: BylListFormData<BylProject>[]){
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
