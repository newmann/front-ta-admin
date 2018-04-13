import {ChatService} from './chat/chat.service';
import {AuthService} from './auth/auth.service';
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {throwIfAlreadyLoaded} from './../core/module-import-guard';
import {AuthDataService} from 'app/service/auth/auth-data.service';
import {CustomStompRService} from 'app/service/chat/custom.stomp.r.service';
import {BYL_API_URL_LOGIN} from 'app/service/constant/backend-url.constant';
import {BylConfigService} from "./constant/config.service";
import {RoleService} from "./account/role/role.service";
import { LOGGER_SERVICE_PROVIDER } from './utils/logger/logger.service';
import { BYL_LOGGER_STATE } from './utils/logger';
import {DepartmentService} from "./account/department/department.service";
import {RouterGuardService} from './router/router-guard.service';


@NgModule({
    providers: [
        BylConfigService,
        AuthService,
        AuthDataService,
        RoleService,
        DepartmentService,

        ChatService,
        CustomStompRService,
        {
            provide: BYL_API_URL_LOGIN,
            useValue: '/api/auth/login'
        },
        { provide: BYL_LOGGER_STATE, useValue: true },
        LOGGER_SERVICE_PROVIDER,
        RouterGuardService
    ]
})
export class ServiceModule {
    constructor(@Optional() @SkipSelf() parentModule: ServiceModule) {
        throwIfAlreadyLoaded(parentModule, 'ServiceModule');
    }
}
