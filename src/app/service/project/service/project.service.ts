import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';
import {BylProject} from '../model/project.model';
import {BylBaseService} from '../../service/base.service';



/**
 * @Description: 项目管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylProjectService  extends BylBaseService<BylProject> {


    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/project';
    }

    // add(item: BylProject): Observable<BylResultBody<BylProject>> {
    //     return this.http.post<BylResultBody<BylProject>>(this.BASE_API_URL + '/add', item);
    // }
    //
    // update(updateItem: BylProject): Observable<BylResultBody<BylProject>> {
    //     return this.http.post<BylResultBody<BylProject>>(this.BASE_API_URL + '/update', updateItem);
    // }
    //
    //
    // findById(id: string): Observable<BylResultBody<BylProject>> {
    //     return this.http.get<BylResultBody<BylProject>>(this.BASE_API_URL + '/find-by-id/' + id);
    // }
    // /**
    //  * 按分页方式返回
    //  * @returns {Observable<BylResultBody<>>}
    //  */
    // findPage(query: BylProjectQuery, page: BylPageReq): Observable<BylResultBody<BylPageResp<BylProject>>> {
    //     let queryModel = new BylQueryReqBody<BylProjectQuery>();
    //     queryModel.pageReq = page;
    //     queryModel.queryReq = query;
    //
    //     return this.http.post<BylResultBody<BylPageResp<BylProject>>>(this.BASE_API_URL + '/find-page', queryModel);
    // }
}
