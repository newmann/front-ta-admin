import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';
import {BylProject} from '../model/project.model';
import {BylBaseService} from '../../service/base.service';
import {Observable} from "rxjs/Observable";
import {BylCheckAvailableReq} from "../../model/check-avaiable-req.model";
import {BylResultBody} from "../../model/result-body.model";
import {BylProjectManagerPool} from "../model/project-manager-pool.model";
import {BylMasterDataBaseService} from "../../service/master-data-base.service";



/**
 * @Description: 项目管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylProjectService  extends BylMasterDataBaseService<BylProject> {


    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/project';
    }

    checkCodeAvailable(data: BylCheckAvailableReq): Observable<BylResultBody<boolean>> {
        return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/check-code-available', data);

    }

    checkNameAvailable(data: BylCheckAvailableReq): Observable<BylResultBody<boolean>> {
        return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/check-name-available', data);
    }

    fetchAvailableByCodeOrName(searchstr : string): Observable < BylResultBody < Array<BylProject> >> {
        return this.http.get<BylResultBody<Array<BylProject>>>(this.BASE_API_URL+"/fetch-available-by-code-or-name/" + searchstr);
    }

    fetchByCodeOrName(searchstr : string): Observable < BylResultBody < Array<BylProject> >> {
        return this.http.get<BylResultBody<Array<BylProject>>>(this.BASE_API_URL+"/fetch-by-code-or-name/" + searchstr);
    }

    delete(updateItem: BylProject): Observable<BylResultBody<boolean>> {
        return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/delete', updateItem);
    }

    // cancel(updateItem: BylProject): Observable<BylResultBody<BylProject>> {
    //     return this.http.post<BylResultBody<BylProject>>(this.BASE_API_URL + '/cancel', updateItem);
    // }
    //
    // submit(updateItem: BylProject): Observable<BylResultBody<BylProject>> {
    //     return this.http.post<BylResultBody<BylProject>>(this.BASE_API_URL + '/submit', updateItem);
    // }

    running(updateItem: BylProject): Observable<BylResultBody<BylProject>> {
        return this.http.post<BylResultBody<BylProject>>(this.BASE_API_URL + '/running', updateItem);
    }

    achieve(updateItem: BylProject): Observable<BylResultBody<BylProject>> {
        return this.http.post<BylResultBody<BylProject>>(this.BASE_API_URL + '/confirm', updateItem);
    }


}
