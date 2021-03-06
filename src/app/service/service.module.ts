import {ChatService} from './chat/chat.service';
import {BylAuthService} from './auth/auth.service';
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {throwIfAlreadyLoaded} from './../core/module-import-guard';
import {BylAuthDataService} from 'app/service/auth/auth-data.service';
import {CustomStompRService} from 'app/service/chat/custom.stomp.r.service';
import {BYL_API_URL_LOGIN} from 'app/service/constant/backend-url.constant';
import {BylConfigService} from "./constant/config.service";
import {BylRoleService} from "./account/service/role.service";
// import { LOGGER_SERVICE_PROVIDER } from './utils/logger/logger.service';
// import { BYL_LOGGER_STATE } from './utils/logger';
import {BylDepartmentService} from "./account/service/department.service";
import {BylRouterGuardService} from './router/router-guard.service';
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
import {BylOrganizationService} from "./organization/service/organization.service";
import {BylSimpleEntityLoggerService} from "./simple-entity-logger/service/simple-entity-logger.service";
import {BylPermissionService} from "./account/service/permission.service";
import {BylElectronService} from './electron/electron.service';
import {BylWorkTypeService} from "./project/service/work-type.service";
import {BylOutsourcerService} from "./project/service/outsourcer.service";
import {BylOutsourceEmployeeService} from "./project/service/outsource-employee.service";
import {BylExpenseTypeService} from "./project/service/expense-type.service";
import {BylEmployeeService} from "./project/service/employee.service";
import {BylExpenseTicketService} from "./project/service/expense-ticket.service";
import {BylExpenseDetailService} from "./project/service/expense-detail.service";
import {BylOperationPeriodService} from "./project/service/operation-period.service";
import {BylWorkloadTicketService} from "./project/service/workload-ticket.service";
import {BylWorkTypeConfigTicketService} from "./project/service/work-type-config-ticket.service";
import {BylWorkTypeConfigDetailService} from "./project/service/work-type-config-detail.service";
import {BylWorkloadDetailService} from "./project/service/workload-detail.service";
import {BylWorkloadDetailDetailService} from "./project/service/workload-detail-detail.service";
import {BylProjectAuthService} from "./project/service/project-auth.service";
import {BylMenuService} from "./account/service/menu.service";
import {BylMenuLinkService} from "./account/service/menu-link.service";
import {BylProjectProgressAssessTicketService} from "./project/service/project-progress-assess-ticket.service";
import {BylFileServerService} from "./fileserver/service/file-server.service";
import {BylSettleTicketService} from "./project/service/settle-ticket.service";
import {BylSettleDetailBorrowMoneyService} from "./project/service/settle-detail-borrow-money.service";
import {BylSettleDetailBorrowMoneyTicketService} from "./project/service/settle-detail-borrow-money-ticket.service";
import {BylSettleDetailWorkloadService} from "./project/service/settle-detail-workload.service";
import {BylSettleDetailWorkloadTicketService} from "./project/service/settle-detail-workload-ticket.service";



@NgModule({
    providers: [
        BylElectronService,
        BylConfigService,
        BylSimpleEntityLoggerService,
        BylFileServerService,

        //account module
        BylAuthService,
        BylAuthDataService,
        BylRoleService,
        BylAccountService,
        BylDepartmentService,
        BylPermissionService,
        BylMenuService,
        BylMenuLinkService,

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
        //organization module
        BylOrganizationService,

        //project module
        BylProjectService,
        BylProjectManagerPoolService,
        BylProjectAuthService,
        BylProjectProgressAssessTicketService,

        BylBorrowMoneyTicketService,
        BylBorrowMoneyQualificationPoolService,
        BylWorkTypeService,
        BylWorkTypeConfigTicketService,
        BylWorkTypeConfigDetailService,

        BylOutsourcerService,
        BylOutsourceEmployeeService,
        BylExpenseTypeService,
        BylEmployeeService,
        BylExpenseTicketService,
        BylExpenseDetailService,
        BylOperationPeriodService,
        BylWorkloadTicketService,
        BylWorkloadDetailService,
        BylWorkloadDetailDetailService,

        BylSettleTicketService,
        BylSettleDetailBorrowMoneyService,
        BylSettleDetailBorrowMoneyTicketService,
        BylSettleDetailWorkloadService,
        BylSettleDetailWorkloadTicketService,

        // ChatService,
        // CustomStompRService,
        // {
        //     provide: BYL_API_URL_LOGIN,
        //     useValue: '/api/auth/login'
        // },
        // { provide: BYL_LOGGER_STATE, useValue: true },
        // LOGGER_SERVICE_PROVIDER,
        BylRouterGuardService
    ]
})
export class BylServiceModule {
    constructor(@Optional() @SkipSelf() parentModule: BylServiceModule) {
        throwIfAlreadyLoaded(parentModule, 'BylServiceModule');
    }
}
