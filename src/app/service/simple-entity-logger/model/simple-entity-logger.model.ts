/**
 * @Description: 实体操作日志定义
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylBaseModel} from '../../model/base.model';
import {BylEmbeddableAddress} from '../../model/embeddable-address.model';


export class BylSimpleEntityLogger extends BylBaseModel {
    targetId: string;

    entityName: string;
    action: string;

    data: string;


}
