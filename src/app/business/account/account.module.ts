import { NgModule } from '@angular/core';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';
import { ImageCropperModule } from 'ng2-img-cropper';
import { SharedModule } from '@shared/shared.module';
import {AccountRoutingModule} from "./account-routing.module";
import {BylRoleListComponent} from "./role/list/role-list.component";
import { RoleOperComponent } from './role/oper/role-oper.component';
import { BylRoleCrudComponent } from './role/crud/crud.component';
import { BylDepartmentListComponent } from './department/list/list.component';
import { BylDepartmentCrudComponent } from './department/crud/crud.component';
import {NzTreeModule} from "ng-tree-antd";
import { BylAccountListComponent } from './account/list/list.component';
import { BylAccountCrudComponent } from './account/crud/crud.component';



@NgModule({
    imports: [
        SharedModule,
        NzTreeModule,
        AccountRoutingModule,
        ColorPickerModule,
        ImageCropperModule
    ],
    declarations: [
        BylRoleListComponent,
        RoleOperComponent,
        BylRoleCrudComponent,
        BylDepartmentListComponent,
        BylDepartmentCrudComponent,
        BylAccountListComponent,
        BylAccountCrudComponent
    ],
    entryComponents:[
        BylRoleCrudComponent,
        BylDepartmentCrudComponent
    ]
})
export class AccountModule { }
