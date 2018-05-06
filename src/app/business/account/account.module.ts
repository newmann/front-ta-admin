import {NgModule} from '@angular/core';
import {ColorPickerModule, ColorPickerService} from 'ngx-color-picker';
import {ImageCropperModule} from 'ng2-img-cropper';
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


@NgModule({
    imports: [
        SharedModule,
        BylBusinessSharedModule,
        BylAccountRoutingModule,
        ColorPickerModule,
        ImageCropperModule
    ],
    declarations: [
        BylRoleListComponent,
        BylRoleCrudComponent,
        BylDepartmentListComponent,
        BylDepartmentCrudComponent,
        // BylAccountListComponent,//移到business-shared.module中
        BylAccountItemListComponent,
        BylAccountCrudComponent,

        BylPermissionListComponent,
        BylPermissionItemListComponent

    ],
    entryComponents: [
        // BylAccountListComponent,
        BylRoleCrudComponent,
        BylDepartmentCrudComponent
    ]
})
export class BylAccountModule {
}
