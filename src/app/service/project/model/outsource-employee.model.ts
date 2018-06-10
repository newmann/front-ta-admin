/**
 * @Description: 外包工组的员工
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylBaseModel} from '../../model/base.model';
import {BylEmbeddableOrganization} from "../../organization/model/embeddable-organization.model";
import {BylEmbeddableOutsourcer} from "./embeddable-outsourcer.model";
import {BylEmbeddablePerson} from "../../person/model/embeddable-person.model";
import {BylEmployeeStatusManager} from "./employee-status.enum";
import {BylMasterDataBaseModel} from "../../model/master-data-base.model";


export class BylOutsourceEmployee extends BylMasterDataBaseModel {
    code: string; //员工编号
    name: string;

    outsourcerWidget: any;
    outsourcer: BylEmbeddableOutsourcer = new BylEmbeddableOutsourcer();

    personWidget: any;
    person: BylEmbeddablePerson = new BylEmbeddablePerson();

    // status: number;

    get statusDisplay(): string{
        return BylEmployeeStatusManager.getCaption(this.status);
    }
    set statusDisplay(value: string){  }

    get outsourcerDisplay(){
        if (this.outsourcer){
            if (this.outsourcer.outsourcerId){
                return this.outsourcer.outsourcerName + "[" + this.outsourcer.outsourcerCode + "]";
            }
        }
        return null;
    }
    set outsourcerDisplay(value: string){}

    get personDisplay(){
        if (this.person){
            if (this.person.personId) {
                return this.person.personName + "[" + this.person.personIDCard +"]";
            }
        }
        return null;
    }
    set personDisplay(value: string){

    }
}
