import {Component, Input, OnInit} from '@angular/core';
import {BylLoggerService} from '../../../../service/utils/logger';

import {NzMessageService, NzModalService, NzModalSubject} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {BylPersonService} from '../../../../service/person/service/person.service';
import {BylPerson} from '../../../../service/person/model/person.model';

import {BylCrudComponentBase} from '../../../common/crud-component-base';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylNation} from '../../../../service/person/model/nation.model';
import {BylPoliticalStatus} from '../../../../service/person/model/political-status.model';
import {BylNationService} from '../../../../service/person/service/nation.service';
import {BylPoliticalStatusService} from '../../../../service/person/service/political-status.service';
import {BylResultBody} from '../../../../service/model/result-body.model';
import {_Validators, ReuseTabService} from '@delon/abc';
import {BylValidators} from '../../../../service/utils/validators';
import {BylCountryService} from '../../../../service/address/service/country.service';
import {BylProvinceService} from '../../../../service/address/service/province.service';
import {BylCityService} from '../../../../service/address/service/city.service';
import {BylPersonAddress} from '../../../../service/person/model/person-address.model';
import {BylSimpleEntityLoggerService} from "../../../../service/simple-entity-logger/service/simple-entity-logger.service";


@Component({
    selector: 'byl-person-crud',
    templateUrl: './crud.component.html',
})
export class BylPersonCrudComponent extends BylCrudComponentBase<BylPerson> {
    // private _person = new BylPerson();
    // public errMsg = '';
    // public searchedPersons: Array<BylPerson> = [];

    public searchedNations: Array<BylNation> = [];
    public selectedNation: BylNation;

    public searchedPoliticalStatus: Array<BylPoliticalStatus> = [];
    public selectedPoliticalStatus: BylPoliticalStatus;

    // public form: FormGroup;

    // private sourceId: string;
    @Input()
    set setSourceId(value: string) {
        this.sourceId = value;

    }

    // private _savingReveal: any;

    // public processType = '';
    // private _loading = false;

    // private _searchData$: Subject<string> = new Subject<string>();


    newBusinessData(): BylPerson {
        return new BylPerson();
    }

    defineForm(): void {
        // 绑定验证模式
        this.form = this.fb.group({
            idCard: [null, Validators.compose([Validators.required, _Validators.idCard])],
            name: [null, Validators.compose([Validators.required])],
            gender: [null],
            // birthYear: [null,Validators.compose([Validators.maxLength(4)])],
            // birthMonth: [null,Validators.compose([Validators.maxLength(2)])],
            // birthDay: [null,Validators.compose([Validators.maxLength(2)])],
            nation: [null],
            politicalStatus: [null],
            nativePlace: [null],
            remarks: [null]
        });


    }

    constructor(public msgService: NzMessageService,
                public personService: BylPersonService,
                public nationService: BylNationService,
                public countryService: BylCountryService,
                public provinceSerivce: BylProvinceService,
                public cityService: BylCityService,
                public politicalStatusService: BylPoliticalStatusService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public modalSubject: NzModalSubject,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService,
                public fb: FormBuilder) {
        super(msgService, configService, modalService, modalSubject, activatedRoute, reuseTabService, fb);

        this.businessService = personService;

    }

    ngOnInit(): void {
        super.ngOnInit();
        //获取民族数据
        this.nationService.findByAll().subscribe(
            data => {
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                    this.searchedNations = data.data;
                } else {
                    this.errMsg = data.msg;
                }
            },
            err => {
                this.errMsg = err.toString();
            }
        );
        //获取政治面貌数据
        this.politicalStatusService.findByAll().subscribe(
            data => {
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                    this.searchedPoliticalStatus = data.data;
                } else {
                    this.errMsg = data.msg;
                }
            },
            err => {
                this.errMsg = err.toString();
            }
        );

        // //在从list窗口调入的情况下，载入数据
        // console.info('sourceId', this.sourceId);
        // if (this.sourceId) {
        //     this.loadData(this.sourceId);
        // } else {
        //     //界面显示
        //     this.reset();
        // }

    }

//
    // searchPerson($event) {
    //     this.logger.log('$event', $event);
    //     if ($event) this._searchData$.next($event);
    // }

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

        // console.log(this.idCard.value.toString());
        // console.log(this.businessData);

        // this.businessData.idCard = this.idCard.value.toString();
        // this.businessData.name = this.name.value.toString();
        // if (this.gender.value) {
        //     this.businessData.gender = this.gender.value;
        // }
        // if (this.birthYear.value) {
        //     this.businessData.birthYear = this.birthYear.value;
        // }
        //
        // if (this.birthMonth.value) {
        //     this.businessData.birthMonth = this.birthMonth.value;
        //
        // }
        // if (this.birthDay.value) {
        //     this.businessData.birthDay = this.birthDay.value;
        // }
        if (this.nation.value) {
            this.businessData.nationCode = this.nation.value;
            this.businessData.nationName = this.getNationNameByCode(this.businessData.nationCode);
        }

        if (this.politicalStatus.value) {
            this.businessData.politicalStatusCode = this.politicalStatus.value;
            this.businessData.politicalStatusName = this.getPoliticalStatusNameByCode(this.businessData.politicalStatusCode);
            console.log(this.businessData.politicalStatusName);
        }
        // if (this.nativePlace.value) {
        //     this.businessData.nativePlace = this.nativePlace.value.toString();
        // }
        //
        // if (this.remarks.value) {
        //     this.businessData.remarks = this.remarks.value.toString();
        // }

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

    getNationNameByCode(code: string): string {
        let name: string = null;
        this.searchedNations.every(item => {
            if (item.code === code) {
                name = item.name;
                return false;
            }
        });

        return name;
    }

    getPoliticalStatusNameByCode(code: string): string {
        let name: string = null;
        this.searchedPoliticalStatus.every(item => {
            if (item.code === code) {
                name = item.name;
                return false;
            }
        });

        return name;
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
