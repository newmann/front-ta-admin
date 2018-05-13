import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BylPersonListComponent} from './person/list/list.component';
import {BylPersonCrudComponent} from './person/crud/crud.component';
import {BylPersonAddressCrudComponent} from "./address/crud/crud.component";
import {BylPersonCertificateCrudComponent} from './certificate/crud/crud.component';



const routes: Routes = [
    // { path: 'role/list', component: BylRoleListComponent },
    // { path: 'role/add', component: RoleOperComponent },
    // { path: 'role/crud/:type', component: BylRoleCrudComponent },
    { path: 'person/list', component: BylPersonListComponent },
    { path: 'person/crud/:type', component: BylPersonCrudComponent ,data: {reuse: true} },
    { path: 'address/crud/:type', component: BylPersonAddressCrudComponent,data: {reuse: true}  },
    { path: 'certificate/crud/:type', component: BylPersonCertificateCrudComponent ,data: {reuse: true} }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class BylPersonRoutingModule { }
