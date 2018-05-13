import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BylRoleListComponent} from "./role/list/role-list.component";
import {BylRoleCrudComponent} from "./role/crud/crud.component";
import {BylDepartmentListComponent} from "./department/list/list.component";
import {BylDepartmentCrudComponent} from "./department/crud/crud.component";
import {BylAccountListComponent} from "./account/list/list.component";
import {BylAccountCrudComponent} from "./account/crud/crud.component";
import {BylPermissionListComponent} from './permission/list/list.component';



const routes: Routes = [
    { path: 'role/list', component: BylRoleListComponent },
    // { path: 'role/add', component: RoleOperComponent },
    { path: 'role/crud/:type', component: BylRoleCrudComponent,data: {reuse: true}  },
    { path: 'department/list', component: BylDepartmentListComponent },
    { path: 'department/crud/:type', component: BylDepartmentCrudComponent,data: {reuse: true}  },
    { path: 'account/list', component: BylAccountListComponent },
    { path: 'account/crud/:type', component: BylAccountCrudComponent,data: {reuse: true} },
    { path: 'permission/list', component: BylPermissionListComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class BylAccountRoutingModule { }
