/**
 * 主数据bean的通用属性定义
 *
 * @export
 * @abstract
 * @class BylBaseModel
 */

import {BylBaseModel} from "./base.model";
import {BylMasterDataStatusManager} from "./master-data-status.enum";


export class BylMasterDataBaseModel extends BylBaseModel {
    status: number = 1;

    get statusDisplay(): string{
        return BylMasterDataStatusManager.getCaption(this.status);
    }

    set statusDisplay(value: string){
        //应付对象复制
    }
}
