/**
 * @Description: 考情登记单
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import { BylBaseModel } from '../../model/base.model';
import {BylEmbeddableAddress} from "../../model/embeddable-address.model";
import {BylEmbeddableContactMethod} from "../../model/embeddable-contact-method.model";
import {BylEmbeddableProject} from "../../model/embeddable-project.model";
import {BylEmbeddableBorrowAction} from './embeddable-borrow-action.model';
import {BylEmbeddableCheckAction} from '../../model/embeddable-check-action.model';
import {BylEmbeddableReceiveAction} from './embeddable-receive-action.model';
import {BylEntityReference} from "../../model/entity-reference.model";
import {BylBorrowMoneyQualificationPool} from "./borrow-money-qualification-pool.model";
import {BylProjectStatusManager} from "./project-status.enum";
import {BylBorrowMoneyTicketStatusManager} from "./borrow-money-ticket-status.enum";
import {BylBusinessEntityTypeManager} from "../../model/business-entity-type.enum";
import {BylDatetimeUtils} from "../../utils/datetime.utils";
import {BylTicketBaseModal} from "../../model/ticket-base.model";
import {BylExpenseTicketStatusEnum, BylExpenseTicketStatusManager} from "./expense-ticket-status.enum";
import {BylEmbeddableOutsourcer} from "./embeddable-outsourcer.model";
import {BylWorkloadTicketStatusManager} from "./workload-ticket-status.enum";
import {BylEmbeddableOperationPeriod} from "./embeddable-operation-period.model";

export class BylWorkloadTicket extends BylTicketBaseModal {

    projectWidget:any;
    project: BylEmbeddableProject = new BylEmbeddableProject();

    insider: boolean;

    outsourcerWidget:any;
    oursourcer: BylEmbeddableOutsourcer = new BylEmbeddableOutsourcer();

    // checkAction: BylEmbeddableCheckAction = new BylEmbeddableCheckAction();

    operationPeriod: BylEmbeddableOperationPeriod = new BylEmbeddableOperationPeriod();

    // beginDateWidget:any;
    // endDateWidget:any;
    //
    // beginDate: number;
    // endDate: number;

    get insiderDisplay(){
        if(this.insider){
            return "是";
        }else{
            return "否";
        }
    }
    set insiderDisplay(value: string){

    }
   // status: number;
    get outsourcerDisplay(){
        if(this.oursourcer){
            if(this.oursourcer.outsourcerId){
                return this.oursourcer.outsourcerName + "[" + this.oursourcer.outsourcerCode +']';
            }

        }
    }
    set outsourcerDisplay(value: string){

    }

    get projectDisplay(){
        if(this.project){
            if(this.project.projectId){
                return this.project.projectName + "[" + this.project.projectCode +']';
            }

        }
    }
    set projectDisplay(value: string){

    }

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
        return BylWorkloadTicketStatusManager.getCaption(this.status);
    }
    set statusDisplay(value: string){

    }
}
