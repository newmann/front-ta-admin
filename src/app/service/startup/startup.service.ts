import {Injectable, Injector, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {zip} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN} from '@delon/theme';
import {ACLService} from '@delon/acl';
import {TranslateService} from '@ngx-translate/core';
import {I18NService} from '@core/i18n/i18n.service';
import {DA_SERVICE_TOKEN, ITokenModel, ITokenService, JWTTokenModel, SimpleTokenModel} from '@delon/auth';
import {CacheService} from '@delon/cache';

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
                @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    load(): Promise<any> {
        // only works with promises
        // https://github.com/angular/angular/issues/15088
        return new Promise((resolve, reject) => {
            //todo delon的bug，先获取简单token，判断是否有效后再按JWTtoken方式获取
            let s: SimpleTokenModel;
            s = this.tokenService.get();
            console.log('IN AppComponent, SimpleTokenModel:', s);
            if (s.token) {
                //如果token有效，则获取本地的资源，恢复到上次退出状态。
                let token: JWTTokenModel;
                token = this.tokenService.get<JWTTokenModel>(JWTTokenModel);

                if (token.token) {
                    if (!token.isExpired(0)) {
                        zip(
                            this.httpClient.get(SETTING_LANG),
                            this.httpClient.get(SETTING_APP),
                            // this.cacheService.get(SETTING_LANG,{mode:"promise", type: "m"}),
                            // this.cacheService.get(SETTING_APP,{mode:"promise", type: "m"})
                        ).pipe(
                            // 接收其他拦截器后产生的异常消息
                            catchError(([langData, appData]) => {
                                resolve(null);
                                return [langData, appData];
                            })
                        ).subscribe(([lang, app]) => {
                                console.log('In startup service，获取本地缓存...');
                                // const lang = this.cacheService.get(SETTING_LANG);
                                console.log('lang:', lang);
                                // const app: any = this.cacheService.get(SETTING_APP);
                                console.log('app:', app);

                                // setting language data
                                this.translate.setTranslation(this.i18n.defaultLang, lang);
                                this.translate.setDefaultLang(this.i18n.defaultLang);

                                // 应用信息：包括站点名、描述、年份
                                this.settingService.setApp(app.app);
                                // 用户信息：包括姓名、头像、邮箱地址
                                this.settingService.setUser(app.user);
                                // ACL：设置权限为全量
                                this.aclService.setFull(true);
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
            }
            resolve(null); //todo why?
        });
    }
}
