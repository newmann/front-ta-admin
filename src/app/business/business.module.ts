import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { BylBusinessRoutingModule } from 'app/business/business-routing.module';
import {UserRegisterResultComponent} from "./passport/register-result/register-result.component";
import {UserRegisterComponent} from "./passport/register/register.component";
import {UserLoginComponent} from "./passport/login/login.component";

import {Exception500Component} from "../routes/exception/500.component";
import {DashboardAnalysisComponent} from "../routes/dashboard/analysis/analysis.component";
import {CallbackComponent} from "../routes/callback/callback.component";
import {DashboardWorkplaceComponent} from "../routes/dashboard/workplace/workplace.component";
import {DashboardMonitorComponent} from "../routes/dashboard/monitor/monitor.component";
import {Exception403Component} from "../routes/exception/403.component";
import {Exception404Component} from "../routes/exception/404.component";
import {DashboardV1Component} from "../routes/dashboard/v1/v1.component";
import {BylWaitingComponent} from "./common/waiting/waiting.component";
import {BylCrudWaitingComponent} from "./common/waiting/crud-waiting.component";
import {NzTreeModule} from "ng-tree-antd";
import {BylEmbeddableAddressComponent} from "./common/embeddable-address/embeddable-address.component";
import {BylBusinessSharedModule} from './business-shared.module';



@NgModule({
    imports: [ SharedModule,
        NzTreeModule,
        BylBusinessSharedModule,
        BylBusinessRoutingModule],
    declarations: [
        DashboardV1Component,
        DashboardAnalysisComponent,
        DashboardMonitorComponent,
        DashboardWorkplaceComponent,
        // passport pages
        UserLoginComponent,
        UserRegisterComponent,
        UserRegisterResultComponent,
        // single pages
        CallbackComponent,
        Exception403Component,
        Exception404Component,
        Exception500Component


    ],
    entryComponents:[

    ]
})

export class BylBusinessModule {}
