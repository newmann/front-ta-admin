
/**
 * 与后台交互的业务bean的通用属性定义
 * 
 * @export
 * @abstract
 * @class ModelBaseModel
 */

export abstract class ModelBaseModel {
    id: string;
    createDate: Date;
    createBy: string;
    updateDate: Date;
    updateBy: string;
    remarks: string;
  }
