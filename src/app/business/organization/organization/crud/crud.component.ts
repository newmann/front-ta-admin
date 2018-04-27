import {Component, Input, OnInit} from '@angular/core';
import {BylPoliticalStatus} from "../../../../service/person/model/political-status.model";
import {BylCityService} from "../../../../service/address/service/city.service";
import {BylNationService} from "../../../../service/person/service/nation.service";
import {FormBuilder, Validators} from "@angular/forms";
import {BylCrudComponentBase} from "../../../common/crud-component-base";
import {BylCountryService} from "../../../../service/address/service/country.service";
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {BylConfigService} from "../../../../service/constant/config.service";
import {BylNation} from "../../../../service/person/model/nation.model";
import {BylProvinceService} from "../../../../service/address/service/province.service";
import {_Validators, ReuseTabService} from "@delon/abc";
import {ActivatedRoute} from "@angular/router";
import {BylOrganization} from "../../../../service/organization/model/organization.model";
import {BylOrganizationService} from "../../../../service/organization/service/organization.service";

@Component({
  selector: 'byl-organization-crud',
  templateUrl: './crud.component.html',
})
export class BylOrganizationCrudComponent extends BylCrudComponentBase<BylOrganization> {
    // private _person = new BylOrganization();
    // public errMsg = '';
    // public searchedPersons: Array<BylOrganization> = [];

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


    newBusinessData(): BylOrganization {
        return new BylOrganization();
    }

    defineForm(): void {
        // 绑定验证模式
        this.form = this.fb.group({
            code: [null, Validators.compose([Validators.required])],
            name: [null, Validators.compose([Validators.required])],
            simpleName: [null],
            legalPerson: this.fb.group({
                legalPersonId: [null],
                legalPersonIdCard: [null],
                legalPersonName: [null]
            }),
            type: [null, Validators.compose([Validators.required])],
            remarks: [null]
        });


    }

    constructor(public msgService: NzMessageService,
                public organizationService: BylOrganizationService,
                public nationService: BylNationService,
                public countryService: BylCountryService,
                public provinceSerivce: BylProvinceService,
                public cityService: BylCityService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public modalSubject: NzModalSubject,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService,
                public fb: FormBuilder) {
        super(msgService, configService, modalService, modalSubject, activatedRoute, reuseTabService, fb);

        this.businessService = organizationService;

    }

    ngOnInit(): void {
        super.ngOnInit();

        //在从list窗口调入的情况下，载入数据
        console.info('sourceId', this.sourceId);
        if (this.sourceId) {
            this.loadData(this.sourceId);
        } else {
            //界面显示
            this.reset();
        }

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


    }

    /**
     * 重置界面内容
     */
    reset() {
        this.form.reset(this.businessData, {onlySelf: true, emitEvent: false});

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

    // getNationNameByCode(code: string): string {
    //     let name: string = null;
    //     this.searchedNations.every(item => {
    //         if (item.code === code) {
    //             name = item.name;
    //             return false;
    //         }
    //     });
    //
    //     return name;
    // }

    // getPoliticalStatusNameByCode(code: string): string {
    //     let name: string = null;
    //     this.searchedPoliticalStatus.every(item => {
    //         if (item.code === code) {
    //             name = item.name;
    //             return false;
    //         }
    //     });
    //
    //     return name;
    // }

    //#region get form fields
    get code() {
        return this.form.controls.code;
    }

    get name() {
        return this.form.controls.name;
    }

    get simpleName() {
        return this.form.controls.simpleName;
    }

    get legalPersonId(){
        return this.form.controls.legalPersonId;
    }
    get legalPersonIdCard(){
        return this.form.controls.legalPersonIdCard;
    }
    get legalPersonName(){
        return this.form.controls.legalPersonName;
    }

    get type() {
        return this.form.controls.type;
    }


    get remarks() {
        return this.form.controls.remarks;
    }

    //#endregion

}
