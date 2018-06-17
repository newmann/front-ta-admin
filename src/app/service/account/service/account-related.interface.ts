import {Observable} from 'rxjs';
import {BylResultBody} from '../../model/result-body.model';
import {BylPageReq} from "../../model/page-req.model";
import {BylPageResp} from "../../model/page-resp.model";
import {BylAccount} from "../model/account.model";


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
    findAvailableAccountPoolsPage(query: any, page: BylPageReq, masterId?: string): Observable<BylResultBody<BylPageResp<BylAccount>>>;

}


export interface BylSaveAccountRelationInterface{
    /**
     * 保存账户关系表，比如属于某个角色的账户、某个部门的账户等等。
     * @param {Array<string>} accountArray 账户Id
     * @param {string} masterId  对应实体的Id
     * @returns {Observable<BylResultBody<Boolean>>}
     */
    saveAccountRelation(accountArray: Array<string>, masterId: string): Observable<BylResultBody<Boolean>>;

}

export interface BylFindEntityAccountInterface{
    /**
     * 根据entity的id，找到对应的账户，比如，根据角色id，找到该角色下所有的账户
     * @param {string} masterId
     * @returns {Observable<BylResultBody<Array<BylAccount>>>}
     */
    findEntityAccount(masterId: string): Observable<BylResultBody<Array<BylAccount>>>;
}

