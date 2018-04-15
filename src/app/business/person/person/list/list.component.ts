import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {BylListComponentBase} from "../../../common/list-component-base";
import {BylPerson} from "../../../../service/person/model/person.model";
import {Router} from "@angular/router";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {BylConfigService} from "../../../../service/constant/config.service";
import {BylPersonService} from "../../../../service/person/service/person.service";
import {BylListFormData} from "../../../../service/model/list-form-data.model";
import {Role, RoleStatus} from "../../../../service/account/model/role.model";
import {RoleQueryModel} from "../../../../service/account/query/role-query.model";
import * as moment from "moment";
import {BylPersonQuery} from "../../../../service/person/query/person-query.model";
import {BylPersonCrudComponent} from "../crud/crud.component";

@Component({
  selector: 'byl-person-list',
  templateUrl: './list.component.html',
})
export class BylPersonListComponent extends BylListComponentBase<BylPerson>{

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public personService: BylPersonService) {
        super(message,configService,modalService,router);

        this.businessService = personService;
        this.addUrl = "/person/person/crud/new";
        this.businessCrudComponent = BylPersonCrudComponent;
    }



    ngOnInit() {
    }

    genListData(findResult: Array<BylPerson>): Array<BylListFormData<BylPerson>>{
        return findResult.map(data => {
            let item = new BylListFormData<BylPerson>();
            item.checked = false;
            // item.disabled = (data.status === RoleStatus.DELETED_ROLE);
            item.item = new BylPerson();
            Object.assign(item.item,data);
            return item;
        })
    }

    genQueryModel( ):any{
        let result = new BylPersonQuery();
        // if (q.name) result.name = q.name;
        // if (q.modifyDateBegin) result.modifyDateBegin = moment(q.modifyDateBegin).valueOf();
        // if (q.modifyDateEnd) result.modifyDateEnd = moment(q.modifyDateEnd).add(1,'days').valueOf();//第二天的零点
        // if (q.status) result.status = q.status;
        return result;
    }

    updateListData(newData:BylPerson){
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item,newData);
            })
    }

    modifyEntity(id:string){
        this.router.navigateByUrl("/person/person/crud/" + id);
    }
}
