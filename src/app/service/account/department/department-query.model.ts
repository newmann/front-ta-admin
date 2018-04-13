/**
 * @Description: 部门的list界面查询条件
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-25 9:03
 **/

export class DepartmentQueryModel{
    code:string
    name:string;
    status: Array<number>;
    modifyDateBegin: number;
    modifyDateEnd: number;
}
