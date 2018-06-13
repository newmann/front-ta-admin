import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';
import {Observable} from "rxjs/Observable";
import {BylCheckAvailableReq} from "../../model/check-avaiable-req.model";
import {BylResultBody} from "../../model/result-body.model";
import {BylMasterDataBaseService} from "../../service/master-data-base.service";
import {BylOperationPeriod} from "../model/operation-period.model";


/**
 * @Description: 业务期间service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-06-13 21:31
 **/
@Injectable()
export class BylOperationPeriodService  extends BylMasterDataBaseService<BylOperationPeriod> {


    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/project/operation-period';
    }

    checkCodeAvailable(data: BylCheckAvailableReq): Observable<BylResultBody<boolean>> {
        return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/check-code-available', data);

    }

    checkNameAvailable(data: BylCheckAvailableReq): Observable<BylResultBody<boolean>> {
        return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/check-name-available', data);
    }

    fetchAvailableByCodeOrName(searchstr : string): Observable < BylResultBody < Array<BylOperationPeriod> >> {
        return this.http.get<BylResultBody<Array<BylOperationPeriod>>>(this.BASE_API_URL+"/fetch-available-by-code-or-name/" + searchstr);
    }

    fetchByCodeOrName(searchstr : string): Observable < BylResultBody < Array<BylOperationPeriod> >> {
        return this.http.get<BylResultBody<Array<BylOperationPeriod>>>(this.BASE_API_URL+"/fetch-by-code-or-name/" + searchstr);
    }

    // delete(updateItem: BylOperationPeriod): Observable<BylResultBody<boolean>> {
    //     return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/delete', updateItem);
    // }

    // cancel(updateItem: BylOperationPeriod): Observable<BylResultBody<BylOperationPeriod>> {
    //     return this.http.post<BylResultBody<BylOperationPeriod>>(this.BASE_API_URL + '/cancel', updateItem);
    // }
    //
    // submit(updateItem: BylOperationPeriod): Observable<BylResultBody<BylOperationPeriod>> {
    //     return this.http.post<BylResultBody<BylOperationPeriod>>(this.BASE_API_URL + '/submit', updateItem);
    // }

    close(updateItem: BylOperationPeriod): Observable<BylResultBody<BylOperationPeriod>> {
        return this.http.post<BylResultBody<BylOperationPeriod>>(this.BASE_API_URL + '/close', updateItem);
    }

    // achieve(updateItem: BylOperationPeriod): Observable<BylResultBody<BylOperationPeriod>> {
    //     return this.http.post<BylResultBody<BylOperationPeriod>>(this.BASE_API_URL + '/confirm', updateItem);
    // }


}
