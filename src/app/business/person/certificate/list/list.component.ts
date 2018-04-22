import {Component, Input, OnInit} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {BylItemListComponentBase} from "../../../common/item-list-component-base";
import {BylPersonAddress} from "../../../../service/person/model/person-address.model";
import {BylPersonCertificate} from "../../../../service/person/model/person-certificate.model";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {BylPersonCrudComponent} from "../../person/crud/crud.component";
import {BylConfigService} from "../../../../service/constant/config.service";
import {Router} from "@angular/router";
import {BylPersonAddressService} from "../../../../service/person/service/person-address.service";
import {BylPersonCertificateService} from "../../../../service/person/service/person-certificate.service";
import {BylPersonCertificateCrudComponent} from "../crud/crud.component";
import {BylListFormData} from "../../../../service/model/list-form-data.model";
import {BylPersonAddressQuery} from "../../../../service/person/query/person-address-query.model";
import {BylPersonCertificateQuery} from "../../../../service/person/query/person-certificate-query.model";

@Component({
  selector: 'byl-person-certificate-list',
  templateUrl: './list.component.html',
})
export class BylPersonCertificateListComponent extends BylItemListComponentBase<BylPersonCertificate>  {

    @Input()
    set setMasterId(value: string){
        this.masterId = value;
    }

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public personCertificateService: BylPersonCertificateService) {
        super(message,configService,modalService,router);

        this.businessService = personCertificateService;

        this.businessCrudComponent = BylPersonCertificateCrudComponent;
    }
    ngOnInit() {
    }

    genListData(data: BylPersonCertificate): BylListFormData<BylPersonCertificate>{
            let item = new BylListFormData<BylPersonCertificate>();
            item.checked = false;
            // item.disabled = (data.status === RoleStatus.DELETED_ROLE);
            item.item = new BylPersonCertificate();
            Object.assign(item.item,data);
            return item;
    }


    updateListData(newData:BylPersonCertificate){
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item,newData);
            })
    }

    /**
     * 删除明细
     * @param {string} id
     */
    delete(id:string){

    }
}
