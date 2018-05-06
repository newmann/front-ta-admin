/**
 * @Description: 账户的权限
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-03 10:57
 **/
import {BylBaseModel} from "../../model/base.model";

export class BylAccountPermission extends BylBaseModel{
    accountId: string;
    permissionId: string;

}

