import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';
import {BylAccountListComponent} from './account/account/list/list.component';
import {BylPersonListComponent} from './person/person/list/list.component';
import {BylOrganizationListComponent} from './organization/organization/list/list.component';
import {BylEntityLoggerComponent} from './common/entity-logger/entity-logger.component';
import {BylEmbeddableAddressComponent} from './common/embeddable-address/embeddable-address.component';
import {BylCrudWaitingComponent} from './common/waiting/crud-waiting.component';
import {BylWaitingComponent} from './common/waiting/waiting.component';
import {BylInputWidgetComponent} from './common/input-form-item/input.formitem';
import {BylShowErrorFormItemComponent} from './common/show-error-form-item/show-error.formitem';
import {BylSelectInfoFormItemComponent} from './common/select-info-form-item/select-info.formitem';
import {BylListQueryFormComponent} from './common/list-query-form/list-query.form';
import {BylListQueryWidgetComponent} from './common/list-query-widget/list-query.widget';
import {BylSelectWidgetComponent} from './common/select-form-item/select.formitem';
import {BylDateWidgetComponent} from './common/date-form-item/date.formitem';
import {BylRadioWidgetComponent} from './common/radio-form-item/radio.formitem';
import {BylInputNumberWidgetComponent} from './common/input-number-form-item/input-number.formitem';
import {BylPipeModule} from "../service/pipe.module";
import {BylListFormTableWidgetComponent} from "./common/list-form-table-item/table.formitem";
import {WidgetRegistry} from "@delon/form";
import {BylProjectManagerPoolSelectWidgetSFComponent} from "./common/select-widget-sf/select-project-manager-pool.widget";
import {BylOutsourcerSelectWidgetSFComponent} from "./common/select-widget-sf/select-outsourcer-sf.widget";
import {BylNationSelectWidgetSFComponent} from "./common/select-widget-sf/select-nation-sf.widget";
import {BylPoliticalStatusSelectWidgetSFComponent} from "./common/select-widget-sf/select-political-status-sf.widget";


@NgModule({
    imports: [
        SharedModule,
        BylPipeModule
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
        BylInputNumberWidgetComponent,
        BylSelectWidgetComponent,
        BylDateWidgetComponent,
        BylRadioWidgetComponent,
        BylShowErrorFormItemComponent,
        BylSelectInfoFormItemComponent,
        BylListQueryFormComponent,
        BylListQueryWidgetComponent,
        BylListFormTableWidgetComponent,

        BylProjectManagerPoolSelectWidgetSFComponent,
        BylOutsourcerSelectWidgetSFComponent
        ,BylNationSelectWidgetSFComponent
        ,BylPoliticalStatusSelectWidgetSFComponent
    ],
    exports: [
        BylPipeModule,


        BylAccountListComponent,
        BylPersonListComponent,
        BylOrganizationListComponent,
        BylEntityLoggerComponent,
        BylEmbeddableAddressComponent,
        BylCrudWaitingComponent,
        BylWaitingComponent,
        // widget
        BylInputWidgetComponent,
        BylInputNumberWidgetComponent,
        BylSelectWidgetComponent,
        BylDateWidgetComponent,
        BylRadioWidgetComponent,
        BylShowErrorFormItemComponent,
        BylSelectInfoFormItemComponent,
        BylListQueryFormComponent,
        BylListQueryWidgetComponent,
        BylListFormTableWidgetComponent,

        BylProjectManagerPoolSelectWidgetSFComponent,
        BylOutsourcerSelectWidgetSFComponent
        ,BylNationSelectWidgetSFComponent
        ,BylPoliticalStatusSelectWidgetSFComponent
    ],
    entryComponents: [
        BylAccountListComponent,
        BylPersonListComponent,
        BylOrganizationListComponent,
        BylCrudWaitingComponent,
        BylWaitingComponent,
        BylListQueryFormComponent,
        BylProjectManagerPoolSelectWidgetSFComponent,
        BylOutsourcerSelectWidgetSFComponent
        ,BylNationSelectWidgetSFComponent
        ,BylPoliticalStatusSelectWidgetSFComponent
    ]
    // ,
    // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class BylBusinessSharedModule {
    constructor(widgetRegistry: WidgetRegistry) {
        widgetRegistry.register(BylProjectManagerPoolSelectWidgetSFComponent.KEY, BylProjectManagerPoolSelectWidgetSFComponent);
        widgetRegistry.register(BylOutsourcerSelectWidgetSFComponent.KEY, BylOutsourcerSelectWidgetSFComponent);
        widgetRegistry.register(BylNationSelectWidgetSFComponent.KEY, BylNationSelectWidgetSFComponent);
        widgetRegistry.register(BylPoliticalStatusSelectWidgetSFComponent.KEY, BylPoliticalStatusSelectWidgetSFComponent);
    }
}
