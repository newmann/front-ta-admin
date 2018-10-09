import {Injectable, Injector, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {zip} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN, User} from '@delon/theme';
import {ACLCanType, ACLService, ACLType} from '@delon/acl';
import {TranslateService} from '@ngx-translate/core';
import {I18NService} from '@core/i18n/i18n.service';
import {DA_SERVICE_TOKEN, ITokenModel, ITokenService, JWTTokenModel, SimpleTokenModel} from '@delon/auth';
import {CacheService} from '@delon/cache';
import {BylAccountService} from "../account/service/account.service";
import {BylAccount} from "../account/model/account.model";
import {BylAuthDataService} from "../auth/auth-data.service";

const SETTING_LANG = 'assets/tmp/i18n/zh-CN.json';
const SETTING_APP = 'assets/tmp/app-data.json';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class BylStartupService {
    constructor(private menuService: MenuService,
                private translate: TranslateService,
                @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
                private settingService: SettingsService,
                private aclService: ACLService,
                private titleService: TitleService,
                private httpClient: HttpClient,
                private injector: Injector,
                private cacheService: CacheService,
                private authDataService: BylAuthDataService,
                private accountService: BylAccountService,
                @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    saveTokenToLocal(token:string,accountId: string, username: string, email: string): boolean{
        return this.tokenService.set({
            token: token,
            name: username,
            email: email,
            id: accountId,
            time: +new Date // 当前时间转化成number todo any useful?
        });
    }


    load(): Promise<any> {
        // only works with promises
        // https://github.com/angular/angular/issues/15088
        return new Promise((resolve, reject) => {
            //todo delon的bug，先获取简单token，判断是否有效后再按JWTtoken方式获取
            let s: SimpleTokenModel;
            s = this.tokenService.get();
            console.log('IN StartupService, load() token:', s);
            if (s.token) {
                //如果token有效，则获取本地的资源，恢复到上次退出状态。
                let token: JWTTokenModel;

                try{
                    console.log('IN StartupService, load() token:', "开始解析token");
                    token = this.tokenService.get<JWTTokenModel>(JWTTokenModel);



                    if (token.token) {
                        if (!token.isExpired(0)) {
                            console.log("In Startup service：", token);
                            zip(
                                this.httpClient.get(SETTING_LANG),
                                this.httpClient.get(SETTING_APP),

                                this.accountService.loginByAccountId(token.id),
                                // this.cacheService.get(SETTING_LANG,{mode:"promise", type: "m"}),
                                // this.cacheService.get(SETTING_APP,{mode:"promise", type: "m"})
                            ).pipe(
                                // 接收其他拦截器后产生的异常消息
                                catchError(([langData, appData]) => {
                                    resolve(null);
                                    return [langData, appData];
                                })
                            ).subscribe(([lang, app, loginResultBody]) => {
                                    // console.log('In startup service，获取本地缓存...');
                                    // // const lang = this.cacheService.get(SETTING_LANG);
                                    // console.log('lang:', lang);
                                    // // const app: any = this.cacheService.get(SETTING_APP);
                                    // console.log('app:', app);

                                    // setting language data
                                    this.translate.setTranslation(this.i18n.defaultLang, lang);
                                    this.translate.setDefaultLang(this.i18n.defaultLang);

                                    // 应用信息：包括站点名、描述、年份
                                    this.settingService.setApp(app.app);

                                    console.log('IN StartupService, loginByAccountId:', loginResultBody);

                                    this.authDataService.Account = loginResultBody.data.account;
                                    this.authDataService.Token = loginResultBody.data.token;
                                    //将最新的token保存到本地
                                    this.saveTokenToLocal(
                                        this.authDataService.Token,
                                        this.authDataService.Account.id,
                                        this.authDataService.Account.username,
                                        this.authDataService.Account.email);

                                    // 用户信息：包括姓名、头像、邮箱地址
                                    let user : User;
                                    let account: BylAccount = loginResultBody.data.account;

                                    user = {name: account.fullName, avatar:null, email: account.email};
                                    this.settingService.setUser(user);

                                    // this.settingService.setUser(app.user);
                                    if(account.fullName === "admin"){
                                        //ACL：设置权限为全量
                                        this.aclService.setFull(true);
                                        console.log('IN StartupService, admin login.');
                                    }else{
                                        //获取权限
                                        this.aclService.setAbility(loginResultBody.data.abilities);
                                        // console.log('IN StartupService, load() abilities:', this.aclService.data);

                                    }

                                    // ACL：设置权限为全量
                                    // this.aclService.setFull(true);
                                    // 初始化菜单

                                    this.menuService.add(app.menu);

                                    // 设置页面标题的后缀
                                    this.titleService.suffix = app.app.name;
                                },
                                () => {
                                },
                                () => {
                                    resolve(null);
                                });
                        }
                    }
                } catch (e) {
                    //出现这种情况，可能是第三方平台登陆的时候需要用到过渡的token，所以直接跳过
                    console.warn('IN StartupService, ', e);
                }
            }
            resolve(null); //todo why?
        });
    }

    can(roleOrAbility: ACLCanType): boolean {
        // if (this.full === true || !roleOrAbility) {
        //     return true;
        // }

        let t: ACLType = {};
        if (typeof roleOrAbility === 'number') {
            t = { ability: [roleOrAbility] };
        } else if (
            Array.isArray(roleOrAbility) &&
            roleOrAbility.length > 0 &&
            typeof roleOrAbility[0] === 'number'
        ) {
            t = { ability: roleOrAbility };
        } else {
            t = this.parseACLType(roleOrAbility);
        }
        console.log('can:', t);

        if (t.role) {
            if (t.mode === 'allOf') return t.role.every(v => this.aclService.data.roles.includes(v));
            else return t.role.some(v => this.aclService.data.roles.includes(v));
        }
        if (t.ability) {
            if (t.mode === 'allOf')
                return (t.ability as any[]).every(v => this.aclService.data.abilities.includes(v));
            else return (t.ability as any[]).some(v => this.aclService.data.abilities.includes(v));
        }
        return false;
    }

    private parseACLType(val: string | string[] | ACLType): ACLType {
        if (typeof val !== 'string' && !Array.isArray(val)) {
            return <ACLType>val;
        }
        if (Array.isArray(val)) {
            return <ACLType>{ role: <string[]>val };
        }
        return <ACLType>{
            role: [val],
        };
    }

    /** @inner */
    parseAbility(value: ACLCanType): ACLCanType {
        if (
            typeof value === 'number' ||
            typeof value === 'string' ||
            Array.isArray(value)
        ) {
            value = <ACLType>{ ability: Array.isArray(value) ? value : [value] };
        }
        delete value.role;
        return value;
    }
}

