/**
 * @Description: 项目可见范围表
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylBaseModel} from '../../model/base.model';
import {BylEmbeddableProject} from "../../model/embeddable-project.model";
import {BylEmbeddableAccount} from "../../account/model/embeddable-account.model";


export class BylProjectAuth extends BylBaseModel {

    // projectWidget: any;
    // project: BylEmbeddableProject = new BylEmbeddableProject();
    //
    // accountWidget: any;
    // account: BylEmbeddableAccount = new BylEmbeddableAccount();
    projectId: string;

    accountId: string;

    // status: number;
    //
    // get statusDisplay(): string{
    //     return BylMasterDataStatusManager.getCaption(this.status);
    // }
    // set statusDisplay(value: string){
    //
    // }

}
