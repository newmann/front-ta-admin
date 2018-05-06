import {BylPageReq} from "../../model/page-req.model";

/**
 * @Description: 可以添加到实体关系表中的可用范围查询
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-03 10:57
 **/

export class BylEntityRelationAvailablePoolsQueryReqBody<T>{
    masterId: string;
    queryReq: T;
    pageReq: BylPageReq;
}

