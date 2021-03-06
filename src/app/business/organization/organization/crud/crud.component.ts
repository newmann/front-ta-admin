import {Component, Input} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd";
import {BylConfigService} from "../../../../service/constant/config.service";
import {ReuseTabService} from "@delon/abc";
import {ActivatedRoute, Router} from "@angular/router";
import {BylOrganization} from "../../../../service/organization/model/organization.model";
import {BylOrganizationService} from "../../../../service/organization/service/organization.service";
import {BylCrudComponentBasePro} from "../../../common/crud-component-base-pro";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {map} from "rxjs/operators";
import {BylOrganizationTypeManager} from "../../../../service/organization/model/organization-type.enum";
import {BylEntityReference} from "../../../../service/model/entity-reference.model";
import {BylEmbeddableLegalPerson} from "../../../../service/organization/model/embeddable-legal-person.model";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {SFSchema} from "@delon/form";
import {BylStringUtils} from "../../../../service/utils/string.utils";

@Component({
  selector: 'byl-organization-crud',
  templateUrl: './crud.component.html',
})
export class BylOrganizationCrudComponent extends BylCrudComponentBasePro<BylOrganization> {
    private _newSchema: SFSchema;
    private _modifySchema: SFSchema;
    private _browseSchema: SFSchema;

    @Input()
    set setSourceId(value: string) {
        this.sourceId = value;
    }



    newBusinessData(): BylOrganization {
        return new BylOrganization();
    }

    defineForm(): void {
        this._newSchema = {
            properties: {
                "code": {
                    "type": 'string',
                    "title": '代码',
                    "ui": {
                        placeholder: '请输入代码',
                        validator: (value: string) => {
                            if (BylStringUtils.isEmpty(value)) {
                                console.log('check code:', value);
                                return [];
                            }

                            return this.organizationService.checkCodeAvailable({data: value,id: this.sourceId}).pipe(
                                map((res) => {
                                        if (res.code === BylResultBody.RESULT_CODE_SUCCESS) {
                                            if (res.data) {
                                                return [];
                                            } else {
                                                return ([{keyword: 'required', message: '代码'+ value + '已存在'}]);
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
                "simpleName": {
                    "type": "string",
                    "title": '请输入简称'
                },
                "legalPersonWidget": {
                    type: "string",
                    title: '法人代表',
                    "ui": {
                        widget: 'bylPersonSelect',
                        placeholder: '请输入法人代表的代码或名称，系统自动查找',
                        allowClear: 'true',
                        serverSearch: 'true',
                        showSearch: 'true'
                    }
                },
                "type": {
                    "type": "string",
                    "title": '组织类型',
                    enum: [],
                    "ui": {
                        "widget": "radio",
                        "styleType": "button"
                    }
                },
                "remarks": {
                    "type": 'string',
                    "title": '备注'
                }
            },
            "required": ["code", "name","type"]

        };

    }
    /**
     * 设置窗口定义的缺省值
     * 在reset内部首先调用
     *
     */
    setSchemaDefaultValue(){
        this._newSchema.properties.type.enum = [];//清空再赋值
        this._newSchema.properties.type.enum.push(...BylOrganizationTypeManager.getSFSelectDataArray());

        if (this.processType === 'new') {
            this.curSchema = simpleDeepCopy({},this._newSchema);

        }else{
            this.curSchema = simpleDeepCopy({},this._newSchema);
            // //修改状态，需要根据单据的状态进一步判断
            // switch (this.businessData.status){
            //     case BylMasterDataStatusEnum.UNSUBMITED:
            //     case BylMasterDataStatusEnum.SUBMITED:
            //         this.curSchema = simpleDeepCopy({},this._newSchema);
            //         break;
            //     default:
            //         this.curSchema = simpleDeepCopy({},this._browseSchema);
            //
            // }
        }

    };
    // /**
    //  * 设置窗口定义的缺省值
    //  */
    // setSchemaDefaultValue(){
    //
    //     this.newSchema.properties.type.enum = [];//清空再赋值
    //     this.newSchema.properties.type.enum.push(...BylOrganizationTypeManager.getSFSelectDataArray());
    //     // this.newSchema.properties.type.default = BylOrganizationTypeManager.getCaption(BylOrganizationTypeEnum.UNKNOWN);
    // };

    constructor(public msgService: NzMessageService,
                public organizationService: BylOrganizationService,
                // public nationService: BylNationService,
                // public countryService: BylCountryService,
                // public provinceSerivce: BylProvinceService,
                // public cityService: BylCityService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                // public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService,
                public router: Router) {
        super(msgService, configService, /*modalService, modalSubject,*/ activatedRoute, reuseTabService, router);


        this.businessService = organizationService;
        this.listFormUrl = "/organization/organization/list";
        this.crudEntityName = "组织";
    }


    // resetButtonClick($event: MouseEvent) {
    //     $event.preventDefault();
    //     this.reset();
    // }

    getFormData() {
        super.getFormData();


        if (this.businessData.legalPersonWidget) {
            if (this.businessData.legalPersonWidget.id){
                let l = new BylEmbeddableLegalPerson();
                l.legalPersonId = this.businessData.legalPersonWidget.id;
                l.legalPersonIdCode = this.businessData.legalPersonWidget.code;
                l.legalPersonName = this.businessData.legalPersonWidget.name;

                this.businessData.legalPerson = l;

            }
        }


    }

    /**
     * 重置界面内容
     */
    reset() {

        super.reset();

        //设置可复用标签的名字：
        if (this.sourceId) {
            //说明是修改
            this.reuseTabService.title = '编辑-' + this.crudEntityName + "[" +this.businessData.name +"]";
        }

    }

    /**
     *  在调出一张历史单据进行修改的时候调用
     *  个性化的处理
     */
    setFormData(data: BylOrganization){

        super.setFormData(data);

        if (this.businessData.legalPerson){
            if( this.businessData.legalPerson.legalPersonId){
                let m = new BylEntityReference(this.businessData.legalPerson.legalPersonId,
                    this.businessData.legalPerson.legalPersonIdCode,this.businessData.legalPerson.legalPersonName);

                this.businessData.legalPersonWidget = m;
                this.defaultBusinessData.legalPersonWidget = m;

            }

        }


    }

    error(value: any) {
        console.log('error', value);
    }

}
