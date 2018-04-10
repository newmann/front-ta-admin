/**
 * @Description: 分页查询返回的内容
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-04 14:44
 **/

export class PageRespModel<T>{
    rows: Set<T>;

    page: number;
    pageSize: number;
    total: number;
}