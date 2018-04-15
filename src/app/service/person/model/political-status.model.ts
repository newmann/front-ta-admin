/**
 * @Description: 政治面貌
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import { BylBaseModel } from '../../model/base.model';
import {BylEmbeddableAddress} from "../../model/embeddable-address.model";

export class BylPoliticalStatus extends BylBaseModel {
    code: string;
    name: string;

}
