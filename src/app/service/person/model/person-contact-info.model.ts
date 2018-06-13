/**
 * @Description: 联系方式定义
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import { BylBaseModel } from '../../model/base.model';
import {BylEmbeddableAddress} from "../../model/embeddable-address.model";
import {BylEmbeddableContactMethod} from "../../model/embeddable-contact-method.model";
import {BylItemBaseModal} from "../../model/item-base.model";

export class BylPersonContactInfo extends BylItemBaseModal {
    // personId: string;
    type: string;

    contactMethod: BylEmbeddableContactMethod = new BylEmbeddableContactMethod();

}
