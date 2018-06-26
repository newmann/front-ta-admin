import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BylNewformListComponent} from "./list/list.component";



const routes: Routes = [
    { path: 'newform/list', component: BylNewformListComponent },

];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class BylNewformRoutingModule { }
