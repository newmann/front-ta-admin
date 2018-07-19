/**
 * @Description: 菜单定义类
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import { BylBaseModel } from '../../model/base.model';
import { BylPermission } from 'app/service/account/model/permission.model';
import {BylRole} from "./role.model";
import {BylMasterDataStatusManager} from "../../model/master-data-status.enum";
import {BylDatetimeUtils} from "../../utils/datetime.utils";
import {BylMasterDataBaseModel} from "../../model/master-data-base.model";

export class BylMenuLink extends BylBaseModel {
    defaultCaption: string;
    targetLink: string;
}
