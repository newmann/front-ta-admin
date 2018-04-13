/**
 * @Description: 分页查询提交内容的通用对象
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-04 14:40
 **/

export class BylPageReq{
    page: number;
    pageSize: number;
    sortField: string;
    sort: string;
    keyword: string;
}
