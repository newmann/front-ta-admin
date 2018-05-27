/**
 * @Description: 外包工组
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylBaseModel} from '../../model/base.model';
import {BylEmbeddableOrganization} from "../../organization/model/embeddable-organization.model";
import {BylMasterDataStatusManager} from "../../model/master-data-status.enum";


export class BylOutsourcer extends BylBaseModel {
    code: string;
    name: string;

    organizationWidget: any;

    organization: BylEmbeddableOrganization = new BylEmbeddableOrganization();

    status: number;

    get statusDisplay(): string{
        return BylMasterDataStatusManager.getCaption(this.status);
    }
    set statusDisplay(value: string){

    }

}
