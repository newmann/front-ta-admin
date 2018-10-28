import {Observable} from 'rxjs';
import {BylResultBody} from '../../model/result-body.model';
import {BylPageReq} from "../../model/page-req.model";
import {BylPageResp} from "../../model/page-resp.model";
import {BylWorkloadDetail} from "../model/workload-detail.model";
import {BylPermission} from "../../account/model/permission.model";




/**
 *  @Author: xinsh
 * @Description: workload Detail相关的接口，主要包括：单据明细中包括worlload detail的列表（比如结算单的明细）
 *  @Date: Created in  14:00 2018/10/14.
 */
export interface BylWorkloadDetailRelationInterface {
    /**
     * 按分页方式返回不同查询条件下的值
     * @returns {Observable<BylResultBody<BylLoginResultModel>>}
     */
    findAvailableWorkloadDetailPoolsPage(query: any, page: BylPageReq, masterId?: string): Observable<BylResultBody<BylPageResp<BylWorkloadDetail>>>;
    /**
     * 保存账户关系表，比如属于某个角色的权限、某个部门的权限等等。
     * @param {Array<string>} PermissionArray 权限Id
     * @param {string} masterId  对应实体的Id
     * @returns {Observable<BylResultBody<Boolean>>}
     */
    saveWorkloadDetailRelation(workloadDetailArray: Array<BylWorkloadDetail>, masterId: string): Observable<BylResultBody<Boolean>>;
    /**
     * 根据entity的id，找到对应的账户，比如，根据角色id，找到该角色下所有的权限
     * @param {string} masterId
     * @returns {Observable<BylResultBody<Array<BylPermission>>>}
     */
    findEntityWorkloadDetail(masterId: string): Observable<BylResultBody<Array<BylWorkloadDetail>>>;
    /**
     * 删除关联表等等。
     * @param {Array<string>} PermissionArray 权限Id
     * @param {string} masterId  对应实体的Id
     * @returns {Observable<BylResultBody<Boolean>>}
     */
    deleteWorkLoadDetailRelation(workloadDetialArray: Array<BylWorkloadDetail>, masterId: string): Observable<BylResultBody<Boolean>>;

}

export interface BylWorkloadDetailAvailablePoolsInterface {

    /**
     * 按分页方式返回不同查询条件下的值
     * @returns {Observable<BylResultBody<BylLoginResultModel>>}
     */
    findAvailableWorkloadDetailPoolsPage(query: any, page: BylPageReq, masterId?: string): Observable<BylResultBody<BylPageResp<BylWorkloadDetail>>>;

}
