import {Component, Input, OnInit} from '@angular/core';
import {RoleService} from "../../../../service/account/service/role.service";
import {BylConfigService} from "../../../../service/constant/config.service";
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {Role} from "../../../../service/account/model/role.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {map, delay, debounceTime, flatMap, distinctUntilChanged, first, catchError} from 'rxjs/operators';
import {BylResultBody} from "../../../../service/model/result-body.model";
import {_HttpClient} from "@delon/theme";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs/observable/of";



@Component({
  selector: 'role-oper',
  templateUrl: './role-oper.component.html',
})
export class RoleOperComponent implements OnInit {
    role:Role;
    form: FormGroup;
    loading = false;
    testResult = '';
    test(){
        this.roleService.checkNameAvailable('test').subscribe(
            (data) => {
                console.log(data);
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                    // control.setErrors(null);
                    // return Observable.throw(null);
                    this.testResult = "不重复";
                } else {
                    // control.setErrors({ duplicate: true, error: true });
                    this.testResult = "重复了";
                    // return Observable.throw({duplicate: true, error: true })

                }
            }
        )
    }

    @Input() sourceRole: Role;

    constructor(
        private http: HttpClient,
        private msgService: NzMessageService,
        private roleService: RoleService,
        private configService: BylConfigService,
        private modal: NzModalService,
        private subject: NzModalSubject,
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
            flatMap((value) =>
                {

                // if (!value) {
                //     return Observable.throw({ required: true });
                // }
                console.log(value);
                // return this.http.post<BylResultBody<boolean>>('"/api/role/check-name-available"',value);
                return this.roleService.checkNameAvailable(value);
            }
            ),
            map((data) =>{
                console.log(data              );
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                    // control.setErrors(null);
                    // return Observable.throw(null);
                    return null;
                } else {
                    // control.setErrors({ duplicate: true, error: true });
                    return({ duplicate: true });
                    // return Observable.throw({duplicate: true, error: true })

                }

            },
                // catchError((err) => {
                //     console.log(err);
                //     return of({})
                // })
            ),
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
