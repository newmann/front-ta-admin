import { SettingsService } from '@delon/theme';
import {Component, OnDestroy, Inject, Optional, OnInit} from '@angular/core';
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
import {BylOAuthRegisterModel} from "../../../service/auth/oauth-register.model";
import {CacheService} from "@delon/cache";
import {BylOAuthTokenQueryModel} from "../../../service/auth/oauth-token-query.model";
import {BYL_OAUTH_CODE_LOCAL_KEY} from "../../../service/constant/general.constant";

@Component({
    selector: 'byl-oauth-register',
    templateUrl: './oauth-register.component.html',
    styleUrls: ['./oauth-register.component.less'],
    providers: [SocialService]
})
export class BylOAuthRegisterComponent implements OnInit,OnDestroy {

    form: FormGroup;
    error = '';
    type = 0;
    loading = false;

    oauthCode: string;

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
        private cacheService: CacheService
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

    ngOnInit(): void {
        //在这里去除本地缓存中的code，如果不存在，则提示错误，重新登陆
        // let tokenQuery = new BylOAuthTokenQueryModel();
        let tokenQuery = this.cacheService.getNone<BylOAuthTokenQueryModel>(BYL_OAUTH_CODE_LOCAL_KEY);

        if(tokenQuery){
            this.oauthCode = tokenQuery.code;
        }else{
            console.error("In OAuth register component,没有找到第三方平台的code。重新登陆。 ");
            this.router.navigate(['/passport/login']);
        }

    }


    // region: fields

    get userName() { return this.form.controls.userName; }
    get password() { return this.form.controls.password; }
    get mobile() { return this.form.controls.mobile; }
    get captcha() { return this.form.controls.captcha; }




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

    }


    ngOnDestroy(): void {

    }

    loginInWithUsername() {

        let oauthRegister = new BylOAuthRegisterModel();
        oauthRegister.code= this.oauthCode;
        oauthRegister.username = this.userName.value;
        oauthRegister.password = this.password.value;
        this.authService.githubRegister(oauthRegister).subscribe(
            data => {
                this.loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {

                    //删除本地存储的code
                    this.cacheService.remove(BYL_OAUTH_CODE_LOCAL_KEY);

                    //显示登录成功结果，提示重新登录
                    this.router.navigate(["/passport/oauth-register-result"]);


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
