import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {BylBusinessSharedModule} from "../business-shared.module";
import {BylNewformRoutingModule} from "./newform-routing.module";
import {BylNewformListComponent} from "./list/list.component";





@NgModule({
    imports: [
        SharedModule,
        BylBusinessSharedModule,
        BylNewformRoutingModule
    ],
    declarations: [
        BylNewformListComponent,

    ],
    entryComponents: [
    ]
})
export class BylNewformModule {
}
