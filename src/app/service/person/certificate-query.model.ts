/**
 * @Description: 个体list查询条件
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import { BaseModel } from '../model/base.model';
import {EmbeddableAddress} from "../model/embeddable-address.model";

export class CertificateQuery {
    personId: string;
    type: string;
    code: string;

    addr:EmbeddableAddress;
    issueDateBegin:number = 0;
    issueDateEnd:number = 0;

    effectiveDateBegin:number = 0;
    effectiveDateEnd:number = 0;


    modifyDateBegin:number = 0;
    modifyDateEnd:number = 0;

}
