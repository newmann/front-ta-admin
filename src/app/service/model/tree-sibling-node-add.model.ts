/**
 * 与后台交互的业务bean的通用属性定义
 *
 * @export
 * @abstract
 * @class BylBaseModel
 */
import {BylTreeBaseModel} from "./tree-base.model";


export class BylTreeSiblingNodeAddModel<T extends BylTreeBaseModel> {
    siblingNode: T; //如果为空，则添加的是第一个节点
    node: T;
    pos: number;
  }
