/**
 * @Description: 费用单明细
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylItemBaseModal} from "../../model/item-base.model";
import {BylEmbeddableExpenseType} from "./embeddable-expense-type.model";

export class BylExpenseDetail extends BylItemBaseModal {

    expenseTypeWidget:any;
    expenseType: BylEmbeddableExpenseType = new BylEmbeddableExpenseType();

    amount: number;

    get expenseTypeDisplay(){
        if(this.expenseType){
            return this.expenseType.expenseTypeName + "[" + this.expenseType.expenseTypeCode +']';
        }
    }
    set expenseTypeDisplay(value: string){

    }

}
