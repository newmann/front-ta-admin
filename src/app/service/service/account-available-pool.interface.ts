import {Observable} from 'rxjs/Observable';
import {BylResultBody} from '../model/result-body.model';
import {BylPageReq} from '../model/page-req.model';
import {BylPageResp} from '../model/page-resp.model';
import {BylAccount} from '../account/model/account.model';


/**
 *  @Author: xinsh
 * @Description: 与后台接口的基础类
 *  @Date: Created in  14:00 2018/4/13.
 */

export interface BylAccountAvailablePoolsInterface {

    /**
     * 按分页方式返回不同查询条件下的值
     * @returns {Observable<BylResultBody<LoginResultModel>>}
     */
    findAvailableAccountPoolsPage(query: any, page: BylPageReq): Observable<BylResultBody<BylPageResp<BylAccount>>>;

}
