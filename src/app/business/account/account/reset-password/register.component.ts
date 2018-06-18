import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {BylAuthService} from "../../../../service/auth/auth.service";
import {BylAccountService} from "../../../../service/account/service/account.service";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {BylAccount} from "../../../../service/account/model/account.model";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";

@Component({
    selector: 'byl-reset-password',
    templateUrl: './register.component.html'
    ,
    styleUrls: ['./register.component.less']
})
export class BylResetPasswordComponent implements OnInit {

    // sourceId: string; //当前账户的id，根据这个id取出相应的记录.
    @Input()
    account: BylAccount = new BylAccount(); //当前账户

    form: FormGroup;
    error = '';
    type = 0;
    loading = false;
    visible = false;
    status = 'pool';
    progress = 0;
    passwordProgressMap = {
        ok: 'success',
        pass: 'normal',
        pool: 'exception'
    };

    constructor(fb: FormBuilder,
                private router: Router,
                public msg: NzMessageService,
                private accountService: BylAccountService) {
        this.form = fb.group({
            old: [null, [Validators.required]],
            password: [null, [Validators.required, Validators.minLength(6), BylResetPasswordComponent.checkPassword.bind(this)]],
            confirm: [null, [Validators.required, Validators.minLength(6), BylResetPasswordComponent.passwordEquar]],
        });
    }

    ngOnInit(): void {
        // if (this.sourceId){
        //     this.accountService.findById(this.sourceId).subscribe(
        //         data => {
        //             this.loading = false;
        //             if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
        //                 simpleDeepCopy(this.account, data.data);
        //                 // this.router.navigate(['/passport/register-result']);
        //
        //             } else {
        //                 this.error = data.msg;
        //             }
        //         },
        //         err => {
        //             this.loading = false;
        //             console.log(err);
        //             this.error = err.toString();
        //         }
        //     )
        // }

    }


    static checkPassword(control: FormControl) {
        if (!control) return null;
        const self: any = this;
        self.visible = !!control.value;
        if (control.value && control.value.length > 9)
            self.status = 'ok';
        else if (control.value && control.value.length > 5)
            self.status = 'pass';
        else
            self.status = 'pool';

        if (self.visible) self.progress = control.value.length * 10 > 100 ? 100 : control.value.length * 10;
    }

    static passwordEquar(control: FormControl) {
        if (!control || !control.parent) return null;
        if (control.value !== control.parent.get('password').value) {
            return {equar: true};
        }
        return null;
    }

    // region: fields
    get old() {
        return this.form.controls.old;
    }

    get password() {
        return this.form.controls.password;
    }

    get confirm() {
        return this.form.controls.confirm;
    }

    // endregion

    // region: get captcha


    // endregion

    submit() {
        if(! this.account){
            this.error = "没有设置当前账户，不能修改密码。";
            return;
        }

        this.error = '';
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        if (this.form.invalid) return;

        this.loading = true;
        console.log("begin to reset password..");
        // this.auth.emailRegister(this.mail.value, this.password.value, this.mobile.value).subscribe(
        this.accountService.resetPassword(this.account, this.old.value, this.password.value).subscribe(
            data => {
                this.loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                    this.reset()
                    // this.router.navigate(['/passport/register-result']);

                } else {
                    this.error = data.msg;
                }
            },
            err => {
                this.loading = false;
                console.log(err);
                this.error = err.toString();
            }
        );


    }

    reset(){
        this.password.reset( null);
        this.confirm.reset(null);

    }

}
