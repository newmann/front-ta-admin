/**
 * @Description: 外包工组
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylBaseModel} from '../../model/base.model';
import {BylEmbeddableOrganization} from "../../organization/model/embeddable-organization.model";


export class BylOutsourcer extends BylBaseModel {
    code: string;
    organization: BylEmbeddableOrganization;

    status: number;
}
