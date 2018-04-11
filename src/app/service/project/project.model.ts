/**
 * @Description: 项目定义
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import { BaseModel } from '../model/base.model';
import {EmbeddableAddressModel} from "../model/embeddable-address.model";
import {EmbeddableContactMethodModel} from "../model/embeddable-contact-method.model";

export class Project extends BaseModel {
    code: string;
    name: string;

    address: EmbeddableAddressModel;

    managerId: string;
    managerCode: string;
    managerName: string;

    contactMethod: EmbeddableContactMethodModel;

    planBeginDate: number;
    planEndDate: number;

}
