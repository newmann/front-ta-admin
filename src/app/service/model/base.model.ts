/**
 * 与后台交互的业务bean的通用属性定义
 *
 * @export
 * @abstract
 * @class BaseModel
 */
import {EmbeddableCreateActionModel} from "./embeddable-create-action.model";
import {EmbeddableModifyActionModel} from "./embeddable-modify-action.model";


export abstract class BaseModel {
    id: string;
    createAction: EmbeddableCreateActionModel;
    modifyAction: EmbeddableModifyActionModel;
    remarks: string;
  }
