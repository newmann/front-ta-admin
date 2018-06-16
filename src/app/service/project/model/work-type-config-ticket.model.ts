/**
 * @Description: 工种配置单
 * @Author: newmann
 * @Date: Created in 21:05 2018-06-14
 */
import {BylEmbeddableCheckAction} from '../../model/embeddable-check-action.model';
import {BylTicketBaseModal} from "../../model/ticket-base.model";
import {BylEmbeddableOutsourcer} from "./embeddable-outsourcer.model";
import {BylWorkTypeConfigTicketStatusManager} from "./work-type-config-ticket-status.enum";
import {BylEmbeddableWorkType} from "./embeddable-work-type.model";

export class BylWorkTypeConfigTicket extends BylTicketBaseModal {

    insider: boolean;
    get insiderDisplay(){
        if(this.insider){
            return "是";
        }else{
            return "否";
        }
    }
    set insiderDisplay(value: string){

    }

    outsourcerWidget:any;
    outsourcer: BylEmbeddableOutsourcer = new BylEmbeddableOutsourcer();

    checkAction: BylEmbeddableCheckAction = new BylEmbeddableCheckAction();

    workTypeWidget: any;
    workType: BylEmbeddableWorkType = new BylEmbeddableWorkType();

    // beginDateWidget:any;
    // endDateWidget:any;
    //
    // beginDate: number;
    // endDate: number;

   // status: number;
    get outsourcerDisplay(){
        if(this.outsourcer){
            if (this.outsourcer.outsourcerId){
                return this.outsourcer.outsourcerName + "[" + this.outsourcer.outsourcerCode +']';
            }

        }
    }
    set outsourcerDisplay(value: string){

    }

    get workTypeDisplay(){
        if(this.workType){
            if (this.workType.workTypeId){
                return this.workType.workTypeName + "[" + this.workType.workTypeCode +']';
            }

        }
    }
    set workTypeDisplay(value: string){

    }
    // get projectDisplay(){
    //     if(this.project){
    //         return this.project.projectName + "[" + this.project.projectCode +']';
    //     }
    // }
    // set projectDisplay(value: string){
    //
    // }
    //
    // get beginDateDisplay(){
    //     return BylDatetimeUtils.formatDate(this.beginDate);
    // }
    // set beginDateDisplay(value:string){
    //
    // }
    //
    // get endDateDisplay(){
    //     return BylDatetimeUtils.formatDate(this.endDate);
    // }
    // set endDateDisplay(value:string){
    //
    // }
    get statusDisplay(): string{
        return BylWorkTypeConfigTicketStatusManager.getCaption(this.status);
    }
    set statusDisplay(value: string){

    }
}
