import {Component, Input, OnInit} from '@angular/core';
import {BylPersonAddress} from "../../../../service/person/model/person-address.model";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {BylPersonCrudComponent} from "../../person/crud/crud.component";
import {BylConfigService} from "../../../../service/constant/config.service";
import {Router} from "@angular/router";
import {BylPersonAddressService} from "../../../../service/person/service/person-address.service";
import {BylListFormData} from "../../../../service/model/list-form-data.model";
import {BylPersonAddressQuery} from "../../../../service/person/query/person-address-query.model";
import {BylItemListComponentBase} from "../../../common/item-list-component-base";


@Component({
  selector: 'byl-person-address-list',
  templateUrl: './list.component.html',
})
export class BylPersonAddressListComponent extends BylItemListComponentBase<BylPersonAddress> {

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
        this.addUrl = "/person/address/crud/new";
        this.businessCrudComponent = BylPersonCrudComponent;
    }

    ngOnInit() {
    }

    genListData(findResult: Array<BylPersonAddress>): Array<BylListFormData<BylPersonAddress>>{
        return findResult.map(data => {
            let item = new BylListFormData<BylPersonAddress>();
            item.checked = false;
            // item.disabled = (data.status === RoleStatus.DELETED_ROLE);
            item.item = new BylPersonAddress();
            Object.assign(item.item,data);
            return item;
        })
    }

    genQueryModel( ):any{
        let result = new BylPersonAddressQuery();
        // if (q.name) result.name = q.name;
        // if (q.modifyDateBegin) result.modifyDateBegin = moment(q.modifyDateBegin).valueOf();
        // if (q.modifyDateEnd) result.modifyDateEnd = moment(q.modifyDateEnd).add(1,'days').valueOf();//第二天的零点
        // if (q.status) result.status = q.status;
        return result;
    }

    updateListData(newData:BylPersonAddress){
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item,newData);
            })
    }
}
