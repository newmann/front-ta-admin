import {I18NService} from '@core/i18n/i18n.service';
import {_HttpClient} from '@delon/theme';
import {BylConfigService} from '../constant/config.service';
import {Observable} from 'rxjs/Observable';
import {BylResultBody} from '../model/result-body.model';
import {BylQueryReqBody} from '../model/query-req-body.model';
import {BylPageReq} from '../model/page-req.model';
import {BylPageResp} from '../model/page-resp.model';
import {BylBaseService} from "./base.service";


/**
 *  @Author: xinsh
 * @Description: 与后台接口的基础类
 *  @Date: Created in  14:00 2018/4/13.
 */

export class BylMasterDataBaseService<T> extends BylBaseService<T>{
    // protected BASE_API_URL = 'api/';

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {
        super(http,configServer,i18nService);
    }

    remove(item: T): Observable<BylResultBody<boolean>> {
        return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/remove', item);
    }

    submit(item: T): Observable<BylResultBody<T>> {
        return this.http.post<BylResultBody<T>>(this.BASE_API_URL + '/submit', item);
    }

    confirm(item: T): Observable<BylResultBody<T>> {
        return this.http.post<BylResultBody<T>>(this.BASE_API_URL + '/confirm', item);
    }

    unconfirm(item: T): Observable<BylResultBody<T>> {
        return this.http.post<BylResultBody<T>>(this.BASE_API_URL + '/unconfirm', item);
    }

    unlock(item: T): Observable<BylResultBody<T>> {
        return this.http.post<BylResultBody<T>>(this.BASE_API_URL + '/unlock' ,item);
    }

    lock(item: T): Observable<BylResultBody<T>> {
        return this.http.post<BylResultBody<T>>(this.BASE_API_URL + '/lock' ,item);
    }

    cancel(item: T): Observable<BylResultBody<T>> {
        return this.http.post<BylResultBody<T>>(this.BASE_API_URL + '/cancel' ,item);
    }

}
