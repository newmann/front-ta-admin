
//通用主数据状态定义
import {BylIStatusItem} from './status.model';

export const enum BylMasterDataStatusEnum {
    NORMAL= 1,
    LOCKED = 0,
    DELETED = -1
}

export class BylMasterDataStatusManager {

    static getStatusCaption(status: number): string {
        switch (status) {
            case BylMasterDataStatusEnum.NORMAL:
                return '正常';
            case BylMasterDataStatusEnum.LOCKED:
                return '锁定';
            case BylMasterDataStatusEnum.DELETED:
                return '删除';
            default:
                return 'unknown';

        }

    }

    static getStatusArray(): BylIStatusItem[] {
        return [
            {value: BylMasterDataStatusEnum.NORMAL, caption: this.getStatusCaption(BylMasterDataStatusEnum.NORMAL)},
            {value: BylMasterDataStatusEnum.LOCKED, caption: this.getStatusCaption(BylMasterDataStatusEnum.LOCKED)},
            {value: BylMasterDataStatusEnum.DELETED, caption: this.getStatusCaption(BylMasterDataStatusEnum.DELETED)}
        ];
    }
}
