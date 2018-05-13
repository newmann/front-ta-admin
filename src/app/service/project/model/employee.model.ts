/**
 * @Description: 项目定义
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylBaseModel} from '../../model/base.model';
import {BylEmbeddableAddress} from '../../model/embeddable-address.model';
import {BylEmbeddableContactMethod} from '../../model/embeddable-contact-method.model';
import {BylEmbeddablePerson} from "../../person/model/embeddable-person.model";

export class BylEmployee extends BylBaseModel {
    code: string;

    person: BylEmbeddablePerson;

    enterDate: number;
    leaveDate: number;

    status: number;

}
