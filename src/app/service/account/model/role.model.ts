/**
 * @Description: 角色定义
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-03 10:57
 **/
import {BylBaseModel} from "../../model/base.model";
import {BylPermission} from "./permission.model";
import {BylDefineStatus, BylIStatusItem} from "../../model/status.model";
import {Injectable} from "@angular/core";

export class BylRole extends BylBaseModel{
    name: string;
    status: number;
    permissionList: Set<BylPermission>;
    accountList: Set<Account>;

}


// //角色的状态定义
// const enum BylRoleStatus {
//     NORMAL_ROLE = 1,
//     LOCKED_ROLE = 0,
//     DELETED_ROLE = -1
// }


// export {BylRole, BylRoleStatus};
