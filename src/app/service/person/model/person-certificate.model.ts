/**
 * @Description: 证件定义
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylBaseModel} from '../../model/base.model';
import {BylEmbeddableAddress} from '../../model/embeddable-address.model';
import {BylItemBaseModel} from "../../model/item-base.model";

export const CERTIFICATE_EFFECTIVE_INFINITY = -1;

export class BylPersonCertificate extends BylItemBaseModel {
    // personId: string;
    type: string;
    code: string;
    issueDate: number;
    effectiveDate: number = CERTIFICATE_EFFECTIVE_INFINITY; //到效日期,-1为永久有效

    frontPhotoFileName: string;

    backPhotoFileName: string;

}
