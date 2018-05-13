
//考情类型定义


import {BylIStatusItem} from '../../model/status.model';

export const enum BylCheckTypeEnum {
    DAY = 1,
    HOUR = 10
}

export class BylCheckTypeEnumManager {

    static getStatusCaption(status: number): string {
        switch (status) {
            case BylCheckTypeEnum.DAY:
                return '天';
            case BylCheckTypeEnum.HOUR:
                return '小时';
            default:
                return 'unknown';

        }

    }

    static getStatusArray(): BylIStatusItem[] {
        return [
            {value: BylCheckTypeEnum.DAY, label: this.getStatusCaption(BylCheckTypeEnum.DAY)},
            {value: BylCheckTypeEnum.HOUR, label: this.getStatusCaption(BylCheckTypeEnum.HOUR)}
        ];
    }
}
