import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {ReuseTabService} from '@delon/abc';
import {NzMessageService, NzModalService, NzModalRef} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';

import {BylConfigService} from '../../../../service/constant/config.service';
import {BylCheckTypeEnum, BylCheckTypeEnumManager} from "../../../../service/project/model/check-type.enum";
import {ErrorData, SFComponent, SFSchema, SFUISchema} from "@delon/form";
import {BylCrudComponentBasePro} from "../../../common/crud-component-base-pro";
import {map} from "rxjs/operators";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {isEmpty} from "../../../../service/utils/string.utils";
import {BylExpenseTypeService} from "../../../../service/project/service/expense-type.service";
import {BylExpenseType} from "../../../../service/project/model/expense-type.model";


@Component({
    selector: 'byl-expense-type-crud',
    templateUrl: './crud.component.html',
})
export class BylExpenseTypeCrudComponent extends BylCrudComponentBasePro<BylExpenseType> {
    processType: string;

    // @ViewChild('sf') sf: SFComponent;

    newBusinessData(): BylExpenseType {
        return new BylExpenseType();
    }

    @Input()
    set setSourceId(value: string) {
        this.sourceId = value;
    }

    defineForm(): void {
        this.newSchema = {
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

                            return this.expenseTypeService.checkCodeAvailable({data: value,id: this.sourceId}).pipe(
                                map((res) => {
                                    if (res.code === BylResultBody.RESULT_CODE_SUCCESS) {
                                        if (res.data) {
                                            return [];
                                        } else {
                                            return ([{keyword: 'required', message: '费用类型代码'+ value + '已存在'}]);
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

        // this.newSchema.properties['checkType'].default = BylCheckTypeEnum.DAY;

    }
    /**
     * 设置窗口定义的缺省值
     */
    setSchemaDefaultValue(){

        // this.newSchema.properties['checkType'].enum = [];//清空再赋值
        // this.newSchema.properties['checkType'].enum.push(...BylCheckTypeEnumManager.getSFSelectDataArray());
        // this.newSchema.properties.type.default = BylOrganizationTypeManager.getCaption(BylOrganizationTypeEnum.UNKNOWN);
    };
    // defaultFormData: BylExpenseType = new BylExpenseType();

    // this.formUiSchema: SFUISchema = {};

    constructor(public msgService: NzMessageService,
                public expenseTypeService: BylExpenseTypeService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                // public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService) {
        super(msgService, configService, /*modalService, modalSubject, */activatedRoute, reuseTabService);
        //
        this.businessService = expenseTypeService;


    }

    // ngOnInit() {
    //     console.log("执行ngOninit");
    //
    //     this.sfForm = this.sf;
    //     super.ngOnInit();
    //
    //
    // }
    //
    // resetButtonClick($event: MouseEvent) {
    //     $event.preventDefault();
    //     this.reset();
    // }

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


    error(value: any) {
        console.log('error', value);
    }
}

