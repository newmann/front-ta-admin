/**
 * 与后台交互的业务bean的通用属性定义
 *
 * @export
 * @abstract
 * @class BaseModel
 */
import {EmbeddableCreateAction} from "./embeddable-create-action.model";
import {EmbeddableModifyAction} from "./embeddable-modify-action.model";


export abstract class BaseModel {
    id: string;
    createAction: EmbeddableCreateAction;
    modifyAction: EmbeddableModifyAction;
    remarks: string;
  }
