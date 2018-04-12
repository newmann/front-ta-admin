/**
 * @Description: 民族
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import { BaseModel } from '../model/base.model';
import {EmbeddableAddress} from "../model/embeddable-address.model";

export class Nation extends BaseModel {
    code: string;
    name: string;

}
