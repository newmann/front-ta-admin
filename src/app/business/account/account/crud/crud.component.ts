import {Component, Input, OnInit} from '@angular/core';

import {ReuseTabService} from '@delon/abc';
import {NzMessageService, NzModalService, NzModalRef} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';
import * as moment from 'moment';

import {BylConfigService} from '../../../../service/constant/config.service';
import {FormBuilder, Validators} from '@angular/forms';
import {BylAccount} from '../../../../service/account/model/account.model';
import {BylAccountService} from '../../../../service/account/service/account.service';
import {BylCrudComponentBasePro} from "../../../common/crud-component-base-pro";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {Observable} from "rxjs/Observable";
import {BylMasterDataStatusEnum} from "../../../../service/model/master-data-status.enum";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylProjectStatusEnum} from "../../../../service/project/model/project-status.enum";
import {isEmpty} from "../../../../service/utils/string.utils";
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";
import {map} from "rxjs/operators";
import {SFSchema} from "@delon/form";
import {BylMasterDataCrudComponentBasePro} from "../../../common/master-data-crud-component-base-pro";



@Component({
    selector: 'byl-account-crud',
    templateUrl: './crud.component.html',
})
export class BylAccountCrudComponent extends BylMasterDataCrudComponentBasePro<BylAccount> {

    // permissionEntityType: PermissionEntityTypeEnum = PermissionEntityTypeEnum.ACCOUNT;
    private _newSchema: SFSchema;
    private _modifySchema: SFSchema;
    private _browseSchema: SFSchema;

    @Input()
    set setSourceId(value: string) {
        this.sourceId = value;
    }

    newBusinessData(): BylAccount {
        return new BylAccount();
    }

    defineForm(): void {
        this._newSchema = {
            properties: {
                "username": {
                    "type": 'string',
                    "title": '代码',
                    "ui": {
                        placeholder: '请输入账户代码',
                        validator: (value: string) => {
                            if (isEmpty(value)) {
                                console.log('check code:', value);
                                return [];
                            }
                            return this.accountService.checkUsernameAvailable({ data: value, id: this.sourceId }).pipe(
                                map((res) => {
                                        if (res.code === BylResultBody.RESULT_CODE_SUCCESS) {
                                            if (res.data) {
                                                return [];
                                            } else {
                                                return ([{ keyword: 'required', message: '账户代码' + value + '已存在' }]);
                                            }

                                        } else {
                                            return ([{ keyword: 'required', message: res.msg }]);
                                        }
                                    }
                                ));
                        }
                    }
                },
                "fullName": {
                    "type": 'string',
                    "title": '姓名'
                },
                "nickname": {
                    "type": "string",
                    "title": '昵称'
                },
                "password": {
                    "type": "string",
                    "title": '初始化密码'
                },
                "email": {
                    type: "string",
                    title: '邮箱'
                },
                "phone": {
                    type: "string",
                    title: '手机号码'
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
            "required": ["username", "fullName", "password"]
        };
        this._modifySchema = {
            properties: {
                "username": {
                    "type": 'string',
                    "title": '账户代码',
                    "ui": {
                        placeholder: '请输入账户代码',
                        validator: (value: string) => {
                            if (isEmpty(value)) {
                                console.log('check code:', value);
                                return [];
                            }
                            return this.accountService.checkUsernameAvailable({ data: value, id: this.sourceId }).pipe(
                                map((res) => {
                                        if (res.code === BylResultBody.RESULT_CODE_SUCCESS) {
                                            if (res.data) {
                                                return [];
                                            } else {
                                                return ([{ keyword: 'required', message: '账户代码' + value + '已存在' }]);
                                            }

                                        } else {
                                            return ([{ keyword: 'required', message: res.msg }]);
                                        }
                                    }
                                ));
                        }
                    }
                },
                "fullName": {
                    "type": 'string',
                    "title": '姓名'
                },
                "nickname": {
                    "type": "string",
                    "title": '昵称'
                },
                "email": {
                    type: "string",
                    title: '邮箱'
                },
                "phone": {
                    type: "string",
                    title: '手机号码'
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
            "required": ["username", "fullName"]
        };

        this._browseSchema = {
            properties: {
                "username": {
                    "type": 'string',
                    "title": '代码',
                    "ui": {
                        widget: 'text'
                    }
                },
                "fullName": {
                    "type": 'string',
                    "title": '姓名',
                    "ui": {
                        widget: 'text'
                    }
                },
                "nickname": {
                    "type": "string",
                    "title": '昵称',
                    "ui": {
                        widget: 'text'
                    }
                },
                "email": {
                    type: "string",
                    title: '邮箱',
                    "ui": {
                        widget: 'text'
                    }
                },
                "phone": {
                    type: "string",
                    title: '手机号码',
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
            "required": ["username", "fullName"]

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
                public accountService: BylAccountService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                // public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService,
                public fb: FormBuilder) {
        super(msgService, configService, activatedRoute, reuseTabService);

        this.businessService = accountService;

    }

    // ngOnInit() {
    //     console.log("执行crud init");
    //     super.ngOnInit();
    // }

    resetButtonClick($event: MouseEvent) {
        $event.preventDefault();
        this.reset();
    }


    // getFormData() {
    //     // for (const i in this.form.controls) {
    //     //     this.form.controls[i].markAsDirty();
    //     // }
    //     //
    //     // Object.assign(this.businessData, this.form.value);
    //     //
    //     // console.table(this.businessData);
    //
    // }

    /**
     * 重置界面内容
     */
    reset() {
        super.reset();
        //设置可复用标签的名字：
        if (this.sourceId) {
            //说明是修改
            this.reuseTabService.title = '编辑-' + this.businessData.username;
            this.businessData.password = '***'; // 在修改模式下，初始化密码随便设置一般，以便应对validtor。
        }

        console.log('reset form', this.businessData);

        // this.form.reset(this.businessData, {onlySelf: true, emitEvent: false});




    }


    // /**
    //  * 提交实体
    //  */
    // submitEntity() {
    //     this.loading = true;
    //     this.errMsg = '';
    //
    //     let saveResult$: Observable<BylResultBody<BylAccount>>;
    //
    //     console.log('in AccountCRUD ', this.businessData);
    //
    //     saveResult$ = this.accountService.submit(this.businessData);
    //
    //     this.followProcess(saveResult$);
    // }
    //
    //
    // /**
    //  * 作废
    //  * @param {BylAccount} entity
    //  */
    // cancelEntity(entity: BylAccount) {
    //     this.loading = true;
    //     this.errMsg = '';
    //
    //     let saveResult$: Observable<BylResultBody<BylAccount>>;
    //
    //     console.log('in AccountCRUD submitform', this.businessData);
    //
    //     saveResult$ = this.accountService.cancel(this.businessData);
    //
    //     this.followProcess(saveResult$);
    //
    // }
    //
    // /**
    //  * 锁定
    //  * @param {BylAccount} entity
    //  */
    // lockEntity(entity: BylAccount) {
    //     this.loading = true;
    //     this.errMsg = '';
    //
    //     let saveResult$: Observable<BylResultBody<BylAccount>>;
    //
    //     console.log('in AccountCRUD submitform', this.businessData);
    //
    //     saveResult$ = this.accountService.lock(this.businessData);
    //
    //     this.followProcess(saveResult$);
    //
    // }
    // /**
    //  * 解除锁定
    //  * @param {BylAccount} entity
    //  */
    // unlockEntity(entity: BylAccount) {
    //     this.loading = true;
    //     this.errMsg = '';
    //
    //     let saveResult$: Observable<BylResultBody<BylAccount>>;
    //
    //     console.log('in AccountCRUD submitform', this.businessData);
    //
    //     saveResult$ = this.accountService.unlock(this.businessData);
    //
    //     this.followProcess(saveResult$);
    //
    // }
    //
    // /**
    //  * 完成
    //  * @param {BylAccount} entity
    //  */
    // achieveEntity(entity: BylAccount) {
    //     this.loading = true;
    //     this.errMsg = '';
    //
    //     let saveResult$: Observable<BylResultBody<BylAccount>>;
    //
    //     console.log('in CrudBasePro submitform', this.businessData);
    //
    //     saveResult$ = this.accountService.confirm(this.businessData);
    //
    //     this.followProcess(saveResult$);
    //
    // }
    // /**
    //  * 取消完成，返回到提交状态
    //  */
    // unachieveEntity() {
    //     this.loading = true;
    //     this.errMsg = '';
    //
    //     let saveResult$: Observable<BylResultBody<BylAccount>>;
    //
    //     console.log('in AccountCRUD ', this.businessData);
    //
    //     saveResult$ = this.accountService.unconfirm(this.businessData);
    //
    //     this.followProcess(saveResult$);
    // }
    //
    // private followProcess(call$: Observable<BylResultBody<BylAccount>> ){
    //     call$.subscribe(
    //         data => {
    //             // this._loading = false;
    //             if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
    //                 // simpleDeepCopy(this.businessData,data.data);
    //                 this.setFormData(data.data);
    //                 this.reset(); //重置界面
    //
    //             } else {
    //
    //                 this.errMsg = data.msg;
    //             }
    //             this.loading = false;
    //         },
    //         err => {
    //             this.errMsg = err.toString();
    //             this.loading = false;
    //         }
    //     );
    // }
    //
    // showSaveButton(): boolean{
    //     return this.businessData.status === BylMasterDataStatusEnum.UNSUBMITED;
    // }
    //
    // showSubmitButton():boolean{
    //     return this.businessData.status === BylMasterDataStatusEnum.UNSUBMITED
    //         || this.businessData.status == BylMasterDataStatusEnum.SUBMITED;
    // }
    //
    // showLockButton(): boolean{
    //     return this.businessData.status === BylMasterDataStatusEnum.CONFIRMED;
    // }
    //
    // showUnlockButton(): boolean{
    //     return this.businessData.status === BylMasterDataStatusEnum.LOCKED;
    // }
    //
    // showCancelButton(): boolean{
    //     return this.businessData.status === BylMasterDataStatusEnum.SUBMITED;
    // }
    //
    // showAchieveButton(): boolean{
    //     return this.businessData.status === BylMasterDataStatusEnum.SUBMITED;
    //
    // }
    // showUnachieveButton(): boolean{
    //     return this.businessData.status === BylMasterDataStatusEnum.CONFIRMED;
    // }
    //
    // error(value: any) {
    //     console.log('error', value);
    // }
}

