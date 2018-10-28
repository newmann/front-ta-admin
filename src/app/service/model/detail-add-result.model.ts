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
import {BylDetailBaseModel} from "./detail-base.model";
import {BylTicketBaseModal} from "./ticket-base.model";


export class BylDetailAddResultModel<T extends BylDetailBaseModel,E extends BylTicketBaseModal> {
    detail: T;
    ticket: E;

  }
