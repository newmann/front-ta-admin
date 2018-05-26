/**
 * @Description: 个体定义
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylBaseModel} from '../../model/base.model';
import {BylEmbeddableAddress} from '../../model/embeddable-address.model';
import {BylEntityReference} from "../../model/entity-reference.model";

export class BylPerson extends BylBaseModel {
    idCard: string;
    name: string;

    address: BylEmbeddableAddress = new BylEmbeddableAddress();

    country: BylEntityReference ;
    countryId: string;
    countryCode: string;
    countryName: string;

    gender: number = 0;
    birthYear: number = 0;
    birthMonth: number = 0;
    birthDay: number = 0;

    nation: BylEntityReference ;
    nationId: string;
    nationCode: string;
    nationName: string;

    politicalStatus: BylEntityReference ;
    politicalStatusId: string;
    politicalStatusCode: string;
    politicalStatusName: string;

    nativePlace: string;
    isAlive = true;

    get fullAddress(): string {

        let result = '';

        if (this.address) {
            result = this.address.fullAddress;
        }

        return result;
    }

}
