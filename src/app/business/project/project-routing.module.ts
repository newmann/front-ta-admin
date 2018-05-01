import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BylProjectListComponent} from './project/list/list.component';
import {BylProjectCrudComponent} from './project/crud/crud.component';
import {BylProjectManagerPoolListComponent} from './project-manager-pool/list/list.component';
import {BylBorrowMoneyQualificationPoolListComponent} from "./borrow-money-qualification-pool/list/list.component";



const routes: Routes = [
    // { path: 'role/list', component: BylRoleListComponent },
    // { path: 'role/add', component: RoleOperComponent },
    // { path: 'role/crud/:type', component: BylRoleCrudComponent },
    { path: 'project/list', component: BylProjectListComponent },
    { path: 'project/crud/:type', component: BylProjectCrudComponent },
    { path: 'project-manager-pool/list', component: BylProjectManagerPoolListComponent },
    { path: 'borrow-money-qualification-pool/list', component: BylBorrowMoneyQualificationPoolListComponent },
    { path: 'borrow-money-ticket/list', component: BylProjectListComponent },
    { path: 'borrow-money-ticket/crud/:type', component: BylProjectCrudComponent }

];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class BylProjectRoutingModule { }
