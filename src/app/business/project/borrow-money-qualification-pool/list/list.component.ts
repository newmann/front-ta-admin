import { Component } from '@angular/core';
import {BylListComponentBase} from "../../../common/list-component-base";
import {BylBorrowMoneyQualificationPool} from "../../../../service/project/model/borrow-money-qualification-pool.model";
import {BylCrudEvent} from "../../../common/waiting/crud-waiting.component";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {Router} from "@angular/router";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {BylListFormData} from "../../../../service/model/list-form-data.model";
import {BylProjectManagerPoolQuery} from "../../../../service/project/query/project-manager-pool-query.model";
import {BylConfigService} from "../../../../service/constant/config.service";
import {BylBorrowMoneyQualificationPoolService} from "../../../../service/project/service/borrow-money-qualification-pool.service";
import {BylPersonListComponent} from "../../../person/person/list/list.component";
import {BylOrganizationListComponent} from "../../../organization/organization/list/list.component";

@Component({
  selector: 'byl-borrow-money-qualification-pool-list',
  templateUrl: './list.component.html',
})
export class BylBorrowMoneyQualificationPoolListComponent extends BylListComponentBase<BylBorrowMoneyQualificationPool> {
    public addPoolReveal: any; // 账户筛选窗口

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public borrowMoneyQualificationPoolService: BylBorrowMoneyQualificationPoolService) {
        super(message, configService, modalService, router);

        this.businessService = borrowMoneyQualificationPoolService;
        this.crudUrl = '';
        // this.businessCrudComponent = BylPersonCrudComponent;
    }

    /**
     * 从个体中选择可用的资源
     */
    addPersonPool() {


        this.addPoolReveal = this.modalService.open({
            title: '查找个体资源',
            zIndex: 9999, //最外层
            width: '90%',
            content: BylPersonListComponent,
            // onOk() {
            //
            // },
            // onCancel() {
            //     console.log('Click cancel');
            // },
            footer: false,
            componentParams: {
                functionMode: 'select',
                findAvailablePoolsService: this.borrowMoneyQualificationPoolService
            },
            maskClosable: false
        });
        this.addPoolReveal.next(BylCrudEvent[BylCrudEvent.bylSaving]);

        this.addPoolReveal.subscribe(result => {
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
     * 从个体中选择可用的资源
     */
    addOrganizationPool() {


        this.addPoolReveal = this.modalService.open({
            title: '查找个体资源',
            zIndex: 9999, //最外层
            width: '90%',
            content: BylOrganizationListComponent,
            // onOk() {
            //
            // },
            // onCancel() {
            //     console.log('Click cancel');
            // },
            footer: false,
            componentParams: {
                functionMode: 'select',
                findAvailablePoolsService: this.borrowMoneyQualificationPoolService
            },
            maskClosable: false
        });
        this.addPoolReveal.next(BylCrudEvent[BylCrudEvent.bylSaving]);

        this.addPoolReveal.subscribe(result => {
            console.info(result);

            console.info(typeof result);

            //返回的是选中的账户数组
            let pools: Array<BylBorrowMoneyQualificationPool> = [];
            if ((typeof result) === 'object') {
                console.log('添加新增的个体数据');
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
        result.poolId = item.item.id;
        result.poolName = item.item.name;
        result.poolCode = item.item.idCard;
        //todo 添加操作用户信息

        return result;
    }
    genPoolItemFromOrganization(item: any): BylBorrowMoneyQualificationPool {

        let result = new BylBorrowMoneyQualificationPool();
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
            // item.disabled = (data.status === BylRoleStatus.DELETED);
            item.item = new BylBorrowMoneyQualificationPool();
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
     * @param {BylBorrowMoneyQualificationPool} newData
     */
    updateListData(newData: BylBorrowMoneyQualificationPool) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item, newData);
            });
    }


}
