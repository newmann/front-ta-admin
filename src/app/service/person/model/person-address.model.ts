/**
 * @Description: 地址定义
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylBaseModel} from '../../model/base.model';
import {BylEmbeddableAddress} from '../../model/embeddable-address.model';
import {BylBaseItemModal} from "../../model/base-item.model";

export class BylPersonAddress extends BylBaseItemModal {
    // personId: string;
    type: string;

    addr: BylEmbeddableAddress;

}
