import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
import {DashboardAnalysisComponent} from "../routes/dashboard/analysis/analysis.component";
import {CallbackComponent} from "../routes/callback/callback.component";
// import {DashboardWorkplaceComponent} from "../routes/dashboard/workplace/workplace.component";
// import {DashboardMonitorComponent} from "../routes/dashboard/monitor/monitor.component";
import {Exception404Component} from "../routes/exception/404.component";
import {BylUserRegisterResultComponent} from "./passport/register-result/register-result.component";
import {BylUserRegisterComponent} from "./passport/register/register.component";
import {BylUserLoginComponent} from "./passport/login/login.component";

import {Exception500Component} from "../routes/exception/500.component";
import {Exception403Component} from "../routes/exception/403.component";
import {LayoutPassportComponent} from "../layout/passport/passport.component";
import {LayoutDefaultComponent} from "../layout/default/default.component";
import {LayoutFullScreenComponent} from "../layout/fullscreen/fullscreen.component";
import {DashboardV1Component} from "../routes/dashboard/v1/v1.component";
import {LayoutMobileComponent} from '../layout/mobile/mobile.component';
import {RouterGuardService} from '../service/router/router-guard.service';
import {UserLockComponent} from "../routes/passport/lock/lock.component";
import {BylDashboardWorkplaceComponent} from "./dashboard/workplace/workplace.component";
import {BylDashboardMonitorComponent} from "./dashboard/monitor/monitor.component";


const routes: Routes = [
    {
        path: '',
        component: LayoutDefaultComponent,
        canActivate: [RouterGuardService],
        children: [
            { path: '', redirectTo: 'dashboard/workplace', pathMatch: 'full' },
            { path: 'dashboard', redirectTo: 'dashboard/workplace', pathMatch: 'full' },
            { path: 'dashboard/v1', component: DashboardV1Component },
            { path: 'dashboard/analysis', component: DashboardAnalysisComponent },
            { path: 'dashboard/monitor', component: BylDashboardMonitorComponent },
            { path: 'dashboard/workplace', component: BylDashboardWorkplaceComponent },
            { path: 'widgets', loadChildren: '../routes/widgets/widgets.module#WidgetsModule' },
            { path: 'style', loadChildren: '../routes/style/style.module#StyleModule' },
            { path: 'delon', loadChildren: '../routes/delon/delon.module#DelonModule' },
            { path: 'extras', loadChildren: '../routes/extras/extras.module#ExtrasModule' },
            { path: 'pro', loadChildren: '../routes/pro/pro.module#ProModule' },


            // { path: 'elements', loadChildren: '../routes/elements/elements.module#ElementsModule' },
            // { path: 'other', loadChildren: '../routes/other/other.module#OtherModule' },
            // { path: 'forms', loadChildren: '../routes/forms/forms.module#FormsModule' },
            // { path: 'editor', loadChildren: '../routes/editor/editor.module#EditorModule' },
            // { path: 'charts', loadChildren: '../routes/charts/charts.module#ChartsModule' },
            // { path: 'tables', loadChildren: '../routes/tables/tables.module#TablesModule' },
            // { path: 'maps', loadChildren: '../routes/maps/maps.module#MapsModule' },
            // { path: 'pages', loadChildren: '../routes/pages/pages.module#PagesModule' },
            // { path: 'logics', loadChildren: '../routes/logics/logics.module#LogicsModule' },
            // { path: 'extras', loadChildren: '../routes/extras/extras.module#ExtrasModule' },
            // { path: 'pro', loadChildren: '../routes/pro/pro.module#ProModule' },

            { path: 'account', loadChildren: './account/account.module#BylAccountModule' },
            { path: 'person', loadChildren: './person/person.module#BylPersonModule' },
            { path: 'organization', loadChildren: './organization/organization.module#BylOrganizationModule' },

            { path: 'project', loadChildren: './project/project.module#BylProjectModule' },

        ]
    },
    // 全屏布局
    {
        path: 'data-v',
        component: LayoutFullScreenComponent,
        children: [
            { path: '', loadChildren: '../routes/data-v/data-v.module#DataVModule' }
        ]
    },
    // // passport
    // {
    //     path: 'passport',
    //     component: LayoutPassportComponent,
    //     children: [
    //         { path: 'login', component: BylUserLoginComponent },
    //         { path: 'register', component: BylUserRegisterComponent },
    //         { path: 'register-result', component: BylUserRegisterResultComponent }
    //     ]
    // },
    // passport
    {
        path: 'passport',
        component: LayoutPassportComponent,
        children: [
            { path: 'login', component: BylUserLoginComponent, data: { title: '登录', titleI18n: 'pro-login' } },
            { path: 'register', component: BylUserRegisterComponent, data: { title: '注册', titleI18n: 'pro-register' } },
            { path: 'register-result', component: BylUserRegisterResultComponent, data: { title: '注册结果', titleI18n: 'pro-register-result' } }
        ]
    },
    // 移动布局
    {
        path: 'mobile',
        component: LayoutMobileComponent,
        canActivate: [RouterGuardService],
        children: [
            { path: '', redirectTo: 'dashboard/v1', pathMatch: 'full' },
            { path: 'dashboard', redirectTo: 'dashboard/v1', pathMatch: 'full' },
            { path: 'dashboard/v1', component: DashboardV1Component },
            { path: 'dashboard/analysis', component: DashboardAnalysisComponent },
            { path: 'dashboard/monitor', component: BylDashboardMonitorComponent },
            { path: 'dashboard/workplace', component: BylDashboardWorkplaceComponent },
            { path: 'widgets', loadChildren: '../routes/widgets/widgets.module#WidgetsModule' },
            { path: 'style', loadChildren: '../routes/style/style.module#StyleModule' },
            { path: 'delon', loadChildren: '../routes/delon/delon.module#DelonModule' },
            { path: 'extras', loadChildren: '../routes/extras/extras.module#ExtrasModule' },
            { path: 'pro', loadChildren: '../routes/pro/pro.module#ProModule' },
            // { path: 'widgets', loadChildren: '../routes/widgets/widgets.module#WidgetsModule' },
            // { path: 'elements', loadChildren: '../routes/elements/elements.module#ElementsModule' },
            // { path: 'other', loadChildren: '../routes/other/other.module#OtherModule' },
            // { path: 'forms', loadChildren: '../routes/forms/forms.module#FormsModule' },
            // { path: 'editor', loadChildren: '../routes/editor/editor.module#EditorModule' },
            // { path: 'charts', loadChildren: '../routes/charts/charts.module#ChartsModule' },
            // { path: 'tables', loadChildren: '../routes/tables/tables.module#TablesModule' },
            // { path: 'maps', loadChildren: '../routes/maps/maps.module#MapsModule' },
            // { path: 'pages', loadChildren: '../routes/pages/pages.module#PagesModule' },
            // { path: 'logics', loadChildren: '../routes/logics/logics.module#LogicsModule' },
            // { path: 'extras', loadChildren: '../routes/extras/extras.module#ExtrasModule' },
            // { path: 'pro', loadChildren: '../routes/pro/pro.module#ProModule' },

            { path: 'account', loadChildren: './account/account.module#BylAccountModule' },
        ]
    },
    // 单页不包裹Layout
    { path: 'callback/:type', component: CallbackComponent },
    { path: 'lock', component: UserLockComponent, data: { title: '锁屏', titleI18n: 'lock' } },
    { path: '403', component: Exception403Component },
    { path: '404', component: Exception404Component },
    { path: '500', component: Exception500Component },
    { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
    exports: [RouterModule]
  })
export class BylBusinessRoutingModule { }
