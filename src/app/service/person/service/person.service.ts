import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {Observable} from 'rxjs';

import {I18NService} from 'app/core/i18n/i18n.service';


import {BylPerson} from '../model/person.model';
import {BylConfigService} from '../../constant/config.service';
import {BylResultBody} from '../../model/result-body.model';
import {BylBaseService} from '../../service/base.service';
import {BylCheckAvailableReq} from "../../model/check-avaiable-req.model";


/**
 * @Description: 个体管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylPersonService extends BylBaseService<BylPerson>{


    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/person';
    }


    // add(item: BylPerson): Observable<BylResultBody<BylPerson>> {
    //     return this.http.post<BylResultBody<BylPerson>>(this.BASE_API_URL + '/add', item);
    // }
    //
    // update(updateItem: BylPerson): Observable<BylResultBody<BylPerson>> {
    //     return this.http.post<BylResultBody<BylPerson>>(this.BASE_API_URL + '/update', updateItem);
    // }
    //

    checkIdCardAvailable(data: BylCheckAvailableReq): Observable<BylResultBody<boolean>> {
        return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/check-idcard-available', data);

    }

    fetchByIdCard(idcard: string): Observable<BylResultBody<BylPerson>> {
        return this.http.get<BylResultBody<BylPerson>>(this.BASE_API_URL + '/find-by-idcard/' + idcard);
    }

    fetchAvailableByIdCardOrName(searchstr : string): Observable < BylResultBody < Array<BylPerson> >> {
        return this.http.get<BylResultBody<Array<BylPerson>>>(this.BASE_API_URL+"/fetch-available-by-idcard-or-name/" + searchstr);
    }

    //
    // /**
    //  * 按分页方式返回不同查询条件下的值
    //  * @returns {Observable<BylResultBody<BylLoginResultModel>>}
    //  */
    // findPage(query: BylPersonQuery, page: BylPageReq): Observable<BylResultBody<BylPageResp<BylPerson>>> {
    //     let queryModel = new BylQueryReqBody<BylPersonQuery>();
    //     queryModel.pageReq = page;
    //     queryModel.queryReq = query;
    //
    //     return this.http.post<BylResultBody<BylPageResp<BylPerson>>>(this.BASE_API_URL + '/find-page', queryModel);
    // }
}
