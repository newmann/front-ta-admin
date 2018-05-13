import {NgModule} from '@angular/core';
import {BylMasterDataStatusPipe} from "./pipe/master-data-status.pipe";
import {BylOrganizationTypePipe} from "./organization/pipe/organization-type.pipe";
import {BylBorrowMoneyTicketStatusPipe} from "./project/pipe/borrow-money-ticket-status.pipe";
import {BylProjectStatusPipe} from "./project/pipe/project-status.pipe";


@NgModule({
    declarations: [
        BylMasterDataStatusPipe,
        BylOrganizationTypePipe,
        BylBorrowMoneyTicketStatusPipe,
        BylProjectStatusPipe
    ],
    exports: [
        BylMasterDataStatusPipe,
        BylOrganizationTypePipe,
        BylBorrowMoneyTicketStatusPipe,
        BylProjectStatusPipe
    ]

})
export class BylPipeModule {

}
