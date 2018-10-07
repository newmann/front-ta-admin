import {Component, Input, OnInit} from '@angular/core';

import {ReuseTabService} from '@delon/abc';
import {NzMessageService} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';
import {BylConfigService} from '../../../../service/constant/config.service';


import {BylWorkTypeService} from "../../../../service/project/service/work-type.service";
import {BylWorkType} from "../../../../service/project/model/work-type.model";
import {BylCheckTypeEnum, BylCheckTypeEnumManager} from "../../../../service/project/model/check-type.enum";
import {SFSchema} from "@delon/form";
import {map} from "rxjs/operators";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {isEmpty} from "../../../../service/utils/string.utils";
import {BylMasterDataCrudComponentBasePro} from "../../../common/master-data-crud-component-base-pro";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylMasterDataStatusEnum} from "../../../../service/model/master-data-status.enum";


@Component({
    selector: 'byl-work-type-crud',
    templateUrl: './crud.component.html',
})
export class BylWorkTypeCrudComponent extends BylMasterDataCrudComponentBasePro<BylWorkType>{
    processType: string;

    private _newSchema: SFSchema;
    private _modifySchema: SFSchema;
    private _browseSchema: SFSchema;

    newBusinessData(): BylWorkType {
        return new BylWorkType();
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
                },
                "statusDisplay": {
                    "type": 'number',
                    "title": '状态',
                    "ui": {
                        widget: 'text'
                    }
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

                "checkTypeDisplay": {
                    "type": 'string',
                    "title": '考勤类型',
                    "ui": {
                        widget: 'text'
                    }
                },
                "standardTimeLength": {
                    "type": 'integer',
                    "title": '标准工作时长',
                    // "default": 10,
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
            "required": ["code", "name", "checkTypeDisplay"],
            // "if": {
            //     "properties": {"checkTypeDisplay": {"enum": "小时"}}
            // },
            // "then": {
            //     "required": ["standardTimeLength"]
            // },
            // "else": {
            //     "required": []
            // }
        };

    }
    /**
     * 设置窗口定义的缺省值
     */
    setSchemaDefaultValue(){

        this._newSchema.properties['checkType'].enum = [];//清空再赋值
        this._newSchema.properties['checkType'].enum.push(...BylCheckTypeEnumManager.getSFSelectDataArray());

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

        // this.newSchema.properties.type.default = BylOrganizationTypeManager.getCaption(BylOrganizationTypeEnum.UNKNOWN);
    };
    // defaultFormData: BylWorkType = new BylWorkType();

    // this.formUiSchema: SFUISchema = {};

    constructor(public msgService: NzMessageService,
                public workTypeService: BylWorkTypeService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                // public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService,
                public router: Router) {
        super(msgService, configService, /*modalService, modalSubject, */activatedRoute, reuseTabService,router);
        //
        this.businessService = workTypeService;
        this.listFormUrl = "/project/work-type/list";
        this.crudEntityName = "工种";
    }


    /**
     * 定制取数过程
     */
    getFormData(): void{
        simpleDeepCopy(this.businessData, this.sfForm.value);

        //如果是按天结算，这标准时长设置为1
        if(this.businessData.checkType === BylCheckTypeEnum.DAY){
            this.businessData.standardTimeLength = 1;
        }

    };

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

    // /**
    //  * 判断当前sf是否有效
    //  * @returns {boolean}
    //  */
    // formIsValid():boolean{
    //     if ( this.sfForm.value["code"]){
    //         return this.sfForm.valid && (this.sfForm.value["code"].length > 0)
    //     }else{
    //         return this.sfForm.valid;
    //     }
    //
    // }
}

