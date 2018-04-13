import {I18NService} from '@core/i18n/i18n.service';
import {_HttpClient} from '@delon/theme';
import {BylConfigService} from '../constant/config.service';
import {Observable} from 'rxjs/Observable';
import {BylResultBody} from '../model/result-body.model';
import {BylQueryReqBody} from '../model/query-req-body.model';
import {BylPageReq} from '../model/page-req.model';
import {BylPageResp} from '../model/page-resp.model';


/**
 *  @Author: xinsh
 * @Description: 与后台接口的基础类
 *  @Date: Created in  14:00 2018/4/13.
 */

export class BylBaseService<T> {
    protected BASE_API_URL = 'api/';

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {
    }

    add(item: T): Observable<BylResultBody<T>> {
        return this.http.post<BylResultBody<T>>(this.BASE_API_URL + '/add', item);
    }

    update(updateItem: T): Observable<BylResultBody<T>> {
        return this.http.post<BylResultBody<T>>(this.BASE_API_URL + '/update', updateItem);
    }

    findById(id: string): Observable<BylResultBody<T>> {
        return this.http.get<BylResultBody<T>>(this.BASE_API_URL + '/find-by-id/' + id);
    }

    /**
     * 按分页方式返回不同查询条件下的值
     * @returns {Observable<BylResultBody<LoginResultModel>>}
     */
    findPage(query: any, page: BylPageReq): Observable<BylResultBody<BylPageResp<T>>> {
        let queryModel = new BylQueryReqBody<any>();
        queryModel.pageReq = page;
        queryModel.queryReq = query;

        return this.http.post<BylResultBody<BylPageResp<T>>>(this.BASE_API_URL + '/find-page', queryModel);
    }
    
    findByAll(): Observable<BylResultBody<T>> {
        return this.http.get<BylResultBody<T>>(this.BASE_API_URL + '/find-all/');
    }    
}
