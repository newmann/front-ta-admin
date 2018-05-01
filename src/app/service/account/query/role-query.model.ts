/**
 * @Description: 角色的list界面查询条件
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-25 9:03
 **/
import {BylMasterDataStatusEnum} from "../../model/master-data-status.enum";

export class BylRoleQuery{
    name:string;
    status: Array<number> = [BylMasterDataStatusEnum.NORMAL];
    modifyDateBegin: number;
    modifyDateEnd: number;
}
