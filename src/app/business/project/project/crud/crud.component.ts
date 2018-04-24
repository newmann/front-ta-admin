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
            contactor: [null],
            contactAddress: [null],
            contactDetailAddress: [null],
            contactZipCode: [null],
            contactPhone: [null],
            contactEmail: [null],
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
        Object.assign(this.businessData, this.form.value);

        if (this.nation.value) {
            this.businessData.nationCode = this.nation.value;
            this.businessData.nationName = this.getNationNameByCode(this.businessData.nationCode);
        }

        if (this.politicalStatus.value) {
            this.businessData.politicalStatusCode = this.politicalStatus.value;
            this.businessData.politicalStatusName = this.getPoliticalStatusNameByCode(this.businessData.politicalStatusCode);
            console.log(this.businessData.politicalStatusName);
        }


    }
    /**
     * 重置界面内容
     */
    reset() {
        this.form.reset({
            idCard: this.businessData.idCard,
            name: this.businessData.name,
            gender: this.businessData.gender,
            // birthYear: this.businessData.birthYear,
            // birthMonth: this.businessData.birthMonth,
            // birthDay: this.businessData.birthDay,
            nation: this.businessData.nationCode,
            politicalStatus: this.businessData.politicalStatusCode,
            nativePlace: this.businessData.nativePlace,

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
    get idCard() {
        return this.form.controls.idCard;
    }

    get name() {
        return this.form.controls.name;
    }

    get gender() {
        return this.form.controls.gender;
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
    get nation() {
        return this.form.controls.nation;
    }

    get politicalStatus() {
        return this.form.controls.politicalStatus;
    }

    get nativePlace() {
        return this.form.controls.nativePlace;
    }

    get remarks() {
        return this.form.controls.remarks;
    }

    //#endregion
}
