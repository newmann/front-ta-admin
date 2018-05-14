
//考情类型定义


import {BylIStatusItem} from '../../model/status.model';

export const enum BylCheckTypeEnum {
    DAY = 1,
    HOUR = 10
}

export class BylCheckTypeEnumManager {

    static getCaption(status: number): string {
        switch (status) {
            case BylCheckTypeEnum.DAY:
                return '天';
            case BylCheckTypeEnum.HOUR:
                return '小时';
            default:
                return 'unknown';

        }

    }

    static getArray(): BylIStatusItem[] {
        return [
            {value: BylCheckTypeEnum.DAY, caption: this.getCaption(BylCheckTypeEnum.DAY)},
            {value: BylCheckTypeEnum.HOUR, caption: this.getCaption(BylCheckTypeEnum.HOUR)}
        ];
    }

}
