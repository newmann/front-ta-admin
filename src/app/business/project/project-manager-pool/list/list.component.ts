import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NzModalRef, NzMessageService, NzModalService} from 'ng-zorro-antd';

import {BylListComponentBase} from '../../../common/list-component-base';
import {BylConfigService} from '../../../../service/constant/config.service';

import {BylProjectManagerPoolService} from '../../../../service/project/service/project-manager-pool.service';
import {BylListFormData} from '../../../../service/model/list-form-data.model';
import {BylProjectManagerPoolQuery} from '../../../../service/project/query/project-manager-pool-query.model';
import {BylProjectManagerPool} from '../../../../service/project/model/project-manager-pool.model';

import {BylAccountListComponent} from '../../../account/account/list/list.component';

import {BylResultBody} from '../../../../service/model/result-body.model';

import {SFSchema, SFUISchema} from '@delon/form';
import * as moment from 'moment';
import {BylListFormFunctionModeEnum} from '../../../../service/model/list-form-function-mode.enum';
import {BylProject} from "../../../../service/project/model/project.model";
import {
    ACTION_DELETE, ACTION_MODIFY, BylTableClickAction,
    BylTableDefine
} from "../../../common/list-form-table-item/table.formitem";
import {BylMasterDataStatusEnum} from "../../../../service/model/master-data-status.enum";
import {BylPageReq} from "../../../../service/model/page-req.model";
import {BylListComponentBasePro} from "../../../common/list-component-base-pro";

@Component({
    selector: 'byl-project-manager-pool-list',
    templateUrl: './list.component.html',
})
export class BylProjectManagerPoolListComponent extends BylListComponentBasePro<BylProjectManagerPool> {
    /**
     * 当前在什么状态，主要是为了兼容不同的功能，比如筛选用户的界面等等,暂先定义两个：
     * list:正常的浏览界面
     * select： 筛选界面，
     */

    @Input() functionMode: BylListFormFunctionModeEnum = BylListFormFunctionModeEnum.NORMAL;
    @Input() selectModalForm: NzModalRef;

    public accountReveal: NzModalRef; // 账户筛选窗口

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                // public modalRef: NzModalRef,
                public router: Router,
                public projectManagerPoolService: BylProjectManagerPoolService) {
        super(message, configService, modalService, router);

        this.businessService = projectManagerPoolService;
        this.crudUrl = '';
        // this.businessCrudComponent = BylPersonCrudComponent;
    }

    /**
     * 从账户池中查找待加入的项目经理
     */
    addManagerPool() {
        console.log(this.projectManagerPoolService);

        this.accountReveal = this.modalService.create({
            nzTitle: '查找项目经理资源',
            nzZIndex: 9999, //最外层
            nzWidth: '90%',
            nzContent: BylAccountListComponent,
            nzFooter: null,
            // onOk() {
            //
            // },
            // onCancel() {
            //     console.log('Click cancel');
            // },
            nzComponentParams: {
                functionMode: BylListFormFunctionModeEnum.SELECT,
                findAvailablePoolsService: this.projectManagerPoolService,
                selectModalForm: this.accountReveal
            },
            nzMaskClosable: false
        });
        // this.accountReveal.next(BylCrudEvent[BylCrudEvent.bylSaving]);

        this.accountReveal.afterClose.subscribe(result => {
            console.info(result);

            console.info(typeof result);

            //返回的是选中的账户数组
            let pools: Array<BylProjectManagerPool> = [];
            if ((typeof result) === 'object') {
                console.log('添加新增的项目经理数据');
                for (let item of result) {
                    pools.push(this.genManagerPoolItem(item));
                }
            }
            if (pools.length > 0) {
                //todo 提交到数据库中,成功后显示到界面
                this.projectManagerPoolService.batchtAdd(pools).subscribe(
                    data => {
                        this.loading = false;
                        if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                            // 正确获取数据后，直接添加到当前的数据列表中，不像search过程，会重新刷新total值
                            this.listData.push(...this.genListData(Array.from(data.data)));

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
        });
    }

    genManagerPoolItem(item: any): BylProjectManagerPool {
        console.log('getManagerPoolItem', item);
        let result = new BylProjectManagerPool();
        result.poolId = item.item.id;
        result.poolName = item.item.fullName;
        result.poolCode = item.item.username;
        //todo 添加操作用户信息

        return result;
    }

    genListData(findResult: Array<BylProjectManagerPool>): Array<BylListFormData<BylProjectManagerPool>> {
        return findResult.map(data => {
            let item = new BylListFormData<BylProjectManagerPool>();
            item.checked = false;
            // item.disabled = (data.status === BylRoleStatus.DELETED);
            item.item = new BylProjectManagerPool();
            Object.assign(item.item, data);
            return item;
        });
    }

    genQueryModel(): any {
        let result = new BylProjectManagerPoolQuery();
        // if (qData.name) result.name = qData.name;
        // if (qData.modifyDateBegin) result.modifyDateBegin = moment(qData.modifyDateBegin).valueOf();
        // if (qData.modifyDateEnd) result.modifyDateEnd = moment(qData.modifyDateEnd).add(1,'days').valueOf();//第二天的零点
        // if (qData.status) result.status = qData.status;
        return result;
    }

    /**
     * 这个过程不会使用，因为没有新增的界面
     * @param {BylProjectManagerPool} newData
     */
    updateListData(newData: BylProjectManagerPool) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item, newData);
            });
    }


    //处理调用选择窗口问题
    selectedEntity(item: BylProjectManagerPool) {
        // this.functionSubject$.next(item);
        // this.modalRef.destroy(item);
        this.selectModalForm.destroy(item);
    }

    /**
     * 设置查询缺省值
     */
    setQDataDefaultValue() {
        let q = new BylProjectManagerPoolQuery();

        Object.assign(this.qData, q);
    }

    deleteEntity(id: string){
        //从数据库中删除
        this.projectManagerPoolService.deleteById(id)
            .subscribe(data => {
                    this.loading = false;
                    if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                        // 删除当前列表中的数据
                        this.listData = this.listData.filter(item=> item.item.id !== id);

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
                title: '姓名类似于'
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
            {actionName: ACTION_DELETE }
        ],
        columns:[
            {label:"代码", fieldPath: "poolCode" },
            {label:"姓名", fieldPath: "poolName" },
            {label:"最后修改时间", fieldPath: "modifyDateTimeDisplay" }
        ]};


    pageChange(item: BylPageReq){
        this.page = item;
        this.search();
    }

    selectedChange(data: BylListFormData<BylProjectManagerPool>[]){
        this.selectedRows = data;

    }

    entityAction(action: BylTableClickAction){
        switch(action.actionName){
            case ACTION_DELETE:
                this.deleteEntity(action.id);
                break;
            default:
                console.warn("当前的Action为：" + action.actionName + "，没有对应的处理过程。");
        }

    }

}
