import { SettingsService } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { SocialService, SocialOpenType, TokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { BylAuthService } from 'app/service/auth/auth.service';
import { BylResultBody } from 'app/service/model/result-body.model';
import { BylAuthDataService } from 'app/service/auth/auth-data.service';
import { ChatService } from 'app/service/chat/chat.service';
import {BylStartupService} from "../../../service/startup/startup.service";

@Component({
    selector: 'passport-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    providers: [SocialService]
})
export class BylUserLoginComponent implements OnDestroy {

    form: FormGroup;
    error = '';
    type = 0;
    loading = false;

    constructor(
        fb: FormBuilder,
        private router: Router,
        public msg: NzMessageService,
        private modalSrv: NzModalService,
        private settingsService: SettingsService,
        private socialService: SocialService,
        private authService: BylAuthService,
        private authDataService: BylAuthDataService,
        // private chatService: ChatService,
        @Optional() @Inject(ReuseTabService) private reuseTabService: ReuseTabService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
        private startupService: BylStartupService
    ) {
        this.form = fb.group({
            // userName: [null, [Validators.required, Validators.minLength(5)]],
            // password: [null, Validators.required],
            userName: [null, [Validators.required, Validators.minLength(5)]],
            password: [null, Validators.required],

            mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
            captcha: [null, [Validators.required]],
            remember: [true]
        });
        modalSrv.closeAll();
    }

    // region: fields

    get userName() { return this.form.controls.userName; }
    get password() { return this.form.controls.password; }
    get mobile() { return this.form.controls.mobile; }
    get captcha() { return this.form.controls.captcha; }

    // endregion

    switch(ret: any) {
        this.type = ret.index;
    }

    // region: get captcha

    count = 0;
    interval$: any;

    getCaptcha() {
        this.count = 59;
        this.interval$ = setInterval(() => {
            this.count -= 1;
            if (this.count <= 0)
                clearInterval(this.interval$);
        }, 1000);
    }

    // endregion

    submit() {
        this.error = '';
        if (this.type === 0) {
            this.userName.markAsDirty();
            this.userName.updateValueAndValidity();
            this.password.markAsDirty();
            this.password.updateValueAndValidity();
            if (this.userName.invalid || this.password.invalid) return;
        } else {
            this.mobile.markAsDirty();
            this.mobile.updateValueAndValidity();
            this.captcha.markAsDirty();
            this.captcha.updateValueAndValidity();
            if (this.mobile.invalid || this.captcha.invalid) return;
        }
        // mock http
        this.loading = true;

        this.loginInWithUsername();

        // mock http
        // setTimeout(() => {
        //     this.loading = false;
        //     if (this.type === 0) {
        //         if (this.userName.value !== 'admin' || this.password.value !== '888888') {
        //             this.error = `账户或密码错误`;
        //             return;
        //         }
        //     }

        //     // 清空路由复用信息
        //     this.reuseTabService.clear();
        //     this.tokenService.set({
        //         token: '123456789',
        //         name: this.userName.value,
        //         email: `cipchk@qq.com`,
        //         id: 10000,
        //         time: +new Date
        //     });
        //     this.router.navigate(['/']);
        // }, 1000);
    }

    // region: social

    open(type: string, openType: SocialOpenType = 'href') {
        let url = ``;
        let callback = ``;
        if (environment.production)
            callback = 'https://cipchk.github.io/ng-alain/callback/' + type;
        else
            callback = 'http://localhost:4200/callback/' + type;
        switch (type) {
            case 'auth0':
                url = `//cipchk.auth0.com/login?client=8gcNydIDzGBYxzqV0Vm1CX_RXH-wsWo5&redirect_uri=${decodeURIComponent(callback)}`;
                break;
            case 'github':
                url = `//github.com/login/oauth/authorize?client_id=9d6baae4b04a23fcafa2&response_type=code&redirect_uri=${decodeURIComponent(callback)}`;
                break;
            case 'weibo':
                url = `https://api.weibo.com/oauth2/authorize?client_id=1239507802&response_type=code&redirect_uri=${decodeURIComponent(callback)}`;
                break;
        }
        if (openType === 'window') {
            this.socialService.login(url, '/', {
                type: 'window'
            }).subscribe(res => {
                if (res) {
                    this.settingsService.setUser(res);
                    this.router.navigateByUrl('/');
                }
            });
        } else {
            this.socialService.login(url, '/', {
                type: 'href'
            });
        }
    }

    // endregion

    ngOnDestroy(): void {
        if (this.interval$) clearInterval(this.interval$);
    }

    loginInWithUsername() {
        this.authService.login(this.userName.value, this.password.value).subscribe(
            data => {
                this.loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                    this.authDataService.Account = data.data.account;
                    this.authDataService.Token = data.data.token;

                    console.log('login return token:',data.data.token);

                    // 清空路由复用信息
                    this.reuseTabService.clear();
                    if (this.tokenService.set({
                        token: this.authDataService.Token,
                        name: this.authDataService.Account.username,
                        email: this.authDataService.Account.email,
                        id: this.authDataService.Account.id,
                        time: +new Date // 当前时间转化成number todo any useful?
                    })) {
                        //重新初始化系统配置
                        this.startupService.load().then(() => {
                            // this.chatService.initAndConnect(); // todo 是否启用 chat Service
                            this.router.navigate(['/']);
                        }).catch(
                            (err) => {
                                console.error(err);
                                this.error = err;
                            });
                    }else{
                        let err = "保存token到本地缓存失败！";
                        console.error(err);
                        this.error = err;

                    }

                } else {
                    console.error(data.msg);
                    this.error = data.msg;
                }
            },
            err => {
                this.loading = false;
                console.error(err);
                this.error = err.toString();
            }

        );

    }
}
