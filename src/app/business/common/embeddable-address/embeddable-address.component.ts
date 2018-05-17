/**
 * @Description:
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-04-24 19:29
 **/
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    forwardRef,
    Input,
    OnInit,
    ViewChild,
    ViewChildren, ViewEncapsulation
} from '@angular/core';

import {BylEmbeddableAddress} from '../../../service/model/embeddable-address.model';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {BylCityService} from '../../../service/address/service/city.service';
import {BylProvinceService} from '../../../service/address/service/province.service';
import {BylCountryService} from '../../../service/address/service/country.service';
import {BylResultBody} from '../../../service/model/result-body.model';

// export const BYL_EMBEDDABLE_ADDRESS_COMPONENT: any = {
//     provide: NG_VALUE_ACCESSOR,
//     useExisting: forwardRef(() => BylEmbeddableAddressComponent),
//     multi: true
// };

@Component({
    selector: 'byl-embeddable-address',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './embeddable-address.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => BylEmbeddableAddressComponent),
        multi: true
    }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BylEmbeddableAddressComponent implements ControlValueAccessor, OnInit {
    addressFormGroup: FormGroup;

    public addressTreevalue: any[] = [null, null, null]; // 初始化为空数组

    _address: BylEmbeddableAddress = new BylEmbeddableAddress();

    //组件中获取DOM
    // @ViewChild('addressTree')
    // addressTreeRef: ElementRef;

    get address(): BylEmbeddableAddress {
        console.log('get address');
        return this._address;
    }

    @Input()
    set address(value: BylEmbeddableAddress) {
        console.log('set address');
        if (value) {
            this._address = value;
        } else {
            //从外面传进null值的时候，使用新的对象
            this._address = new BylEmbeddableAddress();
        }

        this.patchControlValue();
        // if (this.addressTreeRef.nativeElement) {
        //     this.addressTreeRef.nativeElement.value = this.addressTree; //设置地址树的初始值
        // }
        this.onChange(this._address);
    }

    get addressTree(): Array<{value: string, label: string}> {
        console.log('get addressTree');
        if (this._address) {
            return [{value: this._address.countryCode, label: this._address.countryName},
                {value: this._address.provinceCode, label: this._address.provinceName},
                {value: this._address.cityCode, label: this._address.cityName}];

        }

    }


    set country(value: any) {
        console.log('set country');
        if (value) {
            this._address.countryId = value.id;
            this._address.countryCode = value.code;
            this._address.countryName = value.name;
            this.onChange(this._address);
        }
    }

    set province(value: any) {
        console.log('set province');
        if (value) {
            this._address.provinceId = value.id;
            this._address.provinceCode = value.code;
            this._address.provinceName = value.name;
            this.onChange(this._address);
        }
    }

    set city(value: any) {
        console.log('set city');
        if (value) {
            this._address.cityId = value.id;
            this._address.cityCode = value.code;
            this._address.cityName = value.name;
            this.onChange(this._address);
        }
    }


    get detailAddress(): string {
        console.log('get detailAddress');

        if (this._address) return this._address.detailAddress;
    }
    //
    // set detailAddress(value: string) {
    //     console.log('set detailAddress');
    //     if ((this._address.detailAddress === value) || ((this._address.detailAddress == null) && (value == null))) {
    //         return;
    //     }
    //     this._address.detailAddress = value;
    //     this.onChange(this._address);
    //
    // }
    //
    get zipCode(): string {
        console.log('get zipCode');
        if (this._address) return this._address.zipCode;
    }
    //
    // set zipCode(value: string) {
    //     console.log('set zipCode');
    //     if ((this._address.zipCode === value) || ((this._address.zipCode == null) && (value == null))) {
    //         return;
    //     }
    //
    //     this._address.zipCode = value;
    //     this.onChange(this._address);
    // }


    public errMsg: string;

    constructor(
        public countryService: BylCountryService,
        public provinceService: BylProvinceService,
        public cityService: BylCityService,
        private fb: FormBuilder
    ) {

    }

    ngOnInit() {
        this.addressFormGroup = this.fb.group({
            addressTree: [this.addressTree, Validators.compose([Validators.required])],
            detailAddress: [this.detailAddress, Validators.compose([Validators.required])],
            zipCode: [this.zipCode]
        });

    }

    // detailAddressChange(value: string) {
    //     console.log("detail address change:" + value);
    //     this.detailAddress = value;
    // }
    //
    // zipCodeChange(value: string) {
    //     console.log("zip code change:" + value);
    //     this.zipCode = value;
    //
    // }

    writeValue(value: any) {
        console.log('writeValue');
        if (value !== undefined) {
            this.address = value;
        }
    }

    selectAddressTree(e: { option: any, index: number }) {

        let item = {id: e.option.value, code: e.option.value, name: e.option.label};

        if (e.index === 0) {
            this.country = item;
        }
        if (e.index === 1) {
            this.province = item;
        }
        if (e.index === 2) {
            this.city = item;
        }

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

    patchControlValue() {
        // this.addressTreeControl.patchValue(this.addressTree, {emitEvent: false});
        // this.detailAddressControl.patchValue(this.detailAddress, {emitEvent: false});
        // this.zipCodeControl.patchValue(this.zipCode, {emitEvent: false});
        this.addressTreeControl.patchValue(this.addressTree, );
        this.detailAddressControl.patchValue(this.detailAddress, );
        this.zipCodeControl.patchValue(this.zipCode, );

    }

    //#region 获取界面控件对象
    get addressTreeControl() {
        return this.addressFormGroup.controls.addressTree;
    }

    get detailAddressControl() {
        return this.addressFormGroup.controls.detailAddress;
    }

    get zipCodeControl() {
        return this.addressFormGroup.controls.zipCode;
    }

    //#endregion

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    onChange: (value: any) => void = () => null;
    onTouched: () => void = () => null;


}
