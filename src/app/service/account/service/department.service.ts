import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylResultBody} from '../../model/result-body.model';
import {LoginResultModel} from '../../auth/login-result.model';
import {Observable} from 'rxjs/Observable';
import {BylDepartment} from '../model/department.model';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';
import {BylBaseService} from '../../service/base.service';


/**
 * @Description: 部门管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylDepartmentService  extends BylBaseService<BylDepartment> {
    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/account/department';
    }


    // static getStatusCaption(status: number): string {
    //     switch (status) {
    //         case BylDepartmentStatus.NORMAL_DEPARTMENT:
    //             return '正常';
    //         case BylDepartmentStatus.LOCKED_DEPARTMENT:
    //             return '锁定';
    //         case BylDepartmentStatus.DELETED_DEPARTMENT:
    //             return '删除';
    //         default:
    //             return 'unknown';
    //
    //     }
    // }
    //
    // static statusArray(): BylIStatusItem[] {
    //     return [
    //         {
    //             value: BylDepartmentStatus.NORMAL_DEPARTMENT,
    //             caption: this.getStatusCaption(BylDepartmentStatus.NORMAL_DEPARTMENT)
    //         },
    //         {
    //             value: BylDepartmentStatus.LOCKED_DEPARTMENT,
    //             caption: this.getStatusCaption(BylDepartmentStatus.LOCKED_DEPARTMENT)
    //         },
    //         {
    //             value: BylDepartmentStatus.DELETED_DEPARTMENT,
    //             caption: this.getStatusCaption(BylDepartmentStatus.DELETED_DEPARTMENT)
    //         }
    //     ];
    // }



    /**
     * 返回指定parentId的部门
     * @returns {Observable<BylResultBody<LoginResultModel>>}
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

}
