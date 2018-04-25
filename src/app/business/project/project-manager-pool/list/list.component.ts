import { Component, OnInit } from '@angular/core';

import {BylListComponentBase} from '../../../common/list-component-base';

import {BylConfigService} from '../../../../service/constant/config.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {BylProjectManagerPoolService} from '../../../../service/project/service/project-manager-pool.service';
import {BylListFormData} from '../../../../service/model/list-form-data.model';
import {BylProjectManagerPoolQuery} from '../../../../service/project/query/project-manager-pool-query.model';
import {BylProjectManagerPool} from '../../../../service/project/model/project-manager-pool.model';
import {BylCrudEvent, BylCrudWaitingComponent} from "../../../common/waiting/crud-waiting.component";

@Component({
  selector: 'byl-project-manager-pool-list',
  templateUrl: './list.component.html',
})
export class BylProjectManagerPoolListComponent extends BylListComponentBase<BylProjectManagerPool>{
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
    addManagerPool(){
        this.accountReveal = this.modalService.open({
            title: '查找项目经理资源',
            zIndex: 9999, //最外层
            content: BylCrudWaitingComponent,
            // onOk() {
            //
            // },
            // onCancel() {
            //     console.log('Click cancel');
            // },
            footer: false,
            componentParams: {
                // name: '测试渲染Component'
            },
            maskClosable: false
        });
        this.accountReveal.next(BylCrudEvent[BylCrudEvent.bylSaving]);
        //
        // this.savingReveal.subscribe(result => {
        //     console.info(result);
        //     //判断是否退出界面
        //     if (result === 'onDestroy') {
        //         console.log('退出提示界面');
        //         switch (this.processType) {
        //             case 'new':
        //                 //新增界面
        //                 this.businessData = this.newBusinessData();
        //                 this.reset();
        //                 break;
        //             case 'modify':
        //                 //修改界面
        //                 this.businessData = this.newBusinessData();
        //                 this.reset();
        //                 break;
        //             default:
        //                 // 从list界面进入修改
        //                 console.info('将修改后的数据传回list界面');
        //                 //将修改后的数据传回list界面
        //                 this.modalSubject.next({type: BylCrudEvent[BylCrudEvent.bylUpdate], data: this.businessData});
        //                 this.modalSubject.destroy();
        //
        //         }
        //
        //     }
        //
        // });
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
