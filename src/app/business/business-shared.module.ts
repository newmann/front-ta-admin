import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import {BylAccountListComponent} from './account/account/list/list.component';
import {BylPersonListComponent} from "./person/person/list/list.component";
import {BylOrganizationListComponent} from "./organization/organization/list/list.component";
import {BylEntityLoggerComponent} from "./common/entity-logger/entity-logger.component";
import {BylEmbeddableAddressComponent} from "./common/embeddable-address/embeddable-address.component";
import {BylCrudWaitingComponent} from "./common/waiting/crud-waiting.component";
import {BylWaitingComponent} from "./common/waiting/waiting.component";
import {BylInputWidget} from "./common/input-widget/input.widget";



@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        BylAccountListComponent,
        BylPersonListComponent,
        BylOrganizationListComponent,
        BylEntityLoggerComponent,
        BylEmbeddableAddressComponent,
        BylCrudWaitingComponent,
        BylWaitingComponent,
        // widget
        BylInputWidget


    ],
    exports: [
        BylAccountListComponent,
        BylPersonListComponent,
        BylOrganizationListComponent,
        BylEntityLoggerComponent,
        BylEmbeddableAddressComponent,
        BylCrudWaitingComponent,
        BylWaitingComponent,
        // widget
        BylInputWidget

    ],
    entryComponents:[
        BylAccountListComponent,
        BylPersonListComponent,
        BylOrganizationListComponent,
        BylCrudWaitingComponent,
        BylWaitingComponent

    ]
    // ,
    // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class BylBusinessSharedModule {}
