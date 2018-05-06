import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylResultBody} from '../../model/result-body.model';

import {Observable} from 'rxjs/Observable';

import {BylPageResp} from '../../model/page-resp.model';
import {BylPageReq} from '../../model/page-req.model';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';

import {BylQueryReqBody} from '../../model/query-req-body.model';

import {BylProjectManagerPoolQuery} from '../query/project-manager-pool-query.model';
import {BylProjectManagerPool} from '../model/project-manager-pool.model';
import {BylBaseService} from '../../service/base.service';
import {BylAccountQuery} from '../../account/query/account-query.model';
import {BylAccount} from '../../account/model/account.model';
import {BylAccountAvailablePoolsInterface} from '../../account/service/account-related.interface';




/**
 * @Description: 项目经理资源池service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylProjectManagerPoolService extends BylBaseService<BylProjectManagerPool> implements BylAccountAvailablePoolsInterface{

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/project/project-manager-pool';
    }

    batchtAdd(pools: Array<BylProjectManagerPool>): Observable<BylResultBody<Array<BylProjectManagerPool>>> {
        return this.http.post<BylResultBody<Array<BylProjectManagerPool>>>(this.BASE_API_URL + '/batch-add', pools);
    }
    /**
     * 按分页方式返回
     * @returns {Observable<BylResultBody<>>}
     */
    findAvailableAccountPoolsPage(query: BylAccountQuery, page: BylPageReq): Observable<BylResultBody<BylPageResp<BylAccount>>> {
        let queryModel = new BylQueryReqBody<BylAccountQuery>();
        queryModel.pageReq = page;
        queryModel.queryReq = query;

        return this.http.post<BylResultBody<BylPageResp<BylAccount>>>(this.BASE_API_URL + '/find-available-account-pools-page', queryModel);
    }

    // fetchAvailableDepartmentByCodeOrName(searchstr : string): Observable < BylResultBody < Array<BylProjectManagerPool> >> {
    //     return this.http.get<BylResultBody<Array<BylProjectManagerPool>>>(this.BASE_API_URL+"/fetch-available-BylProjectManagerPool-by-code-or-name/" + searchstr);
    // }


    // add(item: BylProjectManagerPool): Observable<BylResultBody<BylProjectManagerPool>> {
    //     return this.http.post<BylResultBody<BylProjectManagerPool>>(this.BASE_API_URL + '/add', item);
    // }
    //
    // update(updateItem: BylProjectManagerPool): Observable<BylResultBody<BylProjectManagerPool>> {
    //     return this.http.post<BylResultBody<BylProjectManagerPool>>(this.BASE_API_URL + '/update', updateItem);
    // }
    //
    // checkCodeAvailable(code: string): Observable<BylResultBody<boolean>> {
    //     return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/check-code-available', code);
    //
    // }
    //
    // findById(id: string): Observable<BylResultBody<BylProjectManagerPool>> {
    //     return this.http.get<BylResultBody<BylProjectManagerPool>>(this.BASE_API_URL + '/find-by-id/' + id);
    // }

    // findByBillNo(billNo: string): Observable<BylResultBody<BylProjectManagerPool>> {
    //     return this.http.get<BylResultBody<BylProjectManagerPool>>(this.BASE_API_URL + '/find-by-billno/' + billNo);
    // }

    // /**
    //  * 按分页方式返回
    //  * @returns {Observable<BylResultBody<>>}
    //  */
    // findPage(query: BylProjectManagerPoolQuery, page: BylPageReq): Observable<BylResultBody<BylPageResp<BylProjectManagerPool>>> {
    //     let queryModel = new BylQueryReqBody<BylProjectManagerPoolQuery>();
    //     queryModel.pageReq = page;
    //     queryModel.queryReq = query;
    //
    //     return this.http.post<BylResultBody<BylPageResp<BylProjectManagerPool>>>(this.BASE_API_URL + '/find-page', queryModel);
    // }
}
