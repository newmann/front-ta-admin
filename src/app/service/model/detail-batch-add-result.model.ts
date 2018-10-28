/**
 * 与后台交互的业务bean的通用属性定义
 *
 * @export
 * @abstract
 * @class BylBaseModel
 */
import {BylDatetimeUtils} from "../utils/datetime.utils";
import {BylDetailBaseModel} from "./detail-base.model";
import {BylTicketBaseModal} from "./ticket-base.model";


export class BylDetailBatchAddResultModel<T extends BylDetailBaseModel,E extends BylTicketBaseModal> {
    details: Array<T>;
    ticket: E;
  }
