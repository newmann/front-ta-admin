/**
 * @Description: 项目定义
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylBaseModel} from '../../model/base.model';
import {BylEmbeddableAddress} from '../../model/embeddable-address.model';
import {BylEmbeddableContactMethod} from '../../model/embeddable-contact-method.model';
import {BylEmbeddablePerson} from "../../person/model/embeddable-person.model";
import {BylMasterDataStatusManager} from "../../model/master-data-status.enum";
import {BylEmployeeStatusManager} from "./employee-status.enum";
import {BylDatetimeUtils} from "../../utils/datetime.utils";

export class BylEmployee extends BylBaseModel {
    code: string;
    name: string;

    person: BylEmbeddablePerson = new BylEmbeddablePerson();

    enterDate: number;
    leaveDate: number;

    status: number;

    get statusDisplay(): string{
        return BylEmployeeStatusManager.getCaption(this.status);
    }
    set statusDisplay(value: string){  }

    get enterDateDF(): Date{
        return BylDatetimeUtils.convertMillsToDateTime(this.enterDate);
    };
    set enterDateDF(value: Date){ }

    get leaveDateDF(): Date{
        return BylDatetimeUtils.convertMillsToDateTime(this.leaveDate);
    };
    set leaveDateDF(value: Date){}

    get enterDateDisplay() {
        return BylDatetimeUtils.formatDateTime(this.enterDate);
    }

    set enterDateDisplay(value: string) {
        //应付对象复制
    }

    get leaveDateDisplay() {
        return BylDatetimeUtils.formatDateTime(this.leaveDate);
    }

    set leaveDateDisplay(value: string) {
    //应付对象复制
    }

}
