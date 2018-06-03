import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {NzMessageService, NzModalService, NzModalRef} from 'ng-zorro-antd';
import {BylRoleService} from '../../../../service/account/service/role.service';
import {catchError, debounceTime, distinctUntilChanged, first, flatMap, map} from 'rxjs/operators';
import {BylResultBody} from '../../../../service/model/result-body.model';
import {Observable} from 'rxjs/Observable';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylRole} from '../../../../service/account/model/role.model';
import {ActivatedRoute} from '@angular/router';
import {BylCrudComponentBase} from '../../../common/crud-component-base';
import {ReuseTabService} from "@delon/abc";
import {BylMasterDataCrudComponentBasePro} from "../../../common/master-data-crud-component-base-pro";
import {isEmpty} from "../../../../service/utils/string.utils";
import {BylMasterDataStatusEnum} from "../../../../service/model/master-data-status.enum";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {SFSchema} from "@delon/form";


@Component({
    selector: 'byl-role-crud',
    templateUrl: './crud.component.html'
})

export class BylRoleCrudComponent extends BylMasterDataCrudComponentBasePro<BylRole> {
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
                        placeholder: '请输入角色代码',
                        validator: (value: string) => {
                            if (isEmpty(value)) {
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
                public fb: FormBuilder) {
        super(msgService, configService, /*modalService, modalSubject, */activatedRoute, reuseTabService);

        this.businessService = roleService;

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
            this.reuseTabService.title = '编辑-' + this.businessData.name;
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





}
