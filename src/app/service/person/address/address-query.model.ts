/**
 * @Description: 个体list查询条件
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylEmbeddableAddress} from '../../model/embeddable-address.model';
import {BylListQuery} from '../../model/list-query.model';

export class BylAddressQuery extends BylListQuery {
    personId: string;
    type: string;

    addr: BylEmbeddableAddress;


}
