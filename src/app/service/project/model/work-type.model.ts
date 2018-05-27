/**
 * @Description: 工种定义
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import {BylBaseModel} from '../../model/base.model';
import {BylMasterDataStatusManager} from "../../model/master-data-status.enum";
import {BylCheckTypeEnum, BylCheckTypeEnumManager} from "./check-type.enum";
import {BylDatetimeUtils} from "../../utils/datetime.utils";


export class BylWorkType extends BylBaseModel {
    code: string;
    name: string;
    checkType:number = BylCheckTypeEnum.DAY; //考情类型，1代表按天，2代表按小时。
    standardTimeLength: number; //标准工作时长，对应按小时核算的工种，比如一天10小时按一天核算，
    status: number;
    get statusDisplay(): string{
        return BylMasterDataStatusManager.getCaption(this.status);
    }
    set statusDisplay(value: string){

    }

    get checkTypeDisplay(): string{
        return BylCheckTypeEnumManager.getCaption(this.checkType);
    }
    set checkTypeDisplay(value: string){

    }

}
