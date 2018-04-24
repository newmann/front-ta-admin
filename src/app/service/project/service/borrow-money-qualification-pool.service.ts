import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylResultBody} from '../../model/result-body.model';

import {Observable} from 'rxjs/Observable';

import {BylPageResp} from '../../model/page-resp.model';
import {BylPageReq} from '../../model/page-req.model';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';

import {BylQueryReqBody} from '../../model/query-req-body.model';
import {BylBorrowMoneyQualificationPool} from '../model/borrow-money-qualification-pool.model';
import {BylBorrowMoneyQualificationPoolQuery} from '../query/borrow-money-qualification-pool-query.model';
import {BylBaseService} from '../../service/base.service';



/**
 * @Description: 可借款资源池service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylBorrowMoneyQualificationPoolService  extends BylBaseService<BylBorrowMoneyQualificationPool> {

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/project/borrow-money-qualification-pool';
    }


    // fetchAvailableDepartmentByCodeOrName(searchstr : string): Observable < BylResultBody < Array<BylBorrowMoneyQualificationPool> >> {
    //     return this.http.get<BylResultBody<Array<BylBorrowMoneyQualificationPool>>>(this.BASE_API_URL+"/fetch-available-BylBorrowMoneyQualificationPool-by-code-or-name/" + searchstr);
    // }


    // add(item: BylBorrowMoneyQualificationPool): Observable<BylResultBody<BylBorrowMoneyQualificationPool>> {
    //     return this.http.post<BylResultBody<BylBorrowMoneyQualificationPool>>(this.BASE_API_URL + '/add', item);
    // }
    //
    // update(updateItem: BylBorrowMoneyQualificationPool): Observable<BylResultBody<BylBorrowMoneyQualificationPool>> {
    //     return this.http.post<BylResultBody<BylBorrowMoneyQualificationPool>>(this.BASE_API_URL + '/update', updateItem);
    // }
    //
    // checkCodeAvailable(code: string): Observable<BylResultBody<boolean>> {
    //     return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/check-code-available', code);
    //
    // }
    //
    // findById(id: string): Observable<BylResultBody<BylBorrowMoneyQualificationPool>> {
    //     return this.http.get<BylResultBody<BylBorrowMoneyQualificationPool>>(this.BASE_API_URL + '/find-by-id/' + id);
    // }
    //
    // findByBillNo(billNo: string): Observable<BylResultBody<BylBorrowMoneyQualificationPool>> {
    //     return this.http.get<BylResultBody<BylBorrowMoneyQualificationPool>>(this.BASE_API_URL + '/find-by-billno/' + billNo);
    // }

    // /**
    //  * 按分页方式返回
    //  * @returns {Observable<BylResultBody<>>}
    //  */
    // findPage(query: BylBorrowMoneyQualificationPoolQuery, page: BylPageReq): Observable<BylResultBody<BylPageResp<BylBorrowMoneyQualificationPool>>> {
    //     let queryModel = new BylQueryReqBody<BylBorrowMoneyQualificationPoolQuery>();
    //     queryModel.pageReq = page;
    //     queryModel.queryReq = query;
    //
    //     return this.http.post<BylResultBody<BylPageResp<BylBorrowMoneyQualificationPool>>>(this.BASE_API_URL + '/find-page', queryModel);
    // }
}
