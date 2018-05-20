/**
 * @Description: 项目定义
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylBaseModel} from '../../model/base.model';
import {BylEmbeddableAddress} from '../../model/embeddable-address.model';
import {BylEmbeddableContactMethod} from '../../model/embeddable-contact-method.model';
import {BylProjectManagerPool} from "./project-manager-pool.model";
import {BylEntityReference} from "../../model/entity-reference.model";
import {BylDatetimeUtils} from "../../utils/datetime.utils";

export class BylProject extends BylBaseModel {
    code: string;
    name: string;

    address: BylEmbeddableAddress = new BylEmbeddableAddress(); // 项目所在地

    manager: any ;
    managerId: string;
    managerCode: string;
    managerName: string;

    // contactMethod: BylEmbeddableContactMethod;

    planBeginDate: number;
    planEndDate: number;

    planAmount:number; //计划成本总额
    progressAssessAmount: number; //实际进展评估额
    borrowedAmount: number; //预借款总额
    settleedAmount: number; //结算总额
    status: number;


    get fullAddress(): string {

        let result = '';

        if (this.address) {
            result = this.address.fullAddress;
        }

        return result;
    }

    // get fullContactMethod(): string {
    //
    //     let result = '';
    //
    //     if (this.contactMethod) {
    //         result = this.contactMethod.fullContactMethod;
    //     }
    //
    //     return result;
    // }

    get fullManager(): string {
        let result = '';

        if (this.managerCode) result = result + '/' + this.managerCode;
        if (this.managerName) result = result + '/' + this.managerName;

        return result;

    }

    get planBeginDateDF(): Date{
        return BylDatetimeUtils.convertMillsToDateTime(this.planBeginDate);

    }

    get planEndDateDF(): Date{
        return BylDatetimeUtils.convertMillsToDateTime(this.planEndDate);

    }

}
