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
import {SFComponent, SFSchema, SFSchemaEnumType} from "@delon/form";
import {BylProjectManagerPool} from "../../../../service/project/model/project-manager-pool.model";
import {BylEntityReference} from "../../../../service/model/entity-reference.model";
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";
import {BylProjectStatusEnum} from "../../../../service/project/model/project-status.enum";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";


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
        this.newSchema = {
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
                "managerWidget": {
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
                "planBeginDateWidget": {
                    type: "string",
                    title: '计划开始日期',
                    format: 'date',
                    ui: {
                        format: BylDatetimeUtils.formatDateString,
                        placeholder: '请选择计划开始日期'
                    }
                },
                "planEndDateWidget": {
                    "type": "string",
                    "title": '计划结束日期',
                    format: 'date',
                    ui: {
                        format: BylDatetimeUtils.formatDateString,
                        placeholder: '请选择计划结束日期'
                    }

                },
                "remarks": {
                    "type": 'string',
                    "title": '备注'
                },
                "statusDisplay": {
                    "type": 'number',
                    "title": '状态',
                    "ui": {
                        widget: 'text'
                    }
                },

            },
            "required": ["code", "name","managerWidget"]

        };

        this.browseSchema = {
            properties: {
                "code": {
                    "type": 'string',
                    "title": '代码',
                    "readOnly": true
                },
                "name": {
                    "type": 'string',
                    "title": '名称',
                    "readOnly": true

                },
                "managerWidget": {
                    "type": "string",
                    "title": '项目经理',
                    "readOnly": true,

                },
                "planBeginDateWidget": {
                    type: "string",
                    title: '计划开始日期',
                    format: 'date',
                    "readOnly": true
                },
                "planEndDateWidget": {
                    "type": "string",
                    "title": '计划结束日期',
                    format: 'date',
                    "readOnly": true
                },
                "remarks": {
                    "type": 'string',
                    "title": '备注',
                    "readOnly": true
                },
                "statusDisplay": {
                    "type": 'number',
                    "title": '状态',
                    "ui": {
                        widget: 'text'
                    }
                },

            },
            "required": ["code", "name","managerWidget"]

        };

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

    // ngOnInit() {
    //     super.ngOnInit();
    //
    // }

    // resetButtonClick($event: MouseEvent) {
    //     $event.preventDefault();
    //     this.reset();
    // }

    /**
     *  在提交之前对businessData进行一些个性化的处理
     *  如果是普通界面，无须处理
     */
    getFormData() {
        super.getFormData();

        if (this.businessData.managerWidget){
            this.businessData.managerId  = this.businessData.managerWidget.id;
            this.businessData.managerCode  = this.businessData.managerWidget.code;
            this.businessData.managerName  = this.businessData.managerWidget.name;

        }
        if (this.businessData.planBeginDateWidget) {
            console.log("in ProjectCRUD getFormData,planBeginDateWidget:",this.businessData.planBeginDateWidget);

            this.businessData.planBeginDate = BylDatetimeUtils.convertDateTimeToMills(this.businessData.planBeginDateWidget);
            console.log("in ProjectCRUD getFormData, planBeginDate:",this.businessData.planBeginDate);
        }
        if (this.businessData.planEndDateWidget) {
            this.businessData.planEndDate = BylDatetimeUtils.convertDateTimeToMills(this.businessData.planEndDateWidget);

        }

        // if (!this.businessData.status){
        //     //todo 暂时直接保存为提交
        //     this.businessData.status = BylProjectStatusEnum.SUBMITED;
        // }

    }

    /**
     * 重置界面内容
     */
    reset() {

        console.log('4、in Project Crud, reset form', this.defaultBusinessData);


        super.reset();

        //设置可复用标签的名字：
        if (this.sourceId) {
            //说明是修改
            this.reuseTabService.title = '编辑-' + this.businessData.name;
        }
    }

    /**
     *  在调出一张历史单据进行修改的时候调用
     *  个性化的处理
     */
    setFormData(data: BylProject){

        super.setFormData(data);

        if( this.businessData.managerId){
            let m = new BylEntityReference(this.businessData.managerId,
                this.businessData.managerCode,
                this.businessData.managerName);

            this.businessData.managerWidget = m;
            this.defaultBusinessData.managerWidget = m;

        }

        if (this.businessData.planBeginDate){
            this.businessData.planBeginDateWidget = BylDatetimeUtils.convertMillsToDateTime(this.businessData.planBeginDate);
            this.defaultBusinessData.planBeginDateWidget = BylDatetimeUtils.convertMillsToDateTime(this.businessData.planBeginDate);
        }

        if (this.businessData.planEndDate){
            this.businessData.planEndDateWidget = BylDatetimeUtils.convertMillsToDateTime(this.businessData.planEndDate);
            this.defaultBusinessData.planEndDateWidget = BylDatetimeUtils.convertMillsToDateTime(this.businessData.planEndDate);
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


    submitEntity(entity: BylProject){
        this.projectService.submit(entity).subscribe(
            data => {
                // option.loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                    //将显示界面中的数据修改
                    // this.listData.map(item =>{
                    //     if (item.item.id === data.data.id){
                    //         simpleDeepCopy(item.item,data.data);
                    //     };
                    // })

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

    runEntity(entity: BylProject){

    }
    cancelEntity(entity: BylProject){

    }
    achieveEntity(entity: BylProject){

    }

    error(value: any) {
        console.log('error', value);
    }
}
