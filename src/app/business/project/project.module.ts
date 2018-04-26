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
import { BylProjectManagerPoolListComponent } from './project-manager-pool/list/list.component';
import {BylBusinessSharedModule} from '../business-shared.module';



@NgModule({
    imports: [
        SharedModule,
        BylBusinessSharedModule,
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
        BylProjectListComponent,
        BylProjectManagerPoolListComponent

    ],
    entryComponents:[
        // BylRoleCrudComponent,
        // BylDepartmentCrudComponent
    ]
})
export class BylProjectModule { }
