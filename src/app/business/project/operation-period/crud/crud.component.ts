import {Component, Input} from '@angular/core';

import {ReuseTabService} from '@delon/abc';
import {NzMessageService} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';
import {BylConfigService} from '../../../../service/constant/config.service';
import {SFSchema} from "@delon/form";
import {map} from "rxjs/operators";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {BylCrudComponentMasterData} from "../../../common/crud-component-master-data";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylOperationPeriod} from "../../../../service/project/model/operation-period.model";
import {BylOperationPeriodStatusEnum} from "../../../../service/project/model/operation-period-status.enum";
import {BylOperationPeriodService} from "../../../../service/project/service/operation-period.service";
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";
import {BylEntityReference} from "../../../../service/model/entity-reference.model";
import {BylProject} from "../../../../service/project/model/project.model";
import {BylStringUtils} from "../../../../service/utils/string.utils";


@Component({
    selector: 'byl-operation-period-crud',
    templateUrl: './crud.component.html',
})
export class BylOperationPeriodCrudComponent extends BylCrudComponentMasterData<BylOperationPeriod> {
    processType: string;

    private _newSchema: SFSchema;
    private _modifySchema: SFSchema;
    private _browseSchema: SFSchema;

    newBusinessData(): BylOperationPeriod {
        return new BylOperationPeriod();
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
                            if (BylStringUtils.isEmpty(value)) {
                                console.log('check code:', value);
                                return [];
                            }

                            return this.operationPeriodService.checkCodeAvailable({data: value,id: this.sourceId}).pipe(
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
                            if (BylStringUtils.isEmpty(value)) {
                                console.log('check name:', value);
                                return [];
                            }

                            return this.operationPeriodService.checkNameAvailable({data: value,id: this.sourceId}).pipe(
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

                "beginDateWidget": {
                    type: "string",
                    title: '起始日期',
                    format: 'date',
                    ui: {
                        format: BylDatetimeUtils.formatDateString,
                        placeholder: '请选择起始日期'
                    }
                },
                "endDateWidget": {
                    type: "string",
                    title: '截止日期',
                    format: 'date',
                    ui: {
                        format: BylDatetimeUtils.formatDateString,
                        placeholder: '请选择截止日期'
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
                }
            },
            "required": ["code", "name", "beginDateWidget", "endDateWidget"]

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


                "beginDateDisplay": {
                    "type": 'integer',
                    "title": '起始日期',
                    "ui": {
                        widget: 'text'
                    }
                },
                "endDateDisplay": {
                    "type": 'integer',
                    "title": '截止日期',
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
            "required": ["code", "name", "beginDateDisplay","endDateDisplay"]
        };

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
                case BylOperationPeriodStatusEnum.UNSUBMITED:
                case BylOperationPeriodStatusEnum.SUBMITED:
                    this.curSchema = simpleDeepCopy({},this._newSchema);
                    break;
                default:
                    this.curSchema = simpleDeepCopy({},this._browseSchema);

            }
        }

        // this.newSchema.properties.type.default = BylOrganizationTypeManager.getCaption(BylOrganizationTypeEnum.UNKNOWN);
    };
    // defaultFormData: BylOperationPeriod = new BylOperationPeriod();

    // this.formUiSchema: SFUISchema = {};

    constructor(public msgService: NzMessageService,
                public operationPeriodService: BylOperationPeriodService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                // public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService,
                public router: Router) {
        super(msgService, configService, /*modalService, modalSubject, */activatedRoute, reuseTabService, router);
        //
        this.businessService = operationPeriodService;
        this.listFormUrl = "/project/operation-period/list";
        this.crudEntityName = "业务期间";
    }
    /**
     * 重置界面内容
     */
    reset() {

        console.log('reset form', this.businessData);

        super.reset();
        //设置可复用标签的名字：
        if (this.sourceId) {
            //说明是修改
            this.reuseTabService.title = '编辑-' + this.crudEntityName +"["  + this.businessData.name + "]";
        }

    }


    error(value: any) {
        console.log('error', value);
    }

    /**
     *  在提交之前对businessData进行一些个性化的处理
     *  如果是普通界面，无须处理
     */
    getFormData() {
        super.getFormData();

        if (this.businessData.beginDateWidget) {

            this.businessData.beginDate = BylDatetimeUtils.convertDateTimeToMills(this.businessData.beginDateWidget);
        }
        if (this.businessData.endDateWidget) {
            this.businessData.endDate = BylDatetimeUtils.convertDateTimeToMills(this.businessData.endDateWidget);

        }
    }

    /**
     *  在调出一张历史单据进行修改的时候调用
     *  个性化的处理
     */
    setFormData(data: BylOperationPeriod) {

        super.setFormData(data);


        if (this.businessData.beginDate) {
            this.businessData.beginDateWidget = BylDatetimeUtils.convertMillsToDateTime(this.businessData.beginDate);
            this.defaultBusinessData.beginDateWidget = BylDatetimeUtils.convertMillsToDateTime(this.businessData.beginDate  );
        }

        if (this.businessData.endDate) {
            this.businessData.endDateWidget = BylDatetimeUtils.convertMillsToDateTime(this.businessData.endDate);
            this.defaultBusinessData.endDateWidget = BylDatetimeUtils.convertMillsToDateTime(this.businessData.endDate);
        }

    }

}

