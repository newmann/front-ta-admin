import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylResultBody} from '../../model/result-body.model';
import {LoginResultModel} from '../../auth/login-result.model';
import {Observable} from 'rxjs';
import {BylRole} from '../model/role.model';
import {BylPageResp} from '../../model/page-resp.model';
import {BylPageReq} from '../../model/page-req.model';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';
import {BylBaseService} from '../../service/base.service';
import {BylRolePermission} from "../model/role-permission.model";
import {BylRoleAccount} from "../model/role-account.model";
import {
    BylAccountAvailablePoolsInterface, BylFindEntityAccountInterface,
    BylSaveAccountRelationInterface
} from "./account-related.interface";
import {BylAccount} from "../model/account.model";
import {BylEntityRelations} from "../model/entity-relations.model";
import {BylQueryReqBody} from "../../model/query-req-body.model";
import {BylEntityRelationAvailablePoolsQueryReqBody} from "../model/entity-relation-available-pools-query-req-body.model";
import {
    BylFindEntityPermissionInterface, BylPermissionAvailablePoolsInterface,
    BylSavePermissionRelationInterface
} from "./permission-related.interface";
import {BylPermission} from "../model/permission.model";
import {BylMasterDataBaseService} from "../../service/master-data-base.service";
import {BylCheckAvailableReq} from "../../model/check-avaiable-req.model";

/**
 * @Description: 角色管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-03 21:31
 **/
@Injectable()
export class BylRoleService extends BylMasterDataBaseService<BylRole>
    implements BylAccountAvailablePoolsInterface
        , BylSaveAccountRelationInterface
        , BylFindEntityAccountInterface
        , BylPermissionAvailablePoolsInterface
        , BylSavePermissionRelationInterface
        , BylFindEntityPermissionInterface
        {

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/account/role';
    }


    /**
     * 返回所有正常状态的角色
     * @returns {Observable<BylResultBody<LoginResultModel>>}
     */
    findAllNormal(): Observable<BylResultBody<Set<BylRole>>> {
        return this.http.get<BylResultBody<Set<BylRole>>>(this.BASE_API_URL + '/find-all-normal');
    }

    /**
     * 返回所有被锁定的role
     * @returns {Observable<BylResultBody<Set<BylRole>>>}
     */
    findAllLocked(): Observable<BylResultBody<Set<BylRole>>> {
        return this.http.get<BylResultBody<Set<BylRole>>>(this.BASE_API_URL + '/find-all-locked');
    }

    /**
     * 按分页方式返回所有正常状态的角色
     * @returns {Observable<BylResultBody<LoginResultModel>>}
     */
    findPageNormal(pageNo: number): Observable<BylResultBody<BylPageResp<BylRole>>> {
        let page = new BylPageReq();
        page.page = pageNo;
        page.pageSize = this.configServer.PAGESIZE;
        page.sortField = 'name';
        page.sort = 'desc';

        return this.http.post<BylResultBody<BylPageResp<BylRole>>>(this.BASE_API_URL + '/find-page-normal', page);
    }

    fetchAccountsByRoleId(roleId: string): Observable<BylResultBody<Array<BylAccount>>> {
        return this.http.get<BylResultBody<Array<BylAccount>>>(this.BASE_API_URL + '/fetch-accounts-by-roleid/' + roleId);
    }

    fetchPermissionsByRoleId(roleId: string): Observable<BylResultBody<Array<BylPermission>>> {
        return this.http.get<BylResultBody<Array<BylPermission>>>(this.BASE_API_URL + '/fetch-permissions-by-roleid/' + roleId);
    }

    // checkNameAvailable(name: string): Observable<BylResultBody<boolean>> {
    //     return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/check-name-available', name);
    //
    // }
    checkNameAvailable(data: BylCheckAvailableReq): Observable<BylResultBody<boolean>> {
        return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/check-name-available', data);
    }

    batchAddPermission(items: Array<BylRolePermission>): Observable<BylResultBody<Array<BylRolePermission>>> {
        return this.http.post<BylResultBody<Array<BylRolePermission>>>(this.BASE_API_URL + '/batch-add-permission', items);
    }

    batchAddAccount(items: Array<BylRoleAccount>): Observable<BylResultBody<Array<BylRoleAccount>>> {
        return this.http.post<BylResultBody<Array<BylRoleAccount>>>(this.BASE_API_URL + '/batch-add-account', items);
    }


    findAvailableAccountPoolsPage(query: any, page: BylPageReq, masterId?: string): Observable<BylResultBody<BylPageResp<BylAccount>>> {
        let queryModel = new BylEntityRelationAvailablePoolsQueryReqBody<any>();
        queryModel.masterId = masterId;
        queryModel.pageReq = page;
        queryModel.queryReq = query;

        return this.http.post<BylResultBody<BylPageResp<BylAccount>>>(this.BASE_API_URL + '/find-available-account-pools', queryModel);
    }

    saveAccountRelation(accountArray: Array<string>, masterId: string): Observable<BylResultBody<Boolean>> {
        let item = new BylEntityRelations();
        item.masterId = masterId;
        item.relationIds = accountArray;

        return this.http.post<BylResultBody<Boolean>>(this.BASE_API_URL + '/batch-add-account-relation-by-ids', item);

    }

    findEntityAccount(masterId: string): Observable<BylResultBody<Array<BylAccount>>> {
        return this.fetchAccountsByRoleId(masterId);
    }


    findAvailablePermissionPoolsPage(query: any, page: BylPageReq, masterId?: string): Observable<BylResultBody<BylPageResp<BylPermission>>> {
        let queryModel = new BylEntityRelationAvailablePoolsQueryReqBody<any>();
        queryModel.masterId = masterId;
        queryModel.pageReq = page;
        queryModel.queryReq = query;

        return this.http.post<BylResultBody<BylPageResp<BylPermission>>>(this.BASE_API_URL + '/find-available-permission-pools', queryModel);
    }


    savePermissionRelation(permissionArray: Array<string>, masterId: string): Observable<BylResultBody<Boolean>> {
        let item = new BylEntityRelations();
        item.masterId = masterId;
        item.relationIds = permissionArray;

        return this.http.post<BylResultBody<Boolean>>(this.BASE_API_URL + '/batch-add-permission-relation-by-ids', item);

    }

    findEntityPermission(masterId: string): Observable<BylResultBody<Array<BylPermission>>> {
        return this.fetchPermissionsByRoleId(masterId);
    }

}
