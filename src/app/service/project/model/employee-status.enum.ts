
//借款单类型定义


import {BylIStatusItem} from '../../model/status.model';
import {BylSFRadioData} from "../../../business/common/sf-relative";

export const enum BylEmployeeStatusEnum {
    NORMAL = 1,
    LEAVE = 100,
    LOCKED = -1
}

export class BylEmployeeStatusManager {

    static getCaption(status: number): string {
        switch (status) {
            case BylEmployeeStatusEnum.NORMAL:
                return '正常';
            case BylEmployeeStatusEnum.LEAVE:
                return '离职';
            case BylEmployeeStatusEnum.LOCKED:
                return '锁定';
            default:
                return 'unknown';

        }

    }

    static getArray(): BylIStatusItem[] {
        return [
            {value: BylEmployeeStatusEnum.NORMAL, caption: this.getCaption(BylEmployeeStatusEnum.NORMAL)},
            {value: BylEmployeeStatusEnum.LEAVE, caption: this.getCaption(BylEmployeeStatusEnum.LEAVE)},
            {value: BylEmployeeStatusEnum.LOCKED, caption: this.getCaption(BylEmployeeStatusEnum.LOCKED)}

        ];
    }
    static getSFSelectDataArray(): BylSFRadioData[] {
        return [
            {value: BylEmployeeStatusEnum.NORMAL, label: this.getCaption(BylEmployeeStatusEnum.NORMAL)},
            {value: BylEmployeeStatusEnum.LEAVE, label: this.getCaption(BylEmployeeStatusEnum.LEAVE)},
            {value: BylEmployeeStatusEnum.LOCKED, label: this.getCaption(BylEmployeeStatusEnum.LOCKED)}

        ];

    }
}
