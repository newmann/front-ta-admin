import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylResultBody} from '../../model/result-body.model';
import {LoginResultModel} from '../../auth/login-result.model';
import {Observable} from 'rxjs/Observable';
import {BylRole} from '../model/role.model';
import {BylPageResp} from '../../model/page-resp.model';
import {BylPageReq} from '../../model/page-req.model';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';
import {BylBaseService} from '../../service/base.service';

/**
 * @Description: 角色管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-03 21:31
 **/
@Injectable()
export class BylRoleService extends BylBaseService<BylRole> {

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


    checkNameAvailable(name: string): Observable<BylResultBody<boolean>> {
        return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/check-name-available', name);

    }

}
