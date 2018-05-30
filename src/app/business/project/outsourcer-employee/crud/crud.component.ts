import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {ReuseTabService} from '@delon/abc';
import {NzMessageService, NzModalService, NzModalRef} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';
import {BylConfigService} from '../../../../service/constant/config.service';

import {BylCrudComponentBasePro} from "../../../common/crud-component-base-pro";
import {map} from "rxjs/operators";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {isEmpty} from "../../../../service/utils/string.utils";
import {BylOutsourceEmployee} from "../../../../service/project/model/outsource-employee.model";
import {BylOutsourceEmployeeService} from "../../../../service/project/service/outsource-employee.service";
import {BylEntityReference} from "../../../../service/model/entity-reference.model";
import {BylProject} from "../../../../service/project/model/project.model";


@Component({
    selector: 'byl-outsource-employee-crud',
    templateUrl: './crud.component.html',
})
export class BylOutsourceEmployeeCrudComponent extends BylCrudComponentBasePro<BylOutsourceEmployee> {
    processType: string;


    newBusinessData(): BylOutsourceEmployee {
        return new BylOutsourceEmployee();
    }

    @Input()
    set setSourceId(value: string) {
        this.sourceId = value;
    }

    defineForm(): void {
        this.newSchema = {
            properties: {
                "outsourcerWidget":{
                    "type": 'string',
                    "title": '所属外包商',
                    "ui": {
                        widget: 'bylOutsourcerSelect',
                        placeholder: '请输入外包商的代码或名称，系统自动查找',
                        allowClear: 'true',
                        serverSearch: 'true',
                        showSearch: 'true'
                    }
                },
                "code": {
                    "type": 'string',
                    "title": '员工编号',
                    "ui": {
                        "validator": (value: string) => {
                            if (isEmpty(value)) {
                                console.log('check code:', value);
                                return [];
                            }

                            return this.outsourceEmployeeService.checkCodeAvailable({data: value,id: this.sourceId}).pipe(
                                map((res) => {
                                    if (res.code === BylResultBody.RESULT_CODE_SUCCESS) {
                                        if (res.data) {
                                            return [];
                                        } else {
                                            return ([{keyword: 'required', message: '员工编号'+ value + '已存在'}]);
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

                "remarks": {
                    "type": 'string',
                    "title": '备注'
                }
            },
            "required": ["outsourcerWidget", "code", "name"]
        };

        // BylCheckTypeEnumManager.getArray().forEach((item) =>{
        //     let option = {label: item.caption, value: item.value};
        //     this.newSchema.properties['checkType'].enum.push(option);
        // });

        // this.newSchema.properties['checkType'].default = BylCheckTypeEnum.DAY;

    }

    // defaultFormData: BylOutsourceEmployee = new BylOutsourceEmployee();

    // this.formUiSchema: SFUISchema = {};

    constructor(public msgService: NzMessageService,
                public outsourceEmployeeService: BylOutsourceEmployeeService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                // public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService) {
        super(msgService, configService, /*modalService, modalSubject, */activatedRoute, reuseTabService);
        //
        this.businessService = outsourceEmployeeService;


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
    // resetButtonClick($event: MouseEvent) {
    //     $event.preventDefault();
    //     this.reset();
    // }
    // //
    //
    getFormData() {
        // for (const i in this.form.controls) {
        //     this.form.controls[i].markAsDirty();
        // }
        super.getFormData();

        this.businessData.outsourcer.outsourcerId = this.businessData.outsourcerWidget.id;
        this.businessData.outsourcer.outsourcerCode = this.businessData.outsourcerWidget.code;
        this.businessData.outsourcer.outsourcerName = this.businessData.outsourcerWidget.name;

        // Object.assign(this.businessData, this.sfForm.value);
        console.log("in EmployeeCrud getFormData:" , this.businessData);

    }

    /**
     *  在调出一张历史单据进行修改的时候调用
     *  个性化的处理
     */
    setFormData(data: BylOutsourceEmployee){

        super.setFormData(data);

        if( this.businessData.outsourcer){
            if(this.businessData.outsourcer.outsourcerId){
                let m = new BylEntityReference(this.businessData.outsourcer.outsourcerId,
                    this.businessData.outsourcer.outsourcerCode,
                    this.businessData.outsourcer.outsourcerName);
                this.businessData.outsourcerWidget = m;
                // this.businessData.manager = m.code;
                this.defaultBusinessData.outsourcerWidget = m;
            }
        }
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
            this.reuseTabService.title = '编辑-' + this.businessData.person.personName;
        }

    }


    error(value: any) {
        console.log('error', value);
    }


}

