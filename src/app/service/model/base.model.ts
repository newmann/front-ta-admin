/**
 * 与后台交互的业务bean的通用属性定义
 *
 * @export
 * @abstract
 * @class BylBaseModel
 */
import {BylEmbeddableCreateAction} from "./embeddable-create-action.model";
import {BylEmbeddableModifyAction} from "./embeddable-modify-action.model";


export abstract class BylBaseModel {
    id: string;
    createAction: BylEmbeddableCreateAction;
    modifyAction: BylEmbeddableModifyAction;
    remarks: string;
  }
