/**
 * @Description: 考情登记单明细
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylDetailBaseModel} from "../../model/detail-base.model";
import {BylEmbeddableExpenseType} from "./embeddable-expense-type.model";
import {s} from "@angular/core/src/render3";
import {BylEmbeddableWorkType} from "./embeddable-work-type.model";
import {BylDetail2BaseModal} from "../../model/detail2-base.model";

export class BylWorkloadDetailDetail extends BylDetail2BaseModal {
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
