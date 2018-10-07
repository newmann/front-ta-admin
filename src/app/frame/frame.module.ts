import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
// 移动端，含微信
import { BylLayoutMobileComponent } from '../frame/mobile/mobile.component';
import {BylMobileHeaderComponent} from '../frame/mobile/mobile-header.component';
import {LayoutModule} from "../layout/layout.module";
import {BylLayoutDefaultComponent} from "./pc/default/default.component";
import {BylHeaderComponent} from "./pc/default/header/header.component";
import {BylSidebarComponent} from "./pc/default/sidebar/sidebar.component";
import {BylHeaderSearchComponent} from "./pc/default/header/components/search.component";
import {BylHeaderNotifyComponent} from "./pc/default/header/components/notify.component";
import {BylHeaderTaskComponent} from "./pc/default/header/components/task.component";
import {BylHeaderIconComponent} from "./pc/default/header/components/icon.component";
import {BylHeaderFullScreenComponent} from "./pc/default/header/components/fullscreen.component";
import {BylHeaderI18nComponent} from "./pc/default/header/components/i18n.component";
import {BylHeaderStorageComponent} from "./pc/default/header/components/storage.component";
import {BylHeaderUserComponent} from "./pc/default/header/components/user.component";
import {BylLayoutPassportComponent} from "./pc/passport/passport.component";
import {BylLayoutFullScreenComponent} from "./pc/fullscreen/fullscreen.component";
import {BylHelperFlowComponent} from "./pc/default/header/components/helper-flow.component";
import {BylI18nTestComponent} from "./pc/default/header/components/i18n-test.component";

const PC = [
    BylLayoutDefaultComponent,
    BylLayoutFullScreenComponent,
    BylHeaderComponent,
    BylSidebarComponent,

];

const COMPONENTS=[
    BylHeaderSearchComponent,
    BylHeaderNotifyComponent,
    BylHeaderTaskComponent,
    BylHeaderIconComponent,
    BylHeaderFullScreenComponent,
    BylHeaderI18nComponent,
    BylI18nTestComponent,
    BylHeaderStorageComponent,
    BylHeaderUserComponent,
    BylHelperFlowComponent
];

const PASSPORT=[
    BylLayoutPassportComponent
];


const MOBILE = [
    BylMobileHeaderComponent,
    BylLayoutMobileComponent
];

@NgModule({
    imports: [SharedModule],
    providers: [],
    declarations: [
        ...MOBILE,
        ...PC,
        ...COMPONENTS,
        ...PASSPORT
    ],
    exports: [
        ...MOBILE,
        ...PC,
        ...COMPONENTS,
        ...PASSPORT

    ],
    entryComponents: [
        BylHelperFlowComponent
    ]
})
export class BylFrameModule { }
