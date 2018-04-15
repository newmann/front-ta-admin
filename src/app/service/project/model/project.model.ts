/**
 * @Description: 项目定义
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import { BylBaseModel } from '../../model/base.model';
import {BylEmbeddableAddress} from "../../model/embeddable-address.model";
import {BylEmbeddableContactMethod} from "../../model/embeddable-contact-method.model";

export class Project extends BylBaseModel {
    code: string;
    name: string;

    address: BylEmbeddableAddress;

    managerId: string;
    managerCode: string;
    managerName: string;

    contactMethod: BylEmbeddableContactMethod;

    planBeginDate: number;
    planEndDate: number;

}
