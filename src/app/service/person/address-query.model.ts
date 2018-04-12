/**
 * @Description: 个体list查询条件
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import { BaseModel } from '../model/base.model';
import {EmbeddableAddress} from "../model/embeddable-address.model";

export class AddressQuery {
    personId: string;
    type: string;

    addr:EmbeddableAddress;

    modifyDateBegin:number = 0;
    modifyDateEnd:number = 0;

}
