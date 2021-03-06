import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';


import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';


import {BylTicketBaseService} from "../../service/ticket-base.service";
import {BylWorkTypeConfigTicket} from "../model/work-type-config-ticket.model";


/**
 * @Description: 工种变更单service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylWorkTypeConfigTicketService extends BylTicketBaseService<BylWorkTypeConfigTicket> {

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/project/work-type-config-ticket';
    }



    // findByBillNo(billNo: string): Observable<BylResultBody<BylWorkTypeConfigTicket>> {
    //     return this.http.get<BylResultBody<BylWorkTypeConfigTicket>>(this.BASE_API_URL + '/find-by-billno/' + billNo);
    // }

    // getNewBillNo(): Observable<BylResultBody<string>> {
    //     return this.http.get<BylResultBody<string>>(this.BASE_API_URL + '/get-new-billno');
    // }

    // getNewTicket(): Observable<BylResultBody<BylWorkTypeConfigTicket>> {
    //     return this.http.get<BylResultBody<BylWorkTypeConfigTicket>>(this.BASE_API_URL + '/new-ticket');
    // }

    // remove(updateItem: BylWorkTypeConfigTicket): Observable<BylResultBody<boolean>> {
    //     return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/remove', updateItem);
    // }
    //
    // cancel(updateItem: BylWorkTypeConfigTicket): Observable<BylResultBody<BylWorkTypeConfigTicket>> {
    //     return this.http.post<BylResultBody<BylWorkTypeConfigTicket>>(this.BASE_API_URL + '/cancel', updateItem);
    // }
    //
    // check(updateItem: BylWorkTypeConfigTicket): Observable<BylResultBody<BylWorkTypeConfigTicket>> {
    //     return this.http.post<BylResultBody<BylWorkTypeConfigTicket>>(this.BASE_API_URL + '/check', updateItem);
    // }
    //
    // submit(updateItem: BylWorkTypeConfigTicket): Observable<BylResultBody<BylWorkTypeConfigTicket>> {
    //     return this.http.post<BylResultBody<BylWorkTypeConfigTicket>>(this.BASE_API_URL + '/submit', updateItem);
    // }

    // addDetail(item: BylDetailAddModel<BylExpenseDetail>) {
    //     return this.http.post<BylResultBody<BylDetailAddModel<BylExpenseDetail>>>(this.BASE_API_URL + '/add-detail', item);
    // };
    //
    // deleteDetail(item: BylDetailDeleteModel<BylExpenseDetail>) {
    //     return this.http.post<BylResultBody<BylDetailDeleteModel<BylExpenseDetail>>>(this.BASE_API_URL + '/delete-detail', item);
    // };
    //
    // moveDetail(item: BylDetailMoveModel) {
    //     return this.http.post<BylResultBody<BylDetailMoveModel>>(this.BASE_API_URL + '/move-detail', item);
    // };
    //
    // fetchDetailByMasterID(masterId: string) {
    //     return this.http.post<BylResultBody<Array<BylExpenseDetail>>>(this.BASE_API_URL + '/fetch-detail-by-masterid' + masterId);
    // };

    // confirm(updateItem: BylWorkTypeConfigTicket): Observable<BylResultBody<BylWorkTypeConfigTicket>> {
    //     return this.http.post<BylResultBody<BylWorkTypeConfigTicket>>(this.BASE_API_URL + '/confirm', updateItem);
    // }

}
