/**
 * @Description: 组织类
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import { BylBaseModel } from '../../model/base.model';
import {BylEmbeddableLegalPerson} from "./embeddable-legal-person.model";

export class BylOrganization extends BylBaseModel {
    code: string;
    name: string;
    simpleName: string;

    legalPerson: BylEmbeddableLegalPerson;

    type: number;

}
