import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';
import {BylBaseService} from '../../service/base.service';
import {BylPermission} from '../model/permission.model';
import {BylResultBody} from "../../model/result-body.model";
import {Observable} from "rxjs";
import {BylRolePermission} from "../model/role-permission.model";
import {BylAccountPermission} from "../model/account-permission.model";

/**
 * @Description: 角色管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-03 21:31
 **/
@Injectable()
export class BylPermissionService extends BylBaseService<BylPermission> {

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/account/permission';
    }
    /**
     * 返回指定accountId 的权限
     * @returns
     */
    findByAccountId(accountId: string): Observable<BylResultBody<Array<BylPermission>>> {
        return this.http.get<BylResultBody<Array<BylPermission>>>(this.BASE_API_URL + '/find-by-accountid/' + accountId);
    }

    /**
     * 返回指定roleId 的权限
     * @returns
     */
    findByRoleId(roleId: string): Observable<BylResultBody<Array<BylPermission>>> {
        return this.http.get<BylResultBody<Array<BylPermission>>>(this.BASE_API_URL + '/find-by-roleid/' + roleId);
    }

    batchAddRolePermission(items: Array<BylRolePermission>): Observable<BylResultBody<Array<BylRolePermission>>> {
        return this.http.post<BylResultBody<Array<BylRolePermission>>>(this.BASE_API_URL + '/batch-add-role-permission', items);
    }

    batchAddAccountPermission(items: Array<BylAccountPermission>): Observable<BylResultBody<Array<BylAccountPermission>>> {
        return this.http.post<BylResultBody<Array<BylAccountPermission>>>(this.BASE_API_URL + '/batch-add-account-permission', items);
    }

    initPermission(): Observable<BylResultBody<boolean>> {
        return this.http.get<BylResultBody<boolean>>(this.BASE_API_URL + '/init-permission');
    }

}
