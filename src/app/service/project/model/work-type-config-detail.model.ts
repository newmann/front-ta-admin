/**
 * @Description:
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylItemBaseModal} from "../../model/item-base.model";

export class BylWorkTypeConfigDetail extends BylItemBaseModal {
    resourseId: string;

    resourseCode: string;
    resourseName: string;

    fromWorkTypeId: string;
    fromWorkTypeCode: string;
    fromWorkTypeName: string;

    get fromWorkTypeDisplay(){
        if(this.fromWorkTypeId){
            return this.fromWorkTypeName + '[' + this.fromWorkTypeCode +"]";
        }
    }
    set fromWorkTypeDisplay(value: string){

    }


    toWorkTypeId: string;
    toWorkTypeCode: string;
    toWorkTypeName: string;
    get toWorkTypeDisplay(){
        if(this.toWorkTypeId){
            return this.toWorkTypeName + '[' + this.toWorkTypeCode +"]";
        }
    }
    set toWorkTypeDisplay(value: string){

    }

}
