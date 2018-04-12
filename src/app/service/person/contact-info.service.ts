import {Injectable} from "@angular/core";
import {_HttpClient} from "@delon/theme";
import {ResultBody} from "../model/result-body.model";
import {LoginResultModel} from "../auth/login-result.model";
import {Observable} from "rxjs/Observable";

import {PageResp} from "../model/page-resp.model";
import {PageReq} from "../model/page-req.model";
import {ConfigService} from "../constant/config.service";
import {I18NService} from "@core/i18n/i18n.service";
import {IStatusItem} from "../model/status.model";


import {ContactInfo} from "./contact-info.model";




/**
 * @Description: 证件管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class ContactInfoService{
    private BASE_API_URL = "api/person/certificate";

    constructor(private http: _HttpClient,
                private configServer:ConfigService,
                private i18nService: I18NService){}


    add(item: ContactInfo):Observable< ResultBody < ContactInfo >> {
        return this.http.post<ResultBody<ContactInfo>>(this.BASE_API_URL+"/add", item);
    }

    update(updateItem: ContactInfo):Observable< ResultBody < ContactInfo >> {
        return this.http.post<ResultBody<ContactInfo>>(this.BASE_API_URL+"/update", updateItem);
    }



    findById(id:string): Observable<ResultBody<ContactInfo>>{
        return this.http.get<ResultBody<ContactInfo>>(this.BASE_API_URL+"/find-by-id/" + id);
    }

    findByPersonId(personId:string): Observable<ResultBody<ContactInfo>>{
        return this.http.get<ResultBody<ContactInfo>>(this.BASE_API_URL+"/find-by-personid/" + personId);
    }

    // /**
    //  * 按分页方式返回不同查询条件下的值
    //  * @returns {Observable<ResultBody<LoginResultModel>>}
    //  */
    // findPage(query: PersonQuery,page: PageReq): Observable < ResultBody < PageResp<ContactInfo> >> {
    //     let queryModel = new QueryReqBody<PersonQuery>();
    //     queryModel.pageReq = page;
    //     queryModel.queryReq = query;
    //
    //     return this.http.post< ResultBody < PageResp<ContactInfo> >>(this.BASE_API_URL + "/find-page",queryModel);
    // }
}
