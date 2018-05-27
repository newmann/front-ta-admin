/**
 * @Description: 组织类
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import { BylBaseModel } from '../../model/base.model';
import {BylEmbeddableLegalPerson} from "./embeddable-legal-person.model";
import {BylOrganizationTypeManager} from "./organization-type.enum";

export class BylOrganization extends BylBaseModel {
    code: string;
    name: string;
    simpleName: string;

    legalPersonWidget:any;

    legalPerson: BylEmbeddableLegalPerson = new BylEmbeddableLegalPerson();

    get legalPersonNameDisplay(): string{
        if (this.legalPerson){
            if (this.legalPerson.legalPersonId){
                return this.legalPerson.legalPersonName +"[" + this.legalPerson.legalPersonIdCode + "]";
            }
        }
        return null;
    }
    set legalPersonNameDisplay(value : string){

    }

    type: number;

    get typeDisplay(): string{
        return BylOrganizationTypeManager.getCaption(this.type);
    }
    set typeDisplay(value: string){

    }

}
