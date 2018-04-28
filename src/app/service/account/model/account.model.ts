/**
 * @Description: 账户类
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import { BylBaseModel } from '../../model/base.model';
import { BylPermission } from 'app/service/account/model/permission.model';
import {BylRole} from "./role.model";

export class BylAccount extends BylBaseModel {
    username: string;
    fullName: string;
    email: string;
    password: string;
    phone: string;
    nickname: string;
    passwordResetDuration: number;
    passwordResetDate: Date;
    expiredDate: Date;
    status: number;

    permissionList: Set<BylPermission>;
    roleList: Set<BylRole>;

}
