import {NgModule} from '@angular/core';
import {ColorPickerModule, ColorPickerService} from 'ngx-color-picker';
// import {ImageCropperModule} from 'ng2-img-cropper';
import {SharedModule} from '@shared/shared.module';
import {BylProjectRoutingModule} from './project-routing.module';

import {BylProjectCrudComponent} from './project/crud/crud.component';
import {BylProjectListComponent} from './project/list/list.component';

import {BylProjectManagerPoolListComponent} from './project-manager-pool/list/list.component';
import {BylBusinessSharedModule} from '../business-shared.module';
import {BylBorrowMoneyQualificationPoolListComponent} from './borrow-money-qualification-pool/list/list.component';
import {BylBorrowMoneyTicketListComponent} from './borrow-money-ticket/list/list.component';
import {BylBorrowMoneyTicketCrudComponent} from './borrow-money-ticket/crud/crud.component';
import {BylFetchProjectManagerWidgetComponent} from './fetch-project-manager-form-item/fetch-project-manager.formitem';
import {BylWorkTypeListComponent} from "./work-type/list/list.component";
import {BylWorkTypeCrudComponent} from "./work-type/crud/crud.component";
import {BylExpenseTypeListComponent} from "./expense-type/list/list.component";
import {BylExpenseTypeCrudComponent} from "./expense-type/crud/crud.component";
import {BylEmployeeListComponent} from "./employee/list/list.component";
import {BylEmployeeCrudComponent} from "./employee/crud/crud.component";
import {BylOutsourcerListComponent} from "./outsourcer/list/list.component";
import {BylOutsourcerCrudComponent} from "./outsourcer/crud/crud.component";
import {BylOutsourceEmployeeCrudComponent} from "./outsourcer-employee/crud/crud.component";
import {BylOutsourceEmployeeListComponent} from "./outsourcer-employee/list/list.component";


@NgModule({
    imports: [
        SharedModule,
        BylBusinessSharedModule,
        BylProjectRoutingModule,
        ColorPickerModule
        // ,ImageCropperModule
    ],
    declarations: [
        // BylRoleListComponent,
        // RoleOperComponent,
        // BylRoleCrudComponent,
        // BylDepartmentListComponent,
        // BylDepartmentCrudComponent

        BylProjectCrudComponent,
        BylProjectListComponent,
        BylProjectManagerPoolListComponent,
        BylBorrowMoneyQualificationPoolListComponent,
        BylBorrowMoneyTicketListComponent,
        BylBorrowMoneyTicketCrudComponent,
        BylFetchProjectManagerWidgetComponent,
        BylWorkTypeListComponent,
        BylWorkTypeCrudComponent,
        BylExpenseTypeListComponent,
        BylExpenseTypeCrudComponent,
        BylEmployeeListComponent,
        BylEmployeeCrudComponent,
        BylOutsourcerListComponent,
        BylOutsourcerCrudComponent,
        BylOutsourceEmployeeListComponent,
        BylOutsourceEmployeeCrudComponent,

    ],
    entryComponents: [
        BylProjectManagerPoolListComponent
        // BylRoleCrudComponent,
        // BylDepartmentCrudComponent
    ]
})
export class BylProjectModule {
}
