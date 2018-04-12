import {Injectable} from "@angular/core";
import {_HttpClient} from "@delon/theme";
import {ResultBody} from "../model/result-body.model";
import {LoginResultModel} from "../auth/login-result.model";
import {Observable} from "rxjs/Observable";

import {PageResp} from "../model/page-resp.model";
import {PageReq} from "../model/page-req.model";
import {ConfigService} from "../constant/config.service";
import {I18NService} from "@core/i18n/i18n.service";
import {IStatusItem} from "../model/status.model";

import {QueryReqBody} from "../model/query-req-body.model";
import {Project} from "./project.model";



/**
 * @Description: 项目管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class ProjectService{
    private BASE_API_URL = "api/project";

    constructor(private http: _HttpClient,
                private configServer:ConfigService,
                private i18nService: I18NService){}

    /**
     * 返回所有正常状态的部门
     * @returns {Observable<ResultBody<LoginResultModel>>}
     */
    // findAllNormal(): Observable < ResultBody < Set<Project> >> {
    //     return this.http.get< ResultBody < Set<Project> >>("api/Project/find-all-normal");
    // }

    /**
     * 返回所有被锁定的department
     * @returns {Observable<ResultBody<Set<Project>>>}
     */
    // findAllLocked(): Observable < ResultBody < Set<Project> >> {
    //     return this.http.get< ResultBody < Set<Project> >>("api/Project/find-all-locked");
    // }

    /**
     * 按分页方式返回所有正常状态的部门
     * @returns {Observable<ResultBody<LoginResultModel>>}
     */
    // findPageNormal(pageNo: number): Observable < ResultBody < PageResp<Project> >> {
    //     let page = new PageReq();
    //     page.page = pageNo;
    //     page.pageSize = this.configServer.PAGESIZE;
    //     page.sortField = 'name';
    //     page.sort = "desc";
    //
    //     return this.http.post< ResultBody < PageResp<Project> >>("api/Project/find-page-normal",page);
    // }


    // fetchAvailableDepartmentByCodeOrName(searchstr : string): Observable < ResultBody < Array<Project> >> {
    //     return this.http.get<ResultBody<Array<Project>>>(this.BASE_API_URL+"/fetch-available-Project-by-code-or-name/" + searchstr);
    // }



    add(item: Project):Observable< ResultBody < Project >> {
        return this.http.post<ResultBody<Project>>(this.BASE_API_URL+"/add", item);
    }

    update(updateItem: Project):Observable< ResultBody < Project >> {
        return this.http.post<ResultBody<Project>>(this.BASE_API_URL+"/update", updateItem);
    }

    checkCodeAvailable(code: string):Observable< ResultBody < boolean >> {
        return this.http.post<ResultBody<boolean>>(this.BASE_API_URL+"/check-code-available", code);

    }

    findById(id:string): Observable<ResultBody<Project>>{
        return this.http.get<ResultBody<Project>>(this.BASE_API_URL+"/find-by-id/" + id);
    }

}
