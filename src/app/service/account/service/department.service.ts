import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylResultBody} from '../../model/result-body.model';
import {LoginResultModel} from '../../auth/login-result.model';
import {Observable} from 'rxjs/Observable';
import {BylDepartment, DepartmentStatus} from '../model/department.model';
import {BylAccount} from '../model/account.model';
import {BylPageResp} from '../../model/page-resp.model';
import {BylPageReq} from '../../model/page-req.model';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';
import {BylIStatusItem} from '../../model/status.model';
import {BylDepartmentQuery} from '../query/department-query.model';
import {BylQueryReqBody} from '../../model/query-req-body.model';


/**
 * @Description: 部门管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylDepartmentService {
    constructor(private http: _HttpClient,
                private configServer: BylConfigService,
                private i18nService: I18NService) {
    }

    static getStatusCaption(status: number): string {
        switch (status) {
            case DepartmentStatus.NORMAL_DEPARTMENT:
                return '正常';
            case DepartmentStatus.LOCKED_DEPARTMENT:
                return '锁定';
            case DepartmentStatus.DELETED_DEPARTMENT:
                return '删除';
            default:
                return 'unknown';

        }
    }

    static statusArray(): BylIStatusItem[] {
        return [
            {
                value: DepartmentStatus.NORMAL_DEPARTMENT,
                caption: this.getStatusCaption(DepartmentStatus.NORMAL_DEPARTMENT)
            },
            {
                value: DepartmentStatus.LOCKED_DEPARTMENT,
                caption: this.getStatusCaption(DepartmentStatus.LOCKED_DEPARTMENT)
            },
            {
                value: DepartmentStatus.DELETED_DEPARTMENT,
                caption: this.getStatusCaption(DepartmentStatus.DELETED_DEPARTMENT)
            }
        ];
    }

    /**
     * 返回所有正常状态的部门
     * @returns {Observable<BylResultBody<LoginResultModel>>}
     */
    // findAllNormal(): Observable < BylResultBody < Set<BylDepartment> >> {
    //     return this.http.get< BylResultBody < Set<BylDepartment> >>("api/department/find-all-normal");
    // }

    /**
     * 返回所有被锁定的department
     * @returns {Observable<BylResultBody<Set<BylDepartment>>>}
     */
    // findAllLocked(): Observable < BylResultBody < Set<BylDepartment> >> {
    //     return this.http.get< BylResultBody < Set<BylDepartment> >>("api/department/find-all-locked");
    // }

    /**
     * 按分页方式返回所有正常状态的部门
     * @returns {Observable<BylResultBody<LoginResultModel>>}
     */
    // findPageNormal(pageNo: number): Observable < BylResultBody < BylPageResp<BylDepartment> >> {
    //     let page = new BylPageReq();
    //     page.page = pageNo;
    //     page.pageSize = this.configServer.PAGESIZE;
    //     page.sortField = 'name';
    //     page.sort = "desc";
    //
    //     return this.http.post< BylResultBody < BylPageResp<BylDepartment> >>("api/department/find-page-normal",page);
    // }
    /**
     * 返回指定parentId的部门
     * @returns {Observable<BylResultBody<LoginResultModel>>}
     */
    findDepartmendByParentId(parentId: string): Observable<BylResultBody<Array<BylDepartment>>> {
        return this.http.get<BylResultBody<Array<BylDepartment>>>('api/department/find-by-parentid/' + parentId);
    }

    fetchAvailableDepartmentByCodeOrName(searchstr: string): Observable<BylResultBody<Array<BylDepartment>>> {
        return this.http.get<BylResultBody<Array<BylDepartment>>>('api/department/fetch-available-department-by-code-or-name/' + searchstr);
    }

    /**
     * 按分页方式返回不同状态的部门
     * @returns {Observable<BylResultBody<LoginResultModel>>}
     */
    findPage(query: BylDepartmentQuery, page: BylPageReq): Observable<BylResultBody<BylPageResp<BylDepartment>>> {
        let queryModel = new BylQueryReqBody<BylDepartmentQuery>();
        queryModel.pageReq = page;
        queryModel.queryReq = query;

        return this.http.post<BylResultBody<BylPageResp<BylDepartment>>>('api/department/find-page', queryModel);
    }

    // add(name: string): Observable< BylResultBody < BylDepartment >> {
    //     let newItem = new BylDepartment();
    //     newItem.name = name;
    //     return this.http.post<BylResultBody<BylDepartment>>("/api/department/add", newItem);
    // }

    add(item: BylDepartment): Observable<BylResultBody<BylDepartment>> {
        return this.http.post<BylResultBody<BylDepartment>>('/api/department/add', item);
    }

    update(updateItem: BylDepartment): Observable<BylResultBody<BylDepartment>> {
        return this.http.post<BylResultBody<BylDepartment>>('/api/department/update', updateItem);
    }

    checkCodeAvailable(code: string): Observable<BylResultBody<boolean>> {
        return this.http.post<BylResultBody<boolean>>('/api/department/check-code-available', code);

    }

    findById(id: string): Observable<BylResultBody<BylDepartment>> {
        return this.http.get<BylResultBody<BylDepartment>>('/api/department/find-by-id/' + id);
    }
}
