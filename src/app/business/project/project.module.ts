import {NgModule} from '@angular/core';
import {ColorPickerModule, ColorPickerService} from 'ngx-color-picker';
import {ImageCropperModule} from 'ng2-img-cropper';
import {SharedModule} from '@shared/shared.module';
import {BylProjectRoutingModule} from './project-routing.module';

import {BylProjectCrudComponent} from './project/crud/crud.component';
import {BylProjectListComponent} from './project/list/list.component';

import {BylProjectManagerPoolListComponent} from './project-manager-pool/list/list.component';
import {BylBusinessSharedModule} from '../business-shared.module';
import {BylBorrowMoneyQualificationPoolListComponent} from './borrow-money-qualification-pool/list/list.component';
import {BylBorrowMoneyTicketListComponent} from './borrow-money-ticket/list/list.component';
import {BylBorrowMoneyTicketListCrudComponent} from './borrow-money-ticket/crud/crud.component';
import {BylFetchProjectManagerWidgetComponent} from './fetch-project-manager-form-item/fetch-project-manager.formitem';


@NgModule({
    imports: [
        SharedModule,
        BylBusinessSharedModule,
        BylProjectRoutingModule,
        ColorPickerModule,
        ImageCropperModule
    ],
    declarations: [
        // BylRoleListComponent,
        // RoleOperComponent,
        // BylRoleCrudComponent,
        // BylDepartmentListComponent,
        // BylDepartmentCrudComponent

        BylProjectCrudComponent,
        BylProjectListComponent,
        BylProjectManagerPoolListComponent,
        BylBorrowMoneyQualificationPoolListComponent,
        BylBorrowMoneyTicketListComponent,
        BylBorrowMoneyTicketListCrudComponent,
        BylFetchProjectManagerWidgetComponent

    ],
    entryComponents: [
        BylProjectManagerPoolListComponent
        // BylRoleCrudComponent,
        // BylDepartmentCrudComponent
    ]
})
export class BylProjectModule {
}
