import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {BylConfigService} from '../../../../service/constant/config.service';
import {FormBuilder, Validators} from '@angular/forms';
import {NzMessageService, NzModalService, NzModalRef} from 'ng-zorro-antd';

import {BylProjectService} from '../../../../service/project/service/project.service';
import {BylCrudComponentBase} from '../../../common/crud-component-base';
import {BylProject} from '../../../../service/project/model/project.model';
import {BylProvinceService} from '../../../../service/address/service/province.service';
import {BylCountryService} from '../../../../service/address/service/country.service';
import {ReuseTabService} from '@delon/abc';
import {BylCityService} from '../../../../service/address/service/city.service';
import {BylResultBody} from '../../../../service/model/result-body.model';
import * as moment from 'moment';
import {BylFetchProjectManagerWidgetComponent} from '../../fetch-project-manager-form-item/fetch-project-manager.formitem';
import {BylCrudComponentBasePro} from "../../../common/crud-component-base-pro";
import {map} from "rxjs/operators";
import {BylCheckTypeEnumManager} from "../../../../service/project/model/check-type.enum";
import {isEmpty} from "../../../../service/utils/string.utils";
import {BylProjectManagerPoolService} from "../../../../service/project/service/project-manager-pool.service";
import {SFComponent, SFSchemaEnumType} from "@delon/form";
import {BylProjectManagerPool} from "../../../../service/project/model/project-manager-pool.model";
import {BylEntityReference} from "../../../../service/model/entity-reference.model";


@Component({
    selector: 'byl-project-crud',
    templateUrl: './crud.component.html',
})
export class BylProjectCrudComponent extends BylCrudComponentBasePro<BylProject> {
    // public managerPoolReveal: any; // 项目经理筛选窗口

    public addressTreevalue: any[] = [null, null, null]; // 初始化为空数组

    // @ViewChild(BylFetchProjectManagerWidgetComponent)
    // private projectManagerWidget: BylFetchProjectManagerWidgetComponent;

    @Input()
    set setSourceId(value: string) {
        this.sourceId = value;
    }

    newBusinessData(): BylProject {
        return new BylProject();
    }

    defineForm(): void {
        this.formSchema = {
            properties: {
                "code": {
                    "type": 'string',
                    "title": '代码',
                    "ui": {
                        placeholder: '请输入项目代码',
                        validator: (value: string) => {
                            if (isEmpty(value)) {
                                console.log('check code:', value);
                                return [];
                            }

                            return this.projectService.checkCodeAvailable({data: value,id: this.sourceId}).pipe(
                                map((res) => {
                                        if (res.code === BylResultBody.RESULT_CODE_SUCCESS) {
                                            if (res.data) {
                                                return [];
                                            } else {
                                                return ([{keyword: 'required', message: '项目代码'+ value + '已存在'}]);
                                            }

                                        } else {
                                            return ([{keyword: 'required', message: res.msg}]);
                                        }
                                    }
                                ));
                        }
                    }
                },
                "name": {
                    "type": 'string',
                    "title": '名称',
                    "ui": {
                        placeholder: '请输入项目名称',
                        "validator": (value: string) =>{
                            if (isEmpty(value)) {
                                console.log('check name:', value);
                                return [];
                            }

                            return this.projectService.checkNameAvailable({data: value,id: this.sourceId}).pipe(
                                map((res) => {
                                        if (res.code === BylResultBody.RESULT_CODE_SUCCESS) {
                                            if (res.data) {
                                                return [];
                                            } else {
                                                return ([{keyword: 'required', message: '项目名称已存在。'}]);
                                            }

                                        } else {
                                            return ([{keyword: 'required', message: res.msg}]);
                                        }
                                    }
                                ));
                        }
                    }
                },
                "manager": {
                    "type": "string",
                    "title": '项目经理',
                    "ui": {
                        widget: 'bylProjectManagerPoolSelect',
                        placeholder: '请输入项目经理代码或名称，系统自动查找',
                        allowClear: 'true',
                        serverSearch: 'true',
                        showSearch: 'true',

                    }
                },
                "planBeginDateDF": {
                    type: "string",
                    title: '计划开始日期',
                    format: 'date',
                    ui: {
                        widget: 'date',
                        placeholder: '请选择计划开始日期'
                    }
                },
                "planEndDateDF": {
                    "type": "string",
                    "title": '计划结束日期',
                    format: 'date',
                    ui: {
                        widget: 'date',
                        placeholder: '请选择计划结束日期'
                    }

                },
                "remarks": {
                    "type": 'string',
                    "title": '备注'
                }
            },
            "required": ["code", "name","manager"]

        };


        // 绑定验证模式
        // this.form = this.fb.group({
        //     code: [null, Validators.compose([Validators.required])],
        //     name: [null, Validators.compose([Validators.required])],
        //     projectManager: this.fb.group({
        //             managerId: [null, Validators.compose([Validators.required])],
        //             managerCode: [null, Validators.compose([Validators.required])],
        //             managerName: [null, Validators.compose([Validators.required])]
        //     }),
        //     addressTree: [null, Validators.compose([Validators.required])],
        //     detailAddress: [null, Validators.compose([Validators.required])],
        //     zipCode: [null],
        //     // detailAddress: [null],
        //     // contactZipCode: [null],
        //     planBeginDate: [null],
        //     planEndDate: [null],
        //     remarks: [null]
        // });


    }


    constructor(public msgService: NzMessageService,
                public projectService: BylProjectService,
                public projectManagerPoolService: BylProjectManagerPoolService,
                public countryService: BylCountryService,
                public provinceService: BylProvinceService,
                public cityService: BylCityService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                // public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService,
                public fb: FormBuilder) {
        // super(msgService, configService, /*modalService, modalSubject, */activatedRoute, reuseTabService, fb);

        super(msgService, configService, /*modalService, modalSubject, */activatedRoute, reuseTabService);

        this.businessService = projectService;

    }

    ngOnInit() {
        super.ngOnInit();

    }

    resetButtonClick($event: MouseEvent) {
        $event.preventDefault();
        this.reset();
    }

    // searchManager($event: MouseEvent) {
    //     $event.preventDefault();
    //     console.log("search manager");
    //     /**
    //      * 从账户池中查找待加入的项目经理
    //      */
    //
    //     this.managerPoolReveal = this.modalService.create({
    //         nzTitle: '查找项目经理',
    //         nzZIndex: 9999, //最外层
    //         nzWidth: '90%',
    //         nzContent: BylProjectManagerPoolListComponent,
    //         // onOk() {
    //         //
    //         // },
    //         // onCancel() {
    //         //     console.log('Click cancel');
    //         // },
    //         nzComponentParams: {
    //             functionMode: 'select'
    //         },
    //         nzMaskClosable: false
    //     });
    //     // this.managerPoolReveal.next(BylCrudEvent[BylCrudEvent.bylSaving]);
    //
    //     this.managerPoolReveal.destroy(result => {
    //         console.info(result);
    //
    //         console.info(typeof result);
    //
    //         //返回的是选中的项目经理
    //         let selectedItem: BylProjectManagerPool;
    //         if ((typeof result) === 'object') {
    //             console.log('添加新增的项目经理数据');
    //             selectedItem = result;
    //         }
    //
    //         //设置选中的项目经理
    //         if (selectedItem) {
    //             this.managerId.patchValue(selectedItem.poolId);
    //             this.managerCode.patchValue(selectedItem.poolCode);
    //             this.managerName.patchValue(selectedItem.poolName);
    //         }
    //
    //     });
    //
    // }
    /**
     *  在提交之前对businessData进行一些个性化的处理
     *  如果是普通界面，无须处理
     */
    getFormData() {
        super.getFormData();

        this.businessData.managerId  = this.businessData.manager.id;
        this.businessData.managerCode  = this.businessData.manager.code;
        this.businessData.managerName  = this.businessData.manager.name;
        // for (const i in this.form.controls) {
        //     this.form.controls[i].markAsDirty();
        // }
        //
        // console.table(this.form.value);
        // this.businessData.code = this.code.value;
        // this.businessData.name = this.name.value;
        // this.businessData.managerId = this.managerId.value;
        // this.businessData.managerCode = this.managerCode.value;
        // this.businessData.managerName = this.managerName.value;
        //
        // this.businessData.address.countryId = this.addressTreevalue[0].value;
        // this.businessData.address.countryCode = this.addressTreevalue[0].value;
        // this.businessData.address.countryName = this.addressTreevalue[0].label;
        //
        // this.businessData.address.provinceId = this.addressTreevalue[1].value;
        // this.businessData.address.provinceCode = this.addressTreevalue[1].value;
        // this.businessData.address.provinceName = this.addressTreevalue[1].label;
        //
        // this.businessData.address.cityId = this.addressTreevalue[2].value;
        // this.businessData.address.cityCode = this.addressTreevalue[2].value;
        // this.businessData.address.cityName = this.addressTreevalue[2].label;
        //
        // this.businessData.address.detailAddress = this.detailAddress.value;
        //
        // if (this.zipCode.value) this.businessData.address.zipCode = this.zipCode.value;
        //
        // if (this.planBeginDate.value) {
        //     this.businessData.planBeginDate = moment(this.planBeginDate.value).valueOf();
        // }
        // if (this.planEndDate.value) {
        //     this.businessData.planEndDate = moment(this.planEndDate.value).valueOf();
        // }
        //
        //
        // if (this.remarks.value) {
        //     this.businessData.remarks = this.remarks.value.toString();
        // }
        // console.table(this.businessData);

    }

    /**
     * 重置界面内容
     */
    reset() {
        // let country = {value: this.businessData.address.countryCode, label: this.businessData.address.countryName};
        // this.addressTreevalue[0] = country;
        //
        // let province = {value: this.businessData.address.provinceCode, label: this.businessData.address.provinceName};
        // this.addressTreevalue[1] = province;
        //
        // let city = {value: this.businessData.address.cityCode, label: this.businessData.address.cityName};
        // this.addressTreevalue[2] = city;
        //
        // this.form.reset({
        //     code: this.businessData.code,
        //     name: this.businessData.name,
        //     managerId: this.businessData.managerId,
        //     managerCode: this.businessData.managerCode,
        //     managerName: this.businessData.managerName,
        //     addressTree: this.addressTreevalue,
        //     detailAddress: this.businessData.address.detailAddress,
        //     zipCode: this.businessData.address.zipCode,
        //     // birthYear: this.businessData.birthYear,
        //     // birthMonth: this.businessData.birthMonth,
        //     // birthDay: this.businessData.birthDay,
        //     planBeginDate: this.businessData.planBeginDate,
        //     planEndDate: this.businessData.planEndDate,
        //     remarks: this.businessData.remarks
        // }, {onlySelf: true, emitEvent: false});
        //

        console.log('4、in Project Crud, reset form', this.defaultBusinessData);


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

    /**
     *  在调出一张历史单据进行修改的时候调用
     *  个性化的处理
     */
    setFormData(data: BylProject){

        super.setFormData(data);

        if( this.businessData.managerId){
            let m = new BylEntityReference(this.businessData.managerId,this.businessData.managerCode,this.businessData.managerName);

            this.businessData.manager = m;
            // this.businessData.manager = m.code;
            this.defaultBusinessData.manager = m;
            // this.defaultBusinessData.manager = m.code;

            // // // //同时要把这个值放到界面的缺省值中去，否则无法显示
            // if (this.formSchema.properties['manager']){
            //     console.log("3、in Project Crud,setFormData:", this.formSchema.properties['manager']);
            //     let e :SFSchemaEnumType = {};
            //     e.value = m;
            //     e.label = m.getFullCaption();
            //
            //     this.formSchema.properties['manager'].enum.push(e);
            //
            // }

        }
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
    // get code() {
    //     return this.form.controls.code;
    // }
    //
    // get name() {
    //     return this.form.controls.name;
    // }
    // get managerId() {
    //     return this.projectManagerWidget.managerId;
    // }
    //
    // get managerCode() {
    //     return this.projectManagerWidget.managerCode;
    // }
    // get managerName() {
    //     return this.projectManagerWidget.managerName;
    // }
    //
    // get addressTree() {
    //     return this.form.controls.addressTree;
    // }
    //
    // get detailAddress() {
    //     return this.form.controls.detailAddress;
    // }
    //
    // get zipCode() {
    //     return this.form.controls.zipCode;
    // }

    // get birthYear() {
    //     return this.form.controls.birthYear;
    // }
    // get birthMonth() {
    //     return this.form.controls.birthMonth;
    // }
    // get birthDay() {
    //     return this.form.controls.birthDay;
    // }
    // get planBeginDate() {
    //     return this.form.controls.planBeginDate;
    // }
    //
    //
    // get planEndDate() {
    //     return this.form.controls.planEndDate;
    // }
    //
    // get remarks() {
    //     return this.form.controls.remarks;
    // }

    //#endregion

    error(value: any) {
        console.log('error', value);
    }
}
