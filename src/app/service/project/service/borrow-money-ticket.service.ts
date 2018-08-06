import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylResultBody} from '../../model/result-body.model';

import {Observable} from 'rxjs';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';
import {BylBorrowMoneyTicket} from '../model/borrow-money-ticket.model';
import {BylBaseService} from '../../service/base.service';
import {BylTicketBaseService} from "../../service/ticket-base.service";


/**
 * @Description: 项目管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylBorrowMoneyTicketService  extends BylTicketBaseService<BylBorrowMoneyTicket> {

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/project/borrow-money-ticket';
    }


    // findByBillNo(billNo: string): Observable<BylResultBody<BylBorrowMoneyTicket>> {
    //     return this.http.get<BylResultBody<BylBorrowMoneyTicket>>(this.BASE_API_URL + '/find-by-billno/' + billNo);
    // }

    // getNewBillNo(): Observable<BylResultBody<string>> {
    //     return this.http.get<BylResultBody<string>>(this.BASE_API_URL + '/get-new-billno');
    // }

    // getNewTicket(): Observable<BylResultBody<BylBorrowMoneyTicket>> {
    //     return this.http.get<BylResultBody<BylBorrowMoneyTicket>>(this.BASE_API_URL + '/new-ticket');
    // }

    // delete(updateItem: BylBorrowMoneyTicket): Observable<BylResultBody<boolean>> {
    //     return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/delete', updateItem);
    // }
    //
    // cancel(updateItem: BylBorrowMoneyTicket): Observable<BylResultBody<BylBorrowMoneyTicket>> {
    //     return this.http.post<BylResultBody<BylBorrowMoneyTicket>>(this.BASE_API_URL + '/cancel', updateItem);
    // }
    //
    // check(updateItem: BylBorrowMoneyTicket): Observable<BylResultBody<BylBorrowMoneyTicket>> {
    //     return this.http.post<BylResultBody<BylBorrowMoneyTicket>>(this.BASE_API_URL + '/check', updateItem);
    // }

    // submit(updateItem: BylBorrowMoneyTicket): Observable<BylResultBody<BylBorrowMoneyTicket>> {
    //     return this.http.post<BylResultBody<BylBorrowMoneyTicket>>(this.BASE_API_URL + '/submit', updateItem);
    // }
    //
    confirm(updateItem: BylBorrowMoneyTicket): Observable<BylResultBody<BylBorrowMoneyTicket>> {
        return this.http.post<BylResultBody<BylBorrowMoneyTicket>>(this.BASE_API_URL + '/confirm', updateItem);
    }

}
