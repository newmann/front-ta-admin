import {Observable} from 'rxjs';
import {BylResultBody} from '../../model/result-body.model';
import {BylPageReq} from "../../model/page-req.model";
import {BylPageResp} from "../../model/page-resp.model";
import {BylPermission} from "../model/permission.model";
import {BylMenuLink} from "../model/menu-link.model";




/**
 *  @Author: xinsh
 * @Description: 与后台接口的基础类
 *  @Date: Created in  14:00 2018/4/13.
 */

export interface BylMenuLinkRelationInterface {

    /**
     * 按分页方式返回不同查询条件下的值
     * @returns {Observable<BylResultBody<BylLoginResultModel>>}
     */
    findAvailableMenuLinkPoolsPage(query: any, page: BylPageReq, masterId?: string): Observable<BylResultBody<BylPageResp<BylMenuLink>>>;
    /**
     * 保存菜单定义关系表，比如属于某个角色的菜单定义、某个账户的菜单等等。
     * @param {Array<string>} TargetLinkArray 菜单Link
     * @param {string} masterId  对应实体的Id
     * @returns {Observable<BylResultBody<Boolean>>}
     */
    saveMenuLinkRelation(MenuLinkArray: Array<string>, masterId: string): Observable<BylResultBody<Boolean>>;

    /**
     * 根据entity的id，找到对应的菜单，比如，根据角色id，找到该角色下所有的菜单
     * @param {string} masterId
     * @returns {Observable<BylResultBody<Array<BylMenuLink>>>}
     */
    findEntityMenuLink(masterId: string): Observable<BylResultBody<Array<BylMenuLink>>>;
    /**
     * 删除对应的关联关系
     * @param {string} masterId
     * @returns {Observable<BylResultBody<Array<BylMenuLink>>>}
     */
    deleteMenuLinkRelation(MenuLinkArray: Array<string>,masterId: string):Observable<BylResultBody<Boolean>>;

}


export interface BylMenuLinkAvailablePoolsInterface {

    /**
     * 按分页方式返回不同查询条件下的值
     * @returns {Observable<BylResultBody<BylLoginResultModel>>}
     */
    findAvailableMenuLinkPoolsPage(query: any, page: BylPageReq, masterId?: string): Observable<BylResultBody<BylPageResp<BylMenuLink>>>;

}


export interface BylSaveMenuLinkRelationInterface{
    /**
     * 保存菜单定义关系表，比如属于某个角色的菜单定义、某个账户的菜单等等。
     * @param {Array<string>} TargetLinkArray 菜单Link
     * @param {string} masterId  对应实体的Id
     * @returns {Observable<BylResultBody<Boolean>>}
     */
    saveMenuLinkRelation(MenuLinkArray: Array<string>, masterId: string): Observable<BylResultBody<Boolean>>;

}

export interface BylFindEntityMenuLinkInterface{
    /**
     * 根据entity的id，找到对应的菜单，比如，根据角色id，找到该角色下所有的菜单
     * @param {string} masterId
     * @returns {Observable<BylResultBody<Array<BylMenuLink>>>}
     */
    findEntityMenuLink(masterId: string): Observable<BylResultBody<Array<BylMenuLink>>>;
}

export interface BylDeleteMenuLinkRelationInterface{
    /**
     * 删除对应的关联关系
     * @param {string} masterId
     * @returns {Observable<BylResultBody<Array<BylMenuLink>>>}
     */
    deleteMenuLinkRelation(MenuLinkArray: Array<string>,masterId: string): Observable<BylResultBody<Boolean>>;
}
