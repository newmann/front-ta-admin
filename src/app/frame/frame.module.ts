import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
// 移动端，含微信
import { LayoutMobileComponent } from '../frame/mobile/mobile.component';
import {MobileHeaderComponent} from '../frame/mobile/mobile-header.component';
import {LayoutModule} from "../layout/layout.module";
const MOBILE = [
    MobileHeaderComponent,
    LayoutMobileComponent
];

@NgModule({
    imports: [SharedModule,
        LayoutModule],
    providers: [],
    declarations: [
        ...MOBILE
    ],
    exports: [
        ...MOBILE
    ]
})
export class BylFrameModule { }
