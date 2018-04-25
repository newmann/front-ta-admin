import { Component, OnInit } from '@angular/core';

import {BylListComponentBase} from '../../../common/list-component-base';

import {BylConfigService} from '../../../../service/constant/config.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {BylProjectManagerPoolService} from '../../../../service/project/service/project-manager-pool.service';
import {BylListFormData} from '../../../../service/model/list-form-data.model';
import {BylProjectManagerPoolQuery} from '../../../../service/project/query/project-manager-pool-query.model';
import {BylProjectManagerPool} from '../../../../service/project/model/project-manager-pool.model';

@Component({
  selector: 'byl-project-manager-pool-list',
  templateUrl: './list.component.html',
})
export class BylProjectManagerPoolListComponent extends BylListComponentBase<BylProjectManagerPool>{
    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public projectManagerPoolService: BylProjectManagerPoolService) {
        super(message, configService, modalService, router);

        this.businessService = projectManagerPoolService;
        this.crudUrl = '/project/project-manager-pool/crud';
        // this.businessCrudComponent = BylPersonCrudComponent;
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

    updateListData(newData: BylProjectManagerPool) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item, newData);
            });
    }

}
