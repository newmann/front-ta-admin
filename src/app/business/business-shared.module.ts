import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import {BylAccountListComponent} from './account/account/list/list.component';
import {BylPersonListComponent} from "./person/person/list/list.component";
import {BylOrganizationListComponent} from "./organization/organization/list/list.component";
import {BylEntityLoggerComponent} from "./common/entity-logger/entity-logger.component";
import {BylEmbeddableAddressComponent} from "./common/embeddable-address/embeddable-address.component";
import {BylCrudWaitingComponent} from "./common/waiting/crud-waiting.component";
import {BylWaitingComponent} from "./common/waiting/waiting.component";
import {BylInputWidgetComponent} from "./common/input-form-item/input.formitem";
import {BylShowErrorFormItemComponent} from './common/show-error-form-item/show-error.formitem';
import {BylSelectInfoFormItemComponent} from './common/select-info-form-item/select-info.formitem';
import {BylListQueryFormComponent} from './common/list-query-form/list-query.form';



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
        BylInputWidgetComponent,
        BylShowErrorFormItemComponent,
        BylSelectInfoFormItemComponent,
        BylListQueryFormComponent


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
        BylInputWidgetComponent,
        BylShowErrorFormItemComponent,
        BylSelectInfoFormItemComponent,
        BylListQueryFormComponent

    ],
    entryComponents:[
        BylAccountListComponent,
        BylPersonListComponent,
        BylOrganizationListComponent,
        BylCrudWaitingComponent,
        BylWaitingComponent,
        BylListQueryFormComponent

    ]
    // ,
    // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class BylBusinessSharedModule {}
