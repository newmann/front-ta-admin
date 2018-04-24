import { NgModule } from '@angular/core';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';
import { ImageCropperModule } from 'ng2-img-cropper';
import { SharedModule } from '@shared/shared.module';
import {BylProjectRoutingModule} from "./project-routing.module";
// import {BylRoleListComponent} from "./role/list/role-list.component";
// import { RoleOperComponent } from './role/oper/role-oper.component';
// import { BylRoleCrudComponent } from './role/crud/crud.component';
// import { BylDepartmentListComponent } from './department/list/list.component';
// import { BylDepartmentCrudComponent } from './department/crud/crud.component';
import {NzTreeModule} from "ng-tree-antd";
import { BylProjectCrudComponent } from './project/crud/crud.component';
import { BylProjectListComponent } from './project/list/list.component';
import {BylEmbeddableAddressComponent} from "../common/embeddable-address/embeddable-address.component";



@NgModule({
    imports: [
        SharedModule,
        NzTreeModule,
        BylProjectRoutingModule,
        ColorPickerModule,
        ImageCropperModule
    ],
    declarations: [
        // BylRoleListComponent,
        // RoleOperComponent,
        // BylRoleCrudComponent,
        // BylDepartmentListComponent,
        // BylDepartmentCrudComponent

        BylProjectCrudComponent,
        BylProjectListComponent

    ],
    entryComponents:[
        // BylRoleCrudComponent,
        // BylDepartmentCrudComponent
    ]
})
export class BylProjectModule { }
