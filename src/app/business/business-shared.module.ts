import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import {BylAccountListComponent} from './account/account/list/list.component';
import {BylPersonListComponent} from "./person/person/list/list.component";
import {BylOrganizationListComponent} from "./organization/organization/list/list.component";
import {BylEntityLoggerComponent} from "./common/entity-logger/entity-logger.component";



@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        BylAccountListComponent,
        BylPersonListComponent,
        BylOrganizationListComponent,
        BylEntityLoggerComponent

    ],
    entryComponents:[
        BylAccountListComponent,
        BylPersonListComponent,
        BylOrganizationListComponent,
        BylEntityLoggerComponent

    ]
    // ,
    // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class BylBusinessSharedModule {}
