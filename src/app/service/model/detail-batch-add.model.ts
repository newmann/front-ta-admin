/**
 * 与后台交互的业务bean的通用属性定义
 *
 * @export
 * @abstract
 * @class BylBaseModel
 */
import {BylDatetimeUtils} from "../utils/datetime.utils";
import {BylDetailBaseModel} from "./detail-base.model";


export class BylDetailBatchAddModel<T extends BylDetailBaseModel> {
    masterId: string;
    modifyDateTime: number;


    items: Array<T>;

    get modifyDateTimeDisplay() {
        return BylDatetimeUtils.formatDateTime(this.modifyDateTime);
    }

    set modifyDateTimeDisplay(value: string) {
        //应付对象复制
    }

  }
