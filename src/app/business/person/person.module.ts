import { NgModule } from '@angular/core';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';
import { ImageCropperModule } from 'ng2-img-cropper';
import { SharedModule } from '@shared/shared.module';
import {BylPersonRoutingModule} from "./person-routing.module";
// import {BylRoleListComponent} from "./role/list/role-list.component";
// import { RoleOperComponent } from './role/oper/role-oper.component';
// import { BylRoleCrudComponent } from './role/crud/crud.component';
// import { BylDepartmentListComponent } from './department/list/list.component';
// import { BylDepartmentCrudComponent } from './department/crud/crud.component';
import {NzTreeModule} from "ng-tree-antd";
import { BylPersonCrudComponent } from './person/crud/crud.component';
import { BylPersonListComponent } from './person/list/list.component';
import { BylPersonAddressCrudComponent } from './address/crud/crud.component';
import { BylPersonAddressListComponent } from './address/list/list.component';
import { BylPersonCertificateCrudComponent } from './certificate/crud/crud.component';
import {BylPersonCertificateListComponent} from './certificate/list/list.component';
import {BylBusinessSharedModule} from "../business-shared.module";




@NgModule({
    imports: [
        SharedModule,
        BylBusinessSharedModule,
        NzTreeModule,
        BylPersonRoutingModule,
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
        // BylPersonListComponent,
        BylPersonAddressCrudComponent,
        BylPersonAddressListComponent,
        BylPersonCertificateCrudComponent,
        BylPersonCertificateListComponent
    ],
    entryComponents:[
        BylPersonCrudComponent
    ]
})
export class BylPersonModule { }
