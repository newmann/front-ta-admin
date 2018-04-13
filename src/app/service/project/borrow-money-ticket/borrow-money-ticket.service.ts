import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylResultBody} from '../../model/result-body.model';

import {Observable} from 'rxjs/Observable';

import {BylPageResp} from '../../model/page-resp.model';
import {BylPageReq} from '../../model/page-req.model';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';

import {BylQueryReqBody} from '../../model/query-req-body.model';
import {BorrowMoneyTicket} from './borrow-money-ticket.model';
import {BorrowMoneyTicketQuery} from './borrow-money-ticket-query.model';


/**
 * @Description: 项目管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BorrowMoneyTicketService {
    private BASE_API_URL = 'api/project/borrow-money-ticket';

    constructor(private http: _HttpClient,
                private configServer: BylConfigService,
                private i18nService: I18NService) {
    }


    // fetchAvailableDepartmentByCodeOrName(searchstr : string): Observable < BylResultBody < Array<BorrowMoneyTicket> >> {
    //     return this.http.get<BylResultBody<Array<BorrowMoneyTicket>>>(this.BASE_API_URL+"/fetch-available-BorrowMoneyTicket-by-code-or-name/" + searchstr);
    // }


    add(item: BorrowMoneyTicket): Observable<BylResultBody<BorrowMoneyTicket>> {
        return this.http.post<BylResultBody<BorrowMoneyTicket>>(this.BASE_API_URL + '/add', item);
    }

    update(updateItem: BorrowMoneyTicket): Observable<BylResultBody<BorrowMoneyTicket>> {
        return this.http.post<BylResultBody<BorrowMoneyTicket>>(this.BASE_API_URL + '/update', updateItem);
    }

    checkCodeAvailable(code: string): Observable<BylResultBody<boolean>> {
        return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/check-code-available', code);

    }

    findById(id: string): Observable<BylResultBody<BorrowMoneyTicket>> {
        return this.http.get<BylResultBody<BorrowMoneyTicket>>(this.BASE_API_URL + '/find-by-id/' + id);
    }

    findByBillNo(billNo: string): Observable<BylResultBody<BorrowMoneyTicket>> {
        return this.http.get<BylResultBody<BorrowMoneyTicket>>(this.BASE_API_URL + '/find-by-billno/' + billNo);
    }

    /**
     * 按分页方式返回
     * @returns {Observable<BylResultBody<>>}
     */
    findPage(query: BorrowMoneyTicketQuery, page: BylPageReq): Observable<BylResultBody<BylPageResp<BorrowMoneyTicket>>> {
        let queryModel = new BylQueryReqBody<BorrowMoneyTicketQuery>();
        queryModel.pageReq = page;
        queryModel.queryReq = query;

        return this.http.post<BylResultBody<BylPageResp<BorrowMoneyTicket>>>(this.BASE_API_URL + '/find-page', queryModel);
    }
}
