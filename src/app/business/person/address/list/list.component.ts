import {Component, Input} from '@angular/core';
import {BylPersonAddress} from "../../../../service/person/model/person-address.model";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {BylConfigService} from "../../../../service/constant/config.service";
import {Router} from "@angular/router";
import {BylPersonAddressService} from "../../../../service/person/service/person-address.service";
import {BylListFormData} from "../../../../service/model/list-form-data.model";
import {BylPersonAddressCrudComponent} from "../crud/crud.component";
import {BylListComponentEntityDetail} from "../../../common/list-component-entity-detail";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {Observable} from "rxjs/Rx";


@Component({
  selector: 'byl-person-address-list',
  templateUrl: './list.component.html',
})
export class BylPersonAddressListComponent extends BylListComponentEntityDetail<BylPersonAddress> {

    @Input()
    set setMasterId(value: string){
        this.masterId = value;
    }

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public personAddressService: BylPersonAddressService) {
        super(message,configService,modalService,router);

        this.businessService = personAddressService;
        // this.crudUrl = "/person/address/crud/new";
        this.businessCrudComponent = BylPersonAddressCrudComponent;
    }

    ngOnInit() {
    }

    genListData(data: BylPersonAddress): BylListFormData<BylPersonAddress>{
        // return findResult.map(data => {
        let item = new BylListFormData<BylPersonAddress>();
        item.checked = false;
        // item.disabled = (data.status === BylRoleStatus.SUBMITED_DELETED);
        item.item = new BylPersonAddress();
        Object.assign(item.item,data);
        return item;
        // })
    }


    updateListData(newData:BylPersonAddress){
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item,newData);
            })
    }

    findByMasterId(masterId: string): Observable<BylResultBody<Array<BylPersonAddress>>> {
        return this.personAddressService.findByPersonId(masterId);
    }


}
