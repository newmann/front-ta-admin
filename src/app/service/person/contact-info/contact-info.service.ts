import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylResultBody} from '../../model/result-body.model';
import {LoginResultModel} from '../../auth/login-result.model';
import {Observable} from 'rxjs/Observable';

import {BylPageResp} from '../../model/page-resp.model';
import {BylPageReq} from '../../model/page-req.model';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';
import {BylIStatusItem} from '../../model/status.model';


import {ContactInfo} from './contact-info.model';
import {BylBaseService} from '../../service/base.service';


/**
 * @Description: 证件管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylContactInfoService extends BylBaseService<ContactInfo> {
    // private BASE_API_URL = "api/person/certificate";

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/person/certificate';
    }

    // add(item: ContactInfo):Observable< BylResultBody < ContactInfo >> {
    //     return this.http.post<BylResultBody<ContactInfo>>(this.BASE_API_URL+"/add", item);
    // }
    //
    // update(updateItem: ContactInfo):Observable< BylResultBody < ContactInfo >> {
    //     return this.http.post<BylResultBody<ContactInfo>>(this.BASE_API_URL+"/update", updateItem);
    // }
    //
    //
    //
    // findById(id:string): Observable<BylResultBody<ContactInfo>>{
    //     return this.http.get<BylResultBody<ContactInfo>>(this.BASE_API_URL+"/find-by-id/" + id);
    // }

    findByPersonId(personId: string): Observable<BylResultBody<ContactInfo>> {
        return this.http.get<BylResultBody<ContactInfo>>(this.BASE_API_URL + '/find-by-personid/' + personId);
    }

    // /**
    //  * 按分页方式返回不同查询条件下的值
    //  * @returns {Observable<BylResultBody<LoginResultModel>>}
    //  */
    // findPage(query: BylPersonQuery,page: BylPageReq): Observable < BylResultBody < BylPageResp<ContactInfo> >> {
    //     let queryModel = new BylQueryReqBody<BylPersonQuery>();
    //     queryModel.pageReq = page;
    //     queryModel.queryReq = query;
    //
    //     return this.http.post< BylResultBody < BylPageResp<ContactInfo> >>(this.BASE_API_URL + "/find-page",queryModel);
    // }
}
