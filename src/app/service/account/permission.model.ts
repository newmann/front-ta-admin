/**
 * @Description:
 * @Author: newmann
 * @Date: Created in 21:04 2018-01-22
 */
import { ModelBaseModel } from '../common/model.base.model';

export class Permission extends ModelBaseModel {

    packageName: string;
    moduleName: string;
    action: string;
}
