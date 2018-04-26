import {Component, OnInit} from '@angular/core';

import {BylListComponentBase} from '../../../common/list-component-base';

import {BylConfigService} from '../../../../service/constant/config.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {BylProjectManagerPoolService} from '../../../../service/project/service/project-manager-pool.service';
import {BylListFormData} from '../../../../service/model/list-form-data.model';
import {BylProjectManagerPoolQuery} from '../../../../service/project/query/project-manager-pool-query.model';
import {BylProjectManagerPool} from '../../../../service/project/model/project-manager-pool.model';
import {BylCrudEvent, BylCrudWaitingComponent} from '../../../common/waiting/crud-waiting.component';
import {BylAccountListComponent} from '../../../account/account/list/list.component';
import {BylAccount} from '../../../../service/account/model/account.model';
import {BylResultBody} from "../../../../service/model/result-body.model";

@Component({
    selector: 'byl-project-manager-pool-list',
    templateUrl: './list.component.html',
})
export class BylProjectManagerPoolListComponent extends BylListComponentBase<BylProjectManagerPool> {
    public accountReveal: any; // 账户筛选窗口

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
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
        this.accountReveal = this.modalService.open({
            title: '查找项目经理资源',
            zIndex: 9999, //最外层
            width: '90%',
            content: BylAccountListComponent,
            // onOk() {
            //
            // },
            // onCancel() {
            //     console.log('Click cancel');
            // },
            footer: false,
            componentParams: {
                functionMode: 'select'
            },
            maskClosable: false
        });
        this.accountReveal.next(BylCrudEvent[BylCrudEvent.bylSaving]);

        this.accountReveal.subscribe(result => {
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
        console.log("getManagerPoolItem",item);
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
            // item.disabled = (data.status === RoleStatus.DELETED_ROLE);
            item.item = new BylProjectManagerPool();
            Object.assign(item.item, data);
            return item;
        });
    }

    genQueryModel(): any {
        let result = new BylProjectManagerPoolQuery();
        // if (q.name) result.name = q.name;
        // if (q.modifyDateBegin) result.modifyDateBegin = moment(q.modifyDateBegin).valueOf();
        // if (q.modifyDateEnd) result.modifyDateEnd = moment(q.modifyDateEnd).add(1,'days').valueOf();//第二天的零点
        // if (q.status) result.status = q.status;
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

}
