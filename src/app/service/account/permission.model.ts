/**
 * @Description:
 * @Author: newmann
 * @Date: Created in 21:04 2018-01-22
 */
import { BaseModel } from '../model/base.model';

export class Permission extends BaseModel {

    packageName: string;
    moduleName: string;
    action: string;
}
