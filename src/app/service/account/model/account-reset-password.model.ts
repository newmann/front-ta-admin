/**
 *  @Author: xinsh
 * @Description: 登录成功后返回的信息
 *  @Date: Created in  10:19 2018/1/23.
 */
import {BylAccount} from "./account.model";

export class BylAccountResetPasswordModel {
  newPlainPassword: string;
  oldPlainPassword: string;
  account: BylAccount;

}
