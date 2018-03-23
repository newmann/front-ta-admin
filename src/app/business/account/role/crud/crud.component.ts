import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {NzMessageService, NzModalService, NzModalSubject} from 'ng-zorro-antd';
import {RoleService} from '../../../../service/account/role.service';
import {catchError, debounceTime, distinctUntilChanged, first, flatMap, map} from 'rxjs/operators';
import {ResultBody} from '../../../../service/model/result.body.model';
import {Observable} from 'rxjs/Observable';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfigService} from '../../../../service/constant/config.service';
import {Role, RoleStatus} from '../../../../service/account/role.model';
import {HttpClient} from '@angular/common/http';
import {WaitingComponent} from '../../../common/waiting/waiting.component';
import {BylCrudEvent, BylCRUDWaitingComponent} from '../../../common/waiting/crud-waiting.component';
import {ReuseTabService} from '@delon/abc';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'role-crud',
    templateUrl: './crud.component.html',
})
export class RoleCrudComponent implements OnInit, OnChanges {
    private _role: Role;
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

    @Input() sourceRole: Role;

    private processRoleId: string;

    constructor(public msgService: NzMessageService,
                public roleService: RoleService,
                public configService: ConfigService,
                public modalService: NzModalService,
                public modalSubject: NzModalSubject,
                public reuseTabService: ReuseTabService,
                private activatedRoute: ActivatedRoute,
                public fb: FormBuilder) {
        // 绑定验证模式
        this.form = this.fb.group({
            name: [null, Validators.compose([Validators.required, Validators.minLength(2)]), this.nameValidator],
            remarks: [null]
        });

        // 获取传入的角色名称
        this.activatedRoute
            .queryParams
            .subscribe(params => {
                console.log(params['id']);
                this.processRoleId = params['id'] || ''; });
    }

    ngOnInit() {


        // 本界面即支持新增，又支持修改和浏览
        // 在修改或浏览的时候，支持从list界面调用的时候直接传入被修改的记录
        //
        if (this.processRoleId.length === 0) {
            // 设置Tab的title
            this.reuseTabService.title = '新增角色';
            this._role = new Role();

        }else{
            // Object.assign(this._role, this.sourceRole);
            this.reuseTabService.title = `修改角色- ${this._role.name}`;
            // todo 从后台载入数据
            this._role = new Role();
        }

    }

    ngOnChanges() {
        this.reset();
    }

    /**
     * 用于list调用
     */
    ok() {
        this.modalSubject.next(this._role);
        this.cancel();
    }

    cancel() {
        this.modalSubject.destroy();
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
                if (data.code === ResultBody.RESULT_CODE_SUCCESS) {
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

    showButtonClick() {
        this.showSavingReveal();
        setTimeout(() => {
            console.log(BylCrudEvent[BylCrudEvent.bylSaveCorrect]);
            this._savingReveal.next(BylCrudEvent[BylCrudEvent.bylSaveCorrect]);
        }, 1000);
    }

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
        });
        for (const key in this.form.controls) {
            this.form.controls[key].markAsPristine();
        }
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
                    if (data.code === ResultBody.RESULT_CODE_SUCCESS) {
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
            content: BylCRUDWaitingComponent,
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
        //
        this._savingReveal.subscribe(result => {
            console.log(result);
            if (result === BylCrudEvent[BylCrudEvent.bylAdd]) {
                // 新增界面
                this._role = new Role();
                this.reset();
            }


        });
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
