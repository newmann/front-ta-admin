import { BylServiceModule } from './service/service.module';
import { NgModule, LOCALE_ID, APP_INITIALIZER, Injector } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DelonModule } from './delon.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';

// import { LayoutModule } from './layout/layout.module';
import { StartupService } from '@core/startup/startup.service';
import { DefaultInterceptor } from '@core/net/default.interceptor';
// import { SimpleInterceptor } from '@delon/auth';
// angular i18n
import { registerLocaleData } from '@angular/common';
import localeZh from '@angular/common/locales/zh';
registerLocaleData(localeZh);
// i18n
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ALAIN_I18N_TOKEN } from '@delon/theme';
import { I18NService } from '@core/i18n/i18n.service';
import {ITokenService, JWTInterceptor} from '@delon/auth';
import { BYL_API_URL_LOGIN } from 'app/service/constant/backend-url.constant';
import {BylBusinessModule} from "./business/business.module";
// third
import { UEditorModule } from 'ngx-ueditor';
import { NgxTinymceModule } from 'ngx-tinymce';
// JSON-Schema form
import { JsonSchemaModule } from '@shared/json-schema/json-schema.module';
import {BylBusinessSharedModule} from './business/business-shared.module';
import {BylStartupService} from './service/startup/startup.service';
import {BylFrameModule} from "./frame/frame.module";



// 加载i18n语言文件
export function I18nHttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, `assets/tmp/i18n/`, '.json');
}

// export function StartupServiceFactory(startupService: StartupService): Function {
//     return () => startupService.load();
// }

export function BylStartupServiceFactory(startupService: BylStartupService): Function {
    return () => startupService.load();
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        DelonModule.forRoot(),
        CoreModule,
        BylServiceModule, // 自定义服务模块
        SharedModule,
        // LayoutModule,
        BylFrameModule,
        BylBusinessModule,
        BylBusinessSharedModule,
        // i18n
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: I18nHttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        // thirds
        UEditorModule.forRoot({
            // **注：** 建议使用本地路径；以下为了减少 ng-alain 脚手架的包体大小引用了CDN，可能会有部分功能受影响
            js: [
                `//apps.bdimg.com/libs/ueditor/1.4.3.1/ueditor.config.js`,
                `//apps.bdimg.com/libs/ueditor/1.4.3.1/ueditor.all.min.js`,
            ],
            options: {
                UEDITOR_HOME_URL: `//apps.bdimg.com/libs/ueditor/1.4.3.1/`,
            },
        }),

        // UEditorModule.forRoot({
        //     // **注：** 建议使用本地路径；以下为了减少 ng-alain 脚手架的包体大小引用了CDN，可能会有部分功能受影响
        //     // 指定ueditor.js路径目录
        //     path: '//apps.bdimg.com/libs/ueditor/1.4.3.1/',
        //     // 默认全局配置项
        //     options: {
        //         themePath: '//apps.bdimg.com/libs/ueditor/1.4.3.1/themes/'
        //     }
        // }),
        NgxTinymceModule.forRoot({
            baseURL: '//cdn.bootcss.com/tinymce/4.7.4/'
        }),
        // JSON-Schema form
        JsonSchemaModule

    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'zh-Hans' },
        // { provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true},
        { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true}, // 全程采用jwt格式的token
        { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true},
        { provide: ALAIN_I18N_TOKEN, useClass: I18NService, multi: false },
        BylStartupService,
        {
            provide: APP_INITIALIZER,
            useFactory: BylStartupServiceFactory,
            deps: [BylStartupService],
            multi: true
        }

        // StartupService,
        // {
        //     provide: APP_INITIALIZER,
        //     useFactory: StartupServiceFactory,
        //     deps: [StartupService],
        //     multi: true
        // }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
