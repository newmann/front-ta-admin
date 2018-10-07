import {Component, Input, ViewChild} from '@angular/core';
import {BylConfigService} from "../../../../service/constant/config.service";
import {ReuseTabService} from "@delon/abc";
import {NzMessageService, NzModalRef, NzModalService} from "ng-zorro-antd";
import {ActivatedRoute} from "@angular/router";
import {SFComponent} from "@delon/form";
import {BylPersonCrudComponent} from "../crud/crud.component";


@Component({
    selector: 'byl-person-bind-crud',
    templateUrl: './crud.component.html',
})
export class BylPersonBindCrudComponent {
    @ViewChild('person') personComponent: BylPersonCrudComponent;



    constructor(
                // public modalService: NzModalService,
                public modalRef: NzModalRef
    ) {

    }

    cancel(){

    }

    bindPersion(){
        this.modalRef.destroy(this.personComponent.businessData);
    }
}
