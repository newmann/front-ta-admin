import {Observable} from 'rxjs/Observable';

import {BylPageReq} from "../../model/page-req.model";
import {BylResultBody} from "../../model/result-body.model";
import {BylPageResp} from "../../model/page-resp.model";
import {BylPerson} from "../model/person.model";


/**
 *  @Author: xinsh
 * @Description: 与后台接口的基础类
 *  @Date: Created in  14:00 2018/4/13.
 */

export interface BylPersonAvailablePoolsInterface {

    /**
     * 按分页方式返回不同查询条件下的值
     * @returns {Observable<BylResultBody<LoginResultModel>>}
     */
    findAvailablePersonPoolsPage(query: any, page: BylPageReq): Observable<BylResultBody<BylPageResp<BylPerson>>>;

}
