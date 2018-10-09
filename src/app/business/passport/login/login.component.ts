import {ALAIN_I18N_TOKEN, MenuService, SettingsService, TitleService, User} from '@delon/theme';
import {Component, Inject, OnDestroy, Optional} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {DA_SERVICE_TOKEN, SocialOpenType, SocialService, TokenService} from '@delon/auth';
import {ReuseTabService} from '@delon/abc';
import {environment} from '@env/environment';
import {BylAuthService} from 'app/service/auth/auth.service';
import {BylResultBody} from 'app/service/model/result-body.model';
import {BylAuthDataService} from 'app/service/auth/auth-data.service';
import {BylStartupService} from "../../../service/startup/startup.service";
import {catchError} from "rxjs/operators";
import {zip} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BylConfigService} from "../../../service/constant/config.service";
import {TranslateService} from "@ngx-translate/core";
import {I18NService} from "@core/i18n/i18n.service";
import {ACLService} from "@delon/acl";

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
        private settingService: SettingsService,
        @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
        private translate: TranslateService,
        private menuService: MenuService,
        private aclService: ACLService,
        private titleService: TitleService,
        private socialService: SocialService,
        private authService: BylAuthService,
        private httpClient: HttpClient,
        private authDataService: BylAuthDataService,
        private configService: BylConfigService,
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
            callback = 'http://47.97.171.101/passport/callback/' + type;
        else
            callback = 'http://localhost/passport/callback/' + type;
        switch (type) {
            case 'auth0':
                url = `//cipchk.auth0.com/login?client=8gcNydIDzGBYxzqV0Vm1CX_RXH-wsWo5&redirect_uri=${decodeURIComponent(callback)}`;
                break;
            case 'github':
                url = `//github.com/login/oauth/authorize?client_id=f4815a190992f5ef2cd6&response_type=code&redirect_uri=${decodeURIComponent(callback)}`;
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
                    this.settingService.setUser(res);
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
                    this.aclService.setAbility(data.data.abilities);

                    console.log('login return token:',data.data.token);

                    // 清空路由复用信息
                    this.reuseTabService.clear();
                    if (this.startupService.saveTokenToLocal(
                        this.authDataService.Token,
                        this.authDataService.Account.id,
                        this.authDataService.Account.username,
                        this.authDataService.Account.email)) {
                        //重新初始化系统配置
                        zip(
                            this.httpClient.get(this.configService.SETTING_LANG),
                            this.httpClient.get(this.configService.SETTING_APP),

                        ).pipe(
                            // 接收其他拦截器后产生的异常消息
                            catchError(([langData, appData]) => {
                                return [langData, appData];
                            })
                        ).subscribe(([lang, app]) => {
                                // setting language data
                                this.translate.setTranslation(this.i18n.defaultLang, lang);
                                this.translate.setDefaultLang(this.i18n.defaultLang);

                                // 应用信息：包括站点名、描述、年份
                                this.settingService.setApp(app.app);

                                // 用户信息：包括姓名、头像、邮箱地址
                                let user : User;
                                user = {name: this.authDataService.Account.fullName, avatar:null, email: this.authDataService.Account.email};
                                this.settingService.setUser(user);

                                this.menuService.add(app.menu);

                                // 设置页面标题的后缀
                                this.titleService.suffix = app.app.name;

                                this.router.navigateByUrl('/');
                            },
                            (err) => {
                                console.error(err);
                                }
                            );

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
