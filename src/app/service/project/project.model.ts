/**
 * @Description: 项目定义
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import { BaseModel } from '../model/base.model';
import {EmbeddableAddress} from "../model/embeddable-address.model";
import {EmbeddableContactMethod} from "../model/embeddable-contact-method.model";

export class Project extends BaseModel {
    code: string;
    name: string;

    address: EmbeddableAddress;

    managerId: string;
    managerCode: string;
    managerName: string;

    contactMethod: EmbeddableContactMethod;

    planBeginDate: number;
    planEndDate: number;

}
