import {Injectable} from "@angular/core";
import {_HttpClient} from "@delon/theme";
import {BylResultBody} from "../../model/result-body.model";
import {LoginResultModel} from "../../auth/login-result.model";
import {Observable} from "rxjs/Observable";
import {BylRole, BylRoleStatus} from "../model/role.model";
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
                private configServer: BylConfigService,
                private i18nService: I18NService){}

    // static getStatusCaption(status: number): string {
    //     switch (status) {
    //         case BylRoleStatus.NORMAL_ROLE:
    //             return '正常';
    //         case BylRoleStatus.LOCKED_ROLE:
    //             return '锁定';
    //         case BylRoleStatus.DELETED_ROLE:
    //             return '删除';
    //         default:
    //             return 'unknown';
    //
    //     }
    // }
    //
    // static statusArray(): BylIStatusItem[] {
    //     return [
    //         {value: BylRoleStatus.NORMAL_ROLE, caption: this.getStatusCaption(BylRoleStatus.NORMAL_ROLE)},
    //         {value: BylRoleStatus.LOCKED_ROLE, caption: this.getStatusCaption(BylRoleStatus.LOCKED_ROLE)},
    //         {value: BylRoleStatus.DELETED_ROLE, caption: this.getStatusCaption(BylRoleStatus.DELETED_ROLE)}
    //     ];
    // }

    /**
     * 返回所有正常状态的角色
     * @returns {Observable<BylResultBody<LoginResultModel>>}
     */
    findAllNormal(): Observable < BylResultBody < Set<BylRole> >> {
        return this.http.get< BylResultBody < Set<BylRole> >>("api/role/find-all-normal");
    }

    /**
     * 返回所有被锁定的role
     * @returns {Observable<BylResultBody<Set<BylRole>>>}
     */
    findAllLocked(): Observable < BylResultBody < Set<BylRole> >> {
        return this.http.get< BylResultBody < Set<BylRole> >>("api/role/find-all-locked");
    }

    /**
     * 按分页方式返回所有正常状态的角色
     * @returns {Observable<BylResultBody<LoginResultModel>>}
     */
    findPageNormal(pageNo: number): Observable < BylResultBody < BylPageResp<BylRole> >> {
        let page = new BylPageReq();
        page.page = pageNo;
        page.pageSize = this.configServer.PAGESIZE;
        page.sortField = 'name';
        page.sort = "desc";

        return this.http.post< BylResultBody < BylPageResp<BylRole> >>("api/role/find-page-normal",page);
    }

    /**
     * 按分页方式返回不同状态的角色
     * @returns {Observable<BylResultBody<LoginResultModel>>}
     */
    findPage(query: BylRoleQuery, page: BylPageReq): Observable < BylResultBody < BylPageResp<BylRole> >> {
        let queryModel = new BylQueryReqBody<BylRoleQuery>();
        queryModel.pageReq = page;
        queryModel.queryReq = query;

        return this.http.post< BylResultBody < BylPageResp<BylRole> >>("api/role/find-page",queryModel);
    }
    // add(name: string): Observable< BylResultBody < BylRole >> {
    //     let newItem = new BylRole();
    //     newItem.name = name;
    //     return this.http.post<BylResultBody<BylRole>>("/api/role/add", newItem);
    // }

    add(item: BylRole):Observable< BylResultBody < BylRole >> {
        return this.http.post<BylResultBody<BylRole>>("/api/role/add", item);
    }

    update(updateItem: BylRole):Observable< BylResultBody < BylRole >> {
        return this.http.post<BylResultBody<BylRole>>("/api/role/update", updateItem);
    }

    checkNameAvailable(name: string):Observable< BylResultBody < boolean >> {
        return this.http.post<BylResultBody<boolean>>("/api/role/check-name-available", name);

    }

    findById(id:string): Observable<BylResultBody<BylRole>>{
        return this.http.get<BylResultBody<BylRole>>("/api/role/find-by-id/" + id);
    }
}
