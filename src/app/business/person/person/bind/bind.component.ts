import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {NzMessageService, NzModalRef, NzModalService} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder} from '@angular/forms';

import {BylPersonService} from '../../../../service/person/service/person.service';
import {BylPerson} from '../../../../service/person/model/person.model';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylResultBody} from '../../../../service/model/result-body.model';
import {ReuseTabService} from '@delon/abc';
import {BylGenderEnumManager} from "../../../../service/person/model/gender.enum";
import {BylCrudComponentBasePro} from "../../../common/crud-component-base-pro";
import {isEmpty} from "../../../../service/utils/string.utils";
import {map} from "rxjs/operators";
import {BylEntityReference} from "../../../../service/model/entity-reference.model";
import {SFComponent, SFSchema} from "@delon/form";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BYL_SHOW_MODE_UPDATE} from "../../../../service/constant/general.constant";
import {BylPersonRelationInterface} from "../../../../service/person/service/person-related.interface";
import {BylEmbeddablePerson} from "../../../../service/person/model/embeddable-person.model";
import {BylPersonRelation} from "../../../../service/person/model/person-relation.model";
import {BylPersonBindCrudComponent} from "../bind-crud/crud.component";


@Component({
    selector: 'byl-person-bind',
    templateUrl: './bind.component.html',
})
export class BylPersonBindComponent implements OnInit{
    private _newSchema: SFSchema;
    private _modifySchema: SFSchema;
    private _browseSchema: SFSchema;
    public emptyFormSchema: SFSchema = {
        properties: {}
    };
    public errMsg = '';  // 保存时错误信息
    public modifyForm: NzModalRef;//维护界面

    @ViewChild('bind') sfForm: SFComponent;

    public curSchema: SFSchema = null; //当前的显示格式

    public businessData: BylPersonRelation = new BylPersonRelation();
    public defaultBusinessData: BylPersonRelation = new BylPersonRelation();

    // private personRelation: BylPersonRelation;

    @Input()
    set setPersonRelation(value: BylPersonRelation) {
        simpleDeepCopy(this.businessData,value);
        simpleDeepCopy(this.defaultBusinessData, value);

    }

    @Input()
    public showMode: string = BYL_SHOW_MODE_UPDATE;//当前界面的显示模式，

    @Input() personBindService: BylPersonRelationInterface;

    ngOnInit(): void {
        this.reset();
    }




    defineForm(): void {
        this._newSchema = {
            properties: {
                "personWidget": {
                    "type": 'string',
                    "title": '绑定的个体',
                    ui: {
                        widget: 'bylPersonSelect',
                        placeholder: '请输入个体代码或名称，系统自动查找',
                        allowClear: 'true',
                        serverSearch: 'true',
                        showSearch: 'true'
                    }
                }
            },
            "required": ["personWidget"]

        };
        this._browseSchema = {
            properties: {
                "personDisplay": {
                    "type": "string",
                    "title": '绑定的个体',
                    "ui": {
                        widget: 'text'
                    }
                },
            },
            "required": ["personDisplay"]

        };
    }

    /**
     * 设置窗口显示模式，在编辑状态下可以修改，在浏览状态下只能看，不能修改
     */
    setSchemaDefaultValue(){

        if (this.showMode === BYL_SHOW_MODE_UPDATE) {
            this.curSchema = simpleDeepCopy({},this._newSchema);

        }else{
            this.curSchema = simpleDeepCopy({},this._browseSchema);
        }
    };

    /**
     * 重置界面内容
     */
    reset(): void {
        this.setSchemaDefaultValue();

        // if(this.sfForm) console.log('sfForm exist',this.sfForm);

        if(this.curSchema) this.sfForm.refreshSchema(this.curSchema);

        this.businessData.personWidget = {};
        if (this.businessData.person) {
            if ( this.businessData.person.personId){
                let m = new BylEntityReference(this.businessData.person.personId,
                    this.businessData.person.personIDCard,
                    this.businessData.person.personName);

                this.businessData.personWidget = m;
                this.defaultBusinessData.personWidget = m;

            }

        }
        if(this.businessData) console.log('businessData exist',this.businessData);

        this.sfForm.reset();
    }

    constructor(public msgService: NzMessageService,
                public modalService: NzModalService,
                // public modalRef: NzModalRef,
                public configService: BylConfigService,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService) {

        this.defineForm();
    }


    /**
     * 调用服务将当前界面中的关系保存数据库中
     */
    saveRelation(){

        this.personBindService.savePersonRelation(this.businessData)

    }


    /**
     * 调用服务将当前界面中的关系从数据库中删除
     */
    removeRelation(){

    }

    /**
     * 新增个人信息。
     *
     * 正确新增后，需要将个人信息返回到本界面，以便进一步保存
     */
    newPersion(){
        this.modifyForm = this.modalService.create({
            nzTitle: '新增',
            nzContent: BylPersonBindCrudComponent,
            // onOk() {
            //
            // },
            // onCancel() {
            //     console.log('Click cancel');
            // },
            // nzComponentParams: {
            //     masterId: this.masterId,
            //     masterModifyDateTime: this.masterModifyDateTime
            // },
            nzFooter: null,
            nzMaskClosable: false
        });
        //
        this.modifyForm.afterClose.subscribe(result => {
            console.log("in Item List add, result:", result);
            // if(result){
            //     this.processAddItemResult(result);
            //
            // }
        });
        // }
    }

    error(value: any) {
        console.log('error', value);
    }

}
