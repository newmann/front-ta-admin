/**
 * @Description: 部门管理
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-03 14:20
 **/
import {BylBaseModel} from '../../model/base.model';
import {BylMasterDataStatusManager} from "../../model/master-data-status.enum";
import {BylMasterDataBaseService} from "../../service/master-data-base.service";
import {BylMasterDataBaseModel} from "../../model/master-data-base.model";

export class BylDepartment extends BylMasterDataBaseModel {
    code: string;
    name: string;
    // status: number;
    parentId: string;

    accountList: Set<Account>;

    // get statusDisplay(): string{
    //     return BylMasterDataStatusManager.getCaption(this.status);
    // }
    // set statusDisplay(value: string){
    //
    // }
}
//
// //角色的状态定义
// const enum BylDepartmentStatus {
//     NORMAL_DEPARTMENT = 1,
//     LOCKED_DEPARTMENT = 0,
//     DELETED_DEPARTMENT = -1
// }

// export {BylDepartment, BylDepartmentStatus};
