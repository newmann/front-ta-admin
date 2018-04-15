import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {NzMessageService, NzModalService, NzModalSubject} from 'ng-zorro-antd';
import {RoleService} from '../../../../service/account/service/role.service';
import {catchError, debounceTime, distinctUntilChanged, first, flatMap, map} from 'rxjs/operators';
import {BylResultBody} from '../../../../service/model/result-body.model';
import {Observable} from 'rxjs/Observable';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BylConfigService} from '../../../../service/constant/config.service';
import {Role, RoleStatus} from '../../../../service/account/model/role.model';
import {HttpClient} from '@angular/common/http';
import {WaitingComponent} from '../../../common/waiting/waiting.component';
import {BylCrudEvent, BylCrudWaitingComponent} from '../../../common/waiting/crud-waiting.component';
import {ReuseTabService} from '@delon/abc';
import {ActivatedRoute} from '@angular/router';
import {BylLoggerService} from "../../../../service/utils/logger";
import {CheckClientBrowserType} from '../../../../service/utils/client-browser-type.utils';


@Component({
    selector: 'byl-role-crud',
    templateUrl: './crud.component.html',
})
export class BylRoleCrudComponent implements OnInit {
    public clientBrowserType:any;

    private _role = new Role;
    public form: FormGroup;
    private _loading = false;
    public errMsg = '';  // 保存时错误信息
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
    private _savingReveal: any;

    @Input() sourceRoleId: string;

    public processType: string;

    constructor(public msgService: NzMessageService,
                public roleService: RoleService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public modalSubject: NzModalSubject,
                public reuseTabService: ReuseTabService,
                private activatedRoute: ActivatedRoute,
                private logger: BylLoggerService,
                public fb: FormBuilder) {
        // 绑定验证模式
        this.form = this.fb.group({
            name: [null, Validators.compose([Validators.required, Validators.minLength(2)]), this.nameValidator],
            remarks: [null]
        });


        this.activatedRoute
            .paramMap
            .subscribe(params => {
                console.log(params);
                console.log(params.get('type'));
                this.processType = params.get('type') || '';

            });

    }

    ngOnInit() {
        this.logger.info(" in ngOnInit");
        //在从list窗口调入的情况下，载入数据
        if (this.sourceRoleId) this.loadRole(this.sourceRoleId);
    }

    // ngOnChanges() {
    //     console.log('ngOnChanges');
    //     this.reset();
    // }

    /**
     * 用于list调用
     */
    // ok() {
    //     this.modalSubject.next(this._role);
    //     this.cancel();
    // }
    //
    // cancel() {
    //     this.modalSubject.destroy();
    // }

    loadRole(id:String){

        // this.showLoadingReveal();
        this._loading = true;
        this.errMsg = '';
        this.roleService.findById(this.sourceRoleId).subscribe(
            data => {
                this._loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                    this.logger.info(data.data);
                    Object.assign(this._role,data.data);
                    this.reset();
                } else {

                    this.errMsg = data.msg;
                }
                // 退出显示窗口
                this._loading = false;
                // this.destorySavingReveal();

            },
            err => {
                this.errMsg = err.toString();

                // 退出显示窗口
                this._loading = false;
                // this.destorySavingReveal();

            }
        );
    }
    /**
     * 保存
     */
    submitForm() {
        this.showSavingReveal();
        this._loading = true;
        this.errMsg = '';
        // tslint:disable-next-line:forin
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        console.log('log', this.form.value);
        this._role.name = this.name.value.toString();

        if (this.remarks.value) {
            this._role.remarks = this.remarks.value.toString();
        }

        // 设置保存的对象状态
        this._role.status = RoleStatus.NORMAL_ROLE;

        this.roleService.add(this._role).subscribe(
            data => {
                this._loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                    // 通知显示窗口保存正确
                    this._savingReveal.next(BylCrudEvent[BylCrudEvent.bylSaveCorrect]);
                    // this.msgService.success('保存正确！');
                    // 如果是通过浏览界面进入，则自动退出

                } else {
                    // 通知显示窗口保存错误，是否退出由显示界面控制
                    this._savingReveal.next(BylCrudEvent[BylCrudEvent.bylSaveError]);
                    // this._savingReveal.destroy();
                    this.errMsg = data.msg;
                }
            },
            err => {
                // 通知显示窗口保存错误，是否退出由显示界面控制
                this._savingReveal.next(BylCrudEvent[BylCrudEvent.bylSaveError]);

                this._loading = false;
                this.errMsg = err.toString();


            }
        );
    }

    // showButtonClick() {
    //     this.showSavingReveal();
    //     setTimeout(() => {
    //         console.log(BylCrudEvent[BylCrudEvent.bylSaveCorrect]);
    //         this._savingReveal.next(BylCrudEvent[BylCrudEvent.bylSaveCorrect]);
    //     }, 1000);
    // }

    resetButtonClick($event: MouseEvent) {
        $event.preventDefault();
        this.reset();

    }

    /**
     * 重置界面内容
     */
    reset() {
        this.form.reset({
            name: this._role.name,
            remarks: this._role.remarks
        },{onlySelf:true,emitEvent:false});

        this.form.markAsPristine();
        // for (const key in this.form.controls) {
        //     this.form.controls[key].markAsPristine();
        // }
        console.log('this.form.dirty'+ this.form.dirty);
        console.log('this.form.invalid'+ this.form.invalid);
    }

    /**
     * 验证角色名称是否重复
     * @param {FormControl} control
     * @returns {Observable<any>}
     */
    nameValidator = (control: FormControl): Observable<any> => {
        return control.valueChanges.pipe(
            debounceTime(1000),
            distinctUntilChanged(),
            flatMap((value) => {

                    console.log(value);
                    return this.roleService.checkNameAvailable(value);
                }
            ),
            map((data) => {
                    console.log(data);
                    if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                        if (data.data) {
                            return null;
                        } else {
                            return ({duplicate: true});
                        }

                    } else {

                        return ({other: true, msg: data.msg});

                    }

                },
            ),
            // catchError((err) => {
            //     console.log(err);
            //     return({other: true })
            // }),

            first()
        );
    }

    showSavingReveal() {
        this._savingReveal = this.modalService.open({
            title: '提交',
            zIndex: 9999, //最外层
            content: BylCrudWaitingComponent,
            // onOk() {
            //
            // },
            // onCancel() {
            //     console.log('Click cancel');
            // },
            footer: false,
            componentParams: {
                // name: '测试渲染Component'
            },
            maskClosable: false
        });
        this._savingReveal.next(BylCrudEvent[BylCrudEvent.bylSaving]);
        //
        this._savingReveal.subscribe(result => {
            console.log(result);
            //判断是否退出界面
            if(result === 'onDestroy'){
                console.log('退出提示界面');
                switch(this.processType){
                    case "new":
                        //新增界面
                        this._role = new Role();
                        this.reset();
                        break;
                    case "modify":
                        break;
                    default:
                        // 从list界面进入修改
                        console.log('this.modalSubject.destroy();');
                        //将修改后的数据传回list界面
                        this.modalSubject.next({type: BylCrudEvent[BylCrudEvent.bylUpdate],data: this._role});
                        this.modalSubject.destroy();

                }

            }
            // if (result === BylCrudEvent[BylCrudEvent.bylAdd]) {
            //     // 新增界面
            //     this._role = new Role();
            //     this.reset();
            // }


        });
    }
    destorySavingReveal(){
        if (this._savingReveal)  this._savingReveal.destroy();
    }

    showLoadingReveal() {

        this._savingReveal = this.modalService.open({
            title: '读取数据',
            content: BylCrudWaitingComponent,
            // onOk() {
            //
            // },
            // onCancel() {
            //     console.log('Click cancel');
            // },
            footer: false,
            componentParams: {
                // name: '测试渲染Component'
            },
            maskClosable: false
        });

        this._savingReveal.next(BylCrudEvent[BylCrudEvent.bylLoading]);

    }

    destoryLoadingReveal(){
        if (this._savingReveal)  this._savingReveal.destroy();
    }

    //#region get form fields
    get name() {
        return this.form.controls.name;
    }

    get remarks() {
        return this.form.controls.remarks;
    }

    //#endregion
}
