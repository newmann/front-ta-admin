import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoleListComponent} from "./role/list/role-list.component";
import {RoleOperComponent} from "./role/oper/role-oper.component";
import {BylRoleCrudComponent} from "./role/crud/crud.component";



const routes: Routes = [
    { path: 'role/list', component: RoleListComponent },
    { path: 'role/add', component: RoleOperComponent },
    { path: 'role/crud/:type', component: BylRoleCrudComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AccountRoutingModule { }
