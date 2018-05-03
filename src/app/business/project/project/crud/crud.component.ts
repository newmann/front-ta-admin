import {Component, Input, OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {BylConfigService} from '../../../../service/constant/config.service';
import {FormBuilder, Validators} from '@angular/forms';
import {NzMessageService, NzModalService, NzModalSubject} from 'ng-zorro-antd';

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
import {BylResultBody} from '../../../../service/model/result-body.model';
import * as moment from 'moment';
import {BylProjectManagerPool} from "../../../../service/project/model/project-manager-pool.model";
import {BylCrudEvent} from "../../../common/waiting/crud-waiting.component";
import {BylAccountListComponent} from "../../../account/account/list/list.component";
import {BylProjectManagerPoolListComponent} from "../../project-manager-pool/list/list.component";
import {BylSimpleEntityLoggerService} from "../../../../service/simple-entity-logger/service/simple-entity-logger.service";


@Component({
    selector: 'byl-project-crud',
    templateUrl: './crud.component.html',
})
export class BylProjectCrudComponent extends BylCrudComponentBase<BylProject> {
    public managerPoolReveal: any; // 项目经理筛选窗口

    public addressTreevalue: any[] = [null, null, null]; // 初始化为空数组

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
            managerId: [null],
            managerCode: [null, Validators.compose([Validators.required])],
            managerName: [null, Validators.compose([Validators.required])],
            addressTree: [null, Validators.compose([Validators.required])],
            detailAddress: [null, Validators.compose([Validators.required])],
            zipCode: [null],
            // detailAddress: [null],
            // contactZipCode: [null],
            planBeginDate: [null],
            planEndDate: [null],
            remarks: [null]
        });


    }

    constructor(public msgService: NzMessageService,
                public projectService: BylProjectService,
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


        this.businessService = projectService;

    }
    //
    // ngOnInit() {
    //     super.ngOnInit();
    // }

    resetButtonClick($event: MouseEvent) {
        $event.preventDefault();
        this.reset();
    }

    searchManager($event: MouseEvent) {
        $event.preventDefault();
        console.log("search manager");
        /**
         * 从账户池中查找待加入的项目经理
         */

        this.managerPoolReveal = this.modalService.open({
            title: '查找项目经理',
            zIndex: 9999, //最外层
            width: '90%',
            content: BylProjectManagerPoolListComponent,
            // onOk() {
            //
            // },
            // onCancel() {
            //     console.log('Click cancel');
            // },
            footer: false,
            componentParams: {
                functionMode: 'select'
            },
            maskClosable: false
        });
        this.managerPoolReveal.next(BylCrudEvent[BylCrudEvent.bylSaving]);

        this.managerPoolReveal.subscribe(result => {
            console.info(result);

            console.info(typeof result);

            //返回的是选中的项目经理
            let selectedItem: BylProjectManagerPool;
            if ((typeof result) === 'object') {
                console.log('添加新增的项目经理数据');
                selectedItem = result;
            }

            //设置选中的项目经理
            if (selectedItem) {
                this.managerId.patchValue(selectedItem.poolId);
                this.managerCode.patchValue(selectedItem.poolCode);
                this.managerName.patchValue(selectedItem.poolName);
            }

        });

    }

    getFormData() {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }

        console.table(this.form.value);
        this.businessData.code = this.code.value;
        this.businessData.name = this.name.value;
        this.businessData.managerId = this.managerId.value;
        this.businessData.managerCode = this.managerCode.value;
        this.businessData.managerName = this.managerName.value;

        this.businessData.address.countryId = this.addressTreevalue[0].value;
        this.businessData.address.countryCode = this.addressTreevalue[0].value;
        this.businessData.address.countryName = this.addressTreevalue[0].label;

        this.businessData.address.provinceId = this.addressTreevalue[1].value;
        this.businessData.address.provinceCode = this.addressTreevalue[1].value;
        this.businessData.address.provinceName = this.addressTreevalue[1].label;

        this.businessData.address.cityId = this.addressTreevalue[2].value;
        this.businessData.address.cityCode = this.addressTreevalue[2].value;
        this.businessData.address.cityName = this.addressTreevalue[2].label;

        this.businessData.address.detailAddress = this.detailAddress.value;

        if (this.zipCode.value) this.businessData.address.zipCode = this.zipCode.value;

        if (this.planBeginDate.value) {
            this.businessData.planBeginDate = moment(this.planBeginDate.value).valueOf();
        }
        if (this.planEndDate.value) {
            this.businessData.planEndDate = moment(this.planEndDate.value).valueOf();
        }


        if (this.remarks.value) {
            this.businessData.remarks = this.remarks.value.toString();
        }
        console.table(this.businessData);

    }

    /**
     * 重置界面内容
     */
    reset() {
        let country = {value: this.businessData.address.countryCode, label: this.businessData.address.countryName};
        this.addressTreevalue[0] = country;

        let province = {value: this.businessData.address.provinceCode, label: this.businessData.address.provinceName};
        this.addressTreevalue[1] = province;

        let city = {value: this.businessData.address.cityCode, label: this.businessData.address.cityName};
        this.addressTreevalue[2] = city;

        this.form.reset({
            code: this.businessData.code,
            name: this.businessData.name,
            managerId: this.businessData.managerId,
            managerCode: this.businessData.managerCode,
            managerName: this.businessData.managerName,
            addressTree: this.addressTreevalue,
            detailAddress: this.businessData.address.detailAddress,
            zipCode: this.businessData.address.zipCode,
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

    selectAddressTree(e: { option: any, index: number }) {
        //保存option的value和label

        let item = {label: e.option.label, value: e.option.value};
        this.addressTreevalue[e.index] = item;
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

    //#region get form fields
    get code() {
        return this.form.controls.code;
    }

    get name() {
        return this.form.controls.name;
    }
    get managerId() {
        return this.form.controls.managerId;
    }
    get managerCode() {
        return this.form.controls.managerCode;
    }
    get managerName() {
        return this.form.controls.managerName;
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
