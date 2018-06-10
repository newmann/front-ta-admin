import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylResultBody} from '../../model/result-body.model';

import {Observable} from 'rxjs/Observable';


import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';


import {BylBaseService} from '../../service/base.service';
import {BylExpenseTicket} from "../model/expense-ticket.model";
import {BylDetailItemAddModel} from "../../model/detail-item-add.model";
import {BylExpenseDetail} from "../model/expense-detail.model";
import {BylDetailItemDeleteModel} from "../../model/detail-item-delete.model";
import {BylDetailItemMoveModel} from "../../model/detail-item-move.model";
import {BylTicketBaseService} from "../../service/ticket-base.service";


/**
 * @Description: 费用单service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylExpenseTicketService extends BylTicketBaseService<BylExpenseTicket> {

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/project/expense-ticket';
    }



    // findByBillNo(billNo: string): Observable<BylResultBody<BylExpenseTicket>> {
    //     return this.http.get<BylResultBody<BylExpenseTicket>>(this.BASE_API_URL + '/find-by-billno/' + billNo);
    // }

    // getNewBillNo(): Observable<BylResultBody<string>> {
    //     return this.http.get<BylResultBody<string>>(this.BASE_API_URL + '/get-new-billno');
    // }

    // getNewTicket(): Observable<BylResultBody<BylExpenseTicket>> {
    //     return this.http.get<BylResultBody<BylExpenseTicket>>(this.BASE_API_URL + '/new-ticket');
    // }

    // remove(updateItem: BylExpenseTicket): Observable<BylResultBody<boolean>> {
    //     return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/remove', updateItem);
    // }
    //
    // cancel(updateItem: BylExpenseTicket): Observable<BylResultBody<BylExpenseTicket>> {
    //     return this.http.post<BylResultBody<BylExpenseTicket>>(this.BASE_API_URL + '/cancel', updateItem);
    // }
    //
    // check(updateItem: BylExpenseTicket): Observable<BylResultBody<BylExpenseTicket>> {
    //     return this.http.post<BylResultBody<BylExpenseTicket>>(this.BASE_API_URL + '/check', updateItem);
    // }
    //
    // submit(updateItem: BylExpenseTicket): Observable<BylResultBody<BylExpenseTicket>> {
    //     return this.http.post<BylResultBody<BylExpenseTicket>>(this.BASE_API_URL + '/submit', updateItem);
    // }

    // addDetail(item: BylDetailItemAddModel<BylExpenseDetail>) {
    //     return this.http.post<BylResultBody<BylDetailItemAddModel<BylExpenseDetail>>>(this.BASE_API_URL + '/add-detail', item);
    // };
    //
    // deleteDetail(item: BylDetailItemDeleteModel<BylExpenseDetail>) {
    //     return this.http.post<BylResultBody<BylDetailItemDeleteModel<BylExpenseDetail>>>(this.BASE_API_URL + '/delete-detail', item);
    // };
    //
    // moveDetail(item: BylDetailItemMoveModel) {
    //     return this.http.post<BylResultBody<BylDetailItemMoveModel>>(this.BASE_API_URL + '/move-detail', item);
    // };
    //
    // fetchDetailByMasterID(masterId: string) {
    //     return this.http.post<BylResultBody<Array<BylExpenseDetail>>>(this.BASE_API_URL + '/fetch-detail-by-masterid' + masterId);
    // };

    // confirm(updateItem: BylExpenseTicket): Observable<BylResultBody<BylExpenseTicket>> {
    //     return this.http.post<BylResultBody<BylExpenseTicket>>(this.BASE_API_URL + '/confirm', updateItem);
    // }

}
