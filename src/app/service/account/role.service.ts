import {Injectable} from "@angular/core";
import {_HttpClient} from "@delon/theme";
import {ResultBody} from "../model/result-body.model";
import {LoginResultModel} from "../auth/login-result.model";
import {Observable} from "rxjs/Observable";
import {Role, RoleStatus} from "./role.model";
import {Account} from "./account.model";
import {PageResp} from "../model/page-resp.model";
import {PageReq} from "../model/page-req.model";
import {ConfigService} from "../constant/config.service";
import {I18NService} from "@core/i18n/i18n.service";
import {IStatusItem} from "../model/status.model";
import {RoleQueryModel} from "./role-query.model";
import {QueryReqBody} from "../model/query-req-body.model";

/**
 * @Description: 角色管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-03 21:31
 **/
@Injectable()
export class RoleService{
    constructor(private http: _HttpClient,
                private configServer:ConfigService,
                private i18nService: I18NService){}

    static getStatusCaption(status:number): string{
        switch (status){
            case RoleStatus.NORMAL_ROLE: return '正常';
            case RoleStatus.LOCKED_ROLE: return '锁定';
            case RoleStatus.DELETED_ROLE: return "删除";
            default: return "unknown";

        }
    }
    static statusArray() : IStatusItem[] {
        return [
            {value:RoleStatus.NORMAL_ROLE,caption:this.getStatusCaption(RoleStatus.NORMAL_ROLE)},
            {value:RoleStatus.LOCKED_ROLE,caption:this.getStatusCaption(RoleStatus.LOCKED_ROLE)},
            {value:RoleStatus.DELETED_ROLE,caption:this.getStatusCaption(RoleStatus.DELETED_ROLE)}
            ];
    }

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
    findPageNormal(pageNo: number): Observable < ResultBody < PageResp<Role> >> {
        let page = new PageReq();
        page.page = pageNo;
        page.pageSize = this.configServer.PAGESIZE;
        page.sortField = 'name';
        page.sort = "desc";

        return this.http.post< ResultBody < PageResp<Role> >>("api/role/find-page-normal",page);
    }

    /**
     * 按分页方式返回不同状态的角色
     * @returns {Observable<ResultBody<LoginResultModel>>}
     */
    findPage(query: RoleQueryModel,page: PageReq): Observable < ResultBody < PageResp<Role> >> {
        let queryModel = new QueryReqBody<RoleQueryModel>();
        queryModel.pageReq = page;
        queryModel.queryReq = query;

        return this.http.post< ResultBody < PageResp<Role> >>("api/role/find-page",queryModel);
    }
    // add(name: string): Observable< ResultBody < Role >> {
    //     let newItem = new Role();
    //     newItem.name = name;
    //     return this.http.post<ResultBody<Role>>("/api/role/add", newItem);
    // }

    add(item: Role):Observable< ResultBody < Role >> {
        return this.http.post<ResultBody<Role>>("/api/role/add", item);
    }

    update(updateItem: Role):Observable< ResultBody < Role >> {
        return this.http.post<ResultBody<Role>>("/api/role/update", updateItem);
    }

    checkNameAvailable(name: string):Observable< ResultBody < boolean >> {
        return this.http.post<ResultBody<boolean>>("/api/role/check-name-available", name);

    }

    findById(id:string): Observable<ResultBody<Role>>{
        return this.http.get<ResultBody<Role>>("/api/role/find-by-id/" + id);
    }
}
