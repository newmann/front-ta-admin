/**
 * @Description: 个体定义
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import { BylBaseModel } from '../../model/base.model';
import {BylEmbeddableAddress} from "../../model/embeddable-address.model";

export class BylPerson extends BylBaseModel {
    idCard: string;
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

    get detailAddress(): string{
        let result = "";
        if ( this.address) {
            if (this.address.countryName) result = result +this.address.countryName;
            if ( this.address.provinceName) result = result + "/" + this.address.provinceName;
            if (this.address.cityName) result = result +"/" + this.address.cityName;
            if ( this.address.detailAddress ) result = result + "/" + this.address.detailAddress;
        }
        return result;
    }

}
