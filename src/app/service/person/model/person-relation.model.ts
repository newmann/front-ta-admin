/**
 * @Description: 绑定个体关系中用的过渡类
 * @Author: newmann
 * @Date: Created in 21:05 2018-10-05
 */

import {BylEmbeddablePerson} from "./embeddable-person.model";
import {BylBusinessEntityTypeManager} from "../../model/business-entity-type.enum";

export class BylPersonRelation {
    masterId: string;

    personWidget:any;
    person: BylEmbeddablePerson = new BylEmbeddablePerson();

    get personDisplay(){

        if(this.person){
            return this.person.personName +"[" + this.person.personIDCard + "]";
        }

    }
    set personDisplay(value: string){

    }

}
