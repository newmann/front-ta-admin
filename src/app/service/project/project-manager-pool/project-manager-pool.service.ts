import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylResultBody} from '../../model/result-body.model';

import {Observable} from 'rxjs/Observable';

import {BylPageResp} from '../../model/page-resp.model';
import {BylPageReq} from '../../model/page-req.model';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';

import {BylQueryReqBody} from '../../model/query-req-body.model';

import {ProjectManagerPoolQuery} from './project-manager-pool-query.model';
import {ProjectManagerPool} from './project-manager-pool.model';




/**
 * @Description: 项目经理资源池service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class ProjectManagerPoolService {
    private BASE_API_URL = 'api/project/project-manager-pool';

    constructor(private http: _HttpClient,
                private configServer: BylConfigService,
                private i18nService: I18NService) {
    }


    // fetchAvailableDepartmentByCodeOrName(searchstr : string): Observable < BylResultBody < Array<ProjectManagerPool> >> {
    //     return this.http.get<BylResultBody<Array<ProjectManagerPool>>>(this.BASE_API_URL+"/fetch-available-ProjectManagerPool-by-code-or-name/" + searchstr);
    // }


    add(item: ProjectManagerPool): Observable<BylResultBody<ProjectManagerPool>> {
        return this.http.post<BylResultBody<ProjectManagerPool>>(this.BASE_API_URL + '/add', item);
    }

    update(updateItem: ProjectManagerPool): Observable<BylResultBody<ProjectManagerPool>> {
        return this.http.post<BylResultBody<ProjectManagerPool>>(this.BASE_API_URL + '/update', updateItem);
    }

    checkCodeAvailable(code: string): Observable<BylResultBody<boolean>> {
        return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/check-code-available', code);

    }

    findById(id: string): Observable<BylResultBody<ProjectManagerPool>> {
        return this.http.get<BylResultBody<ProjectManagerPool>>(this.BASE_API_URL + '/find-by-id/' + id);
    }

    findByBillNo(billNo: string): Observable<BylResultBody<ProjectManagerPool>> {
        return this.http.get<BylResultBody<ProjectManagerPool>>(this.BASE_API_URL + '/find-by-billno/' + billNo);
    }

    /**
     * 按分页方式返回
     * @returns {Observable<BylResultBody<>>}
     */
    findPage(query: ProjectManagerPoolQuery, page: BylPageReq): Observable<BylResultBody<BylPageResp<ProjectManagerPool>>> {
        let queryModel = new BylQueryReqBody<ProjectManagerPoolQuery>();
        queryModel.pageReq = page;
        queryModel.queryReq = query;

        return this.http.post<BylResultBody<BylPageResp<ProjectManagerPool>>>(this.BASE_API_URL + '/find-page', queryModel);
    }
}
