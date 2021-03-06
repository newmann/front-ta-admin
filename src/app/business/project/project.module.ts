import {NgModule} from '@angular/core';
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
import {BylOutsourceEmployeeCrudComponent} from "./outsource-employee/crud/crud.component";
import {BylOutsourceEmployeeListComponent} from "./outsource-employee/list/list.component";
import {BylExpenseTicketListComponent} from "./expense-ticket/list/list.component";
import {BylExpenseTicketCrudComponent} from "./expense-ticket/crud/crud.component";
import {BylExpenseTicketDetailListComponent} from "./expense-ticket-detail/list/list.component";
import {BylExpenseTicketDetailCrudComponent} from "./expense-ticket-detail/crud/crud.component";
import {BylOperationPeriodListComponent} from "./operation-period/list/list.component";
import {BylOperationPeriodCrudComponent} from "./operation-period/crud/crud.component";
import {BylWorkloadTicketListComponent} from "./workload-ticket/list/list.component";
import {BylWorkloadTicketCrudComponent} from "./workload-ticket/crud/crud.component";
import {BylWorkloadDetailListComponent} from "./workload-detail/list/list.component";
import {BylEmployeeItemListComponent} from "./employee/item-list/item-list.component";
import {BylWorkTypeConfigTicketCrudComponent} from "./work-type-config-ticket/crud/crud.component";
import {BylWorkTypeConfigTicketListComponent} from "./work-type-config-ticket/list/list.component";
import {BylWorkTypeConfigDetailListComponent} from "./work-type-config-detail/list/list.component";
import {BylOutsourceEmployeeItemListComponent} from "./outsource-employee/item-list/item-list.component";
import {BylWorkloadDetailDetailBrowserComponent} from "./workload-detail-detail/list/list.component";
import {BylProjectAuthListComponent} from "./project-auth/list/list.component";
import {BylProjectAuthItemProjectListComponent} from "./project-auth/project-list/item-list.component";
import {BylProjectProgressAssessTicketListComponent} from "./project-progress-assess-ticket/list/list.component";
import {BylProjectProgressAssessTicketCrudComponent} from "./project-progress-assess-ticket/crud/crud.component";
import {BylPersonModule} from "../person/person.module";
import {BylSettleTicketListComponent} from "./settle-ticket/list/list.component";
import {BylSettleTicketCrudComponent} from "./settle-ticket/crud/crud.component";
import {BylAccountModule} from "../account/account.module";
import {BylOrganizationModule} from "../organization/organization.module";
import {BylSettleDetailWorkloadTicket} from "../../service/project/model/settle-detail-workload-ticket.model";
import {BylSettleDetailWorkLoadListComponent} from "./settle-ticket/workload-list/list.component";
import {BylSettleDetailWorkLoadTicketListComponent} from "./settle-ticket/workload-ticket-list/list.component";
import {BylSettleDetailWorkloadDetailAddPoolListComponent} from "./settle-ticket/add-workload-detail-pool-list/add-pool-list.component";
import {BylSettleDetailBorrowMoneyTicketListComponent} from "./settle-ticket/borrow-money-ticket-list/list.component";
import {BylSettleDetailBorrowMoneyListComponent} from "./settle-ticket/borrow-money-list/list.component";
import {BylSettleDetailBorrowMoneyTicketAddPoolListComponent} from "./settle-ticket/add-borrow-money-ticket-pool-list/add-pool-list.component";

const COMPONENTS=[
    // BylRoleListComponent,
    // RoleOperComponent,
    // BylRoleCrudComponent,
    // BylDepartmentListComponent,
    // BylDepartmentCrudComponent

    BylProjectCrudComponent,
    BylProjectListComponent,
    BylProjectAuthListComponent,
    BylProjectAuthItemProjectListComponent,
    BylProjectProgressAssessTicketListComponent,
    BylProjectProgressAssessTicketCrudComponent,

    BylProjectManagerPoolListComponent,
    BylBorrowMoneyQualificationPoolListComponent,
    BylBorrowMoneyTicketListComponent,
    BylBorrowMoneyTicketCrudComponent,
    BylFetchProjectManagerWidgetComponent,
    BylWorkTypeListComponent,
    BylWorkTypeCrudComponent,
    BylWorkTypeConfigTicketCrudComponent,
    BylWorkTypeConfigTicketListComponent,
    BylWorkTypeConfigDetailListComponent,

    BylExpenseTypeListComponent,
    BylExpenseTypeCrudComponent,
    BylEmployeeListComponent,
    BylEmployeeCrudComponent,
    BylEmployeeItemListComponent,
    BylOutsourcerListComponent,
    BylOutsourcerCrudComponent,
    BylOutsourceEmployeeListComponent,
    BylOutsourceEmployeeCrudComponent,
    BylOutsourceEmployeeItemListComponent,


    BylExpenseTicketListComponent,
    BylExpenseTicketCrudComponent,
    BylExpenseTicketDetailListComponent,
    BylExpenseTicketDetailCrudComponent,
    BylOperationPeriodListComponent,
    BylOperationPeriodCrudComponent,
    BylWorkloadTicketListComponent,
    BylWorkloadTicketCrudComponent,
    BylWorkloadDetailListComponent,
    BylWorkloadDetailDetailBrowserComponent,

    BylSettleTicketListComponent,
    BylSettleTicketCrudComponent,
    BylSettleDetailWorkLoadTicketListComponent,
    BylSettleDetailWorkLoadListComponent,
    BylSettleDetailWorkloadDetailAddPoolListComponent,
    BylSettleDetailBorrowMoneyTicketListComponent,
    BylSettleDetailBorrowMoneyListComponent,
    BylSettleDetailBorrowMoneyTicketAddPoolListComponent,

];
const ENTRYCOMPONENTS = [
    BylProjectManagerPoolListComponent,
    BylExpenseTicketDetailCrudComponent,
    BylEmployeeItemListComponent,
    BylOutsourceEmployeeItemListComponent,
    BylWorkloadDetailDetailBrowserComponent,
    BylSettleDetailWorkloadDetailAddPoolListComponent,
    BylSettleDetailBorrowMoneyTicketAddPoolListComponent,
    ];


@NgModule({
    imports: [
        SharedModule,
        BylBusinessSharedModule,
        BylAccountModule,
        BylOrganizationModule,
        BylPersonModule,
        BylProjectRoutingModule
    ],
    declarations: [
        ...COMPONENTS

    ],
    exports: [
        ...COMPONENTS
    ],

    entryComponents: [

        ...ENTRYCOMPONENTS
        // BylRoleCrudComponent,
        // BylDepartmentCrudComponent
    ]
})
export class BylProjectModule {
}
