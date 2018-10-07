import {BylResultBody} from "../../model/result-body.model";
import {Observable} from "rxjs/index";
import {BylEmbeddablePerson} from "../model/embeddable-person.model";
import {BylPersonRelation} from "../model/person-relation.model";

/**
 *  @Author: xinsh
 * @Description: 与后台接口的基础类
 *  @Date: Created in  14:00 2018/10/05.
 */

export interface BylPersonRelationInterface {
    /**
     * 保存关系
     * @param {BylEmbeddablePerson} person
     * @param {string} masterId
     * @returns {Observable<BylResultBody<Boolean>>}
     */
    savePersonRelation(personRelation: BylPersonRelation): Observable<BylResultBody<Boolean>>;

    /**
     * 删除关系
     * @param {BylEmbeddablePerson} person
     * @param {string} masterId
     * @returns {Observable<BylResultBody<Boolean>>}
     */
    deletePersonRelation(personRelation: BylPersonRelation): Observable<BylResultBody<Boolean>>;
}
