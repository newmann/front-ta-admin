import {Injectable} from "@angular/core";
import {_HttpClient} from "@delon/theme";
import {BylResultBody} from "../../model/result-body.model";
import {LoginResultModel} from "../../auth/login-result.model";
import {Observable} from "rxjs/Observable";
import {Role, RoleStatus} from "../model/role.model";
import {BylAccount} from "../model/account.model";
import {BylPageResp} from "../../model/page-resp.model";
import {BylPageReq} from "../../model/page-req.model";
import {BylConfigService} from "../../constant/config.service";
import {I18NService} from "app/core/i18n/i18n.service";
import {BylIStatusItem} from "../../model/status.model";
import {BylRoleQuery} from "../query/role-query.model";
import {BylQueryReqBody} from "../../model/query-req-body.model";

/**
 * @Description: 角色管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-03 21:31
 **/
@Injectable()
export class BylRoleService{
    constructor(private http: _HttpClient,
                private configServer:BylConfigService,
                private i18nService: I18NService){}

    static getStatusCaption(status:number): string{
        switch (status){
            case RoleStatus.NORMAL_ROLE: return '正常';
            case RoleStatus.LOCKED_ROLE: return '锁定';
            case RoleStatus.DELETED_ROLE: return "删除";
            default: return "unknown";

        }
    }
    static statusArray() : BylIStatusItem[] {
        return [
            {value:RoleStatus.NORMAL_ROLE,caption:this.getStatusCaption(RoleStatus.NORMAL_ROLE)},
            {value:RoleStatus.LOCKED_ROLE,caption:this.getStatusCaption(RoleStatus.LOCKED_ROLE)},
            {value:RoleStatus.DELETED_ROLE,caption:this.getStatusCaption(RoleStatus.DELETED_ROLE)}
            ];
    }

    /**
     * 返回所有正常状态的角色
     * @returns {Observable<BylResultBody<LoginResultModel>>}
     */
    findAllNormal(): Observable < BylResultBody < Set<Role> >> {
        return this.http.get< BylResultBody < Set<Role> >>("api/role/find-all-normal");
    }

    /**
     * 返回所有被锁定的role
     * @returns {Observable<BylResultBody<Set<Role>>>}
     */
    findAllLocked(): Observable < BylResultBody < Set<Role> >> {
        return this.http.get< BylResultBody < Set<Role> >>("api/role/find-all-locked");
    }

    /**
     * 按分页方式返回所有正常状态的角色
     * @returns {Observable<BylResultBody<LoginResultModel>>}
     */
    findPageNormal(pageNo: number): Observable < BylResultBody < BylPageResp<Role> >> {
        let page = new BylPageReq();
        page.page = pageNo;
        page.pageSize = this.configServer.PAGESIZE;
        page.sortField = 'name';
        page.sort = "desc";

        return this.http.post< BylResultBody < BylPageResp<Role> >>("api/role/find-page-normal",page);
    }

    /**
     * 按分页方式返回不同状态的角色
     * @returns {Observable<BylResultBody<LoginResultModel>>}
     */
    findPage(query: BylRoleQuery, page: BylPageReq): Observable < BylResultBody < BylPageResp<Role> >> {
        let queryModel = new BylQueryReqBody<BylRoleQuery>();
        queryModel.pageReq = page;
        queryModel.queryReq = query;

        return this.http.post< BylResultBody < BylPageResp<Role> >>("api/role/find-page",queryModel);
    }
    // add(name: string): Observable< BylResultBody < Role >> {
    //     let newItem = new Role();
    //     newItem.name = name;
    //     return this.http.post<BylResultBody<Role>>("/api/role/add", newItem);
    // }

    add(item: Role):Observable< BylResultBody < Role >> {
        return this.http.post<BylResultBody<Role>>("/api/role/add", item);
    }

    update(updateItem: Role):Observable< BylResultBody < Role >> {
        return this.http.post<BylResultBody<Role>>("/api/role/update", updateItem);
    }

    checkNameAvailable(name: string):Observable< BylResultBody < boolean >> {
        return this.http.post<BylResultBody<boolean>>("/api/role/check-name-available", name);

    }

    findById(id:string): Observable<BylResultBody<Role>>{
        return this.http.get<BylResultBody<Role>>("/api/role/find-by-id/" + id);
    }
}
