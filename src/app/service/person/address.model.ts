/**
 * @Description: 地址定义
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import { BaseModel } from '../model/base.model';
import {EmbeddableAddress} from "../model/embeddable-address.model";

export class Address extends BaseModel {
    personId: string;
    type: string;

    addr: EmbeddableAddress;

}
