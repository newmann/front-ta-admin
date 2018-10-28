/**
 * @Description: 借款单
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylEmbeddableAddress} from "../../model/embeddable-address.model";
import {BylEmbeddableProject} from "../../model/embeddable-project.model";
import {BylEmbeddableBorrowAction} from './embeddable-borrow-action.model';
import {BylEmbeddableCheckAction} from '../../model/embeddable-check-action.model';
import {BylEmbeddableReceiveAction} from './embeddable-receive-action.model';
import {BylBorrowMoneyQualificationPool} from "./borrow-money-qualification-pool.model";
import {BylBorrowMoneyTicketStatusManager} from "./borrow-money-ticket-status.enum";
import {BylBusinessEntityTypeManager} from "../../model/business-entity-type.enum";
import {BylDatetimeUtils} from "../../utils/datetime.utils";
import {BylTicketBaseModal} from "../../model/ticket-base.model";
import {BylEmbeddableOperationPeriod} from "./embeddable-operation-period.model";
import {BylStringUtils} from "../../utils/string.utils";
import {
    BylBorrowMoneyQualificationTypeEnum,
    BylBorrowMoneyQualificationTypeManager
} from "./borrow-money-qualification-type.enum";

export class BylBorrowMoneyTicket extends BylTicketBaseModal {
    // billNo: string;
    name: string;
    projectWidget:any;
    project: BylEmbeddableProject = new BylEmbeddableProject();
    operationPeriod: BylEmbeddableOperationPeriod = new BylEmbeddableOperationPeriod();

    address: BylEmbeddableAddress = new BylEmbeddableAddress();

    reason: string;
    amount: number;

    borrowerWidget: BylBorrowMoneyQualificationPool = new BylBorrowMoneyQualificationPool(); //界面用
    borrowDateTimeWidget: Date;

    borrowAction: BylEmbeddableBorrowAction = new BylEmbeddableBorrowAction();

    receiveAction: BylEmbeddableReceiveAction =new BylEmbeddableReceiveAction();

    settlementDateTime: number;
    settlementTicketId: string;
    settlementTicketNo: string;

    // status: number;

    get projectDisplay(){
        if(this.project){
            return BylStringUtils.mixCodeName(this.project.projectCode, this.project.projectName);
        }
    }
    set projectDisplay(value: string){

    }


    get receiveActionDisplay(){
        if(this.receiveAction){
            return BylStringUtils.mixCodeName(this.receiveAction.receiveCode,this.receiveAction.receiveName)
                .concat('-')
                .concat(BylDatetimeUtils.formatDateTime(this.receiveAction.receiveDateTime || null))
        }
    }
    set receiveActionDisplay(value: string){

    }

    get settlementDisplay(){
        if (this.settlementTicketNo) {
            if ( this.settlementDateTime){
                return this.settlementTicketNo.concat("-")
                    .concat(BylDatetimeUtils.formatDateTime(this.settlementDateTime || null));
            }
        }else{
            return this.settlementTicketNo;
        }

    }
    set settlementDisplay(value: string){

    }

    get borrowerDisplay(){
        if(this.borrowAction){
            if(this.borrowAction.borrowId){
                return BylBorrowMoneyQualificationTypeManager.getCaption(this.borrowAction.borrowType)
                        .concat("-")
                        .concat(BylStringUtils.mixCodeName(this.borrowAction.borrowCode,this.borrowAction.borrowName ));
            }

        }
    }

    set borrowerDisplay(value: string){

    }

    get borrowDateTimeDisplay(){
        if ( this.borrowAction){
            return BylDatetimeUtils.formatDate(this.borrowAction.borrowDateTime || null);
        } else{
            return null;
        }


    }
    set borrowDateTimeDisplay(value:string){

    }

    get statusDisplay(): string{
        return BylBorrowMoneyTicketStatusManager.getCaption(this.status);
    }
    set statusDisplay(value: string){

    }
}
