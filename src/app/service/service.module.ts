import {ChatService} from './chat/chat.service';
import {AuthService} from './auth/auth.service';
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {throwIfAlreadyLoaded} from './../core/module-import-guard';
import {AuthDataService} from 'app/service/auth/auth-data.service';
import {CustomStompRService} from 'app/service/chat/custom.stomp.r.service';
import {BYL_API_URL_LOGIN} from 'app/service/constant/backend-url.constant';
import {BylConfigService} from "./constant/config.service";
import {RoleService} from "./account/service/role.service";
import { LOGGER_SERVICE_PROVIDER } from './utils/logger/logger.service';
import { BYL_LOGGER_STATE } from './utils/logger';
import {DepartmentService} from "./account/service/department.service";
import {RouterGuardService} from './router/router-guard.service';
import {BylPersonService} from "./person/service/person.service";
import {BylPersonAddressService} from "./person/service/person-address.service";
import {BylPersonCertificateService} from "./person/service/person-certificate.service";
import {BylPersonContactInfoService} from "./person/service/person-contact-info.service";
import {BylNationService} from "./person/service/nation.service";
import {BylPoliticalStatusService} from "./person/service/political-status.service";
import {BylCountryService} from "./address/service/country.service";
import {BylProvinceService} from "./address/service/province.service";
import {BylCityService} from "./address/service/city.service";


@NgModule({
    providers: [
        BylConfigService,
        AuthService,
        AuthDataService,
        RoleService,
        DepartmentService,
        BylPersonService,
        BylPersonAddressService,
        BylPersonCertificateService,
        BylPersonContactInfoService,
        BylNationService,
        BylPoliticalStatusService,
        BylCountryService,
        BylProvinceService,
        BylCityService,
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
