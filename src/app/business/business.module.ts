import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';
import {BylBusinessRoutingModule} from 'app/business/business-routing.module';
import {BylUserRegisterResultComponent} from './passport/register-result/register-result.component';
import {BylUserRegisterComponent} from './passport/register/register.component';
import {BylUserLoginComponent} from './passport/login/login.component';

import {BylBusinessSharedModule} from './business-shared.module';
import {BylDashboardWorkplaceComponent} from "./dashboard/workplace/workplace.component";
import {BylDashboardMonitorComponent} from "./dashboard/monitor/monitor.component";
import {BylDashboardV1Component} from "./dashboard/v1/v1.component";
import {BylDashboardAnalysisComponent} from "./dashboard/analysis/analysis.component";
import {BylException403Component} from "./exception/403.component";
import {BylException404Component} from "./exception/404.component";
import {BylException500Component} from "./exception/500.component";
import {BylCallbackComponent} from "./callback/callback.component";
import {BylUserLockComponent} from "./passport/lock/lock.component";
import {BylOAuthRegisterComponent} from "./passport/oauth-register/oauth-register.component";
import {BylOAuthRegisterResultComponent} from "./passport/oauth-register-result/oauth-register-result.component";

const COMPONENTS=[
    BylDashboardV1Component,
    BylDashboardAnalysisComponent,
    BylDashboardMonitorComponent,
    BylDashboardWorkplaceComponent,
    // passport pages

    BylUserLoginComponent,
    BylUserRegisterComponent,
    BylUserRegisterResultComponent,
    BylOAuthRegisterComponent,
    BylOAuthRegisterResultComponent,
    // single pages
    BylUserLockComponent,
    BylCallbackComponent,
    BylException403Component,
    BylException404Component,
    BylException500Component

    ];

@NgModule({
    imports: [SharedModule,
        BylBusinessSharedModule,
        BylBusinessRoutingModule
    ],
    declarations: [
        ...COMPONENTS,

    ],
    exports: [
        ...COMPONENTS,
    ],
    entryComponents: []
})

export class BylBusinessModule {
}
