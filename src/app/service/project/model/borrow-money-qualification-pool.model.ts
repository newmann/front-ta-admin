/**
 * @Description: 可借款资格范围
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import { BylBaseModel } from '../../model/base.model';
import {BylEmbeddableAddress} from "../../model/embeddable-address.model";
import {BylEmbeddableContactMethod} from "../../model/embeddable-contact-method.model";
import {BylBusinessEntityTypeManager} from "../../model/business-entity-type.enum";

export class BylBorrowMoneyQualificationPool extends BylBaseModel {
    type: number;
    poolId: string;
    poolCode: string;
    poolName: string;

    get typeDisplay(){
        return BylBusinessEntityTypeManager.getCaption(this.type);
    }

    set typeDisplay(value: string){

    }
}
