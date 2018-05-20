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
import {BylBaseService} from '../../service/base.service';
import {BylPerson} from "../../person/model/person.model";
import {BylPersonQuery} from "../../person/query/person-query.model";
import {BylOrganization} from "../../organization/model/organization.model";
import {BylOrganizationQuery} from "../../organization/query/organization-query.model";
import {BylPersonAvailablePoolsInterface} from "../../person/service/person-available-pool.interface";
import {BylOrganizationAvailablePoolsInterface} from "../../organization/service/organization-available-pool.interface";
import {BylProject} from "../model/project.model";



/**
 * @Description: 可借款资源池service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylBorrowMoneyQualificationPoolService  extends BylBaseService<BylBorrowMoneyQualificationPool>
    implements BylPersonAvailablePoolsInterface,BylOrganizationAvailablePoolsInterface{

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/project/borrow-money-qualification-pool';
    }
    batchtAdd(pools: Array<BylBorrowMoneyQualificationPool>): Observable<BylResultBody<Array<BylBorrowMoneyQualificationPool>>> {
        return this.http.post<BylResultBody<Array<BylBorrowMoneyQualificationPool>>>(this.BASE_API_URL + '/batch-add', pools);
    }
    /**
     * 按分页方式返回可用的个体资源
     * @returns {Observable<BylResultBody<>>}
     */
    findAvailablePersonPoolsPage(query: BylPersonQuery, page: BylPageReq): Observable<BylResultBody<BylPageResp<BylPerson>>> {
        let queryModel = new BylQueryReqBody<BylPersonQuery>();
        queryModel.pageReq = page;
        queryModel.queryReq = query;

        return this.http.post<BylResultBody<BylPageResp<BylPerson>>>(this.BASE_API_URL + '/find-available-person-pools-page', queryModel);
    }

    /**
     * 按分页方式返回可用的组织资源
     * @returns {Observable<BylResultBody<>>}
     */
    findAvailableOrganizationPoolsPage(query: BylOrganizationQuery, page: BylPageReq): Observable<BylResultBody<BylPageResp<BylOrganization>>> {
        let queryModel = new BylQueryReqBody<BylOrganizationQuery>();
        queryModel.pageReq = page;
        queryModel.queryReq = query;

        return this.http.post<BylResultBody<BylPageResp<BylOrganization>>>(this.BASE_API_URL + '/find-available-organization-pools-page', queryModel);
    }

    fetchAvailableByCodeOrName(searchstr : string): Observable < BylResultBody < Array<BylBorrowMoneyQualificationPool> >> {
        return this.http.get<BylResultBody<Array<BylBorrowMoneyQualificationPool>>>(this.BASE_API_URL+"/fetch-available-by-code-or-name/" + searchstr);
    }

    fetchAvailablePersonByCodeOrName(searchstr : string): Observable < BylResultBody < Array<BylBorrowMoneyQualificationPool> >> {
        return this.http.get<BylResultBody<Array<BylBorrowMoneyQualificationPool>>>(this.BASE_API_URL+"/fetch-available-person-by-code-or-name/" + searchstr);
    }

    fetchAvailableOrgByCodeOrName(searchstr : string): Observable < BylResultBody < Array<BylBorrowMoneyQualificationPool> >> {
        return this.http.get<BylResultBody<Array<BylBorrowMoneyQualificationPool>>>(this.BASE_API_URL+"/fetch-available-org-by-code-or-name/" + searchstr);
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
