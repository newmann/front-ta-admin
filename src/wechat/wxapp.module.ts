/**
 *  @Author: xinsh
 * @Description: 微信客户端的入口文件
 *  @Date: Created in  16:05 2018/4/10.
 */

import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { WeUiModule } from 'ngx-weui';
import { NotifyModule } from 'ngx-notify';


import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { RoutesModule } from './routes/routes.module';
import { CoreModule } from './core/core.module';
import { JsonpModule } from '@angular/http';
import {WxAppComponent} from './wxapp.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        JsonpModule,
        CoreModule,
        SharedModule,
        RoutesModule,
        LayoutModule,
        WeUiModule.forRoot(),
        NotifyModule.forRoot({
            notify: {
                progress: false
            }
        })
    ],
    declarations: [
        WxAppComponent
    ],
    bootstrap: [WxAppComponent]
})

export class WxAppModule {
}
