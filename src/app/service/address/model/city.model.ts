/**
 * @Description: 城市定义
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylBaseModel} from '../../model/base.model';
import {BylEmbeddableAddress} from '../../model/embeddable-address.model';

export class BylCity extends BylBaseModel {
    provinceId: string;
    code: string;
    name: string;


}
