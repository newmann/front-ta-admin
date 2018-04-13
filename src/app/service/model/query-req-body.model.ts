/**
 * @Description: 查询条件对象，含分页的要求，相当于查询界面提交查询的所有内容
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-25 8:57
 **/
import {BylPageReq} from "./page-req.model";

export class BylQueryReqBody<T>{
    queryReq: T;
    pageReq: BylPageReq;
}
