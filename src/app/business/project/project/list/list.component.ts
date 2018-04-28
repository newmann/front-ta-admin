import { Component } from '@angular/core';
import {BylListComponentBase} from '../../../common/list-component-base';
import {BylProject} from '../../../../service/project/model/project.model';
import {Router} from '@angular/router';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylProjectService} from '../../../../service/project/service/project.service';
import {BylListFormData} from '../../../../service/model/list-form-data.model';
import {BylProjectQuery} from '../../../../service/project/query/project-query.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class BylProjectListComponent extends BylListComponentBase<BylProject> {

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public projectService: BylProjectService) {
        super(message, configService, modalService, router);

        this.businessService = projectService;
        this.crudUrl = '/project/project/crud';
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

    genQueryModel(): any {
        let result = new BylProjectQuery();
        // if (q.name) result.name = q.name;
        // if (q.modifyDateBegin) result.modifyDateBegin = moment(q.modifyDateBegin).valueOf();
        // if (q.modifyDateEnd) result.modifyDateEnd = moment(q.modifyDateEnd).add(1,'days').valueOf();//第二天的零点
        // if (q.status) result.status = q.status;
        return result;
    }

    updateListData(newData: BylProject) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item, newData);
            });
    }
}
