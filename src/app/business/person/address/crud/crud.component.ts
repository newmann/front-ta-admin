import {Component, Input, OnInit} from '@angular/core';
import {BylCrudComponentBase} from '../../../common/crud-component-base';
import {BylPersonAddress} from '../../../../service/person/model/person-address.model';
import {NzMessageService, NzModalService, NzModalRef} from 'ng-zorro-antd';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylCountryService} from '../../../../service/address/service/country.service';
import {BylProvinceService} from '../../../../service/address/service/province.service';
import {ActivatedRoute} from '@angular/router';
import {BylCityService} from '../../../../service/address/service/city.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BylPersonAddressService} from '../../../../service/person/service/person-address.service';
import {BylResultBody} from '../../../../service/model/result-body.model';
import {ReuseTabService} from '@delon/abc';

@Component({
    selector: 'byl-person-address-crud',
    templateUrl: './crud.component.html',
})
export class BylPersonAddressCrudComponent extends BylCrudComponentBase<BylPersonAddress> {
    public errMsg = '';

    public typeOptions = [{value: '家庭地址', label: '家庭地址'}, {value: '单位地址', label: '单位地址'}, {
        value: '常用地址',
        label: '常用地址'
    }];

    public addressTreevalue: any[] = [null, null, null];//初始化为空数组

    @Input() sourceId: string;

    @Input() masterId: string;

    newBusinessData(): BylPersonAddress {
        return new BylPersonAddress();
    }

    constructor(public msgService: NzMessageService,
                public personAddressService: BylPersonAddressService,
                public countryService: BylCountryService,
                public provinceService: BylProvinceService,
                public cityService: BylCityService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                // public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService,
                public fb: FormBuilder) {
        super(msgService, configService, /*modalService, modalSubject, */activatedRoute, reuseTabService, fb);

        this.businessService = personAddressService;

    }


    defineForm(): void {
        // 绑定验证模式
        this.form = this.fb.group({
            type: [null, Validators.compose([Validators.required])],
            addressTree: [null, Validators.compose([Validators.required])],
            detailAddress: [null, Validators.compose([Validators.required])],
            zipCode: [null],
            remarks: [null]
        });

    }

    formResetButtonClick($event): void {
        $event.preventDefault();
        this.resetAddressForm();
    }

    /**
     * 重置地址界面内容
     */

    resetAddressForm(): void {
        let country = {value: this.businessData.addr.countryCode, label: this.businessData.addr.countryName};
        this.addressTreevalue[0] = country;

        let province = {value: this.businessData.addr.provinceCode, label: this.businessData.addr.provinceName};
        this.addressTreevalue[1] = province;

        let city = {value: this.businessData.addr.cityCode, label: this.businessData.addr.cityName};
        this.addressTreevalue[2] = city;

        this.form.reset({
            type: this.businessData.type,
            addressTree: this.addressTreevalue,
            // addressTree: [{value: this.businessData.addr.countryCode, label: this.businessData.addr.countryName},
            //     {value: this.businessData.addr.provinceCode, label: this.businessData.addr.provinceName},
            //     {value: this.businessData.addr.cityCode, label: this.businessData.addr.cityName}],
            detailAddress: this.businessData.addr.detailAddress,
            zipCode: this.businessData.addr.zipCode,
            remarks: this.businessData.remarks
        }, {onlySelf: true, emitEvent: false});

    }

    selectAddressTree(e: { option: any, index: number }) {
        console.log('selectAddressTree', e);
        //保存option的value和label

        let item = {label: e.option.label, value: e.option.value};

        this.addressTreevalue[e.index] = item;
        console.log('selectAddressTree', this.addressTreevalue);
    }


    loadAddressTree(e: { option: any, index: number, resolve: Function, reject: Function }): void {
        console.log(e);

        const option = e.option;
        if (e.index === -1) {

            this.countryService.findByAll().subscribe(
                data => {
                    // option.loading = false;
                    if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                        // this.logger.log("countryService findall:",data.data);
                        let countrys = data.data.map(item => {
                            return {value: item.code, label: item.name};
                        });
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
            );

        }

        if (e.index === 0) {
            option.loading = true;


            this.provinceService.findByCountryId(option.value).subscribe(
                data => {
                    option.loading = false;
                    if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                        // console.log('provinceService findByCountryId:', data.data);
                        let provinces = data.data.map(item => {
                            return {value: item.code, label: item.name};
                        });
                        // console.log('provinces:', provinces);
                        e.resolve(provinces);
                    } else {
                        this.errMsg = data.msg;
                    }
                },
                err => {
                    option.loading = false;
                    this.errMsg = err.toString();
                }
            );
        }
        if (e.index === 1) {
            option.loading = true;

            this.cityService.findByProvinceId(option.value).subscribe(
                data => {
                    option.loading = false;
                    if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                        // console.log('cityService findByProvinceId:', data.data);
                        let citys = data.data.map(item => {
                            return {value: item.code, label: item.name, isLeaf: true};
                        });
                        // console.log('citys:', citys);
                        e.resolve(citys);
                    } else {
                        this.errMsg = data.msg;
                    }
                },
                err => {
                    option.loading = false;
                    this.errMsg = err.toString();
                }
            );
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

        this.businessData.type = this.type.value;

        this.businessData.addr.countryId = this.addressTreevalue[0].value;
        this.businessData.addr.countryCode = this.addressTreevalue[0].value;
        this.businessData.addr.countryName = this.addressTreevalue[0].label;

        this.businessData.addr.provinceId = this.addressTreevalue[1].value;
        this.businessData.addr.provinceCode = this.addressTreevalue[1].value;
        this.businessData.addr.provinceName = this.addressTreevalue[1].label;

        this.businessData.addr.cityId = this.addressTreevalue[2].value;
        this.businessData.addr.cityCode = this.addressTreevalue[2].value;
        this.businessData.addr.cityName = this.addressTreevalue[2].label;

        if (this.detailAddress.value) {
            this.businessData.addr.detailAddress = this.detailAddress.value;
        }

        if (this.zipCode.value) this.businessData.addr.zipCode = this.zipCode.value;

        this.businessData.masterId = this.masterId;

        if (this.remarks.value) {
            this.businessData.remarks = this.remarks.value.toString();
        }

        console.table(this.businessData);


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
