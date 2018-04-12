/**
 * @Description: 证件定义
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import { BaseModel } from '../model/base.model';
import {EmbeddableAddress} from "../model/embeddable-address.model";

export const CERTIFICATE_EFFECTIVE_INFINITY = -1;

export class Certificate extends BaseModel {
    personId: string;
    type: string;
    code: string;
    issueDate:number;
    effectiveDate: number = CERTIFICATE_EFFECTIVE_INFINITY; //到效日期,-1为永久有效

    frontPhotoUrl: string;
    backPhotoUrl: string;


}
