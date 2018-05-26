import {Component, Input, OnInit} from '@angular/core';

import {NzMessageService, NzModalService, NzModalRef} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {BylPersonService} from '../../../../service/person/service/person.service';
import {BylPerson} from '../../../../service/person/model/person.model';

import {BylCrudComponentBase} from '../../../common/crud-component-base';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylNation} from '../../../../service/person/model/nation.model';
import {BylPoliticalStatus} from '../../../../service/person/model/political-status.model';
import {BylNationService} from '../../../../service/person/service/nation.service';
import {BylPoliticalStatusService} from '../../../../service/person/service/political-status.service';
import {BylResultBody} from '../../../../service/model/result-body.model';
import {ReuseTabService} from '@delon/abc';
import {BylCountryService} from '../../../../service/address/service/country.service';
import {BylProvinceService} from '../../../../service/address/service/province.service';
import {BylCityService} from '../../../../service/address/service/city.service';
import {_Validators} from "@delon/util";
import {BylGenderEnumManager} from "../../../../service/person/model/gender.enum";
import {BylCrudComponentBasePro} from "../../../common/crud-component-base-pro";
import {isEmpty} from "../../../../service/utils/string.utils";
import {map} from "rxjs/operators";
import {BylProject} from "../../../../service/project/model/project.model";
import {BylEntityReference} from "../../../../service/model/entity-reference.model";


@Component({
    selector: 'byl-person-crud',
    templateUrl: './crud.component.html',
})
export class BylPersonCrudComponent extends BylCrudComponentBasePro<BylPerson> {

    @Input()
    set setSourceId(value: string) {
        this.sourceId = value;

    }


    newBusinessData(): BylPerson {
        return new BylPerson();
    }

    defineForm(): void {
        // // 绑定验证模式
        // this.form = this.fb.group({
        //     idCard: [null, Validators.compose([Validators.required, _Validators.idCard])],
        //     name: [null, Validators.compose([Validators.required])],
        //     gender: [null],
        //     // birthYear: [null,Validators.compose([Validators.maxLength(4)])],
        //     // birthMonth: [null,Validators.compose([Validators.maxLength(2)])],
        //     // birthDay: [null,Validators.compose([Validators.maxLength(2)])],
        //     nation: [null],
        //     politicalStatus: [null],
        //     nativePlace: [null],
        //     remarks: [null]
        // });
        this.formSchema = {
            properties: {
                "idCard": {
                    "type": 'string',
                    "title": '身份证号码',
                    "ui": {
                        placeholder: '请输入身份证号码',
                        validator: (value: string) => {
                            if (isEmpty(value)) {
                                console.log('check code:', value);
                                return [];
                            }

                            return this.personService.checkIdCardAvailable({data: value,id: this.sourceId}).pipe(
                                map((res) => {
                                        if (res.code === BylResultBody.RESULT_CODE_SUCCESS) {
                                            if (res.data) {
                                                return [];
                                            } else {
                                                return ([{keyword: 'required', message: '项目代码'+ value + '已存在'}]);
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
                "gender": {
                    "type": "string",
                    "title": '性别',
                    enum: [],
                    "ui": {
                        "widget": "radio",
                        "styleType": "button"
                    }
                },
                "nation": {
                    type: "string",
                    title: '民族',
                    format: 'date',
                    "ui": {
                        widget: 'bylNationSelect',
                        placeholder: '请输入民族的代码或名称，系统自动查找',
                        allowClear: 'true',
                        serverSearch: 'true',
                        showSearch: 'true'
                    }
                },
                "politicalStatus": {
                    type: "string",
                    title: '政治面貌',
                    format: 'date',
                    "ui": {
                        widget: 'bylPoliticalStatusSelect',
                        placeholder: '请输入政治面貌代码或名称，系统自动查找',
                        allowClear: 'true',
                        serverSearch: 'true',
                        showSearch: 'true'
                    }
                },
                "nativePlace": {
                    "type": "string",
                    "title": '籍贯'
                },
                "remarks": {
                    "type": 'string',
                    "title": '备注'
                }
            },
            "required": ["idCard", "name", "gender"]

        };

    }

    /**
     * 设置窗口定义的缺省值
     */
    setSchemaDefaultValue(){
        super.setSchemaDefaultValue();
        this.formSchema.properties.gender.enum.push(...BylGenderEnumManager.getSFSelectDataArray());
    };

    constructor(public msgService: NzMessageService,
                public personService: BylPersonService,
                // public nationService: BylNationService,
                // public countryService: BylCountryService,
                // public provinceSerivce: BylProvinceService,
                // public cityService: BylCityService,
                // public politicalStatusService: BylPoliticalStatusService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                // public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService,
                public fb: FormBuilder) {
        // super(msgService, configService, /*modalService, modalSubject,*/ activatedRoute, reuseTabService, fb);
        super(msgService, configService, /*modalService, modalSubject,*/ activatedRoute, reuseTabService);
        this.businessService = personService;

    }

//
    // searchPerson($event) {
    //     this.logger.log('$event', $event);
    //     if ($event) this._searchData$.next($event);
    // }

    resetButtonClick($event: MouseEvent) {
        $event.preventDefault();
        this.reset();
    }

    getFormData() {
        super.getFormData();


        if (this.businessData.nation) {
            this.businessData.nationId = this.businessData.nation.id;
            this.businessData.nationCode = this.businessData.nation.code;
            this.businessData.nationName = this.businessData.nation.name;
        }

        if (this.businessData.politicalStatus) {
            this.businessData.politicalStatusId = this.businessData.politicalStatus.id;
            this.businessData.politicalStatusCode = this.businessData.politicalStatus.code;
            this.businessData.politicalStatusName = this.businessData.politicalStatus.name;

        }

    }

    /**
     *  在调出一张历史单据进行修改的时候调用
     *  个性化的处理
     */
    setFormData(data: BylPerson){

        super.setFormData(data);

        if( this.businessData.nationId){
            let m = new BylEntityReference(this.businessData.nationId,this.businessData.nationCode,this.businessData.nationName);

            this.businessData.nation = m;
            this.defaultBusinessData.nation = m;

        }

        if( this.businessData.politicalStatusId){
            let m = new BylEntityReference(this.businessData.politicalStatusId,this.businessData.politicalStatusCode,this.businessData.politicalStatusName);

            this.businessData.politicalStatus = m;
            this.defaultBusinessData.politicalStatus = m;

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
            this.reuseTabService.title = '编辑-' + this.businessData.name;
        }

    }




    error(value: any) {
        console.log('error', value);
    }

}
