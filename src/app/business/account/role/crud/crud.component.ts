import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {RoleService} from "../../../../service/account/role.service";
import {catchError, debounceTime, distinctUntilChanged, first, flatMap, map} from "rxjs/operators";
import {ResultBody} from "../../../../service/model/result.body.model";
import {Observable} from "rxjs/Observable";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfigService} from "../../../../service/constant/config.service";
import {Role, RoleStatus} from "../../../../service/account/role.model";
import {HttpClient} from "@angular/common/http";
import {WaitingComponent} from "../../../common/waiting/waiting.component";

@Component({
  selector: 'role-crud',
  templateUrl: './crud.component.html',
})
export class RoleCrudComponent implements OnInit,OnChanges {
    role:Role;
    form: FormGroup;
    loading = false;
    errMsg = ""; //保存时错误信息
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
    showSaving: any;

    @Input() sourceRole: Role;

    constructor(
        private http: HttpClient,
        private msgService: NzMessageService,
        private roleService: RoleService,
        private configService: ConfigService,
        private modalService: NzModalService,
        private modalSubject: NzModalSubject,
        private fb: FormBuilder

    ) {
        //绑定验证模式
        this.form = this.fb.group({
            name: [null, Validators.compose([Validators.required, Validators.minLength(2)]), this.nameValidator],
            remarks: [null]
        });
    }

    ngOnInit() {


        this.role = new Role();
        //本界面即支持新增，又支持修改和浏览
        //在修改或浏览的时候，支持从list界面调用的时候直接传入被修改的记录
        //
        if (this.sourceRole) {
            Object.assign(this.role, this.sourceRole);
        }
    }
    ngOnChanges(){
        this.reset();
    }

    /**
     * 用于list调用
     */
    ok() {
        this.modalSubject.next(this.role);
        this.cancel();
    }

    cancel() {
        this.modalSubject.destroy();
    }

    /**
     * 保存
     */
    submitForm(){
        this.showWaiting();
        this.loading = true;
        this.errMsg = "";
        // tslint:disable-next-line:forin
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        console.log('log', this.form.value);
        this.role.name = this.name.value.toString();

        if (this.remarks.value) {
            this.role.remarks = this.remarks.value.toString();
        }

        //设置保存的对象状态
        this.role.status = RoleStatus.NORMAL_ROLE;

        this.roleService.add(this.role).subscribe(
            data => {
                this.loading = false;
                if (data.code === ResultBody.RESULT_CODE_SUCCESS) {

                    this.showSaving.destroy();
                    // this.msgService.success('保存正确！');
                    //如果是通过浏览界面进入，则自动退出

                } else {
                    this.showSaving.destroy();
                    this.errMsg = data.msg;
                }
            },
            err => {
                this.loading = false;
                console.log(err);
                this.errMsg = err.toString();

                this.showSaving.destroy();
            }
        );
    }
    saveButtonClick(){

    }
    resetButtonClick($event: MouseEvent) {
        $event.preventDefault();
        this.reset();
        for (const key in this.form.controls) {
            this.form.controls[ key ].markAsPristine();
        }
    }
    /**
     * 重置界面内容
     */
    reset(){
        this.form.reset({
            name: this.role.name,
            remarks: this.role.remarks
        })

    }

    /**
     * 验证角色名称是否重复
     * @param {FormControl} control
     * @returns {Observable<any>}
     */
    nameValidator = (control: FormControl): Observable<any>  => {
        return control.valueChanges.pipe(
            debounceTime(1000),
            distinctUntilChanged(),
            flatMap((value) =>
                {

                    console.log(value);
                    return this.roleService.checkNameAvailable(value);
                }
            ),
            map((data) =>{
                    console.log(data              );
                    if (data.code === ResultBody.RESULT_CODE_SUCCESS) {
                        if (data.data){
                            return null;
                        }else{
                            return({ duplicate: true });
                        }

                    } else {

                        return({ other: true, msg: data.msg });

                    }

                },
            ),
            // catchError((err) => {
            //     console.log(err);
            //     return({other: true })
            // }),

            first()
        );
    };

    showWaiting() {
        this.showSaving = this.modalService.open({
            title          : '对话框标题',
            content        : WaitingComponent,
            onOk() {
            },
            onCancel() {
                console.log('Click cancel');
            },
            footer         : false,
            componentParams: {
                name: '测试渲染Component'
            },
            maskClosable: false
        });

        this.showSaving.subscribe(result => {
            console.log(result);
        })
    }

    //#region get form fields
    get name() { return this.form.controls.name; }
    get remarks() {return this.form.controls.remarks;}
    //#endregion
}
