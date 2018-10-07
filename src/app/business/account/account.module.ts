import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {BylAccountRoutingModule} from './account-routing.module';
import {BylRoleListComponent} from './role/list/role-list.component';
import {BylRoleCrudComponent} from './role/crud/crud.component';
import {BylDepartmentListComponent} from './department/list/list.component';
import {BylDepartmentCrudComponent} from './department/crud/crud.component';

import {BylAccountCrudComponent} from './account/crud/crud.component';
import {BylBusinessSharedModule} from '../business-shared.module';
import { BylPermissionListComponent } from './permission/list/list.component';
import { BylPermissionItemListComponent } from './permission/item-list/item-list.component';
import { BylAccountItemListComponent } from './account/item-list/item-list.component';
import {BylPipeModule} from "../../service/pipe.module";
import {BylResetPasswordComponent} from "./account/reset-password/register.component";
import {BylMenuListComponent} from "./menu/list/list.component";
import {BylMenuCrudComponent} from "./menu/crud/crud.component";
import {BylMenuLinkItemListComponent} from "./menu-link/item-list/item-list.component";
import {BylMenuLinkListComponent} from "./menu-link/list/list.component";
import {BylPermissionAddPoolListComponent} from "./permission/add-pool-list/add-pool-list.component";
import {BylAccountAddPoolListComponent} from "./account/add-pool-list/add-pool-list.component";


@NgModule({
    imports: [
        SharedModule,
        BylBusinessSharedModule,
        BylAccountRoutingModule,
    ],
    declarations: [
        BylRoleListComponent,
        BylRoleCrudComponent,
        BylDepartmentListComponent,
        BylDepartmentCrudComponent,
        // BylAccountListComponent,//移到business-shared.module中
        BylAccountItemListComponent,
        BylAccountCrudComponent,
        BylAccountAddPoolListComponent,

        BylMenuListComponent,
        BylMenuCrudComponent,
        BylMenuLinkItemListComponent,
        BylMenuLinkListComponent,

        BylPermissionListComponent,
        BylPermissionItemListComponent,
        BylPermissionAddPoolListComponent,
        BylResetPasswordComponent

    ],
    entryComponents: [
        // BylAccountListComponent,
        BylMenuLinkListComponent,
        BylMenuCrudComponent,
        BylRoleCrudComponent,
        BylDepartmentCrudComponent,
        BylPermissionAddPoolListComponent,
        BylAccountAddPoolListComponent
    ]
})
export class BylAccountModule {
}
