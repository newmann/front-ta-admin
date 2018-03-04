import {Injectable} from "@angular/core";
import {_HttpClient} from "@delon/theme";
import {ResultBody} from "../model/result.body.model";
import {LoginResultModel} from "../auth/login.result.model";
import {Observable} from "rxjs/Observable";
import {Role} from "./role.model";
import {Account} from "./account.model";
import {PageRespModel} from "../model/page.resp.model";
import {PageReqModel} from "../model/page.req.model";
import {ConfigService} from "../constant/config.service";

/**
 * @Description: 角色管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-03 21:31
 **/
@Injectable()
export class RoleService{
    constructor(private http: _HttpClient,
                private configServer:ConfigService){}

    /**
     * 返回所有正常状态的角色
     * @returns {Observable<ResultBody<LoginResultModel>>}
     */
    findAllNormal(): Observable < ResultBody < Set<Role> >> {
        return this.http.get< ResultBody < Set<Role> >>("api/role/find-all-normal");
    }

    /**
     * 返回所有被锁定的role
     * @returns {Observable<ResultBody<Set<Role>>>}
     */
    findAllLocked(): Observable < ResultBody < Set<Role> >> {
        return this.http.get< ResultBody < Set<Role> >>("api/role/find-all-locked");
    }

    /**
     * 按分页方式返回所有正常状态的角色
     * @returns {Observable<ResultBody<LoginResultModel>>}
     */
    findPageNormal(pageNo: number): Observable < ResultBody < PageRespModel<Role> >> {
        let page = new PageReqModel();
        page.page = pageNo;
        page.pageSize = this.configServer.PAGESIZE;
        page.sortField = 'name';
        page.sort = "desc";

        return this.http.post< ResultBody < PageRespModel<Role> >>("api/role/find-page-normal",page);
    }

    add(name: string): Observable< ResultBody < Role >> {
        let newItem = new Role();
        newItem.name = name;
        return this.http.post<ResultBody<Role>>("/api/role/add", newItem);
    }

    update(updateItem: Role):Observable< ResultBody < Role >> {
        return this.http.post<ResultBody<Role>>("/api/role/update", updateItem);
    }

    checkNameAvailable(name: string):Observable< ResultBody < boolean >> {
        return this.http.post<ResultBody<boolean>>("/api/role/check-name-available", name);

    }

}
