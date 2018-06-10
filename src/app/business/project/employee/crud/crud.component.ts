import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {ReuseTabService} from '@delon/abc';
import {NzMessageService, NzModalService, NzModalRef} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';

import {BylCrudComponentBase} from '../../../common/crud-component-base';
import {BylConfigService} from '../../../../service/constant/config.service';
import {FormBuilder, Validators} from '@angular/forms';



import {BylCheckTypeEnum, BylCheckTypeEnumManager} from "../../../../service/project/model/check-type.enum";
import {ErrorData, SFComponent, SFSchema, SFUISchema} from "@delon/form";
import {BylCrudComponentBasePro} from "../../../common/crud-component-base-pro";
import {BylProject} from "../../../../service/project/model/project.model";
import {map} from "rxjs/operators";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {isEmpty} from "../../../../service/utils/string.utils";
import {BylEmployee} from "../../../../service/project/model/employee.model";
import {BylEmployeeService} from "../../../../service/project/service/employee.service";
import {parse} from "date-fns";
import * as moment from 'moment';
import {BylMasterDataCrudComponentBasePro} from "../../../common/master-data-crud-component-base-pro";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylMasterDataStatusEnum} from "../../../../service/model/master-data-status.enum";
import {Observable} from "rxjs/Observable";
import {BylProjectStatusEnum} from "../../../../service/project/model/project-status.enum";
import {BylEmployeeStatusEnum} from "../../../../service/project/model/employee-status.enum";


@Component({
    selector: 'byl-employee-crud',
    templateUrl: './crud.component.html',
})
export class BylEmployeeCrudComponent extends BylMasterDataCrudComponentBasePro<BylEmployee> {
    // processType: string;
    leaveLoading: boolean =false;

    private _newSchema: SFSchema;
    private _modifySchema: SFSchema;
    private _browseSchema: SFSchema;

    newBusinessData(): BylEmployee {
        return new BylEmployee();
    }

    @Input()
    set setSourceId(value: string) {
        this.sourceId = value;
    }

    defineForm(): void {
        this._newSchema = {
            properties: {
                "code": {
                    "type": 'string',
                    "title": '代码',
                    "ui": {
                        "validator": (value: string) => {
                            if (isEmpty(value)) {
                                console.log('check code:', value);
                                return [];
                            }

                            return this.employeeService.checkCodeAvailable({data: value,id: this.sourceId}).pipe(
                                map((res) => {
                                    if (res.code === BylResultBody.RESULT_CODE_SUCCESS) {
                                        if (res.data) {
                                            return [];
                                        } else {
                                            return ([{keyword: 'required', message: '工种代码'+ value + '已存在'}]);
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
                    "title": '姓名'
                },

                "enterDateDF": {
                    "type": 'string',
                    "title": '入职日期',
                    'format': 'date',
                    ui: {
                        widget: 'date',
                        placeholder: '请选择入职日期日期'
                    }
                },
                "leaveDateDF": {
                    "type": 'string',
                    "title": '离职日期',
                    'format': 'date',
                    ui: {
                        widget: 'date',
                        placeholder: '请选择离职日期日期'
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
            "required": ["code", "name"]
        };
        this._browseSchema = {
            properties: {
                "code": {
                    "type": 'string',
                    "title": '代码',
                    "ui": {
                        widget: 'text'
                    }
                },
                "name": {
                    "type": 'string',
                    "title": '姓名',
                    "ui": {
                        widget: 'text'
                    }
                },

                "enterDateDisplay": {
                    "type": 'string',
                    "title": '入职日期',
                    'format': 'date',
                    "ui": {
                        widget: 'text'
                    }
                },
                "leaveDateDisplay": {
                    "type": 'string',
                    "title": '离职日期',
                    'format': 'date',
                    "ui": {
                        widget: 'text'
                    }

                },
                "remarks": {
                    "type": 'string',
                    "title": '备注',
                    "ui": {
                        widget: 'text'
                    }
                },
                "statusDisplay": {
                    "type": 'number',
                    "title": '状态',
                    "ui": {
                        widget: 'text'
                    }
                },
            },
            "required": ["code", "name"]
        };
        // BylCheckTypeEnumManager.getArray().forEach((item) =>{
        //     let option = {label: item.caption, value: item.value};
        //     this.newSchema.properties['checkType'].enum.push(option);
        // });

        // this.newSchema.properties['checkType'].default = BylCheckTypeEnum.DAY;

    }
    /**
     * 设置窗口定义的缺省值
     */
    setSchemaDefaultValue(){
        if (this.processType === 'new') {
            this.curSchema = simpleDeepCopy({},this._newSchema);

        }else{
            //修改状态，需要根据单据的状态进一步判断
            switch (this.businessData.status){
                case BylMasterDataStatusEnum.UNSUBMITED:
                case BylMasterDataStatusEnum.SUBMITED:
                    this.curSchema = simpleDeepCopy({},this._newSchema);
                    break;
                default:
                    this.curSchema = simpleDeepCopy({},this._browseSchema);

            }
        }
        // super.setSchemaDefaultValue();
        // this.newSchema.properties.gender.enum.push(...BylGenderEnumManager.getSFSelectDataArray());
    };

    // defaultFormData: BylEmployee = new BylEmployee();

    // this.formUiSchema: SFUISchema = {};

    constructor(public msgService: NzMessageService,
                public employeeService: BylEmployeeService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                // public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService) {
        super(msgService, configService, /*modalService, modalSubject, */activatedRoute, reuseTabService);
        //
        this.businessService = employeeService;


    }

    getFormData() {
        // for (const i in this.form.controls) {
        //     this.form.controls[i].markAsDirty();
        // }
        super.getFormData();

        if (this.sfForm.value['enterDateDF']) {
             this.businessData.enterDate = moment(this.sfForm.value["enterDateDF"]).valueOf();
        }
        if (this.sfForm.value['leaveDateDF']) {
            this.businessData.leaveDate = moment(this.sfForm.value["leaveDateDF"]).valueOf();

        }
        // Object.assign(this.businessData, this.sfForm.value);
        console.log("in EmployeeCrud getFormData:" , this.businessData);

    }
    //
    /**
     * 重置界面内容
     */
    reset() {

        super.reset();
        //设置可复用标签的名字：
        if (this.sourceId) {
            //说明是修改
            this.reuseTabService.title = '编辑-' + this.businessData.name;
        }

    }


    error(value: any) {
        console.log('error', value);
    }

    setLoadingFalse(){
        this.leaveLoading =false;
        super.setLoadingFalse();

    }
    /**
     * 员工离职
     */
    leaveEntity() {
        this.leaveLoading = true;
        this.errMsg = '';

        let saveResult$: Observable<BylResultBody<BylEmployee>>;

        console.log('in EmployeeCRUD ', this.businessData);

        saveResult$ = this.employeeService.leave(this.businessData);

        this.followProcess(saveResult$);
    }

    showLeaveButton(): boolean{
        return this.businessData.status === BylEmployeeStatusEnum.LEAVE;
    }

    showBrowseButton(): boolean{
        return this.businessData.status === BylEmployeeStatusEnum.CONFIRMED
            || this.businessData.status === BylEmployeeStatusEnum.LOCKED
            || this.businessData.status === BylEmployeeStatusEnum.SUBMITED_DELETED
            || this.businessData.status === BylEmployeeStatusEnum.LEAVE;

    }
}

