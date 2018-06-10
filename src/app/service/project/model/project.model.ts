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
import {BylMasterDataStatusManager} from "../../model/master-data-status.enum";
import {BylProjectStatusManager} from "./project-status.enum";
import {BylMasterDataBaseModel} from "../../model/master-data-base.model";

export class BylProject extends BylMasterDataBaseModel {
    code: string;
    name: string;

    address: BylEmbeddableAddress = new BylEmbeddableAddress(); // 项目所在地

    managerWidget: any ;
    managerId: string;
    managerCode: string;
    managerName: string;

    // contactMethod: BylEmbeddableContactMethod;

    planBeginDateWidget: Date = null;
    planEndDateWidget: Date = null ;

    planBeginDate: number;
    planEndDate: number;

    planAmount:number; //计划成本总额
    progressAssessAmount: number; //实际进展评估额
    borrowedAmount: number; //预借款总额
    settleedAmount: number; //结算总额
    // status: number;


    get addressDisplay(): string {

        let result = '';

        if (this.address) {
            result = this.address.fullAddress;
        }

        return result;
    }

    set addressDisplay(value: string) {

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

    get managerDisplay(): string {
        if (this.managerId){
            return this.managerName + "[" + this.managerCode + "]";
        } else {
            return null;
        }
    }
    set managerDisplay(value: string ){}

    get planBeginDateDisplay(): string{
        return BylDatetimeUtils.formatDate(this.planBeginDate);
    }
    set planBeginDateDisplay(value: string){ }

    get planEndDateDisplay(): string{
        return BylDatetimeUtils.formatDate(this.planEndDate);
    }
    set planEndDateDisplay(value: string){ }

    get statusDisplay(): string{
        return BylProjectStatusManager.getCaption(this.status);
    }
    set statusDisplay(value: string){

    }

}
