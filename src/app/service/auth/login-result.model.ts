import {BylAccount} from '../account/model/account.model';
import {BylAccountOauth} from "../account/model/account-oauth.model";
/**
 *  @Author: xinsh
 * @Description: 登录成功后返回的信息
 *  @Date: Created in  10:19 2018/1/23.
 */

export class BylLoginResultModel {
  token: string;
  account: BylAccount;
  abilities: Array<string>;
  oauth: BylAccountOauth
}
