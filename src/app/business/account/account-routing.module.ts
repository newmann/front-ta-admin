import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BylRoleListComponent} from "./role/list/role-list.component";
import {RoleOperComponent} from "./role/oper/role-oper.component";
import {BylRoleCrudComponent} from "./role/crud/crud.component";
import {BylDepartmentListComponent} from "./department/list/list.component";
import {BylDepartmentCrudComponent} from "./department/crud/crud.component";



const routes: Routes = [
    { path: 'role/list', component: BylRoleListComponent },
    { path: 'role/add', component: RoleOperComponent },
    { path: 'role/crud/:type', component: BylRoleCrudComponent },
    { path: 'department/list', component: BylDepartmentListComponent },
    { path: 'department/crud/:type', component: BylDepartmentCrudComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AccountRoutingModule { }