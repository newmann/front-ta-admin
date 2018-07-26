import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylResultBody} from '../../model/result-body.model';
import {BylLoginResultModel} from '../../auth/login-result.model';
import {Observable} from 'rxjs';
import {BylDepartment} from '../model/department.model';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';
import {BylBaseService} from '../../service/base.service';
import {BylRoleAccount} from "../model/role-account.model";
import {BylDepartmentAccount} from "../model/department-account.model";
import {BylAccount} from "../model/account.model";
import {
    BylAccountAvailablePoolsInterface, BylAccountRelationInterface, BylFindEntityAccountInterface,
    BylSaveAccountRelationInterface
} from "./account-related.interface";
import {BylEntityRelations} from "../model/entity-relations.model";
import {BylPageResp} from "../../model/page-resp.model";
import {BylPageReq} from "../../model/page-req.model";
import {BylEntityRelationAvailablePoolsQueryReqBody} from "../model/entity-relation-available-pools-query-req-body.model";
import {BylMasterDataBaseService} from "../../service/master-data-base.service";


/**
 * @Description: 部门管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylDepartmentService  extends BylMasterDataBaseService<BylDepartment>
    implements BylAccountRelationInterface
    {
    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/account/department';
    }

    /**
     * 返回指定parentId的部门
     * @returns {Observable<BylResultBody<BylLoginResultModel>>}
     */
    findDepartmendByParentId(parentId: string): Observable<BylResultBody<Array<BylDepartment>>> {
        return this.http.get<BylResultBody<Array<BylDepartment>>>(this.BASE_API_URL + '/find-by-parentid/' + parentId);
    }

    fetchAvailableDepartmentByCodeOrName(searchstr: string): Observable<BylResultBody<Array<BylDepartment>>> {
        return this.http.get<BylResultBody<Array<BylDepartment>>>(this.BASE_API_URL + '/fetch-available-department-by-code-or-name/' + searchstr);
    }

    checkCodeAvailable(code: string): Observable<BylResultBody<boolean>> {
        return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/check-code-available', code);

    }

    batchAddAccount(items: Array<BylDepartmentAccount>): Observable<BylResultBody<Array<BylDepartmentAccount>>> {
        return this.http.post<BylResultBody<Array<BylDepartmentAccount>>>(this.BASE_API_URL + '/batch-add-account', items);
    }

    fetchAccountsByDepartmentId(departmentId: string): Observable<BylResultBody<Array<BylAccount>>> {
        return this.http.get<BylResultBody<Array<BylAccount>>>(this.BASE_API_URL + '/fetch-accounts-by-departmentid/' + departmentId);
    }


    findEntityAccount(masterId: string): Observable<BylResultBody<Array<BylAccount>>> {
        return this.fetchAccountsByDepartmentId(masterId);
    }

    saveAccountRelation(idArray: Array<string>, masterId: string): Observable<BylResultBody<Boolean>> {
        let item = new BylEntityRelations();
        item.masterId = masterId;
        item.relationIds = idArray;

        return this.http.post<BylResultBody<Boolean>>(this.BASE_API_URL + '/batch-add-account-relation-by-ids', item);

    }

    deleteAccountRelation(idArray: Array<string>, masterId: string): Observable<BylResultBody<Boolean>> {
        let item = new BylEntityRelations();
        item.masterId = masterId;
        item.relationIds = idArray;

        return this.http.post<BylResultBody<Boolean>>(this.BASE_API_URL + '/batch-delete-account-relation-by-ids', item);
    }

    findAvailableAccountPoolsPage(query: any, page: BylPageReq, masterId?: string): Observable<BylResultBody<BylPageResp<BylAccount>>> {
        let queryModel = new BylEntityRelationAvailablePoolsQueryReqBody<any>();
        queryModel.masterId = masterId;
        queryModel.pageReq = page;
        queryModel.queryReq = query;

        return this.http.post<BylResultBody<BylPageResp<BylAccount>>>(this.BASE_API_URL + '/find-available-account-pools', queryModel);

    }
}
