import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';


import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';


import {BylTicketBaseService} from "../../service/ticket-base.service";
import {BylWorkloadTicket} from "../model/workload-ticket.model";
import {BylSettleTicket} from "../model/settle-ticket.model";
import {Observable} from "rxjs/index";
import {BylResultBody} from "../../model/result-body.model";


/**
 * @Description: 结算单service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylSettleTicketService extends BylTicketBaseService<BylSettleTicket> {

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/project/settle-ticket';
    }


    settle(item: BylSettleTicket): Observable<BylResultBody<BylSettleTicket>> {
        return this.http.post<BylResultBody<BylSettleTicket>>(this.BASE_API_URL + '/settle', item);
    }

    // findByBillNo(billNo: string): Observable<BylResultBody<BylWorkloadTicket>> {
    //     return this.http.get<BylResultBody<BylWorkloadTicket>>(this.BASE_API_URL + '/find-by-billno/' + billNo);
    // }

    // getNewBillNo(): Observable<BylResultBody<string>> {
    //     return this.http.get<BylResultBody<string>>(this.BASE_API_URL + '/get-new-billno');
    // }

    // getNewTicket(): Observable<BylResultBody<BylWorkloadTicket>> {
    //     return this.http.get<BylResultBody<BylWorkloadTicket>>(this.BASE_API_URL + '/new-ticket');
    // }

    // remove(updateItem: BylWorkloadTicket): Observable<BylResultBody<boolean>> {
    //     return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/remove', updateItem);
    // }
    //
    // cancel(updateItem: BylWorkloadTicket): Observable<BylResultBody<BylWorkloadTicket>> {
    //     return this.http.post<BylResultBody<BylWorkloadTicket>>(this.BASE_API_URL + '/cancel', updateItem);
    // }
    //
    // check(updateItem: BylWorkloadTicket): Observable<BylResultBody<BylWorkloadTicket>> {
    //     return this.http.post<BylResultBody<BylWorkloadTicket>>(this.BASE_API_URL + '/check', updateItem);
    // }
    //
    // submit(updateItem: BylWorkloadTicket): Observable<BylResultBody<BylWorkloadTicket>> {
    //     return this.http.post<BylResultBody<BylWorkloadTicket>>(this.BASE_API_URL + '/submit', updateItem);
    // }

    // addDetail(item: BylItemAddModel<BylExpenseDetail>) {
    //     return this.http.post<BylResultBody<BylItemAddModel<BylExpenseDetail>>>(this.BASE_API_URL + '/add-detail', item);
    // };
    //
    // deleteDetail(item: BylItemDeleteModel<BylExpenseDetail>) {
    //     return this.http.post<BylResultBody<BylItemDeleteModel<BylExpenseDetail>>>(this.BASE_API_URL + '/delete-detail', item);
    // };
    //
    // moveDetail(item: BylItemMoveModel) {
    //     return this.http.post<BylResultBody<BylItemMoveModel>>(this.BASE_API_URL + '/move-detail', item);
    // };
    //
    // fetchDetailByMasterID(masterId: string) {
    //     return this.http.post<BylResultBody<Array<BylExpenseDetail>>>(this.BASE_API_URL + '/fetch-detail-by-masterid' + masterId);
    // };

    // confirm(updateItem: BylWorkloadTicket): Observable<BylResultBody<BylWorkloadTicket>> {
    //     return this.http.post<BylResultBody<BylWorkloadTicket>>(this.BASE_API_URL + '/confirm', updateItem);
    // }

}
