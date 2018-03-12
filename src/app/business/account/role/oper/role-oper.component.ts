import {Component, Input, OnInit} from '@angular/core';
import {RoleService} from "../../../../service/account/role.service";
import {ConfigService} from "../../../../service/constant/config.service";
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {Role} from "../../../../service/account/role.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {map, delay, debounceTime, flatMap, distinctUntilChanged, first} from 'rxjs/operators';
import {ResultBody} from "../../../../service/model/result.body.model";
import {_HttpClient} from "@delon/theme";
import {HttpClient} from "@angular/common/http";



@Component({
  selector: 'role-oper',
  templateUrl: './role-oper.component.html',
})
export class RoleOperComponent implements OnInit {
    role:Role;
    form: FormGroup;
    loading = false;

    @Input() sourceRole: Role;

    constructor(
        private http: HttpClient,
        private msgService: NzMessageService,
        private roleService: RoleService,
        private configService: ConfigService,
        private modal: NzModalService,
        private subject: NzModalSubject,
        private fb: FormBuilder

    ) { }

    ngOnInit() {
        //绑定验证模式
        this.form = this.fb.group({
            name: [null, Validators.compose([Validators.required, Validators.minLength(2)]), this.nameValidator.bind(this)],
            remarks: [null, []]
        });

        this.role = new Role();
        //本界面即支持新增，又支持修改和浏览
        //在修改或浏览的时候，支持从list界面调用的时候直接传入被修改的记录
        //
        if (this.sourceRole) {
            Object.assign(this.role, this.sourceRole);
        }
    }

    /**
     *
     */
    ok() {
        this.subject.next(this.role);
        this.cancel();
    }

    cancel() {
        this.subject.destroy();
    }

    /**
     * 保存
     */
    submitForm(){
        // tslint:disable-next-line:forin
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        console.log('log', this.form.value);
        if (this.form.valid) {
            this.msgService.success('Successed!');
        } else {
            this.msgService.error('Fail!');
        }
    }

    /**
     * 重置界面内容
     */
    reset(){

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
            flatMap((value) => {

                // if (!value) {
                //     return Observable.throw({ required: true });
                // }
                console.log(value);
                // return this.http.post<ResultBody<boolean>>('"/api/role/check-name-available"',value);
                return this.roleService.checkNameAvailable(value);
                // this.roleService.checkNameAvailable(value).subscribe(
                //     data => {
                //         console.log(data              );
                //         if (data.code === ResultBody.RESULT_CODE_SUCCESS) {
                //             control.setErrors(null);
                //             return Observable.throw(null);
                //         } else {
                //             control.setErrors({ duplicate: true, error: true });
                //             return Observable.throw({duplicate: true, error: true })
                //
                //         }
                //     },
                //     err => {
                //         console.log(err);
                //         control.setErrors({other: true, error: true ,msg: err});
                //         return Observable.throw({other: true, error: true, msg: err })
                //
                //     }
                // )
            }),
            // map((data) =>{
            //     console.log(data              );
            //     if (data.code === ResultBody.RESULT_CODE_SUCCESS) {
            //         // control.setErrors(null);
            //         return Observable.throw(null);
            //     } else {
            //         // control.setErrors({ duplicate: true, error: true });
            //         return Observable.throw({duplicate: true, error: true })
            //
            //     }
            //
            // }),
            first()
        );
    };

    getFormControl(name: string) {
        return this.form.controls[name];
    }

    //#region get form fields
    get name() { return this.form.controls.name; }
    get remarks() {return this.form.controls.remarks;}
    //#endregion


}
