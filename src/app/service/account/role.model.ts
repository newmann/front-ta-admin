/**
 * @Description: 角色定义
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-03 10:57
 **/
import {BaseModel} from "../model/base.model";
import {Permission} from "./permission.model";
import {DefineStatus, IStatusItem} from "../model/status.model";
import {Injectable} from "@angular/core";

class Role extends BaseModel{
    name: string;
    status: number;
    permissionList: Set<Permission>;
    accountList: Set<Account>;

}


//角色的状态定义
const enum RoleStatus{
    NORMAL_ROLE = 1 ,
    LOCKED_ROLE = 0,
    DELETED_ROLE = -1
}


export {Role,RoleStatus}
