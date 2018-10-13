import { Component } from '@angular/core';
import {BylListComponentBasePro} from "../../../common/list-component-base-pro";
import {BylBorrowMoneyQualificationPool} from "../../../../service/project/model/borrow-money-qualification-pool.model";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {Router} from "@angular/router";
import {NzMessageService, NzModalRef, NzModalService} from "ng-zorro-antd";
import {BylListFormData} from "../../../../service/model/list-form-data.model";
import {BylProjectManagerPoolQuery} from "../../../../service/project/query/project-manager-pool-query.model";
import {BylConfigService} from "../../../../service/constant/config.service";
import {BylBorrowMoneyQualificationPoolService} from "../../../../service/project/service/borrow-money-qualification-pool.service";
import {BylPersonListComponent} from "../../../person/person/list/list.component";
import {BylOrganizationListComponent} from "../../../organization/organization/list/list.component";
import {BylBorrowMoneyQualificationPoolQuery} from "../../../../service/project/query/borrow-money-qualification-pool-query.model";
import * as moment from "moment";
import {SFSchema, SFUISchema} from "@delon/form";
import {BylIStatusItem} from "../../../../service/model/status.model";
import {BylBusinessEntityTypeManager,BylBusinessEntityTypeEnum} from "../../../../service/model/business-entity-type.enum";
import {BylPageReq} from "../../../../service/model/page-req.model";
import {
    ACTION_DELETE, ACTION_MODIFY, BylTableClickAction,
    BylTableDefine
} from "../../../common/list-form-table-item/table.formitem";
import {BylListFormFunctionModeEnum} from "../../../../service/model/list-form-function-mode.enum";
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";

@Component({
  selector: 'byl-borrow-money-qualification-pool-list',
  templateUrl: './list.component.html',
})
export class BylBorrowMoneyQualificationPoolListComponent extends BylListComponentBasePro<BylBorrowMoneyQualificationPool> {
    public addPoolReveal: NzModalRef; // 账户筛选窗口

    // businessEntityType: BylIStatusItem[]; // 实体类型
    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public borrowMoneyQualificationPoolService: BylBorrowMoneyQualificationPoolService) {
        super(message, configService, modalService, router);

        this.businessService = borrowMoneyQualificationPoolService;
        this.crudUrl = '';

        this.querySchema.properties['type'].enum.push(...BylBusinessEntityTypeManager.getSFSelectDataArray()); //设置查询条件中的类型字段
        // this.businessCrudComponent = BylPersonCrudComponent;
    }

    /**
     * 从个体中选择可用的资源
     */
    addPersonPool() {


        this.addPoolReveal = this.modalService.create({
            nzTitle: '查找个体资源',
            nzZIndex: 9999, //最外层
            nzWidth: '90%',
            nzContent: BylPersonListComponent,
            nzFooter: null,
            // onOk() {
            //
            // },
            // onCancel() {
            //     console.log('Click cancel');
            // },
            nzComponentParams: {
                functionMode: BylListFormFunctionModeEnum.SELECT,
                findAvailablePoolsService: this.borrowMoneyQualificationPoolService
                // selectModalForm: this.addPoolReveal
            },
            nzMaskClosable: false
        });
        // this.addPoolReveal.next(BylCrudEvent[BylCrudEvent.bylSaving]);

        this.addPoolReveal.afterClose.subscribe(result => {
            console.info(result);

            console.info(typeof result);

            //返回的是选中的账户数组
            let pools: Array<BylBorrowMoneyQualificationPool> = [];
            if ((typeof result) === 'object') {
                console.log('添加新增的个体数据');
                for (let item of result) {
                    pools.push(this.genPoolItemFromPerson(item));
                }
            }
            if (pools.length > 0) {
                //todo 提交到数据库中,成功后显示到界面
                this.borrowMoneyQualificationPoolService.batchtAdd(pools).subscribe(
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
    /**
     * 从组织中选择可用的资源
     */
    addOrganizationPool() {


        this.addPoolReveal = this.modalService.create({
            nzTitle: '查找组织资源',
            nzZIndex: 9999, //最外层
            nzWidth: '90%',
            nzContent: BylOrganizationListComponent,
            nzFooter: null,
            // onOk() {
            //
            // },
            // onCancel() {
            //     console.log('Click cancel');
            // },
            nzComponentParams: {
                functionMode: BylListFormFunctionModeEnum.SELECT,
                findAvailablePoolsService: this.borrowMoneyQualificationPoolService
            },
            nzMaskClosable: false
        });
        // this.addPoolReveal.next(BylCrudEvent[BylCrudEvent.bylSaving]);

        this.addPoolReveal.afterClose.subscribe(result => {
            console.info(result);

            console.info(typeof result);

            //返回的是选中的账户数组
            let pools: Array<BylBorrowMoneyQualificationPool> = [];
            if ((typeof result) === 'object') {
                console.log('添加新增的组织数据');
                for (let item of result) {
                    pools.push(this.genPoolItemFromOrganization(item));
                }
            }
            if (pools.length > 0) {
                //todo 提交到数据库中,成功后显示到界面
                this.borrowMoneyQualificationPoolService.batchtAdd(pools).subscribe(
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

    genPoolItemFromPerson(item: any): BylBorrowMoneyQualificationPool {

        let result = new BylBorrowMoneyQualificationPool();
        result.type = BylBusinessEntityTypeEnum.PERSON;
        result.poolId = item.item.id;
        result.poolName = item.item.name;
        result.poolCode = item.item.idCard;
        //todo 添加操作用户信息

        return result;
    }
    genPoolItemFromOrganization(item: any): BylBorrowMoneyQualificationPool {

        let result = new BylBorrowMoneyQualificationPool();
        result.type = BylBusinessEntityTypeEnum.ORGANIZATION;
        result.poolId = item.item.id;
        result.poolName = item.item.name;
        result.poolCode = item.item.code;
        //todo 添加操作用户信息

        return result;
    }

    genListData(findResult: Array<BylBorrowMoneyQualificationPool>): Array<BylListFormData<BylBorrowMoneyQualificationPool>> {
        return findResult.map(data => {
            let item = new BylListFormData<BylBorrowMoneyQualificationPool>();
            item.checked = false;
            // item.disabled = (data.status === BylRoleStatus.SUBMITED_DELETED);
            item.item = new BylBorrowMoneyQualificationPool();
            Object.assign(item.item, data);
            return item;
        });
    }

    genQueryModel(): any {
        let result = new BylBorrowMoneyQualificationPoolQuery();
        // if (this.listQuery.queryData.type) {
        //     result.type = [];
        //     result.type.push(...this.listQuery.queryData.type);
        // }
        //
        // if (this.listQuery.queryData.code) result.code = this.listQuery.queryData.code;
        // if (this.listQuery.queryData.name) result.name = this.listQuery.queryData.name;
        simpleDeepCopy(result, this.listQuery.queryData);

        if (this.listQuery.queryData.modifyDateRange) {
            if (this.listQuery.queryData.modifyDateRange.length>0){
                result.modifyDateBegin = moment(moment(this.listQuery.queryData.modifyDateRange[0]).format(BylDatetimeUtils.formatDateString)).valueOf();
                result.modifyDateEnd = moment(moment(this.listQuery.queryData.modifyDateRange[1]).format(BylDatetimeUtils.formatDateString))
                    .add(1, 'days').valueOf();//第二天的零点
            }
        }
        // if (qData.name) result.name = qData.name;
        // if (qData.modifyDateBegin) result.modifyDateBegin = moment(qData.modifyDateBegin).valueOf();
        // if (qData.modifyDateEnd) result.modifyDateEnd = moment(qData.modifyDateEnd).add(1,'days').valueOf();//第二天的零点
        // if (qData.status) result.status = qData.status;
        return result;
    }

    /**
     * 这个过程不会使用，因为没有新增的界面
     * @param {BylBorrowMoneyQualificationPool} newData
     */
    updateListData(newData: BylBorrowMoneyQualificationPool) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item, newData);
            });
    }

    /**
     * 设置查询缺省值
     */
    setQDataDefaultValue(){
        let q = new BylBorrowMoneyQualificationPoolQuery();

        Object.assign(this.qData,q);
    }


    deleteEntity(deletedEntity: BylBorrowMoneyQualificationPool){
        //从数据库中删除
        this.borrowMoneyQualificationPoolService.deleteById(deletedEntity.id)
            .subscribe(data => {
                    this.loading = false;
                    if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                        // 删除当前列表中的数据
                        this.listData = this.listData.filter(item=> item.item.id !== deletedEntity.id);

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
        type: [1,2]
        // modifyDateBegin: moment(moment.now()).subtract(6,"month").format("YYYY-MM-DD"),
        // modifyDateEnd: moment(moment.now()).format("YYYY-MM-DD")
    };
    queryUiSchema: SFUISchema = {};
    querySchema: SFSchema = {
        properties: {
            type: {
                type: 'string',
                title: '类型',
                enum: [],
                ui: {
                    widget: 'tag'
                }
            },
            code: { type: 'string',
                title: '代码类似于'
            },
            name: { type: 'string',
                title: '名称类似于'
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

    //#region 结果表定义
    tableDefine:BylTableDefine ={
        showCheckbox: true,
        entityAction: [
            {actionName: ACTION_DELETE }
        ],
        columns:[
            {label:"类型", fieldPath: "typeDisplay" },
            {label:"代码", fieldPath: "poolCode" },
            {label:"姓名/名称", fieldPath: "poolName" },
            {label:"备注", fieldPath: "remarks" },
            {label:"最后修改时间", fieldPath: "modifyDateTimeDisplay" }
        ]};


    // pageChange(item: BylPageReq){
    //     this.page = item;
    //     this.search();
    // }
    //
    // selectedChange(data: BylListFormData<BylBorrowMoneyQualificationPool>[]){
    //     this.selectedRows = data;
    //
    // }
    // entityAction(action: BylTableClickAction){
    //     switch(action.actionName){
    //         case ACTION_DELETE:
    //             this.deleteEntity(action.id);
    //             break;
    //         default:
    //             console.warn("当前的Action为：" + action.actionName + "，没有对应的处理过程。");
    //     }
    //
    // }
    //#endregion
}
