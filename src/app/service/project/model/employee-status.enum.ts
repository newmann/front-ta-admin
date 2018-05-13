
//借款单类型定义


import {BylIStatusItem} from '../../model/status.model';

export const enum BylEmployeeStatusEnum {
    NORMAL = 1,
    LEAVE = 100,
    LOCKED = -1
}

export class BylEmployeeStatusManager {

    static getStatusCaption(status: number): string {
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

    static getStatusArray(): BylIStatusItem[] {
        return [
            {value: BylEmployeeStatusEnum.NORMAL, label: this.getStatusCaption(BylEmployeeStatusEnum.NORMAL)},
            {value: BylEmployeeStatusEnum.LEAVE, label: this.getStatusCaption(BylEmployeeStatusEnum.LEAVE)},
            {value: BylEmployeeStatusEnum.LOCKED, label: this.getStatusCaption(BylEmployeeStatusEnum.LOCKED)}

        ];
    }
}
