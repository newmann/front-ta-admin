import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';

import {BylBaseService} from '../../service/base.service';
import {BylAccount} from "../model/account.model";
import {BylAccountQuery} from '../query/account-query.model';
import {BylQueryReqBody} from '../../model/query-req-body.model';
import {BylPageResp} from '../../model/page-resp.model';
import {BylResultBody} from '../../model/result-body.model';
import {Observable} from 'rxjs/Observable';
import {BylPageReq} from '../../model/page-req.model';



/**
 * @Description: 账户管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylAccountService  extends BylBaseService<BylAccount> {


    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/account';
    }

    /**
     * 按分页方式返回
     * @returns {Observable<BylResultBody<>>}
     */
    findAvailableManagerPoolsPage(query: BylAccountQuery, page: BylPageReq): Observable<BylResultBody<BylPageResp<BylAccount>>> {
        let queryModel = new BylQueryReqBody<BylAccountQuery>();
        queryModel.pageReq = page;
        queryModel.queryReq = query;

        return this.http.post<BylResultBody<BylPageResp<BylAccount>>>(this.BASE_API_URL + '/find-available-manager-pools-page', queryModel);
    }
}
