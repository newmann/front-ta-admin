import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';
import {BylBusinessRoutingModule} from 'app/business/business-routing.module';
import {BylUserRegisterResultComponent} from './passport/register-result/register-result.component';
import {BylUserRegisterComponent} from './passport/register/register.component';
import {BylUserLoginComponent} from './passport/login/login.component';

import {Exception500Component} from '../routes/exception/500.component';
import {DashboardAnalysisComponent} from '../routes/dashboard/analysis/analysis.component';
import {CallbackComponent} from '../routes/callback/callback.component';
import {Exception403Component} from '../routes/exception/403.component';
import {Exception404Component} from '../routes/exception/404.component';
import {DashboardV1Component} from '../routes/dashboard/v1/v1.component';
import {BylBusinessSharedModule} from './business-shared.module';
import {UserLockComponent} from '../routes/passport/lock/lock.component';
import {BylDashboardWorkplaceComponent} from "./dashboard/workplace/workplace.component";
import {BylDashboardMonitorComponent} from "./dashboard/monitor/monitor.component";


@NgModule({
    imports: [SharedModule,
        BylBusinessSharedModule,
        BylBusinessRoutingModule],
    declarations: [
        DashboardV1Component,
        DashboardAnalysisComponent,
        BylDashboardMonitorComponent,
        BylDashboardWorkplaceComponent,
        // passport pages

        BylUserLoginComponent,
        BylUserRegisterComponent,
        BylUserRegisterResultComponent,
        // single pages
        UserLockComponent,
        CallbackComponent,
        Exception403Component,
        Exception404Component,
        Exception500Component


    ],
    entryComponents: []
})

export class BylBusinessModule {
}
