import {Observable} from 'rxjs/Observable';
import {BylResultBody} from '../../model/result-body.model';
import {BylPageReq} from "../../model/page-req.model";
import {BylPageResp} from "../../model/page-resp.model";
import {BylPermission} from "../model/permission.model";




/**
 *  @Author: xinsh
 * @Description: 与后台接口的基础类
 *  @Date: Created in  14:00 2018/4/13.
 */

export interface BylPermissionAvailablePoolsInterface {

    /**
     * 按分页方式返回不同查询条件下的值
     * @returns {Observable<BylResultBody<LoginResultModel>>}
     */
    findAvailablePermissionPoolsPage(query: any, page: BylPageReq, masterId?: string): Observable<BylResultBody<BylPageResp<BylPermission>>>;

}


export interface BylSavePermissionRelationInterface{
    /**
     * 保存账户关系表，比如属于某个角色的权限、某个部门的权限等等。
     * @param {Array<string>} PermissionArray 权限Id
     * @param {string} masterId  对应实体的Id
     * @returns {Observable<BylResultBody<Boolean>>}
     */
    savePermissionRelation(PermissionArray: Array<string>, masterId: string): Observable<BylResultBody<Boolean>>;

}

export interface BylFindEntityPermissionInterface{
    /**
     * 根据entity的id，找到对应的账户，比如，根据角色id，找到该角色下所有的权限
     * @param {string} masterId
     * @returns {Observable<BylResultBody<Array<BylPermission>>>}
     */
    findEntityPermission(masterId: string): Observable<BylResultBody<Array<BylPermission>>>;
}

