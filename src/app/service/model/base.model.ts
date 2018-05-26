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


export class BylBaseModel {
    id: string;
    createAction: BylEmbeddableCreateAction = new BylEmbeddableCreateAction();
    modifyAction: BylEmbeddableModifyAction = new BylEmbeddableModifyAction();
    remarks: string;

    get modifyDateTimeDisplay() {
        return BylDatetimeUtils.formatDateTime(this.modifyAction.modifyDateTime);
    }

    set modifyDateTimeDisplay(value: string) {
        //应付对象复制
    }

  }
