import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylResultBody} from '../../model/result-body.model';
import {LoginResultModel} from '../../auth/login-result.model';
import {Observable} from 'rxjs/Observable';

import {BylPageResp} from '../../model/page-resp.model';
import {BylPageReq} from '../../model/page-req.model';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';


import {BylQueryReqBody} from '../../model/query-req-body.model';
import {Project} from './project.model';
import {ProjectQuery} from './project-query.model';



/**
 * @Description: 项目管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class ProjectService {
    private BASE_API_URL = 'api/project';

    constructor(private http: _HttpClient,
                private configServer: BylConfigService,
                private i18nService: I18NService) {
    }

    /**
     * 返回所有正常状态的部门
     * @returns {Observable<BylResultBody<LoginResultModel>>}
     */
    // findAllNormal(): Observable < BylResultBody < Set<Project> >> {
    //     return this.http.get< BylResultBody < Set<Project> >>("api/Project/find-all-normal");
    // }

    /**
     * 返回所有被锁定的department
     * @returns {Observable<BylResultBody<Set<Project>>>}
     */
    // findAllLocked(): Observable < BylResultBody < Set<Project> >> {
    //     return this.http.get< BylResultBody < Set<Project> >>("api/Project/find-all-locked");
    // }

    /**
     * 按分页方式返回所有正常状态的部门
     * @returns {Observable<BylResultBody<LoginResultModel>>}
     */
    // findPageNormal(pageNo: number): Observable < BylResultBody < BylPageResp<Project> >> {
    //     let page = new BylPageReq();
    //     page.page = pageNo;
    //     page.pageSize = this.configServer.PAGESIZE;
    //     page.sortField = 'name';
    //     page.sort = "desc";
    //
    //     return this.http.post< BylResultBody < BylPageResp<Project> >>("api/Project/find-page-normal",page);
    // }


    // fetchAvailableDepartmentByCodeOrName(searchstr : string): Observable < BylResultBody < Array<Project> >> {
    //     return this.http.get<BylResultBody<Array<Project>>>(this.BASE_API_URL+"/fetch-available-Project-by-code-or-name/" + searchstr);
    // }


    add(item: Project): Observable<BylResultBody<Project>> {
        return this.http.post<BylResultBody<Project>>(this.BASE_API_URL + '/add', item);
    }

    update(updateItem: Project): Observable<BylResultBody<Project>> {
        return this.http.post<BylResultBody<Project>>(this.BASE_API_URL + '/update', updateItem);
    }

    checkCodeAvailable(code: string): Observable<BylResultBody<boolean>> {
        return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/check-code-available', code);

    }

    findById(id: string): Observable<BylResultBody<Project>> {
        return this.http.get<BylResultBody<Project>>(this.BASE_API_URL + '/find-by-id/' + id);
    }
    /**
     * 按分页方式返回
     * @returns {Observable<BylResultBody<>>}
     */
    findPage(query: ProjectQuery, page: BylPageReq): Observable<BylResultBody<BylPageResp<Project>>> {
        let queryModel = new BylQueryReqBody<ProjectQuery>();
        queryModel.pageReq = page;
        queryModel.queryReq = query;

        return this.http.post<BylResultBody<BylPageResp<Project>>>(this.BASE_API_URL + '/find-page', queryModel);
    }
}
