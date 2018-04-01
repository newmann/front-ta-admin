/**
 * @Description: 部门管理
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-03 14:20
 **/
import {BaseModel} from "../model/base.model";

class Department extends  BaseModel{
    code: string;
    name: string;
    status: number;
    parentId: string;

    accountList: Set<Account>;
}

//角色的状态定义
const enum DepartmentStatus{
    NORMAL_DEPARTMENT = 1 ,
    LOCKED_DEPARTMENT = 0,
    DELETED_DEPARTMENT = -1
}

export {Department,DepartmentStatus}
