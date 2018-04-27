import {Observable} from 'rxjs/Observable';

import {BylOrganization} from "../model/organization.model";
import {BylPageReq} from "../../model/page-req.model";
import {BylResultBody} from "../../model/result-body.model";
import {BylPageResp} from "../../model/page-resp.model";


/**
 *  @Author: xinsh
 * @Description: 与后台接口的基础类
 *  @Date: Created in  14:00 2018/4/13.
 */

export interface BylOrganizationAvailablePoolsInterface {

    /**
     * 按分页方式返回不同查询条件下的值
     * @returns {Observable<BylResultBody<LoginResultModel>>}
     */
    findAvailableOrganizationPoolsPage(query: any, page: BylPageReq): Observable<BylResultBody<BylPageResp<BylOrganization>>>;

}
