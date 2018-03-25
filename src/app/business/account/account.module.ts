import { NgModule } from '@angular/core';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';
import { ImageCropperModule } from 'ng2-img-cropper';
import { SharedModule } from '@shared/shared.module';
import {AccountRoutingModule} from "./account-routing.module";
import {RoleListComponent} from "./role/list/role-list.component";
import { RoleOperComponent } from './role/oper/role-oper.component';
import { BylRoleCrudComponent } from './role/crud/crud.component';



@NgModule({
    imports: [
        SharedModule,
        AccountRoutingModule,
        ColorPickerModule,
        ImageCropperModule
    ],
    declarations: [
        RoleListComponent,
        RoleOperComponent,
        BylRoleCrudComponent
    ],
    entryComponents:[
        BylRoleCrudComponent
    ]
})
export class AccountModule { }
