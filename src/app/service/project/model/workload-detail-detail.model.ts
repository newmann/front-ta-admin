/**
 * @Description: 考情登记单明细
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylItemBaseModal} from "../../model/item-base.model";
import {BylEmbeddableExpenseType} from "./embeddable-expense-type.model";
import {s} from "@angular/core/src/render3";
import {BylEmbeddableWorkType} from "./embeddable-work-type.model";
import {BylItemDetailBaseModal} from "../../model/item-detail-base.model";

export class BylWorkloadDetail extends BylItemDetailBaseModal {
    resourseId: string;

    resourseCode: string;
    resourseName: string;

    workTypeWidget:any;
    workType: BylEmbeddableWorkType = new BylEmbeddableWorkType();
    workDate: number;

    shouldPayCount: number;

    get workTypeDisplay(){
        if(this.workType){
            return this.workType.workTypeName + "[" + this.workType.workTypeCode +']';
        }
    }
    set workTypeDisplay(value: string){

    }

}
