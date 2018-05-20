import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BylProjectListComponent} from './project/list/list.component';
import {BylProjectCrudComponent} from './project/crud/crud.component';
import {BylProjectManagerPoolListComponent} from './project-manager-pool/list/list.component';
import {BylBorrowMoneyQualificationPoolListComponent} from "./borrow-money-qualification-pool/list/list.component";
import {BylWorkTypeListComponent} from "./work-type/list/list.component";
import {BylWorkTypeCrudComponent} from "./work-type/crud/crud.component";
import {BylExpenseTypeCrudComponent} from "./expense-type/crud/crud.component";
import {BylExpenseTypeListComponent} from "./expense-type/list/list.component";
import {BylBorrowMoneyTicketListComponent} from "./borrow-money-ticket/list/list.component";
import {BylBorrowMoneyTicketCrudComponent} from "./borrow-money-ticket/crud/crud.component";
import {BylEmployeeCrudComponent} from "./employee/crud/crud.component";
import {BylEmployeeListComponent} from "./employee/list/list.component";
import {BylOutsourcerCrudComponent} from "./outsourcer/crud/crud.component";
import {BylOutsourcerListComponent} from "./outsourcer/list/list.component";



const routes: Routes = [
    // { path: 'role/list', component: BylRoleListComponent },
    // { path: 'role/add', component: RoleOperComponent },
    // { path: 'role/crud/:type', component: BylRoleCrudComponent },
    { path: 'project/list', component: BylProjectListComponent },
    { path: 'project/crud/:type', component: BylProjectCrudComponent ,data: {reuse: true} },
    { path: 'project-manager-pool/list', component: BylProjectManagerPoolListComponent },
    { path: 'borrow-money-qualification-pool/list', component: BylBorrowMoneyQualificationPoolListComponent },
    { path: 'borrow-money-ticket/list', component: BylBorrowMoneyTicketListComponent },
    { path: 'borrow-money-ticket/crud/:type', component: BylBorrowMoneyTicketCrudComponent,data: {reuse: true}  },
    { path: 'work-type/list', component: BylWorkTypeListComponent },
    { path: 'work-type/crud/:type', component: BylWorkTypeCrudComponent,data: {reuse: true}  },
    { path: 'expense-type/list', component: BylExpenseTypeListComponent },
    { path: 'expense-type/crud/:type', component: BylExpenseTypeCrudComponent,data: {reuse: true}  },
    { path: 'employee/list', component: BylEmployeeListComponent },
    { path: 'employee/crud/:type', component: BylEmployeeCrudComponent,data: {reuse: true}  },
    { path: 'outsourcer/list', component: BylOutsourcerListComponent },
    { path: 'outsourcer/crud/:type', component: BylOutsourcerCrudComponent,data: {reuse: true}  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class BylProjectRoutingModule { }
