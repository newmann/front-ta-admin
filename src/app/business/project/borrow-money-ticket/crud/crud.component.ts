import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';


@Component({
  selector: 'byl-borrow-money-ticket-crud',
  templateUrl: './crud.component.html',
})
export class BylBorrowMoneyTicketListCrudComponent implements OnInit {

    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }

}
