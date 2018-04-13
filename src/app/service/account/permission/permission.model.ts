/**
 * @Description:
 * @Author: newmann
 * @Date: Created in 21:04 2018-01-22
 */
import { BylBaseModel } from '../../model/base.model';

export class Permission extends BylBaseModel {

    packageName: string;
    moduleName: string;
    action: string;
}
