import {Injectable} from "@angular/core";
import {_HttpClient} from "@delon/theme";
import {ResultBody} from "../model/result-body.model";
import {LoginResultModel} from "../auth/login-result.model";
import {Observable} from "rxjs/Observable";
import {Department, DepartmentStatus} from "./department.model";
import {Account} from "./account.model";
import {PageResp} from "../model/page-resp.model";
import {PageReq} from "../model/page-req.model";
import {ConfigService} from "../constant/config.service";
import {I18NService} from "@core/i18n/i18n.service";
import {IStatusItem} from "../model/status.model";
import {DepartmentQueryModel} from "./department-query.model";
import {QueryReqBody} from "../model/query-req-body.model";


/**
 * @Description: 部门管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class DepartmentService{
    constructor(private http: _HttpClient,
                private configServer:ConfigService,
                private i18nService: I18NService){}

    static getStatusCaption(status:number): string{
        switch (status){
            case DepartmentStatus.NORMAL_DEPARTMENT: return '正常';
            case DepartmentStatus.LOCKED_DEPARTMENT: return '锁定';
            case DepartmentStatus.DELETED_DEPARTMENT: return "删除";
            default: return "unknown";

        }
    }
    static statusArray() : IStatusItem[] {
        return [
            {value:DepartmentStatus.NORMAL_DEPARTMENT,caption:this.getStatusCaption(DepartmentStatus.NORMAL_DEPARTMENT)},
            {value:DepartmentStatus.LOCKED_DEPARTMENT,caption:this.getStatusCaption(DepartmentStatus.LOCKED_DEPARTMENT)},
            {value:DepartmentStatus.DELETED_DEPARTMENT,caption:this.getStatusCaption(DepartmentStatus.DELETED_DEPARTMENT)}
            ];
    }

    /**
     * 返回所有正常状态的部门
     * @returns {Observable<ResultBody<LoginResultModel>>}
     */
    // findAllNormal(): Observable < ResultBody < Set<Department> >> {
    //     return this.http.get< ResultBody < Set<Department> >>("api/department/find-all-normal");
    // }

    /**
     * 返回所有被锁定的department
     * @returns {Observable<ResultBody<Set<Department>>>}
     */
    // findAllLocked(): Observable < ResultBody < Set<Department> >> {
    //     return this.http.get< ResultBody < Set<Department> >>("api/department/find-all-locked");
    // }

    /**
     * 按分页方式返回所有正常状态的部门
     * @returns {Observable<ResultBody<LoginResultModel>>}
     */
    // findPageNormal(pageNo: number): Observable < ResultBody < PageResp<Department> >> {
    //     let page = new PageReq();
    //     page.page = pageNo;
    //     page.pageSize = this.configServer.PAGESIZE;
    //     page.sortField = 'name';
    //     page.sort = "desc";
    //
    //     return this.http.post< ResultBody < PageResp<Department> >>("api/department/find-page-normal",page);
    // }
    /**
     * 返回指定parentId的部门
     * @returns {Observable<ResultBody<LoginResultModel>>}
     */
    findDepartmendByParentId(parentId : string): Observable < ResultBody < Array<Department> >> {
       return this.http.get<ResultBody<Array<Department>>>("api/department/find-by-parentid/" + parentId);
    }

    fetchAvailableDepartmentByCodeOrName(searchstr : string): Observable < ResultBody < Array<Department> >> {
        return this.http.get<ResultBody<Array<Department>>>("api/department/fetch-available-department-by-code-or-name/" + searchstr);
    }

    /**
     * 按分页方式返回不同状态的部门
     * @returns {Observable<ResultBody<LoginResultModel>>}
     */
    findPage(query: DepartmentQueryModel,page: PageReq): Observable < ResultBody < PageResp<Department> >> {
        let queryModel = new QueryReqBody<DepartmentQueryModel>();
        queryModel.pageReq = page;
        queryModel.queryReq = query;

        return this.http.post< ResultBody < PageResp<Department> >>("api/department/find-page",queryModel);
    }

    // add(name: string): Observable< ResultBody < Department >> {
    //     let newItem = new Department();
    //     newItem.name = name;
    //     return this.http.post<ResultBody<Department>>("/api/department/add", newItem);
    // }

    add(item: Department):Observable< ResultBody < Department >> {
        return this.http.post<ResultBody<Department>>("/api/department/add", item);
    }

    update(updateItem: Department):Observable< ResultBody < Department >> {
        return this.http.post<ResultBody<Department>>("/api/department/update", updateItem);
    }

    checkCodeAvailable(code: string):Observable< ResultBody < boolean >> {
        return this.http.post<ResultBody<boolean>>("/api/department/check-code-available", code);

    }

    findById(id:string): Observable<ResultBody<Department>>{
        return this.http.get<ResultBody<Department>>("/api/department/find-by-id/" + id);
    }
}
