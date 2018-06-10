/**
 * @Description: 费用单明细
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylBaseItemModal} from "../../model/base-item.model";
import {BylEmbeddableExpenseType} from "./embeddable-expense-type.model";

export class BylExpenseDetail extends BylBaseItemModal {

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
