import { NgModule } from '@angular/core';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';
import { ImageCropperModule } from 'ng2-img-cropper';
import { SharedModule } from '@shared/shared.module';
import {PersonRoutingModule} from "./person-routing.module";
// import {BylRoleListComponent} from "./role/list/role-list.component";
// import { RoleOperComponent } from './role/oper/role-oper.component';
// import { BylRoleCrudComponent } from './role/crud/crud.component';
// import { BylDepartmentListComponent } from './department/list/list.component';
// import { BylDepartmentCrudComponent } from './department/crud/crud.component';
import {NzTreeModule} from "ng-tree-antd";
import { BylPersonCrudComponent } from './person/crud/crud.component';
import { BylPersonListComponent } from './person/list/list.component';




@NgModule({
    imports: [
        SharedModule,
        NzTreeModule,
        PersonRoutingModule,
        ColorPickerModule,
        ImageCropperModule
    ],
    declarations: [
        // BylRoleListComponent,
        // RoleOperComponent,
        // BylRoleCrudComponent,
        // BylDepartmentListComponent,
        // BylDepartmentCrudComponent
BylPersonCrudComponent,
        BylPersonListComponent],
    entryComponents:[
        // BylRoleCrudComponent,
        // BylDepartmentCrudComponent
    ]
})
export class PersonModule { }
