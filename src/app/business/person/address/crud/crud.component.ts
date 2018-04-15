import {Component, Input, OnInit} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {BylCrudComponentBase} from "../../../common/crud-component-base";
import {BylPerson} from "../../../../service/person/model/person.model";
import {BylPersonAddress} from "../../../../service/person/model/person-address.model";
import {BylLoggerService} from "../../../../service/utils/logger";
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {BylConfigService} from "../../../../service/constant/config.service";
import {BylCountryService} from "../../../../service/address/service/country.service";
import {BylPersonService} from "../../../../service/person/service/person.service";
import {BylProvinceService} from "../../../../service/address/service/province.service";
import {BylPoliticalStatusService} from "../../../../service/person/service/political-status.service";
import {ActivatedRoute} from "@angular/router";
import {BylNationService} from "../../../../service/person/service/nation.service";
import {BylCityService} from "../../../../service/address/service/city.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BylPersonAddressService} from "../../../../service/person/service/person-address.service";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {ReuseTabService} from "@delon/abc";

@Component({
  selector: 'byl-person-address-crud',
  templateUrl: './crud.component.html',
})
export class BylPersonAddressCrudComponent extends BylCrudComponentBase<BylPersonAddress> {
    public errMsg = "";

    public typeOptions = [{value:"家庭地址",label:"家庭地址"},{value:"单位地址",label:"单位地址"},{value:"常用地址",label:"常用地址"}]
    @Input() sourceId: string;

    newBusinessData(): BylPersonAddress {
        return new BylPersonAddress();
    }

    constructor(public msgService: NzMessageService,
                public personAddressService: BylPersonAddressService,
                public countryService: BylCountryService,
                public provinceService: BylProvinceService,
                public cityService: BylCityService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public modalSubject: NzModalSubject,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService,
                public fb: FormBuilder) {
        super(msgService, configService, modalService, modalSubject, activatedRoute, reuseTabService, fb);

        this.businessService = personAddressService;

    }


    defineForm(): void {
        // 绑定验证模式
        this.form = this.fb.group({
            type: [null,Validators.compose([Validators.required])],
            addressTree: [null, Validators.compose([Validators.required])],
            detailAddress:[null, Validators.compose([Validators.required])],
            zipCode: [null],
            remarks: [null]
        });

    }

    formResetButtonClick($event): void{
        $event.preventDefault();
        this.resetAddressForm();
    }
    /**
     * 重置地址界面内容
     */

    resetAddressForm():void {
        this.form.reset({
            type: this.businessData.type,
            addressTree: [{value:this.businessData.addr.countryCode,label:this.businessData.addr.countryName},
                {value:this.businessData.addr.provinceCode,label:this.businessData.addr.provinceName},
                {value:this.businessData.addr.cityCode,label:this.businessData.addr.cityName}],
            detailAddress: this.businessData.addr.detailAddress,
            zipCode: this.businessData.addr.zipCode,

            remarks: this.businessData.remarks
        }, {onlySelf: true, emitEvent: false});

    }

    loadAddressTree(e: {option: any, index: number, resolve: Function, reject: Function}): void {
        console.log(e);

        const option = e.option;
        if (e.index === -1) {

            this.countryService.findByAll().subscribe(
                data => {
                    // option.loading = false;
                    if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                        // this.logger.log("countryService findall:",data.data);
                        let countrys = data.data.map(item =>{return {value: item.code,label:item.name}});
                        // this.logger.log("countrys:",countrys);
                        e.resolve(countrys);
                    } else {
                        this.errMsg = data.msg;
                    }
                },
                err => {
                    // option.loading = false;
                    this.errMsg = err.toString();
                }
            )

        }

        if (e.index === 0) {
            option.loading = true;
            this.provinceService.findByCountryId(option.value).subscribe(
                data => {
                    option.loading = false;
                    if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                        console.log("provinceService findByCountryId:",data.data);
                        let provinces = data.data.map(item =>{return {value: item.code,label:item.name}});
                        console.log("provinces:",provinces);
                        e.resolve(provinces);
                    } else {
                        this.errMsg = data.msg;
                    }
                },
                err => {
                    option.loading = false;
                    this.errMsg = err.toString();
                }

            )
        }
        if (e.index === 1) {
            option.loading = true;

            this.cityService.findByProvinceId(option.value).subscribe(
                data => {
                    option.loading = false;
                    if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                        console.log("cityService findByProvinceId:",data.data);
                        let citys = data.data.map(item =>{return {value: item.code,label:item.name,isLeaf: true}});
                        console.log("citys:",citys);
                        e.resolve(citys);
                    } else {
                        this.errMsg = data.msg;
                    }
                },
                err => {
                    option.loading = false;
                    this.errMsg = err.toString();
                }

            )
            // setTimeout(() => {
            //     option.loading = false;
            //     e.resolve(scenicspots[option.value]);
            // }, 1000);
        }
    }
    getFormData() {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }

        console.log('log', this.form.value);
        Object.assign(this.businessData,this.form.value);

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
        // if (this.nation.value) {
        //     this.businessData.anationCode = this.nation.value.toString();
        //     this.businessData.nationName = this.getNationNameByCode(this.businessData.nationCode);
        // }
        // if (this.politicalStatus.value) {
        //     this.businessData.politicalStatusCode = this.politicalStatus.value;
        //     this.businessData.politicalStatusName = this.getPoliticalStatusNameByCode(this.businessData.politicalStatusCode);
        // }
        // if (this.nativePlace.value) {
        //     this.businessData.nativePlace = this.nativePlace.value.toString();
        // }
        //
        // if (this.remarks.value) {
        //     this.businessData.remarks = this.remarks.value.toString();
        // }

    }
    submitAddressForm(){

    }

    addressFormSelect($event): void{

    }


    //#region 获取界面控件对象
    get type() {
        return this.form.controls.type;
    }

    get addressTree() {
        return this.form.controls.addressTree;
    }

    get detailAddress() {
        return this.form.controls.detailAddress;
    }

    get zipCode() {
        return this.form.controls.zipCode;
    }

    get remarks() {
        return this.form.controls.remarks;
    }

    //#endregion


}
