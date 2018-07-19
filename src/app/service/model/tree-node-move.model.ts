/**
 * 与后台交互的业务bean的通用属性定义
 *
 * @export
 * @abstract
 * @class BylBaseModel
 */
import {BylTreeBaseModel} from "./tree-base.model";


export class BylTreeNodeMoveModel<T extends BylTreeBaseModel> {
    targetNode: T;
    node: T;
    pos: number;//采用nz-zorro的定义，放置位置(-1:目标节点前面, 0: 目标节点内部, 1: 目标节点后面)
  }
