import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BylOrganizationListComponent} from "./organization/list/list.component";
import {BylOrganizationCrudComponent} from "./organization/crud/crud.component";



const routes: Routes = [
    // { path: 'role/list', component: BylRoleListComponent },
    // { path: 'role/add', component: RoleOperComponent },
    // { path: 'role/crud/:type', component: BylRoleCrudComponent },
    { path: 'organization/list', component: BylOrganizationListComponent  },
    { path: 'organization/crud/:type', component: BylOrganizationCrudComponent },

];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class BylOrganizationRoutingModule { }
