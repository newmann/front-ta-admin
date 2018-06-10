/**
 * @Description: 借款单
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
import {BylTicketBaseModal} from "../../model/base-ticket.model";

export class BylBorrowMoneyTicket extends BylTicketBaseModal {
    // billNo: string;
    name: string;
    projectWidget:any;
    project: BylEmbeddableProject = new BylEmbeddableProject();

    address: BylEmbeddableAddress = new BylEmbeddableAddress();

    reason: string;
    amount: number;


    borrowerWidget: BylBorrowMoneyQualificationPool = new BylBorrowMoneyQualificationPool(); //界面用
    borrowDateTimeWidget: Date;

    borrowAction: BylEmbeddableBorrowAction = new BylEmbeddableBorrowAction();
    checkAction: BylEmbeddableCheckAction = new BylEmbeddableCheckAction();
    receiveAction: BylEmbeddableReceiveAction =new BylEmbeddableReceiveAction();

    settlementDateTime: number;
    settlementTicketId: string;
    settlementTicketNo: string;

    // status: number;

    get projectDisplay(){
        if(this.project){
            return this.project.projectName + "[" + this.project.projectCode +']';
        }
    }
    set projectDisplay(value: string){

    }
    get borrowerDisplay(){
        if(this.borrowAction){
            if(this.borrowAction.borrowId){
                return BylBusinessEntityTypeManager.getCaption(this.borrowAction.borrowType) + "-"
                    + this.borrowAction.borrowName +"[" + this.borrowAction.borrowCode + "]";
            }

        }
    }

    set borrowerDisplay(value: string){

    }

    get borrowDateTimeDisplay(){
        return BylDatetimeUtils.formatDate(this.borrowAction.borrowDateTime);
    }
    set borrowDateTimeDisplay(value:string){

    }

    get statusDisplay(): string{
        return BylBorrowMoneyTicketStatusManager.getCaption(this.status);
    }
    set statusDisplay(value: string){

    }
}
