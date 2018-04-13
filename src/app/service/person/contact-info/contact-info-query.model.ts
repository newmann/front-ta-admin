/**
 * @Description: 个体list查询条件
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylEmbeddableContactMethod} from '../../model/embeddable-contact-method.model';
import {BylListQuery} from '../../model/list-query.model';

export class BylContactInfoQuery extends BylListQuery{
    personId: string;
    type: string;

    contactMethod: BylEmbeddableContactMethod;


}
