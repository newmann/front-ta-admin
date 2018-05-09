import {Injectable, Injector, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {zip} from 'rxjs/observable/zip';
import {catchError} from 'rxjs/operators';
import {MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN} from '@delon/theme';
import {ACLService} from '@delon/acl';
import {TranslateService} from '@ngx-translate/core';
import {I18NService} from "@core/i18n/i18n.service";
import {DA_SERVICE_TOKEN, ITokenModel, ITokenService, JWTTokenModel} from "@delon/auth";


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
                @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    load(): Promise<any> {
        // only works with promises
        // https://github.com/angular/angular/issues/15088
        return new Promise((resolve, reject) => {
            let token: JWTTokenModel;
            token = this.tokenService.get<JWTTokenModel>();
            if (token.isExpired()) {

            }

        });
    }
}
