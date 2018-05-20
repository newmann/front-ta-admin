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

    person: BylEmbeddablePerson;

    enterDate: number;
    leaveDate: number;
    enterDateDF: Date;
    leaveDateDF: Date;

    status: number;

    get statusCaption(): string{
        return BylEmployeeStatusManager.getCaption(this.status);
    }

}
