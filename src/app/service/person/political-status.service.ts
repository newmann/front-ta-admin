import {Injectable} from "@angular/core";
import {_HttpClient} from "@delon/theme";
import {ResultBody} from "../model/result-body.model";

import {Observable} from "rxjs/Observable";

import {ConfigService} from "../constant/config.service";
import {I18NService} from "@core/i18n/i18n.service";


import {PoliticalStatus} from "./political-status.model";



/**
 * @Description: 政治面貌查询service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class PersonService{
    private BASE_API_URL = "api/person/political-status";

    constructor(private http: _HttpClient,
                private configServer:ConfigService,
                private i18nService: I18NService){}

    findByAll(): Observable<ResultBody<PoliticalStatus>>{
        return this.http.get<ResultBody<PoliticalStatus>>(this.BASE_API_URL+"/find-all/");
    }

}
