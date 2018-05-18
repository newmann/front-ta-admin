import { NgModule } from '@angular/core';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';
// import { ImageCropperModule } from 'ng2-img-cropper';
import { SharedModule } from '@shared/shared.module';
import {BylPersonRoutingModule} from "./person-routing.module";

import { BylPersonCrudComponent } from './person/crud/crud.component';
import { BylPersonAddressCrudComponent } from './address/crud/crud.component';
import { BylPersonAddressListComponent } from './address/list/list.component';
import { BylPersonCertificateCrudComponent } from './certificate/crud/crud.component';
import {BylPersonCertificateListComponent} from './certificate/list/list.component';
import {BylBusinessSharedModule} from "../business-shared.module";




@NgModule({
    imports: [
        SharedModule,
        BylBusinessSharedModule,

        BylPersonRoutingModule,
        ColorPickerModule
        // ,ImageCropperModule
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
