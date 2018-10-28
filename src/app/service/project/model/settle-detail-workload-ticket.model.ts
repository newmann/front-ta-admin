/**
 * @Description: 结算单中考勤信息单据清单
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

export class BylSettleDetailWorkloadTicket extends BylDetailBaseModel {

    project: BylEmbeddableProject = new BylEmbeddableProject();
    get projectDisplay(){
        if(this.project){
            if (this.project.projectId) return BylStringUtils.mixCodeName(this.project.projectCode,this.project.projectName)
        }
    }
    set projectDisplay(value:string){

    }

    workloadTicketId: string;
    workloadTicketNo: string;
    workloadDetailId: string;
    workloadDetailLineNo: number;
    workTypeWidget:any;
    workType: BylEmbeddableWorkType = new BylEmbeddableWorkType();

    checkType: number;
    standardTimeLength: number;

    shouldPayCount: number;

    get workTypeDisplay(){
        if(this.workType){
            return BylStringUtils.mixCodeName(this.workType.workTypeCode, this.workType.workTypeName);
        }
    }
    set workTypeDisplay(value: string){

    }

    get checkTypeDisplay(){
        return BylCheckTypeEnumManager.getCaption(this.checkType);
    }
    set checkTypeDisplay(value: string){ }

}
