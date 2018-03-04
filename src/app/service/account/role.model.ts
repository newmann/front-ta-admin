/**
 * @Description: 角色定义
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-03 10:57
 **/
import {BaseModel} from "../model/base.model";
import {Permission} from "./permission.model";
import {StatusModel} from "../model/status.model";

class Role extends BaseModel{
    name: string;
    status: number;
    permissionList: Set<Permission>;
    accountList: Set<Account>;

}
//角色的状态定义
const RoleStatus : StatusModel[] = [
    {value:1,caption:"正常"},
    {value:0, caption: '锁定'},
    {value:-1, caption: '删除'}
    ];

export {Role, RoleStatus}
