import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoleListComponent} from "./role/list/role-list.component";



const routes: Routes = [
    { path: 'role/list', component: RoleListComponent }

];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AccountRoutingModule { }
