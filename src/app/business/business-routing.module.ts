import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {environment} from '@env/environment';
import {DashboardAnalysisComponent} from "../routes/dashboard/analysis/analysis.component";
import {CallbackComponent} from "../routes/callback/callback.component";
import {Exception404Component} from "../routes/exception/404.component";
import {BylUserRegisterResultComponent} from "./passport/register-result/register-result.component";
import {BylUserRegisterComponent} from "./passport/register/register.component";
import {BylUserLoginComponent} from "./passport/login/login.component";

import {Exception500Component} from "../routes/exception/500.component";
import {Exception403Component} from "../routes/exception/403.component";
import {DashboardV1Component} from "../routes/dashboard/v1/v1.component";
import {BylLayoutMobileComponent} from '../frame/mobile/mobile.component';
import {BylRouterGuardService} from '../service/router/router-guard.service';
import {UserLockComponent} from "../routes/passport/lock/lock.component";
import {BylDashboardWorkplaceComponent} from "./dashboard/workplace/workplace.component";
import {BylDashboardMonitorComponent} from "./dashboard/monitor/monitor.component";
import {BylLayoutDefaultComponent} from "../frame/pc/default/default.component";
import {BylLayoutPassportComponent} from "../frame/pc/passport/passport.component";
import {BylLayoutFullScreenComponent} from "../frame/pc/fullscreen/fullscreen.component";
import {BylDashboardV1Component} from "./dashboard/v1/v1.component";
import {BylDashboardAnalysisComponent} from "./dashboard/analysis/analysis.component";
import {BylCallbackComponent} from "./callback/callback.component";
import {BylUserLockComponent} from "./passport/lock/lock.component";
import {BylException403Component} from "./exception/403.component";
import {BylException404Component} from "./exception/404.component";
import {BylException500Component} from "./exception/500.component";
import {BylOAuthRegisterComponent} from "./passport/oauth-register/oauth-register.component";
import {BylOAuthRegisterResultComponent} from "./passport/oauth-register-result/oauth-register-result.component";


const routes: Routes = [
    {
        path: '',
        component: BylLayoutDefaultComponent,
        canActivate: [BylRouterGuardService],
        children: [
            { path: '', redirectTo: 'dashboard/workplace', pathMatch: 'full' },
            { path: 'dashboard', redirectTo: 'dashboard/workplace', pathMatch: 'full' },
            { path: 'dashboard/v1', component: BylDashboardV1Component },
            { path: 'dashboard/analysis', component: BylDashboardAnalysisComponent },
            { path: 'dashboard/monitor', component: BylDashboardMonitorComponent },
            { path: 'dashboard/workplace', component: BylDashboardWorkplaceComponent },
            // { path: 'widgets', loadChildren: '../routes/widgets/widgets.module#WidgetsModule' },
            // { path: 'style', loadChildren: '../routes/style/style.module#StyleModule' },
            // { path: 'delon', loadChildren: '../routes/delon/delon.module#DelonModule' },
            // { path: 'extras', loadChildren: '../routes/extras/extras.module#ExtrasModule' },
            // { path: 'pro', loadChildren: '../routes/pro/pro.module#ProModule' },


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

            { path: 'newform', loadChildren: './newform/newform.module#BylNewformModule' },
        ]
    },
    // 全屏布局
    {
        path: 'data-v',
        component: BylLayoutFullScreenComponent,
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
        component: BylLayoutPassportComponent,
        children: [
            { path: 'login', component: BylUserLoginComponent, data: { title: '登录', titleI18n: 'pro-login' } },
            { path: 'register', component: BylUserRegisterComponent, data: { title: '注册', titleI18n: 'pro-register' } },
            { path: 'register-result', component: BylUserRegisterResultComponent, data: { title: '注册结果', titleI18n: 'pro-register-result' } },
            { path: 'callback/:type', component: BylCallbackComponent },
            { path: 'oauth-register', component: BylOAuthRegisterComponent, data: { title: '绑定账户', titleI18n: 'oauth-register' } },
            { path: 'oauth-register-result', component: BylOAuthRegisterResultComponent, data: { title: '绑定账户结果', titleI18n: 'oauth-register-result' } },
        ]
    },
    // 移动布局
    {
        path: 'mobile',
        component: BylLayoutMobileComponent,
        canActivate: [BylRouterGuardService],
        children: [
            { path: '', redirectTo: 'dashboard/v1', pathMatch: 'full' },
            { path: 'dashboard', redirectTo: 'dashboard/v1', pathMatch: 'full' },
            { path: 'dashboard/v1', component: BylDashboardV1Component },
            { path: 'dashboard/analysis', component: BylDashboardAnalysisComponent },
            { path: 'dashboard/monitor', component: BylDashboardMonitorComponent },
            { path: 'dashboard/workplace', component: BylDashboardWorkplaceComponent },
            // { path: 'widgets', loadChildren: '../routes/widgets/widgets.module#WidgetsModule' },
            // { path: 'style', loadChildren: '../routes/style/style.module#StyleModule' },
            // { path: 'delon', loadChildren: '../routes/delon/delon.module#DelonModule' },
            // { path: 'extras', loadChildren: '../routes/extras/extras.module#ExtrasModule' },
            // { path: 'pro', loadChildren: '../routes/pro/pro.module#ProModule' },
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

    { path: 'lock', component: BylUserLockComponent, data: { title: '锁屏', titleI18n: 'lock' } },
    { path: '403', component: BylException403Component },
    { path: '404', component: BylException404Component },
    { path: '500', component: BylException500Component },
    { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
    exports: [RouterModule]
  })
export class BylBusinessRoutingModule { }
