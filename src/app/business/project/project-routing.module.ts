import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BylProjectListComponent} from './project/list/list.component';
import {BylProjectCrudComponent} from './project/crud/crud.component';



const routes: Routes = [
    // { path: 'role/list', component: BylRoleListComponent },
    // { path: 'role/add', component: RoleOperComponent },
    // { path: 'role/crud/:type', component: BylRoleCrudComponent },
    { path: 'project/list', component: BylProjectListComponent },
    { path: 'project/crud/:type', component: BylProjectCrudComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class BylProjectRoutingModule { }
