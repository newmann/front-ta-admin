/**
 * @Description: 项目定义
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylBaseModel} from '../../model/base.model';
import {BylEmbeddableAddress} from '../../model/embeddable-address.model';
import {BylEmbeddableContactMethod} from '../../model/embeddable-contact-method.model';

export class BylProject extends BylBaseModel {
    code: string;
    name: string;

    address: BylEmbeddableAddress = new BylEmbeddableAddress(); // 项目所在地

    managerId: string;
    managerCode: string;
    managerName: string;

    // contactMethod: BylEmbeddableContactMethod;

    planBeginDate: number;
    planEndDate: number;

    get fullAddress(): string {

        let result = '';

        if (this.address) {
            result = this.address.fullAddress;
        }

        return result;
    }

    // get fullContactMethod(): string {
    //
    //     let result = '';
    //
    //     if (this.contactMethod) {
    //         result = this.contactMethod.fullContactMethod;
    //     }
    //
    //     return result;
    // }

    get fullManager(): string {
        let result = '';

        if (this.managerCode) result = result + '/' + this.managerCode;
        if (this.managerName) result = result + '/' + this.managerName;

        return result;

    }
}
