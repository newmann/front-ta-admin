/**
 * @Description: 联系方式定义
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import { BaseModel } from '../model/base.model';
import {EmbeddableAddress} from "../model/embeddable-address.model";
import {EmbeddableContactMethod} from "../model/embeddable-contact-method.model";

export class ContactInfo extends BaseModel {
    personId: string;
    type: string;

    contactMethod: EmbeddableContactMethod;

}
