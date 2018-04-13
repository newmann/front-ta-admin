import {Account} from '../account/account/account.model';
/**
 *  @Author: xinsh
 * @Description: 登录成功后返回的信息
 *  @Date: Created in  10:19 2018/1/23.
 */

export class LoginResultModel {
  token: string;
  account: Account;
}
