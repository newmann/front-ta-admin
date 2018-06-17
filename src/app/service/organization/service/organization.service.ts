import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';

import {BylBaseService} from '../../service/base.service';
import {BylResultBody} from '../../model/result-body.model';
import {Observable} from 'rxjs';
import {BylOrganization} from "../model/organization.model";
import {BylCheckAvailableReq} from "../../model/check-avaiable-req.model";


/**
 * @Description: 组织管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylOrganizationService  extends BylBaseService<BylOrganization> {


    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/organization';
    }

    // add(item: BylAccount): Observable<BylResultBody<BylAccount>> {
    //     return this.http.post<BylResultBody<BylAccount>>(this.BASE_API_URL + '/add', item);
    // }
    //
    // update(updateItem: BylAccount): Observable<BylResultBody<BylAccount>> {
    //     return this.http.post<BylResultBody<BylAccount>>(this.BASE_API_URL + '/update', updateItem);
    // }
    //
    //
    // findById(id: string): Observable<BylResultBody<BylAccount>> {
    //     return this.http.get<BylResultBody<BylAccount>>(this.BASE_API_URL + '/find-by-id/' + id);
    // }
    /**
     * 检查code是否可用
     * @param {string} code
     * @returns {Observable<BylResultBody<boolean>>}
     */
    // checkCodeAvailable(code: string):Observable< BylResultBody < boolean >> {
    //     return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/check-code-available/' + code);
    //
    // }
    checkCodeAvailable(data: BylCheckAvailableReq): Observable<BylResultBody<boolean>> {
        return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/check-code-available', data);

    }

}
