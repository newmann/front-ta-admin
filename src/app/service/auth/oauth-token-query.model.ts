import {BylAccount} from '../account/model/account.model';
/**
 *  @Author: xinsh
 * @Description:
 *  @Date: Created in  10:19 2018/8/19.
 */

export class BylOAuthTokenQueryModel {
  code: string;
  redirectUri: string;
  state: string;
}
