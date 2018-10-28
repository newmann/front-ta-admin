import {Component, Input} from '@angular/core';
import {BylListComponentTicketDetail} from "../../../common/list-component-ticket-detail";
import {BylPersonCertificate} from "../../../../service/person/model/person-certificate.model";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {BylConfigService} from "../../../../service/constant/config.service";
import {Router} from "@angular/router";
import {BylPersonCertificateService} from "../../../../service/person/service/person-certificate.service";
import {BylPersonCertificateCrudComponent} from "../crud/crud.component";
import {BylListFormData} from "../../../../service/model/list-form-data.model";
import {BylListComponentEntityDetail} from "../../../common/list-component-entity-detail";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'byl-person-certificate-list',
  templateUrl: './list.component.html',
})
export class BylPersonCertificateListComponent extends BylListComponentEntityDetail<BylPersonCertificate>  {

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
            // item.disabled = (data.status === BylRoleStatus.SUBMITED_DELETED);
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

    findByMasterId(masterId: string): Observable<BylResultBody<Array<BylPersonCertificate>>> {
        return this.personCertificateService.findByPersonId(masterId);
    }

}
