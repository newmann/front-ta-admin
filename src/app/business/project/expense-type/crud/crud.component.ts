import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {ReuseTabService} from '@delon/abc';
import {NzMessageService, NzModalService, NzModalRef} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';

import {BylConfigService} from '../../../../service/constant/config.service';
import {BylCheckTypeEnum, BylCheckTypeEnumManager} from "../../../../service/project/model/check-type.enum";
import {ErrorData, SFComponent, SFSchema, SFUISchema} from "@delon/form";
import {BylCrudComponentBasePro} from "../../../common/crud-component-base-pro";
import {map} from "rxjs/operators";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {isEmpty} from "../../../../service/utils/string.utils";
import {BylExpenseTypeService} from "../../../../service/project/service/expense-type.service";
import {BylExpenseType} from "../../../../service/project/model/expense-type.model";
import {BylMasterDataCrudComponentBasePro} from "../../../common/master-data-crud-component-base-pro";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylMasterDataStatusEnum} from "../../../../service/model/master-data-status.enum";


@Component({
    selector: 'byl-expense-type-crud',
    templateUrl: './crud.component.html',
})
export class BylExpenseTypeCrudComponent extends BylMasterDataCrudComponentBasePro<BylExpenseType> {
    // processType: string;

    // @ViewChild('sf') sf: SFComponent;
    private _newSchema: SFSchema;
    private _modifySchema: SFSchema;
    private _browseSchema: SFSchema;

    newBusinessData(): BylExpenseType {
        return new BylExpenseType();
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
                },
                "statusDisplay": {
                    "type": 'number',
                    "title": '状态',
                    "ui": {
                        widget: 'text'
                    }
                }
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
                    "title": '名称',
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
    };
    // defaultFormData: BylExpenseType = new BylExpenseType();

    // this.formUiSchema: SFUISchema = {};

    constructor(public msgService: NzMessageService,
                public expenseTypeService: BylExpenseTypeService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                // public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService,
                public router: Router) {
        super(msgService, configService, /*modalService, modalSubject, */activatedRoute, reuseTabService, router);
        //
        this.businessService = expenseTypeService;
        this.listFormUrl = "/project/expense-type/list";
        this.crudEntityName = "费用类型";
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

