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
import {BylPersonListComponent} from "./person/list/list.component";
import {BylPersonBindComponent} from "./person/bind/bind.component";
import {BylPersonBindCrudComponent} from "./person/bind-crud/crud.component";

const COMPONENTS=[
    BylPersonCrudComponent,
    BylPersonListComponent,
    BylPersonBindComponent,
    BylPersonBindCrudComponent,

    BylPersonAddressCrudComponent,
    BylPersonAddressListComponent,
    BylPersonCertificateCrudComponent,
    BylPersonCertificateListComponent

];
const ENTRYCOMPONENTS = [
    BylPersonCrudComponent,
    BylPersonBindCrudComponent
    ];

@NgModule({
    imports: [
        SharedModule,
        BylBusinessSharedModule,

        BylPersonRoutingModule,
        ColorPickerModule
        // ,ImageCropperModule
    ],
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        ...COMPONENTS
    ],
    entryComponents:[
        ...ENTRYCOMPONENTS
    ]
})
export class BylPersonModule { }
