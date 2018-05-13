/**
 * @Description: 外包工组的员工
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylBaseModel} from '../../model/base.model';
import {BylEmbeddableOrganization} from "../../organization/model/embeddable-organization.model";
import {BylEmbeddableOutsourcer} from "./embeddable-outsourcer.model";
import {BylEmbeddablePerson} from "../../person/model/embeddable-person.model";


export class BylOutsourceEmployee extends BylBaseModel {
    code: string; //员工编号
    outsourcer: BylEmbeddableOutsourcer;
    person: BylEmbeddablePerson;

    status: number;
}
