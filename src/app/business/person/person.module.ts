import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import {BylPersonRoutingModule} from "./person-routing.module";

import { BylPersonCrudComponent } from './person/crud/crud.component';
import { BylPersonAddressCrudComponent } from './address/crud/crud.component';
import { BylPersonAddressListComponent } from './address/list/list.component';
import { BylPersonCertificateCrudComponent } from './certificate/crud/crud.component';
import {BylPersonCertificateListComponent} from './certificate/list/list.component';
import {BylBusinessSharedModule} from "../business-shared.module";
import {BylPersonListComponent} from "./person/list/list.component";

const COMPONENTS=[
    BylPersonCrudComponent,
    BylPersonListComponent,

    BylPersonAddressCrudComponent,
    BylPersonAddressListComponent,
    BylPersonCertificateCrudComponent,
    BylPersonCertificateListComponent

];
const ENTRYCOMPONENTS = [
    BylPersonCrudComponent,
    ];

@NgModule({
    imports: [
        SharedModule,
        BylBusinessSharedModule,

        BylPersonRoutingModule
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
