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
import {BylOutsourcer} from "../../../../service/project/model/outsourcer.model";
import {parse} from "date-fns";
import * as moment from 'moment';
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";
import {BylOutsourcerService} from "../../../../service/project/service/outsourcer.service";


@Component({
    selector: 'byl-outsourcer-crud',
    templateUrl: './crud.component.html',
})
export class BylOutsourcerCrudComponent extends BylCrudComponentBasePro<BylOutsourcer> {
    processType: string;


    newBusinessData(): BylOutsourcer {
        return new BylOutsourcer();
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

                            return this.outsourcerService.checkCodeAvailable({data: value,id: this.sourceId}).pipe(
                                map((res) => {
                                    if (res.code === BylResultBody.RESULT_CODE_SUCCESS) {
                                        if (res.data) {
                                            return [];
                                        } else {
                                            return ([{keyword: 'required', message: '外包商代码'+ value + '已存在'}]);
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
                    "title": '名称'
                },

                "remarks": {
                    "type": 'string',
                    "title": '备注'
                }
            },
            "required": ["code", "name"]
        };

        // BylCheckTypeEnumManager.getArray().forEach((item) =>{
        //     let option = {label: item.caption, value: item.value};
        //     this.formSchema.properties['checkType'].enum.push(option);
        // });

        // this.formSchema.properties['checkType'].default = BylCheckTypeEnum.DAY;

    }

    // defaultFormData: BylOutsourcer = new BylOutsourcer();

    // this.formUiSchema: SFUISchema = {};

    constructor(public msgService: NzMessageService,
                public outsourcerService: BylOutsourcerService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                // public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService) {
        super(msgService, configService, /*modalService, modalSubject, */activatedRoute, reuseTabService);
        //
        this.businessService = outsourcerService;


    }
    //
    // ngOnInit() {
    //     console.log("执行ngOninit");
    //
    //     super.ngOnInit();
    //
    //
    // }
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
        super.getFormData();


        // Object.assign(this.businessData, this.sfForm.value);
        console.log("in EmployeeCrud getFormData:" , this.businessData);

    }
    //
    /**
     * 重置界面内容
     */
    reset() {

        console.log('reset form', this.defaultBusinessData);

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

