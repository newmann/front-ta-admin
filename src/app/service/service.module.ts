import {ChatService} from './chat/chat.service';
import {AuthService} from './auth/auth.service';
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {throwIfAlreadyLoaded} from './../core/module-import-guard';
import {AuthDataService} from 'app/service/auth/auth-data.service';
import {CustomStompRService} from 'app/service/chat/custom.stomp.r.service';
import {API_URL_LOGIN} from 'app/service/constant/backend-url.constant';
import {ConfigService} from "./constant/config.service";
import {RoleService} from "./account/role.service";
import { LOGGER_SERVICE_PROVIDER } from './utils/logger/logger.service';
import { BYL_LOGGER_STATE } from './utils/logger';


@NgModule({
    providers: [
        ConfigService,
        AuthService,
        AuthDataService,
        RoleService,
        ChatService,
        CustomStompRService,
        {
            provide: API_URL_LOGIN,
            useValue: '/api/auth/login'
        },
        { provide: BYL_LOGGER_STATE, useValue: true },
        LOGGER_SERVICE_PROVIDER
    ]
})
export class ServiceModule {
    constructor(@Optional() @SkipSelf() parentModule: ServiceModule) {
        throwIfAlreadyLoaded(parentModule, 'ServiceModule');
    }
}
