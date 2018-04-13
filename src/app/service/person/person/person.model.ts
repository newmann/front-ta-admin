/**
 * @Description: 个体定义
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import { BylBaseModel } from '../../model/base.model';
import {BylEmbeddableAddress} from "../../model/embeddable-address.model";

export class BylPerson extends BylBaseModel {
    idNo: string;
    name: string;

    address: BylEmbeddableAddress;

    countryCode:string;
    countryName:string;

    gender:number = 0;
    birthYear:number = 0;
    birthMonth:number = 0;
    birthDay:number = 0;

    nationCode:string;
    nationName:string;

    politicalStatusCode:string;
    politicalStatusName:string;

    nativePlace: string;
    isAlive = true;

}
