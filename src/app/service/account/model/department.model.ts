/**
 * @Description: 部门管理
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-03 14:20
 **/
import {BylBaseModel} from '../../model/base.model';

export class BylDepartment extends BylBaseModel {
    code: string;
    name: string;
    status: number;
    parentId: string;

    accountList: Set<Account>;
}
//
// //角色的状态定义
// const enum BylDepartmentStatus {
//     NORMAL_DEPARTMENT = 1,
//     LOCKED_DEPARTMENT = 0,
//     DELETED_DEPARTMENT = -1
// }

// export {BylDepartment, BylDepartmentStatus};
