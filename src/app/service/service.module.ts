import {ChatService} from './chat/chat.service';
import {AuthService} from './auth/auth.service';
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {throwIfAlreadyLoaded} from './../core/module-import-guard';
import {AuthDataService} from 'app/service/auth/auth-data.service';
import {CustomStompRService} from 'app/service/chat/custom.stomp.r.service';
import {BYL_API_URL_LOGIN} from 'app/service/constant/backend-url.constant';
import {BylConfigService} from "./constant/config.service";
import {BylRoleService} from "./account/service/role.service";
import { LOGGER_SERVICE_PROVIDER } from './utils/logger/logger.service';
import { BYL_LOGGER_STATE } from './utils/logger';
import {BylDepartmentService} from "./account/service/department.service";
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
import {BylProjectService} from './project/service/project.service';
import {BylProjectManagerPoolService} from './project/service/project-manager-pool.service';
import {BylBorrowMoneyTicketService} from './project/service/borrow-money-ticket.service';
import {BylBorrowMoneyQualificationPoolService} from './project/service/borrow-money-qualification-pool.service';
import {BylAccountService} from "./account/service/account.service";


@NgModule({
    providers: [
        BylConfigService,
        //account module
        AuthService,
        AuthDataService,
        BylRoleService,
        BylAccountService,
        BylDepartmentService,

        //person module
        BylPersonService,
        BylPersonAddressService,
        BylPersonCertificateService,
        BylPersonContactInfoService,
        BylNationService,
        BylPoliticalStatusService,
        BylCountryService,
        BylProvinceService,
        BylCityService,
        //project module
        BylProjectService,
        BylProjectManagerPoolService,
        BylBorrowMoneyTicketService,
        BylBorrowMoneyQualificationPoolService,

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
export class BylServiceModule {
    constructor(@Optional() @SkipSelf() parentModule: BylServiceModule) {
        throwIfAlreadyLoaded(parentModule, 'BylServiceModule');
    }
}
