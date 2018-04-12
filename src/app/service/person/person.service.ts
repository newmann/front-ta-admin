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

import {QueryReqBody} from "../model/query-req-body.model";
import {Person} from "./person.model";
import {PersonQuery} from "./person-query.model";



/**
 * @Description: 个体管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class PersonService{
    private BASE_API_URL = "api/person";

    constructor(private http: _HttpClient,
                private configServer:ConfigService,
                private i18nService: I18NService){}


    add(item: Person):Observable< ResultBody < Person >> {
        return this.http.post<ResultBody<Person>>(this.BASE_API_URL+"/add", item);
    }

    update(updateItem: Person):Observable< ResultBody < Person >> {
        return this.http.post<ResultBody<Person>>(this.BASE_API_URL+"/update", updateItem);
    }

    checkIdNoAvailable(idno: string):Observable< ResultBody < boolean >> {
        return this.http.post<ResultBody<boolean>>(this.BASE_API_URL+"/check-idno-available", idno);

    }

    findById(id:string): Observable<ResultBody<Person>>{
        return this.http.get<ResultBody<Person>>(this.BASE_API_URL+"/find-by-id/" + id);
    }

    /**
     * 按分页方式返回不同查询条件下的值
     * @returns {Observable<ResultBody<LoginResultModel>>}
     */
    findPage(query: PersonQuery,page: PageReq): Observable < ResultBody < PageResp<Person> >> {
        let queryModel = new QueryReqBody<PersonQuery>();
        queryModel.pageReq = page;
        queryModel.queryReq = query;

        return this.http.post< ResultBody < PageResp<Person> >>(this.BASE_API_URL + "/find-page",queryModel);
    }
}
