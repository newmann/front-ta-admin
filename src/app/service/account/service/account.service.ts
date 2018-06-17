import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';

import {BylBaseService} from '../../service/base.service';
import {BylAccount} from "../model/account.model";
import {BylAccountQuery} from '../query/account-query.model';
import {BylQueryReqBody} from '../../model/query-req-body.model';
import {BylPageResp} from '../../model/page-resp.model';
import {BylResultBody} from '../../model/result-body.model';
import {Observable} from 'rxjs';
import {BylPageReq} from '../../model/page-req.model';
import {BylAccountPermission} from "../model/account-permission.model";
import {
    BylFindEntityPermissionInterface, BylPermissionAvailablePoolsInterface,
    BylSavePermissionRelationInterface
} from "./permission-related.interface";
import {BylPermission} from "../model/permission.model";
import {BylEntityRelationAvailablePoolsQueryReqBody} from "../model/entity-relation-available-pools-query-req-body.model";
import {BylEntityRelations} from "../model/entity-relations.model";
import {BylMasterDataBaseService} from "../../service/master-data-base.service";
import {BylCheckAvailableReq} from "../../model/check-avaiable-req.model";



/**
 * @Description: 账户管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylAccountService  extends BylMasterDataBaseService<BylAccount>
implements  BylPermissionAvailablePoolsInterface
            , BylSavePermissionRelationInterface
            , BylFindEntityPermissionInterface{


    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/account';
    }

    checkUsernameAvailable(data: BylCheckAvailableReq): Observable<BylResultBody<boolean>> {
        return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/check-username-available', data);
    }
    /**
     * 按分页方式返回
     * @returns {Observable<BylResultBody<>>}
     */
    findAvailableManagerPoolsPage(query: BylAccountQuery, page: BylPageReq): Observable<BylResultBody<BylPageResp<BylAccount>>> {
        let queryModel = new BylQueryReqBody<BylAccountQuery>();
        queryModel.pageReq = page;
        queryModel.queryReq = query;

        return this.http.post<BylResultBody<BylPageResp<BylAccount>>>(this.BASE_API_URL + '/find-available-manager-pools-page', queryModel);
    }

    fetchPermissionsByAccountId(accountId: string): Observable<BylResultBody<Array<BylPermission>>> {
        return this.http.get<BylResultBody<Array<BylPermission>>>(this.BASE_API_URL + '/fetch-permissions-by-accountid/' + accountId);
    }

    batchAddPermission(items: Array<BylAccountPermission>): Observable<BylResultBody<Array<BylAccountPermission>>> {
        return this.http.post<BylResultBody<Array<BylAccountPermission>>>(this.BASE_API_URL + '/batch-add-permission', items);
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
        return this.fetchPermissionsByAccountId(masterId);
    }

}
