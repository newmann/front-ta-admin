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

export class BylItemBaseService<T> extends BylBaseService<T>{
    protected BASE_API_URL = 'api/';

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {
        super(http,configServer,i18nService);

    }

    findByMasterId(masterid: string): Observable<BylResultBody<Array<T>>> {
        return this.http.get<BylResultBody<Array<T>>>(this.BASE_API_URL + '/find-by-masterid/' + masterid);
    }

}
