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
import {BylMasterDataBaseModel} from "./master-data-base.model";


export class BylTreeBaseModel extends  BylMasterDataBaseModel {
    parentId: string;
    levelKey: string;
    levelNo: number;
    leftNodeId: string;
    rightNodeId: string;

  }
