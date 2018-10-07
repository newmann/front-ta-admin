import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';
import {BylAccountListComponent} from './account/account/list/list.component';
import {BylPersonListComponent} from './person/person/list/list.component';
import {BylOrganizationListComponent} from './organization/organization/list/list.component';
import {BylEntityLoggerComponent} from './common/entity-logger/entity-logger.component';
import {BylEmbeddableAddressComponent} from './common/embeddable-address/embeddable-address.component';
import {BylWaitingComponent} from './common/waiting/waiting.component';
import {BylSelectInfoFormItemComponent} from './common/select-info-form-item/select-info.formitem';
import {BylListQueryFormComponent} from './common/list-query-form/list-query.form';
import {BylListQueryWidgetComponent} from './common/list-query-widget/list-query.widget';
import {BylPipeModule} from "../service/pipe.module";
import {BylListFormTableWidgetComponent} from "./common/list-form-table-item/table.formitem";
import {WidgetRegistry} from "@delon/form";
import {BylProjectManagerPoolSelectWidgetSFComponent} from "./common/select-widget-sf/select-project-manager-pool.widget";
import {BylOutsourcerSelectWidgetSFComponent} from "./common/select-widget-sf/select-outsourcer-sf.widget";
import {BylNationSelectWidgetSFComponent} from "./common/select-widget-sf/select-nation-sf.widget";
import {BylPoliticalStatusSelectWidgetSFComponent} from "./common/select-widget-sf/select-political-status-sf.widget";
import {BylPersonSelectWidgetSFComponent} from "./common/select-widget-sf/select-person.widget";
import {BylBorrowMoneyQualificationPoolSelectWidgetSFComponent} from "./common/select-widget-sf/select-borrow-money-qualification-pool.widget";
import {BylProjectSelectWidgetSFComponent} from "./common/select-widget-sf/select-project.widget";
import {BylExpenseTypeSelectWidgetSFComponent} from "./common/select-widget-sf/select-expense-type-sf.widget";
import {BylOperationPeriodSelectWidgetSFComponent} from "./common/select-widget-sf/select-operation-peroid-sf.widget";
import {BylWorkTypeSelectWidgetSFComponent} from "./common/select-widget-sf/select-work-type-sf.widget";
import {BylShowErrorFormItemComponent} from "./common/show-error-form-item/show-error.formitem";
import {BylDateWidgetComponent} from "./common/date-form-item/date.formitem";
import {BylInputWidgetComponent} from "./common/input-form-item/input.formitem";
import {BylInputNumberWidgetComponent} from "./common/input-number-form-item/input-number.formitem";
import {BylSelectWidgetComponent} from "./common/select-form-item/select.formitem";
import {BylFileUploadWidgetSFComponent} from "./common/file-upload-widget-sf/file-upload.widget";
import {BylPersonBindComponent} from "./person/person/bind/bind.component";

const COMPONENTS=[
    BylAccountListComponent,
    // BylPersonListComponent,
    // BylPersonBindComponent,
    BylOrganizationListComponent,
    BylEntityLoggerComponent,
    BylEmbeddableAddressComponent,
    BylWaitingComponent,
    // widget
    BylDateWidgetComponent,
    BylInputWidgetComponent,
    BylInputNumberWidgetComponent,

    BylSelectWidgetComponent,
    BylShowErrorFormItemComponent,
    BylSelectInfoFormItemComponent,
    BylListQueryFormComponent,
    BylListQueryWidgetComponent,
    BylListFormTableWidgetComponent,

    BylProjectManagerPoolSelectWidgetSFComponent,
    BylOutsourcerSelectWidgetSFComponent
    ,BylNationSelectWidgetSFComponent
    ,BylPoliticalStatusSelectWidgetSFComponent
    ,BylPersonSelectWidgetSFComponent
    ,BylBorrowMoneyQualificationPoolSelectWidgetSFComponent
    ,BylProjectSelectWidgetSFComponent
    ,BylExpenseTypeSelectWidgetSFComponent
    ,BylOperationPeriodSelectWidgetSFComponent
    ,BylWorkTypeSelectWidgetSFComponent
    ,BylFileUploadWidgetSFComponent
];

const ENTRYCOMPONENTS = [
    BylAccountListComponent,
    // BylPersonListComponent,
    BylOrganizationListComponent,
    BylWaitingComponent,
    BylListQueryFormComponent,
    BylProjectManagerPoolSelectWidgetSFComponent,
    BylOutsourcerSelectWidgetSFComponent
    ,BylNationSelectWidgetSFComponent
    ,BylPoliticalStatusSelectWidgetSFComponent
    ,BylPersonSelectWidgetSFComponent
    ,BylBorrowMoneyQualificationPoolSelectWidgetSFComponent
    ,BylProjectSelectWidgetSFComponent
    ,BylExpenseTypeSelectWidgetSFComponent
    ,BylOperationPeriodSelectWidgetSFComponent
    ,BylWorkTypeSelectWidgetSFComponent
    ,BylFileUploadWidgetSFComponent

];

@NgModule({
    imports: [
        SharedModule,
        BylPipeModule

    ],
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        BylPipeModule,

        ...COMPONENTS
    ],
    entryComponents: [
        ...ENTRYCOMPONENTS
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
        widgetRegistry.register(BylPersonSelectWidgetSFComponent.KEY, BylPersonSelectWidgetSFComponent);
        widgetRegistry.register(BylBorrowMoneyQualificationPoolSelectWidgetSFComponent.KEY, BylBorrowMoneyQualificationPoolSelectWidgetSFComponent);
        widgetRegistry.register(BylProjectSelectWidgetSFComponent.KEY, BylProjectSelectWidgetSFComponent);
        widgetRegistry.register(BylExpenseTypeSelectWidgetSFComponent.KEY, BylExpenseTypeSelectWidgetSFComponent);
        widgetRegistry.register(BylOperationPeriodSelectWidgetSFComponent.KEY, BylOperationPeriodSelectWidgetSFComponent);
        widgetRegistry.register(BylWorkTypeSelectWidgetSFComponent.KEY, BylWorkTypeSelectWidgetSFComponent);
        widgetRegistry.register(BylFileUploadWidgetSFComponent.KEY, BylFileUploadWidgetSFComponent);
    }
}
