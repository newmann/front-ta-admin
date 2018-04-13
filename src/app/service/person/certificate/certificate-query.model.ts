/**
 * @Description: 个体list查询条件
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylBaseModel} from '../../model/base.model';
import {BylEmbeddableAddress} from '../../model/embeddable-address.model';
import {BylListQuery} from '../../model/list-query.model';

export class BylCertificateQuery extends BylListQuery {
    personId: string;
    type: string;
    code: string;

    addr: BylEmbeddableAddress;
    issueDateBegin= 0;
    issueDateEnd= 0;

    effectiveDateBegin = 0;
    effectiveDateEnd = 0;


}
