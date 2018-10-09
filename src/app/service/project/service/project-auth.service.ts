import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylResultBody} from '../../model/result-body.model';

import {Observable} from 'rxjs';

import {BylPageResp} from '../../model/page-resp.model';
import {BylPageReq} from '../../model/page-req.model';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';

import {BylQueryReqBody} from '../../model/query-req-body.model';
import {BylBaseService} from '../../service/base.service';
import {BylPerson} from "../../person/model/person.model";
import {BylPersonQuery} from "../../person/query/person-query.model";
import {BylOrganization} from "../../organization/model/organization.model";
import {BylOrganizationQuery} from "../../organization/query/organization-query.model";
import {BylPersonAvailablePoolsInterface} from "../../person/service/person-available-pool.interface";
import {BylOrganizationAvailablePoolsInterface} from "../../organization/service/organization-available-pool.interface";
import {BylProjectAuth} from "../model/project-auth.model";
import {BylAccount} from "../../account/model/account.model";
import {
    BylAccountAvailablePoolsInterface, BylAccountRelationInterface,
    BylFindEntityAccountInterface, BylSaveAccountRelationInterface
} from "../../account/service/account-related.interface";
import {BylEntityRelationAvailablePoolsQueryReqBody} from "../../account/model/entity-relation-available-pools-query-req-body.model";
import {BylProject} from "../model/project.model";
import {BylEntityRelations} from "../../account/model/entity-relations.model";


/**
 * @Description: 可借款资源池service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylProjectAuthService  extends BylBaseService<BylProjectAuth>
    implements BylAccountRelationInterface
        /*BylFindEntityAccountInterface,
        BylAccountAvailablePoolsInterface,
        BylSaveAccountRelationInterface*/{

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/project/project-auth';
    }
    batchtAdd(pools: Array<BylProjectAuth>): Observable<BylResultBody<Array<BylProjectAuth>>> {
        return this.http.post<BylResultBody<Array<BylProjectAuth>>>(this.BASE_API_URL + '/batch-add', pools);
    }

    deleteById(id: string): Observable<BylResultBody<boolean>> {
        return this.http.delete(this.BASE_API_URL + '/delete-by-id/' + id);
    }

    deleteByProjectIdAndAccountId(projectId: string, accountId: string): Observable<BylResultBody<boolean>> {
        let entity = new BylProjectAuth();
        entity.projectId = projectId;
        entity.accountId = accountId;

        return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/delete-by-projectid-and-accountid', entity);
    }

    fetchAccountsByProjectId(projectId: string): Observable<BylResultBody<Array<BylAccount>>> {
        return this.http.get<BylResultBody<Array<BylAccount>>>(this.BASE_API_URL + '/fetch-accounts-by-projectid/' + projectId);
    }

    checkAllowAllByProjectId(projectId: string): Observable<BylResultBody<boolean>> {
        return this.http.get<BylResultBody<boolean>>(this.BASE_API_URL + '/check-allow-all-by-projectid/' + projectId);
    }

    findEntityAccount(masterId: string): Observable<BylResultBody<Array<BylAccount>>> {
        return this.fetchAccountsByProjectId(masterId);
    }

    findAvailableAccountPoolsPage(query: any, page: BylPageReq, masterId?: string): Observable<BylResultBody<BylPageResp<BylAccount>>> {
        let queryModel = new BylEntityRelationAvailablePoolsQueryReqBody<any>();
        queryModel.masterId = masterId;
        queryModel.pageReq = page;
        queryModel.queryReq = query;

        return this.http.post<BylResultBody<BylPageResp<BylAccount>>>(this.BASE_API_URL + '/find-available-account-pools', queryModel);

    }

    enableAllowAll(projectId: string): Observable<BylResultBody<BylProjectAuth>> {
        return this.http.get<BylResultBody<BylProjectAuth>>(this.BASE_API_URL + '/enable-allow-all/' + projectId);
    }

    disableAllowAll(projectId: string): Observable<BylResultBody<boolean>> {
        return this.http.get<BylResultBody<boolean>>(this.BASE_API_URL + '/disable-allow-all/' + projectId);
    }

    saveAccountRelation(accountArray: Array<string>, masterId: string): Observable<BylResultBody<Boolean>> {
        let entityRelations = new BylEntityRelations();
        entityRelations.masterId = masterId;
        entityRelations.relationIds = accountArray;

        return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/batch-add-account-relation-by-ids', entityRelations);
    }

    deleteAccountRelation(idArray: Array<string>, masterId: string): Observable<BylResultBody<Boolean>> {
        let entityRelations = new BylEntityRelations();
        entityRelations.masterId = masterId;
        entityRelations.relationIds = idArray;

        return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/batch-delete-account-relation-by-ids', entityRelations);
    }

}
