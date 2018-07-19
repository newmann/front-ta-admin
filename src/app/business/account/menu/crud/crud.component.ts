import {Component, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ReuseTabService} from '@delon/abc';
import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylDepartmentService} from '../../../../service/account/service/department.service';
import {BylDepartment} from '../../../../service/account/model/department.model';
import {debounceTime, distinctUntilChanged, first, flatMap, map} from 'rxjs/operators';
import {BylResultBody} from '../../../../service/model/result-body.model';
import {Observable, Subject} from 'rxjs';
// import {Subject} from 'rxjs/Subject';
import {BylMasterDataStatusEnum} from '../../../../service/model/master-data-status.enum';
import {BylCrudComponentBase} from "../../../common/crud-component-base";
import {BylMenu} from "../../../../service/account/model/menu.model";
import {BylMenuService} from "../../../../service/account/service/menu.service";
import {BylMasterDataCrudComponentBasePro} from "../../../common/master-data-crud-component-base-pro";
import {SFSchema} from "@delon/form";
import {isEmpty} from "../../../../service/utils/string.utils";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BYL_TREE_NODE_ID_DEFAULT_VALUE} from "../../../../service/constant/general.constant";


@Component({
    selector: 'byl-menu-crud',
    templateUrl: './crud.component.html',
})
export class BylMenuCrudComponent extends BylMasterDataCrudComponentBasePro<BylMenu> {

    public parentMenu = new BylMenu(); // 最顶级的部门，id = -
    // permissionEntityType: PermissionEntityTypeEnum = PermissionEntityTypeEnum.ACCOUNT;
    private _newSchema: SFSchema;
    private _modifySchema: SFSchema;
    private _browseSchema: SFSchema;

    @Input()
    set setSourceId(value: string) {
        this.sourceId = value;
    }

    @Input()
    set setParentMenu(value: BylMenu){
        this.parentMenu = value;
    };

    isLoading = false;

    newBusinessData(): BylMenu {
        return new BylMenu();
    }
    defineForm(): void {
        this._newSchema = {
            properties: {
                "caption": {
                    "type": 'string',
                    "title": '显示名称',
                },
                "i18nKey": {
                    "type": 'string',
                    "title": 'i18n代码'
                },
                "leaf": {
                    "type": "string",
                    "title": '是否有下级菜单',
                    "enum": [{value:true,label: "否"},{value:false,label: "是"}], //正好与isleaf相反
                    "ui": {
                        "widget": "radio",
                        "styleType": "button"
                    }
                },
                "targetLinkWidget": {
                    "type": "string",
                    "title": '对应菜单'
                },

                "iconKey": {
                    "type": "string",
                    "title": '图标'
                }

            },
            "required": ["caption", "i18nKey", "leaf"],
            "if": {
                "properties": {"leaf": {"enum": [true]}}
            },
            "then": {
                "required": ["targetLinkWidget"]
            },
            "else": {
                "required": []
            }
        };

        this._browseSchema = {
            properties: {
                "caption": {
                    "type": 'string',
                    "title": '显示名称',
                    "ui": {
                        widget: 'text'
                    }
                },
                "i18nKey": {
                    "type": 'string',
                    "title": 'i18n代码',
                    "ui": {
                        widget: 'text'
                    }
                },
                "leaf": {
                    "type": "string",
                    "title": '是否有下级菜单',
                    "enum": [{value:0,label: "否"},{value:1,label: "是"}],
                    "ui": {
                        widget: 'text'
                    }
                },
                "targetLink": {
                    type: "string",
                    title: '对应菜单',
                    "ui": {
                        widget: 'text'
                    }
                },
                "iconKey": {
                    type: "string",
                    title: '图标',
                    "ui": {
                        widget: 'text'
                    }
                },

            },
            "required": ["caption", "i18nKey", "leaf"]

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
                public menuService: BylMenuService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService
                ) {
        super(msgService, configService, /*modalService, modalSubject,*/ activatedRoute, reuseTabService);

        this.businessService = menuService;

    }



    resetButtonClick($event: MouseEvent) {
        $event.preventDefault();
        this.reset();

    }



    /**
     * 重置界面内容
     */
    reset() {

        super.reset();

        //设置可复用标签的名字：
        if (this.sourceId) {
            //说明是修改
            this.reuseTabService.title = '编辑-' + this.businessData.caption;
        }

        // for (const key in this.form.controls) {
        //     this.form.controls[key].markAsPristine();
        // }
    }

    error(value: any) {
        console.log('error', value);
    }
    /**
     *
     *  在提交之前对businessData进行一些个性化的处理
     *  首先要把值传到businessData上去
     *  个性化的处理放到子类中去
     */

    getFormData(): void{
        super.getFormData();
    };
    /**
     * 保存
     */
    submitForm() {
        this.loading = true;
        // const msgId = this.msgService.loading('正在保存..', {nzDuration: 0}).messageId;
        // this.showSavingReveal();
        // this._loading = true;
        this.errMsg = '';
        this.getFormData();
        let saveResult$: Observable<BylResultBody<BylMenu>>;


        if (this.sourceId) {
            //当前为修改界面
            saveResult$ = this.menuService.update(this.businessData);
        } else {
            //当前为新增界面
            if (this.parentMenu.id === BYL_TREE_NODE_ID_DEFAULT_VALUE){
                saveResult$ = this.menuService.addChildNode(null, this.businessData);
            }else{
                saveResult$ = this.menuService.addChildNode(this.parentMenu, this.businessData);
            }

        }

        saveResult$.subscribe(
            data => {
                // this._loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {

                    //保存成功后，直接将结果返回到调用界面
                    this.modalSubject.close(data.data);



                } else {
                    // 通知显示窗口保存错误，是否退出由显示界面控制
                    // this.savingReveal.next(BylCrudEvent[BylCrudEvent.bylSaveError]);
                    // this._savingReveal.destroy();
                    this.errMsg = data.msg;
                    // this.savingReveal.destroy(); //退出提示界面，原界面不动
                }
                this.loading = false;
                // this.msgService.remove(msgId);

            },
            err => {
                // 通知显示窗口保存错误，是否退出由显示界面控制
                // this.savingReveal.next(BylCrudEvent[BylCrudEvent.bylSaveError]);
                // this._loading = false;
                this.errMsg = err.toString();
                this.loading = false;
                // this.msgService.remove(msgId);
                // this.savingReveal.destroy(); //退出提示界面，原界面不动
            }
        );
    }
}

