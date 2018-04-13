import {Injectable} from "@angular/core";
import {_HttpClient} from "@delon/theme";
import {BylResultBody} from "../../model/result-body.model";
import {LoginResultModel} from "../../auth/login-result.model";
import {Observable} from "rxjs/Observable";

import {BylPageResp} from "../../model/page-resp.model";
import {BylPageReq} from "../../model/page-req.model";
import {BylConfigService} from "../../constant/config.service";
import {I18NService} from "app/core/i18n/i18n.service";
import {BylIStatusItem} from "../../model/status.model";

import {BylQueryReqBody} from "../../model/query-req-body.model";
import {BylAddress} from "./address.model";
import {BylPersonQuery} from "../person/person-query.model";
import {BylBaseService} from '../../service/base.service';



/**
 * @Description: 个体管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylAddressService extends BylBaseService<BylAddress>{
    // private BASE_API_URL = "api/person/address";

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = "api/person/address";
    }



    // add(item: BylAddress):Observable< BylResultBody < BylAddress >> {
    //     return this.http.post<BylResultBody<BylAddress>>(this.BASE_API_URL+"/add", item);
    // }
    //
    // update(updateItem: BylAddress):Observable< BylResultBody < BylAddress >> {
    //     return this.http.post<BylResultBody<BylAddress>>(this.BASE_API_URL+"/update", updateItem);
    // }
    //
    //
    //
    // findById(id:string): Observable<BylResultBody<BylAddress>>{
    //     return this.http.get<BylResultBody<BylAddress>>(this.BASE_API_URL+"/find-by-id/" + id);
    // }

    findByPersonId(personId:string): Observable<BylResultBody<BylAddress>>{
        return this.http.get<BylResultBody<BylAddress>>(this.BASE_API_URL+"/find-by-personid/" + personId);
    }

    // /**
    //  * 按分页方式返回不同查询条件下的值
    //  * @returns {Observable<BylResultBody<LoginResultModel>>}
    //  */
    // findPage(query: BylPersonQuery,page: BylPageReq): Observable < BylResultBody < BylPageResp<BylAddress> >> {
    //     let queryModel = new BylQueryReqBody<BylPersonQuery>();
    //     queryModel.pageReq = page;
    //     queryModel.queryReq = query;
    //
    //     return this.http.post< BylResultBody < BylPageResp<BylAddress> >>(this.BASE_API_URL + "/find-page",queryModel);
    // }
}
