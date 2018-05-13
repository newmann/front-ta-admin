/**
 * @Description: 费用类型定义
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylBaseModel} from '../../model/base.model';


export class BylExpenseType extends BylBaseModel {
    code: string;
    name: string;
    status: number;
}
