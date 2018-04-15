import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylResultBody} from '../../model/result-body.model';

import {Observable} from 'rxjs/Observable';

import {BylPageResp} from '../../model/page-resp.model';
import {BylPageReq} from '../../model/page-req.model';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';

import {BylQueryReqBody} from '../../model/query-req-body.model';
import {BorrowMoneyQualificationPool} from '../model/borrow-money-qualification-pool.model';
import {BorrowMoneyQualificationPoolQuery} from '../query/borrow-money-qualification-pool-query.model';



/**
 * @Description: 可借款资源池service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BorrowMoneyQualificationPoolService {
    private BASE_API_URL = 'api/project/borrow-money-qualification-pool';

    constructor(private http: _HttpClient,
                private configServer: BylConfigService,
                private i18nService: I18NService) {
    }


    // fetchAvailableDepartmentByCodeOrName(searchstr : string): Observable < BylResultBody < Array<BorrowMoneyQualificationPool> >> {
    //     return this.http.get<BylResultBody<Array<BorrowMoneyQualificationPool>>>(this.BASE_API_URL+"/fetch-available-BorrowMoneyQualificationPool-by-code-or-name/" + searchstr);
    // }


    add(item: BorrowMoneyQualificationPool): Observable<BylResultBody<BorrowMoneyQualificationPool>> {
        return this.http.post<BylResultBody<BorrowMoneyQualificationPool>>(this.BASE_API_URL + '/add', item);
    }

    update(updateItem: BorrowMoneyQualificationPool): Observable<BylResultBody<BorrowMoneyQualificationPool>> {
        return this.http.post<BylResultBody<BorrowMoneyQualificationPool>>(this.BASE_API_URL + '/update', updateItem);
    }

    checkCodeAvailable(code: string): Observable<BylResultBody<boolean>> {
        return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/check-code-available', code);

    }

    findById(id: string): Observable<BylResultBody<BorrowMoneyQualificationPool>> {
        return this.http.get<BylResultBody<BorrowMoneyQualificationPool>>(this.BASE_API_URL + '/find-by-id/' + id);
    }

    findByBillNo(billNo: string): Observable<BylResultBody<BorrowMoneyQualificationPool>> {
        return this.http.get<BylResultBody<BorrowMoneyQualificationPool>>(this.BASE_API_URL + '/find-by-billno/' + billNo);
    }

    /**
     * 按分页方式返回
     * @returns {Observable<BylResultBody<>>}
     */
    findPage(query: BorrowMoneyQualificationPoolQuery, page: BylPageReq): Observable<BylResultBody<BylPageResp<BorrowMoneyQualificationPool>>> {
        let queryModel = new BylQueryReqBody<BorrowMoneyQualificationPoolQuery>();
        queryModel.pageReq = page;
        queryModel.queryReq = query;

        return this.http.post<BylResultBody<BylPageResp<BorrowMoneyQualificationPool>>>(this.BASE_API_URL + '/find-page', queryModel);
    }
}
