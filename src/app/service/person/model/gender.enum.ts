
//性别定义
import {BylIStatusItem} from '../../model/status.model';
import {BylProjectStatusEnum} from "../../project/model/project-status.enum";
import {BylSFRadioData} from "../../../business/common/sf-relative";

export const enum BylGenderEnum {
    MALE= 1,
    FEMALE = -1,
    UNKNOWN = 0
}

export class BylGenderEnumManager {

    static getCaption(status: number): string {
        switch (status) {
            case BylGenderEnum.MALE:
                return '男';
            case BylGenderEnum.FEMALE:
                return '女';
            case BylGenderEnum.UNKNOWN:
                return '未知';
            default:
                return 'unknown';

        }

    }

    static getArray(): BylIStatusItem[] {
        return [
            {value: BylGenderEnum.MALE, caption: this.getCaption(BylGenderEnum.MALE)},
            {value: BylGenderEnum.FEMALE, caption: this.getCaption(BylGenderEnum.FEMALE)},
            {value: BylGenderEnum.UNKNOWN, caption: this.getCaption(BylGenderEnum.UNKNOWN)}
        ];
    }

    static getSFSelectDataArray(): BylSFRadioData[] {
        return [
            {value: BylGenderEnum.MALE, label: this.getCaption(BylGenderEnum.MALE)},
            {value: BylGenderEnum.FEMALE, label: this.getCaption(BylGenderEnum.FEMALE)},
            {value: BylGenderEnum.UNKNOWN, label: this.getCaption(BylGenderEnum.UNKNOWN)}        ];

    }
}
