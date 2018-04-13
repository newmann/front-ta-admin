/**
 * @Description: 账户类
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import { BylBaseModel } from '../../model/base.model';
import { Permission } from 'app/service/account/permission/permission.model';
import {Role} from "../role/role.model";

export class Account extends BylBaseModel {
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

    permissionList: Set<Permission>;
    roleList: Set<Role>;

}
