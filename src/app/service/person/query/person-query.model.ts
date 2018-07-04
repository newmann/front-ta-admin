/**
 * @Description: 个体list查询条件
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylListQuery} from '../../model/list-query.model';

export class BylPersonQuery extends BylListQuery{
    idCard: string;
    name: string;

    modifyDateBegin: number;
    modifyDateEnd: number;
}
