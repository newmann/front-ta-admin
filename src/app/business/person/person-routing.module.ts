import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BylPersonListComponent} from './person/list/list.component';
import {BylPersonCrudComponent} from './person/crud/crud.component';



const routes: Routes = [
    // { path: 'role/list', component: BylRoleListComponent },
    // { path: 'role/add', component: RoleOperComponent },
    // { path: 'role/crud/:type', component: BylRoleCrudComponent },
    { path: 'person/person/list', component: BylPersonListComponent },
    { path: 'person/person/crud/:type', component: BylPersonCrudComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PersonRoutingModule { }
