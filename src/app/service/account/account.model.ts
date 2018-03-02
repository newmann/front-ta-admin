/**
 * @Description: 账户类
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import { ModelBaseModel } from '../model/model.base.model';
import { Permission } from 'app/service/account/permission.model';

export class Account extends ModelBaseModel {
    username: string;
    fullName: string;
    email: string;
    password: string;
    phone: string;
    nickname: string;
    passwordResetDuration: number;
    permissions: Set<Permission>;
}
