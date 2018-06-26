import {NgModule} from '@angular/core';
import {ColorPickerModule} from 'ngx-color-picker';
// import {ImageCropperModule} from 'ng2-img-cropper';
import {SharedModule} from '@shared/shared.module';
import {BylBusinessSharedModule} from "../business-shared.module";
import {BylNewformRoutingModule} from "./newform-routing.module";
import {BylNewformListComponent} from "./list/list.component";





@NgModule({
    imports: [
        SharedModule,
        BylBusinessSharedModule,
        BylNewformRoutingModule,
        ColorPickerModule,
          // ImageCropperModule
    ],
    declarations: [
        BylNewformListComponent,

    ],
    entryComponents: [
    ]
})
export class BylNewformModule {
}
