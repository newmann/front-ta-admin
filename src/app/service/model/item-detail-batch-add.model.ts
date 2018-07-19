/**
 * 与后台交互的业务bean的通用属性定义
 *
 * @export
 * @abstract
 * @class BylBaseModel
 */
import {BylEmbeddableCreateAction} from "./embeddable-create-action.model";
import {BylEmbeddableModifyAction} from "./embeddable-modify-action.model";
import {BylDatetimeUtils} from "../utils/datetime.utils";
import {BylItemBaseModel} from "./item-base.model";
import {BylItemDetailBaseModal} from "./item-detail-base.model";


export class BylItemDetailBatchAddModel<T extends BylItemDetailBaseModal> {
    masterId: string;
    detailId: string;
    modifyDateTime: number;

    // lineNo: number;

    items: Array<T>;

    get modifyDateTimeDisplay() {
        return BylDatetimeUtils.formatDateTime(this.modifyDateTime);
    }

    set modifyDateTimeDisplay(value: string) {
        //应付对象复制
    }

  }
