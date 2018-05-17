import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {ReuseTabService} from '@delon/abc';
import {NzMessageService, NzModalService, NzModalRef} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';

import {BylCrudComponentBase} from '../../../common/crud-component-base';
import {BylConfigService} from '../../../../service/constant/config.service';
import {FormBuilder, Validators} from '@angular/forms';


import {BylWorkTypeService} from "../../../../service/project/service/work-type.service";
import {BylWorkType} from "../../../../service/project/model/work-type.model";
import {BylCheckTypeEnum, BylCheckTypeEnumManager} from "../../../../service/project/model/check-type.enum";
import {ErrorData, SFComponent, SFSchema, SFUISchema} from "@delon/form";
import * as moment from "moment";
import {BylCrudComponentBasePro} from "../../../common/crud-component-base-pro";
import {BylProject} from "../../../../service/project/model/project.model";
import {map} from "rxjs/operators";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {isEmpty} from "../../../../service/utils/string.utils";


@Component({
    selector: 'byl-work-type-crud',
    templateUrl: './crud.component.html',
})
export class BylWorkTypeCrudComponent extends BylCrudComponentBasePro<BylWorkType> {
    processType: string;

    @ViewChild('sf') sf: SFComponent;

    newBusinessData(): BylWorkType {
        return new BylWorkType();
    }

    @Input()
    set setSourceId(value: string) {
        this.sourceId = value;
    }

    defineForm(): void {
        this.formSchema = {
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

                            return this.workTypeService.checkCodeAvailable({data: value,id: this.sourceId}).pipe(
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
                    "title": '名称',
                    "ui": {
                        "validator": (value: string) =>{
                            if (isEmpty(value)) {
                                console.log('check name:', value);
                                return [];
                            }

                            return this.workTypeService.checkNameAvailable({data: value,id: this.sourceId}).pipe(
                                map((res) => {
                                        if (res.code === BylResultBody.RESULT_CODE_SUCCESS) {
                                            if (res.data) {
                                                return [];
                                            } else {
                                                return ([{keyword: 'required', message: '工种名称已存在。'}]);
                                            }

                                        } else {
                                            return ([{keyword: 'required', message: res.msg}]);
                                        }
                                    }
                                ));
                        }
                    }
                },

                "checkType": {
                    "type": 'string',
                    "title": '考勤类型',
                    "enum": [],
                    "ui": {
                        "widget": "radio",
                        "styleType": "button"
                    }
                },
                "standardTimeLength": {
                    "type": 'integer',
                    "title": '标准工作时长',
                    "default": 10
                },
                "remarks": {
                    "type": 'string',
                    "title": '备注'
                }
            },
            "required": ["code", "name", "checkType"],
            "if": {
                "properties": {"checkType": {"enum": [10]}}
            },
            "then": {
                "required": ["standardTimeLength"]
            },
            "else": {
                "required": []
            }
        };

        BylCheckTypeEnumManager.getArray().forEach((item) =>{
            let option = {label: item.caption, value: item.value};
            this.formSchema.properties['checkType'].enum.push(option);
        });

        // this.formSchema.properties['checkType'].default = BylCheckTypeEnum.DAY;

    }

    // defaultFormData: BylWorkType = new BylWorkType();

    // this.formUiSchema: SFUISchema = {};

    constructor(public msgService: NzMessageService,
                public workTypeService: BylWorkTypeService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                // public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService) {
        super(msgService, configService, /*modalService, modalSubject, */activatedRoute, reuseTabService);
        //
        this.businessService = workTypeService;


    }

    ngOnInit() {
        console.log("执行ngOninit");

        this.sfForm = this.sf;
        super.ngOnInit();


    }
    //
    resetButtonClick($event: MouseEvent) {
        $event.preventDefault();
        this.reset();
    }
    //
    //
    getFormData() {
        // for (const i in this.form.controls) {
        //     this.form.controls[i].markAsDirty();
        // }

        Object.assign(this.businessData, this.sfForm.value);

        console.table(this.businessData);

    }
    //
    /**
     * 重置界面内容
     */
    reset() {

        console.log('reset form', this.businessData);

        super.reset();
        //设置可复用标签的名字：
        if (this.sourceId) {
            //说明是修改
            this.reuseTabService.title = '编辑-' + this.businessData.name;
        }

    }
    //
    // get checkTypeOptions(){
    //     let result =  [{value: "1", caption: "小时"},
    //         {value: "2", caption: " 天"}];
    //     return result;
    //     // return BylCheckTypeEnumManager.getArray();
    // }
    //
    // //#region get form fields
    // get code() {
    //     return this.form.controls.code;
    // }
    //
    // get name() {
    //     return this.form.controls.name;
    // }
    //
    // get checkType() {
    //     return this.form.controls.checkType;
    // }
    //
    // get standardTimeLength() {
    //     return this.form.controls.standardTimeLength;
    // }
    //
    // get remarks() {
    //     return this.form.controls.remarks;
    // }
    //
    // //#endregion

    // submit(value: any) {
    //     console.log('submit', value);
    // }
    //
    //
    // change(value: any) {
    //     console.log('change', value);
    // }

    error(value: any) {
        console.log('error', value);
    }
}

