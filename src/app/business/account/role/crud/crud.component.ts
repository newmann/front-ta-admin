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


@Component({
    selector: 'byl-role-crud',
    templateUrl: './crud.component.html',
})
export class BylRoleCrudComponent extends BylCrudComponentBase<BylRole> {
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

    @Input()
    set setSourceId(value: string) {
        this.sourceId = value;

    }

    newBusinessData(): BylRole {
        return new BylRole();
    }
    defineForm(): void {
        // 绑定验证模式
        this.form = this.fb.group({
            name: [null, Validators.compose([Validators.required, Validators.minLength(2)]), this.nameValidator],
            remarks: [null]
        });


    }
    constructor(public msgService: NzMessageService,
                public roleService: BylRoleService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                // public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService,
                public fb: FormBuilder) {
        super(msgService, configService, /*modalService, modalSubject, */activatedRoute, reuseTabService, fb);

        this.businessService = roleService;

    }

    // constructor(public msgService: NzMessageService,
    //             public roleService: BylRoleService,
    //             public configService: BylConfigService,
    //             public modalService: NzModalService,
    //             public modalSubject: NzModalSubject,
    //             public reuseTabService: ReuseTabService,
    //             private activatedRoute: ActivatedRoute,
    //             private logger: BylLoggerService,
    //             public fb: FormBuilder) {
    //     // 绑定验证模式
    //     this.form = this.fb.group({
    //         name: [null, Validators.compose([Validators.required, Validators.minLength(2)]), this.nameValidator],
    //         remarks: [null]
    //     });
    //
    //
    //     this.activatedRoute
    //         .paramMap
    //         .subscribe(params => {
    //             console.log(params);
    //             console.log(params.get('type'));
    //             this.processType = params.get('type') || '';
    //
    //         });
    //
    // }

    // ngOnInit() {
    //     super.ngOnInit();
    //
    //     //在从list窗口调入的情况下，载入数据
    //     //在从list窗口调入的情况下，载入数据
    //     console.info('sourceId', this.sourceId);
    //     if (this.sourceId) {
    //         this.loadData(this.sourceId);
    //     } else {
    //         //界面显示
    //         this.reset();
    //     }
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
            name: this.businessData.name,
            remarks: this.businessData.remarks
        }, {onlySelf: true, emitEvent: false});

        this.form.markAsPristine();
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
    getFormData() {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        console.table(this.form.value);
        Object.assign(this.businessData, this.form.value);


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



    //#region get form fields
    get name() {
        return this.form.controls.name;
    }

    get remarks() {
        return this.form.controls.remarks;
    }

    //#endregion
}
