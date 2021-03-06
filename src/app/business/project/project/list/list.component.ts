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
import {BylProjectStatusEnum, BylProjectStatusManager} from '../../../../service/project/model/project-status.enum';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {SFSchema, SFUISchema} from '@delon/form';
import {BylListComponentBasePro} from "../../../common/list-component-base-pro";
import {BylMasterDataStatusEnum} from "../../../../service/model/master-data-status.enum";
import {BylPageReq} from "../../../../service/model/page-req.model";
import {
    ACTION_BROWSE,
    ACTION_CANCEL,
    ACTION_DELETE, ACTION_MODIFY, ACTION_SUBMIT, BylTableClickAction,
    BylTableDefine
} from "../../../common/list-form-table-item/table.formitem";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";
import {BylListComponentMasterData} from "../../../common/list-component-master-data";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
})
export class BylProjectListComponent extends BylListComponentMasterData<BylProject> {

    // public statusList: BylIStatusItem[] = [];

    // public queryForm: FormGroup;

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public projectService: BylProjectService,
                public fb: FormBuilder) {
        super(message, configService, modalService, router);

        this.businessService = projectService;
        this.crudUrl = '/project/project/crud';

        // this.statusList = BylProjectStatusManager.getArray();
        this.querySchema.properties['status'].enum.push(...BylProjectStatusManager.getSFSelectDataArray());

        // this.defineQueryForm();

        // this.businessCrudComponent = BylPersonCrudComponent;
    }

    genListData(findResult: Array<BylProject>): Array<BylListFormData<BylProject>> {
        console.table(findResult);
        return findResult.map(data => {
            let item = new BylListFormData<BylProject>();
            item.checked = false;
            // item.disabled = (data.status === BylRoleStatus.SUBMITED_DELETED);
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

    updateListData(newData: BylProject) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item, newData);
            });
    }

    // setQDataDefaultValue() {
    //
    //     let q = new BylProjectQuery();
    //     this.qData.name = q.name ? q.name : null;
    //     this.qData.code = q.code ? q.code : null;
    //     this.qData.modifyDateBegin = q.modifyDateBegin ? q.modifyDateBegin : null;
    //     this.qData.modifyDateEnd = q.modifyDateEnd ? q.modifyDateEnd : null;
    //     this.qData.status = q.status ? [...q.status] : null;
    //
    //     // console.log(this.qData);
    //     // console.log(q);
    //     // Object.assign(this.qData,q);
    // }

//#region 查询条件
    public page: BylPageReq = { //分页定义
        page: 1, // 缺省当前页
        pageSize: 10, // 缺省每页条数
        sortField: 'modifyAction.modifyDateTime',
        sort: 'desc',
        keyword: '',
    };

    /**
     * 设置查询缺省值
     */

    queryDefaultData: any = {
        status: [BylProjectStatusEnum.UNSUBMITED, BylProjectStatusEnum.SUBMITED, BylProjectStatusEnum.CONFIRMED, BylProjectStatusEnum.RUNNING],
        modifyDateRange: [moment(moment.now()).subtract(6, 'month').format('YYYY-MM-DD'),
         moment(moment.now()).format('YYYY-MM-DD')]
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
            modifyDateRange: {
                type: 'string',
                title: '最后修改日期',
                ui: { widget: 'date', mode: 'range' }
            }
        }
    };
//#endregion


    PROJECT_RUN = "启动";
    PROJECT_ACHIEVE = "完成";

    tableDefine:BylTableDefine ={
        showCheckbox: true,
        entityAction: [
            {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylProjectStatusEnum.UNSUBMITED },
            {actionName: ACTION_DELETE,checkFieldPath: "status" ,checkValue: BylProjectStatusEnum.UNSUBMITED },
            {actionName: ACTION_SUBMIT,checkFieldPath: "status" ,checkValue: BylProjectStatusEnum.UNSUBMITED },

            {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylProjectStatusEnum.SUBMITED },
            {actionName: this.PROJECT_RUN,checkFieldPath: "status" ,checkValue: BylProjectStatusEnum.SUBMITED },
            {actionName: ACTION_CANCEL,checkFieldPath: "status" ,checkValue: BylProjectStatusEnum.SUBMITED },

            {actionName: this.PROJECT_ACHIEVE,checkFieldPath: "status" ,checkValue: BylProjectStatusEnum.RUNNING },
            {actionName: ACTION_CANCEL,checkFieldPath: "status" ,checkValue: BylProjectStatusEnum.RUNNING },

            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylProjectStatusEnum.CONFIRMED },
            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylProjectStatusEnum.LOCKED },
            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylProjectStatusEnum.SUBMITED_DELETED },
            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylProjectStatusEnum.RUNNING },
            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylProjectStatusEnum.RUNNING_DELETED },
            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylProjectStatusEnum.ACHIEVEMENT },
        ],
        columns:[
            {label:"代码", fieldPath: "code" },
            {label:"名称", fieldPath: "name" },
            // {label:"地址", fieldPath: "addressDisplay" },
            {label:"项目经理", fieldPath: "managerDisplay" },
            {label:"联系方式", fieldPath: "fullContactMethod" },
            {label:"计划开始日期", fieldPath: "planBeginDateDisplay" },
            {label:"计划结束日期", fieldPath: "planEndDateDisplay" },
            {label:"状态", fieldPath: "statusDisplay" },
            {label:"最后修改时间", fieldPath: "modifyDateTimeDisplay" }
        ]};



    entityAction(action: BylTableClickAction){
        super.entityAction(action);

        switch(action.actionName){
            case this.PROJECT_RUN:
                this.showRunEntity(action.rowItem);
                break;
            case this.PROJECT_ACHIEVE:
                this.showAchieveEntity(action.rowItem);
                break;
            default:
                console.warn("当前的Action为：" + action.actionName + "，没有对应的处理过程。");
        }

    }

    // deleteEntity(entity: BylProject){
    //     this.projectService.delete(entity).subscribe(
    //         data => {
    //             // option.loading = false;
    //             if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
    //                 //将显示界面中的数据删除掉
    //                 this.listData = this.listData.filter(item =>{
    //                     return item.item.id !== entity.id;
    //                 })
    //
    //             } else {
    //                 this.message.error(data.msg);
    //             }
    //         },
    //         err => {
    //             // option.loading = false;
    //             this.message.error(err.toString());
    //         }
    //     );
    // }

    // submitEntity(entity: BylProject){
    //     this.actionResult$ = this.projectService.submit(entity);
    //     this.actionFollowProcess(this.actionResult$);
    //
    //     // this.projectService.submit(entity).subscribe(
    //     //     data => {
    //     //         // option.loading = false;
    //     //         if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
    //     //             //将显示界面中的数据修改
    //     //             this.updateListData(data.data);
    //     //             // this.listData.map(item =>{
    //     //             //     if (item.item.id === data.data.id){
    //     //             //         simpleDeepCopy(item.item,data.data);
    //     //             //     };
    //     //             // })
    //     //
    //     //         } else {
    //     //             this.message.error(data.msg);
    //     //         }
    //     //     },
    //     //     err => {
    //     //         // option.loading = false;
    //     //         this.message.error(err.toString());
    //     //     }
    //     // );
    // }

    showRunEntity(entity: BylProject){
        this.modalService.confirm({
            nzTitle: '确认要进行完成操作吗?',
            nzContent: '<b style="color: red;">项目在结束之后进行完成操作。</b>',
            nzOkText: '完成',
            nzOkType: 'primary',
            nzOnOk: () => {
                this.actionResult$ = this.projectService.running(entity);
                this.actionFollowProcess(this.actionResult$);
            },
            nzCancelText: '取消',
            nzOnCancel: () => console.log('confirmEntity Cancel')
        });

    }
    // cancelEntity(entity: BylProject){
    //     this.actionResult$ = this.projectService.cancel(entity);
    //     this.actionFollowProcess(this.actionResult$);
    // }

    showAchieveEntity(entity: BylProject){
        this.modalService.confirm({
            nzTitle: '确认要进行完成操作吗?',
            nzContent: '<b style="color: red;">项目在结束之后进行完成操作。</b>',
            nzOkText: '完成',
            nzOkType: 'primary',
            nzOnOk: () => {
                this.actionResult$ = this.projectService.achieve(entity);
                this.actionFollowProcess(this.actionResult$);
            },
            nzCancelText: '取消',
            nzOnCancel: () => console.log('confirmEntity Cancel')
        });


    }

}
