import {Component, Input, OnInit} from '@angular/core';

import {ActivatedRoute} from "@angular/router";
import {BylConfigService} from "../../../../service/constant/config.service";
import {FormBuilder, Validators} from '@angular/forms';
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";

import {BylLoggerService} from "../../../../service/utils/logger";
import {BylProjectService} from '../../../../service/project/service/project.service';
import {BylCrudComponentBase} from '../../../common/crud-component-base';
import {BylPerson} from '../../../../service/person/model/person.model';
import {BylProject} from '../../../../service/project/model/project.model';
import {BylPoliticalStatusService} from '../../../../service/person/service/political-status.service';
import {BylProvinceService} from '../../../../service/address/service/province.service';
import {BylPersonService} from '../../../../service/person/service/person.service';
import {BylCountryService} from '../../../../service/address/service/country.service';
import {_Validators, ReuseTabService} from '@delon/abc';
import {BylCityService} from '../../../../service/address/service/city.service';
import {BylNationService} from '../../../../service/person/service/nation.service';
import {BylPoliticalStatus} from '../../../../service/person/model/political-status.model';
import {BylNation} from '../../../../service/person/model/nation.model';


@Component({
  selector: 'byl-project-crud',
  templateUrl: './crud.component.html',
})
export class BylProjectCrudComponent extends BylCrudComponentBase<BylProject> {

    @Input()
    set setSourceId(value: string) {
        this.sourceId = value;

    }
    newBusinessData(): BylProject {
        return new BylProject();
    }
    defineForm(): void {
        // 绑定验证模式
        this.form = this.fb.group({
            code: [null, Validators.compose([Validators.required])],
            name: [null, Validators.compose([Validators.required])],
            manager: [null],
            address: [null],
            // detailAddress: [null],
            // contactZipCode: [null],
            planBeginDate: [null],
            planEndDate: [null],
            remarks: [null]
        });


    }

    constructor(public msgService: NzMessageService,
                public projectService: BylProjectService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public modalSubject: NzModalSubject,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService,
                public fb: FormBuilder) {
        super(msgService, configService, modalService, modalSubject, activatedRoute, reuseTabService, fb);

        this.businessService = projectService;

    }

    ngOnInit() {
        super.ngOnInit();
    }

    resetButtonClick($event: MouseEvent) {
        $event.preventDefault();
        this.reset();
    }

    getFormData() {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }

        console.table(this.form.value);



    }
    /**
     * 重置界面内容
     */
    reset() {
        this.form.reset({
            code: this.businessData.code,
            name: this.businessData.name,
            address: this.businessData.address,
            // birthYear: this.businessData.birthYear,
            // birthMonth: this.businessData.birthMonth,
            // birthDay: this.businessData.birthDay,
            planBeginDate: this.businessData.planBeginDate,
            planEndDate: this.businessData.planEndDate,


            remarks: this.businessData.remarks
        }, {onlySelf: true, emitEvent: false});

        super.reset();

        //设置可复用标签的名字：
        if (this.sourceId) {
            //说明是修改
            this.reuseTabService.title = '编辑-' + this.businessData.name;
        }


        // this.form.markAsPristine();
        // // for (const key in this.form.controls) {
        // //     this.form.controls[key].markAsPristine();
        // // }
        // this.logger.log('this.form.dirty' + this.form.dirty);
        // this.logger.log('this.form.invalid' + this.form.invalid);
    }
    //#region get form fields
    get code() {
        return this.form.controls.code;
    }

    get name() {
        return this.form.controls.name;
    }

    get address() {
        return this.form.controls.address;
    }

    // get birthYear() {
    //     return this.form.controls.birthYear;
    // }
    // get birthMonth() {
    //     return this.form.controls.birthMonth;
    // }
    // get birthDay() {
    //     return this.form.controls.birthDay;
    // }
    get planBeginDate() {
        return this.form.controls.planBeginDate;
    }


    get planEndDate() {
        return this.form.controls.planEndDate;
    }

    get remarks() {
        return this.form.controls.remarks;
    }

    //#endregion
}
