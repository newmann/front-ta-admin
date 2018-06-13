/**
 * @Description: 地址定义
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylBaseModel} from '../../model/base.model';
import {BylEmbeddableAddress} from '../../model/embeddable-address.model';
import {BylItemBaseModal} from "../../model/item-base.model";

export class BylPersonAddress extends BylItemBaseModal {
    // personId: string;
    type: string;

    addr: BylEmbeddableAddress = new BylEmbeddableAddress();

    get detailAddress(): string{
        let result = "";
        if ( this.addr) {
            if (this.addr.countryName) result = result +this.addr.countryName;
            if ( this.addr.provinceName) result = result + "/" + this.addr.provinceName;
            if (this.addr.cityName) result = result +"/" + this.addr.cityName;
            if ( this.addr.detailAddress ) result = result + "/" + this.addr.detailAddress;
        }
        return result;
    }
}
