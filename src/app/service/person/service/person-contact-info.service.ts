import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';


import {BylPersonContactInfo} from '../model/person-contact-info.model';
import {BylItemBaseService} from "../../service/item-base.service";


/**
 * @Description: 证件管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylPersonContactInfoService extends BylItemBaseService<BylPersonContactInfo> {
    // private BASE_API_URL = "api/person/certificate";

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/person/person-contact-info';
    }

    // add(item: BylPersonContactInfo):Observable< BylResultBody < BylPersonContactInfo >> {
    //     return this.http.post<BylResultBody<BylPersonContactInfo>>(this.BASE_API_URL+"/add", item);
    // }
    //
    // update(updateItem: BylPersonContactInfo):Observable< BylResultBody < BylPersonContactInfo >> {
    //     return this.http.post<BylResultBody<BylPersonContactInfo>>(this.BASE_API_URL+"/update", updateItem);
    // }
    //
    //
    //
    // findById(id:string): Observable<BylResultBody<BylPersonContactInfo>>{
    //     return this.http.get<BylResultBody<BylPersonContactInfo>>(this.BASE_API_URL+"/find-by-id/" + id);
    // }

    // findByPersonId(personId: string): Observable<BylResultBody<BylPersonContactInfo>> {
    //     return this.http.get<BylResultBody<BylPersonContactInfo>>(this.BASE_API_URL + '/find-by-personid/' + personId);
    // }

    // /**
    //  * 按分页方式返回不同查询条件下的值
    //  * @returns {Observable<BylResultBody<BylLoginResultModel>>}
    //  */
    // findPage(query: BylPersonQuery,page: BylPageReq): Observable < BylResultBody < BylPageResp<BylPersonContactInfo> >> {
    //     let queryModel = new BylQueryReqBody<BylPersonQuery>();
    //     queryModel.pageReq = page;
    //     queryModel.queryReq = query;
    //
    //     return this.http.post< BylResultBody < BylPageResp<BylPersonContactInfo> >>(this.BASE_API_URL + "/find-page",queryModel);
    // }
}
