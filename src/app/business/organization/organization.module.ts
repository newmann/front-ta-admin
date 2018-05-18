import { NgModule } from '@angular/core';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';
// import { ImageCropperModule } from 'ng2-img-cropper';
import { SharedModule } from '@shared/shared.module';
import { BylOrganizationListComponent } from './organization/list/list.component';
import { BylOrganizationCrudComponent } from './organization/crud/crud.component';
import {BylOrganizationRoutingModule} from "./organization-routing.module";
import {BylBusinessSharedModule} from "../business-shared.module";






@NgModule({
    imports: [
        SharedModule,
        BylBusinessSharedModule,
        BylOrganizationRoutingModule,
        ColorPickerModule
        // ,ImageCropperModule
    ],
    declarations: [
        // BylRoleListComponent,
        // RoleOperComponent,
        // BylRoleCrudComponent,
        // BylDepartmentListComponent,
        // BylDepartmentCrudComponent
    // BylOrganizationListComponent,
        BylOrganizationCrudComponent],
    entryComponents:[
    ]
})
export class BylOrganizationModule { }
