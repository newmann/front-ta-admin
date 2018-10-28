/**
 * @Description: 结算单中借款信息汇总明细
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylDetailBaseModel} from "../../model/detail-base.model";
import {BylEmbeddableExpenseType} from "./embeddable-expense-type.model";
import {s} from "@angular/core/src/render3";
import {BylEmbeddableWorkType} from "./embeddable-work-type.model";
import {BylCheckTypeEnumManager} from "./check-type.enum";
import {BylEmbeddableProject} from "../../model/embeddable-project.model";
import {BylStringUtils} from "../../utils/string.utils";

export class BylSettleDetailBorrowMoneyTicket extends BylDetailBaseModel {

    project: BylEmbeddableProject = new BylEmbeddableProject();

    borrowMoneyTicketId: string;
    borrowMoneyTicketNo: string;

    get projectDisplay(){
        if(this.project){
            if (this.project.projectId) return BylStringUtils.mixCodeName(this.project.projectCode,this.project.projectName)
        }
    }
    set projectDisplay(value:string){

    }

    amount:number;

}
