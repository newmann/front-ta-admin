/**
 * @Description: 结算单中借款信息汇总明细
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylItemBaseModel} from "../../model/item-base.model";
import {BylEmbeddableExpenseType} from "./embeddable-expense-type.model";
import {s} from "@angular/core/src/render3";
import {BylEmbeddableWorkType} from "./embeddable-work-type.model";
import {BylCheckTypeEnumManager} from "./check-type.enum";
import {BylEmbeddableProject} from "../../model/embeddable-project.model";

export class BylSettleDetailBorrowMoney extends BylItemBaseModel {

    project: BylEmbeddableProject = new BylEmbeddableProject();

    borrowAmount: number;

}
