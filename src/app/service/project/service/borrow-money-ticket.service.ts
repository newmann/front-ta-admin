import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylResultBody} from '../../model/result-body.model';

import {Observable} from 'rxjs/Observable';

import {BylPageResp} from '../../model/page-resp.model';
import {BylPageReq} from '../../model/page-req.model';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';

import {BylQueryReqBody} from '../../model/query-req-body.model';
import {BylBorrowMoneyTicket} from '../model/borrow-money-ticket.model';
import {BylBorrowMoneyTicketQuery} from '../query/borrow-money-ticket-query.model';
import {BylBaseService} from '../../service/base.service';


/**
 * @Description: 项目管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylBorrowMoneyTicketService  extends BylBaseService<BylBorrowMoneyTicket> {

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/project/borrow-money-ticket';
    }


    // fetchAvailableDepartmentByCodeOrName(searchstr : string): Observable < BylResultBody < Array<BylBorrowMoneyTicket> >> {
    //     return this.http.get<BylResultBody<Array<BylBorrowMoneyTicket>>>(this.BASE_API_URL+"/fetch-available-BylBorrowMoneyTicket-by-code-or-name/" + searchstr);
    // }


    // add(item: BylBorrowMoneyTicket): Observable<BylResultBody<BylBorrowMoneyTicket>> {
    //     return this.http.post<BylResultBody<BylBorrowMoneyTicket>>(this.BASE_API_URL + '/add', item);
    // }
    //
    // update(updateItem: BylBorrowMoneyTicket): Observable<BylResultBody<BylBorrowMoneyTicket>> {
    //     return this.http.post<BylResultBody<BylBorrowMoneyTicket>>(this.BASE_API_URL + '/update', updateItem);
    // }
    //
    // checkCodeAvailable(code: string): Observable<BylResultBody<boolean>> {
    //     return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/check-code-available', code);
    //
    // }
    //
    // findById(id: string): Observable<BylResultBody<BylBorrowMoneyTicket>> {
    //     return this.http.get<BylResultBody<BylBorrowMoneyTicket>>(this.BASE_API_URL + '/find-by-id/' + id);
    // }

    findByBillNo(billNo: string): Observable<BylResultBody<BylBorrowMoneyTicket>> {
        return this.http.get<BylResultBody<BylBorrowMoneyTicket>>(this.BASE_API_URL + '/find-by-billno/' + billNo);
    }
    //
    // /**
    //  * 按分页方式返回
    //  * @returns {Observable<BylResultBody<>>}
    //  */
    // findPage(query: BylBorrowMoneyTicketQuery, page: BylPageReq): Observable<BylResultBody<BylPageResp<BylBorrowMoneyTicket>>> {
    //     let queryModel = new BylQueryReqBody<BylBorrowMoneyTicketQuery>();
    //     queryModel.pageReq = page;
    //     queryModel.queryReq = query;
    //
    //     return this.http.post<BylResultBody<BylPageResp<BylBorrowMoneyTicket>>>(this.BASE_API_URL + '/find-page', queryModel);
    // }
}
