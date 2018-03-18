import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import {WaitingComponent} from "./waiting/waiting.component";



@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        WaitingComponent
    ]
})
export class BusinessCommonModule { }
