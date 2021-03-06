/**
 * @Description: 项目定义
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylBaseModel} from '../../model/base.model';
import {BylEmbeddableAddress} from '../../model/embeddable-address.model';
import {BylEmbeddableContactMethod} from '../../model/embeddable-contact-method.model';
import {BylEmbeddablePerson} from "../../person/model/embeddable-person.model";
import {BylMasterDataStatusManager} from "../../model/master-data-status.enum";
import {BylEmployeeStatusManager} from "./employee-status.enum";
import {BylDatetimeUtils} from "../../utils/datetime.utils";
import {BylMasterDataBaseModel} from "../../model/master-data-base.model";
import {BylEmbeddableWorkType} from "./embeddable-work-type.model";

export class BylEmployee extends BylMasterDataBaseModel {
    code: string;
    name: string;

    personWidget: any;
    person: BylEmbeddablePerson = new BylEmbeddablePerson();

    get personDisplay(){

        if(this.person){
            return this.person.personName +"[" + this.person.personIDCard + "]";
        }

    }
    set personDisplay(value: string){

    }
    enterDate: number;
    enterDateDF: Date;
    leaveDate: number;
    leaveDateDF: Date;

    workType: BylEmbeddableWorkType = new BylEmbeddableWorkType();

    get workTypeDisplay(): string{
        if( this.workType){
            if ( this.workType.workTypeId){
                return this.workType.workTypeName + "[" + this.workType.workTypeCode + "]";
            }
        }

    }

    set workTypeDisplay(value: string){  }

    // status: number;

    get statusDisplay(): string{
        return BylEmployeeStatusManager.getCaption(this.status);
    }
    set statusDisplay(value: string){  }

    // get enterDateDF(): Date{
    //     return BylDatetimeUtils.convertMillsToDateTime(this.enterDate);
    // };
    // set enterDateDF(value: Date){ }
    //
    // get leaveDateDF(): Date{
    //     return BylDatetimeUtils.convertMillsToDateTime(this.leaveDate);
    // };
    // set leaveDateDF(value: Date){}

    get enterDateDisplay() {
        return BylDatetimeUtils.formatDate(this.enterDate);
    }

    set enterDateDisplay(value: string) {
        //应付对象复制
    }

    get leaveDateDisplay() {
        return BylDatetimeUtils.formatDate(this.leaveDate);
    }

    set leaveDateDisplay(value: string) {
    //应付对象复制
    }

}
