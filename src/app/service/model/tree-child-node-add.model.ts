/**
 * 与后台交互的业务bean的通用属性定义
 *
 * @export
 * @abstract
 * @class BylBaseModel
 */
import {BylTreeBaseModel} from "./tree-base.model";


export class BylTreeChildNodeAddModel<T extends BylTreeBaseModel> {
    parentNode: T;
    node: T;

  }
