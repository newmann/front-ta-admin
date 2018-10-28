import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {ReuseTabService} from '@delon/abc';
import {NzMessageService, NzModalService, NzModalRef} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';

import {BylConfigService} from '../../../../service/constant/config.service';
import {BylCrudComponentBasePro} from "../../../common/crud-component-base-pro";
import {map} from "rxjs/operators";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {BylOutsourcer} from "../../../../service/project/model/outsourcer.model";
import {BylOutsourcerService} from "../../../../service/project/service/outsourcer.service";
import {BylCheckTypeEnumManager} from "../../../../service/project/model/check-type.enum";
import {BylCrudComponentMasterData} from "../../../common/crud-component-master-data";
import {SFSchema} from "@delon/form";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylMasterDataStatusEnum} from "../../../../service/model/master-data-status.enum";
import {BylStringUtils} from "../../../../service/utils/string.utils";


@Component({
    selector: 'byl-outsourcer-crud',
    templateUrl: './crud.component.html',
})
export class BylOutsourcerCrudComponent extends BylCrudComponentMasterData<BylOutsourcer> {
    // processType: string;
    private _newSchema: SFSchema;
    private _modifySchema: SFSchema;
    private _browseSchema: SFSchema;

    newBusinessData(): BylOutsourcer {
        return new BylOutsourcer();
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
                },
            },
            "required": ["code", "name"]
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

    // defaultFormData: BylOutsourcer = new BylOutsourcer();

    // this.formUiSchema: SFUISchema = {};

    constructor(public msgService: NzMessageService,
                public outsourcerService: BylOutsourcerService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                // public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService,
                public router: Router) {
        super(msgService, configService, /*modalService, modalSubject, */activatedRoute, reuseTabService, router);
        //
        this.businessService = outsourcerService;
        this.listFormUrl = "/project/outsourcer/list";
        this.crudEntityName ="外包方";
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
            this.reuseTabService.title = '编辑-' + this.crudEntityName +"["  + this.businessData.name + "]";
        }

    }


}

