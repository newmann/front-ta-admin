import {Component, Input, ViewChild} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {BylRoleService} from '../../../../service/account/service/role.service';
import {map} from 'rxjs/operators';
import {BylResultBody} from '../../../../service/model/result-body.model';
import {FormBuilder} from '@angular/forms';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylRole} from '../../../../service/account/model/role.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ReuseTabService} from "@delon/abc";
import {BylCrudComponentMasterData} from "../../../common/crud-component-master-data";
import {BylMasterDataStatusEnum} from "../../../../service/model/master-data-status.enum";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {SFSchema} from "@delon/form";
import {BylMenuLinkItemListComponent} from "../../menu-link/item-list/item-list.component";
import {BylPermissionItemListComponent} from "../../permission/item-list/item-list.component";
import {BylAccountItemListComponent} from "../../account/item-list/item-list.component";
import {BylStringUtils} from "../../../../service/utils/string.utils";


@Component({
    selector: 'byl-role-crud',
    templateUrl: './crud.component.html'
})

export class BylRoleCrudComponent extends BylCrudComponentMasterData<BylRole> {
    @ViewChild('menuLinkList') menuLinkList: BylMenuLinkItemListComponent;
    @ViewChild('permissionList') permissionList: BylPermissionItemListComponent;
    @ViewChild('accountList') accountList: BylAccountItemListComponent;
    // public clientBrowserType: any;

    //调用BylPermissionItemListComponet时传入的参数
    // public permissionEntityType: PermissionEntityTypeEnum = PermissionEntityTypeEnum.ROLE;


    // private _role = new BylRole;
    // public form: FormGroup;
    // private _loading = false;
    // public errMsg = '';  // 保存时错误信息
    /**
     * 保存时显示的界面，
     * 1、如果是新增界面，
     *      在正常处理完成后，界面提示用户是否继续新增。
     *      如果保存出现错误，则界面消失，返回到维护主界面
     * 2、如果是修改界面，应该是又list界面调用出来
     *      正常处理完成后，界面消失，同时本界面也退出，返回到list界面。
     *      如果保存出错，界面小时，但本界面不退出
     *
     */
    // private _savingReveal: any;

    private _newSchema: SFSchema;
    private _modifySchema: SFSchema;
    private _browseSchema: SFSchema;

    @Input()
    set setSourceId(value: string) {
        this.sourceId = value;

    }

    newBusinessData(): BylRole {
        return new BylRole();
    }
    defineForm(): void {
        this._newSchema = {
            properties: {
                "name": {
                    "type": 'string',
                    "title": '名称',
                    "ui": {
                        placeholder: '请输入角色名称',
                        validator: (value: string) => {
                            if (BylStringUtils.isEmpty(value)) {
                                console.log('check code:', value);
                                return [];
                            }
                            return this.roleService.checkNameAvailable({ data: value, id: this.sourceId }).pipe(
                                map((res) => {
                                        if (res.code === BylResultBody.RESULT_CODE_SUCCESS) {
                                            if (res.data) {
                                                return [];
                                            } else {
                                                return ([{ keyword: 'required', message: '角色名称' + value + '已存在' }]);
                                            }

                                        } else {
                                            return ([{ keyword: 'required', message: res.msg }]);
                                        }
                                    }
                                ));
                        }
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
                },

            },
            "required": ["name"]
        };

        this._browseSchema = {
            properties: {
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
            "required": ["username"]

        };

    }

    /**
     * 设置窗口定义的缺省值
     * 在reset内部首先调用
     *
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
    constructor(public msgService: NzMessageService,
                public roleService: BylRoleService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                // public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService,
                public router: Router) {
        super(msgService, configService, /*modalService, modalSubject, */activatedRoute, reuseTabService, router);

        this.businessService = roleService;
        this.listFormUrl = "/account/role/list";
        this.crudEntityName = "角色";
    }



    resetButtonClick($event: MouseEvent) {
        $event.preventDefault();
        this.reset();

    }

    /**
     * 重置界面内容
     */
    reset() {
        // this.form.reset({
        //     name: this.businessData.name,
        //     remarks: this.businessData.remarks
        // }, {onlySelf: true, emitEvent: false});

        // this.form.markAsPristine();
        // for (const key in this.form.controls) {
        //     this.form.controls[key].markAsPristine();
        // }
        // console.log('this.form.dirty' + this.form.dirty);
        // console.log('this.form.invalid' + this.form.invalid);

        super.reset();

        //设置可复用标签的名字：
        if (this.sourceId) {
            //说明是修改
            this.reuseTabService.title = '编辑-' + this.crudEntityName + "[" +this.businessData.name +"]";
        }

    }
    // getFormData() {
    //     // for (const i in this.form.controls) {
    //     //     this.form.controls[i].markAsDirty();
    //     // }
    //     // console.table(this.form.value);
    //     // Object.assign(this.businessData, this.form.value);
    //
    //
    // }

    menuLinkTabClick(){
        if (!this.menuLinkList.haveSearched){
            this.menuLinkList.search();
        }
    }

    permissionTabClick(){
        if(!this.permissionList.haveSearched){
            this.permissionList.search();
        }
    }

    accountTabClick(){
        if(!this.accountList.haveSearched){
            this.accountList.search();
        }
    }

}
