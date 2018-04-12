/**
 * @Description: 个体list查询条件
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import { BaseModel } from '../model/base.model';
import {EmbeddableAddress} from "../model/embeddable-address.model";
import {EmbeddableContactMethod} from "../model/embeddable-contact-method.model";

export class ContactInfoQuery {
    personId: string;
    type: string;

    contactMethod:EmbeddableContactMethod;

    modifyDateBegin:number = 0;
    modifyDateEnd:number = 0;

}
