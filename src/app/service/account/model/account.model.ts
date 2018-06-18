/**
 * @Description: 账户类
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import { BylBaseModel } from '../../model/base.model';
import { BylPermission } from 'app/service/account/model/permission.model';
import {BylRole} from "./role.model";
import {BylMasterDataStatusManager} from "../../model/master-data-status.enum";
import {BylDatetimeUtils} from "../../utils/datetime.utils";
import {BylMasterDataBaseModel} from "../../model/master-data-base.model";

export class BylAccount extends BylMasterDataBaseModel {
    username: string;
    fullName: string;
    email: string;
    password: string;
    phone: string;
    nickname: string;
    passwordResetDuration: number;
    passwordResetDate: number;
    expiredDate: number;

    firstSetPassword: string;

    permissionList: Set<BylPermission>;
    roleList: Set<BylRole>;


}
