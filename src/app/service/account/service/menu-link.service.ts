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
import {BylMenuLink} from "../model/menu-link.model";
import {BylRoleMenuLink} from "../model/role-menu-link.model";
import {BylAccountMenuLink} from "../model/account-menu-link.model";

/**
 * @Description: 角色管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-03 21:31
 **/
@Injectable()
export class BylMenuLinkService extends BylBaseService<BylMenuLink> {

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/account/menu-link';
    }
    /**
     * 返回指定accountId 的权限
     * @returns
     */
    findByAccountId(accountId: string): Observable<BylResultBody<Array<BylMenuLink>>> {
        return this.http.get<BylResultBody<Array<BylMenuLink>>>(this.BASE_API_URL + '/find-by-accountid/' + accountId);
    }

    /**
     * 返回指定roleId 的权限
     * @returns
     */
    findByRoleId(roleId: string): Observable<BylResultBody<Array<BylMenuLink>>> {
        return this.http.get<BylResultBody<Array<BylMenuLink>>>(this.BASE_API_URL + '/find-by-roleid/' + roleId);
    }

    batchAddRolePermission(items: Array<BylRoleMenuLink>): Observable<BylResultBody<Array<BylRoleMenuLink>>> {
        return this.http.post<BylResultBody<Array<BylRoleMenuLink>>>(this.BASE_API_URL + '/batch-add-role-menu-link', items);
    }

    batchAddAccountPermission(items: Array<BylAccountMenuLink>): Observable<BylResultBody<Array<BylAccountMenuLink>>> {
        return this.http.post<BylResultBody<Array<BylAccountMenuLink>>>(this.BASE_API_URL + '/batch-add-account-menu-link', items);
    }

    initMenuLink(items: Array<BylMenuLink>): Observable<BylResultBody<boolean>> {
        return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/init-menu-link',items);
    }

}
