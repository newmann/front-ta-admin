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
import {BylOperationPeriodStatusManager} from "./operation-period-status.enum";

export class BylOperationPeriod extends BylMasterDataBaseModel {
    code: string;
    name: string;

    beginDateWidget: Date = null;
    endDateWidget: Date = null;
    beginDate: number;
    endDate: number;


    get beginDateDisplay(): string{
        return BylDatetimeUtils.formatDate(this.beginDate);
    }
    set beginDateDisplay(value: string){ }

    get endDateDisplay(): string{
        return BylDatetimeUtils.formatDate(this.endDate);
    }
    set endDateDisplay(value: string){ }

    get statusDisplay(): string{
        return BylOperationPeriodStatusManager.getCaption(this.status);
    }
    set statusDisplay(value: string){

    }

}
