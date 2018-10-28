/**
 * @Description: 结算单
 * @Author: newmann
 * @Date: Created in 21:05 2018-10-06
 */
import {BylEmbeddableCheckAction} from '../../model/embeddable-check-action.model';
import {BylTicketBaseModal} from "../../model/ticket-base.model";
import {BylEmbeddableSettleResourse} from "./embeddable-settle-resourse.model";
import {BylEmbeddableSettleAction} from "../../model/embeddable-settle-action.model";
import {BylSettleTicketStatusManager} from "./settle-ticket-status.enum";
import {BylBorrowMoneyQualificationTypeManager} from "./borrow-money-qualification-type.enum";
import {BylDatetimeUtils} from "../../utils/datetime.utils";
import {BylStringUtils} from "../../utils/string.utils";

export class BylSettleTicket extends BylTicketBaseModal {

    settleResourseWidget:any;
    settleResourse: BylEmbeddableSettleResourse = new BylEmbeddableSettleResourse();

    get settleResourseDisplay(){
        if(this.settleResourse){
            if(this.settleResourse.settleResourseId){
                return BylBorrowMoneyQualificationTypeManager.getCaption(this.settleResourse.settleResourseType).concat("-")
                        .concat(this.settleResourse.settleResourseName)
                        .concat("[" )
                        .concat(this.settleResourse.settleResourseCode)
                        .concat(']');
            }

        }
    }
    set settleResourseDisplay(value: string){

    }


    // checkAction: BylEmbeddableCheckAction = new BylEmbeddableCheckAction();
    settleAction: BylEmbeddableSettleAction = new BylEmbeddableSettleAction();

    get settleActionDisplay(){
        if(this.settleAction){
            return BylStringUtils.mixCodeName(this.settleAction.settleCode,this.settleAction.settleName)
                .concat('-')
                .concat(BylDatetimeUtils.formatDateTime(this.settleAction.settleDateTime || null))
        }
    }

    set settleActionDisplay(value: string){

    }

    shouldPayWorkloadDays:number;
    shouldPayWorkloadHours:number;

    shouldPayWorkloadAmount: number;

    shouldPayOther: number;

    borrowAmount: number;

    deduct: number;

    payed: number;

    payDateWidget:any;
    payDate: number;

    get payDateDisplay(){
        return BylDatetimeUtils.formatDate(this.payDate);
    }
    set payDateDisplay(value:string){

    }

    //
    // get endDateDisplay(){
    //     return BylDatetimeUtils.formatDate(this.endDate);
    // }
    // set endDateDisplay(value:string){
    //
    // }
    get statusDisplay(): string{
        return BylSettleTicketStatusManager.getCaption(this.status);
    }
    set statusDisplay(value: string){

    }
}
