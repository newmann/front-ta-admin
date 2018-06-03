
//通用主数据状态定义
import {BylIStatusItem} from './status.model';
import {BylSFRadioData} from "../../business/common/sf-relative";

export const enum BylMasterDataStatusEnum {
    UNSUBMITED = 1,
    SUBMITED = 2,
    CONFIRMED= 10,
    LOCKED = 20,
    DELETED = -1,
    SUBMITED_DELETED = -2
}

export class BylMasterDataStatusManager {

    static getCaption(status: number): string {
        switch (status) {
            case BylMasterDataStatusEnum.UNSUBMITED:
                return '未提交';
            case BylMasterDataStatusEnum.SUBMITED:
                return '提交';
            case BylMasterDataStatusEnum.CONFIRMED:
                return '正常';
            case BylMasterDataStatusEnum.LOCKED:
                return '锁定';
            case BylMasterDataStatusEnum.DELETED:
                return '删除';
            case BylMasterDataStatusEnum.SUBMITED_DELETED:
                return '提交后作废';
            default:
                return 'unknown';

        }

    }

    static getArray(): BylIStatusItem[] {
        return [
            {value: BylMasterDataStatusEnum.UNSUBMITED, caption: this.getCaption(BylMasterDataStatusEnum.UNSUBMITED)},
            {value: BylMasterDataStatusEnum.SUBMITED, caption: this.getCaption(BylMasterDataStatusEnum.SUBMITED)},
            {value: BylMasterDataStatusEnum.CONFIRMED, caption: this.getCaption(BylMasterDataStatusEnum.CONFIRMED)},
            {value: BylMasterDataStatusEnum.LOCKED, caption: this.getCaption(BylMasterDataStatusEnum.LOCKED)},
            {value: BylMasterDataStatusEnum.SUBMITED_DELETED, caption: this.getCaption(BylMasterDataStatusEnum.SUBMITED_DELETED)}
        ];
    }

    static getSFSelectDataArray(): BylSFRadioData[] {
        return [
            {value: BylMasterDataStatusEnum.UNSUBMITED, label: this.getCaption(BylMasterDataStatusEnum.UNSUBMITED)},
            {value: BylMasterDataStatusEnum.SUBMITED, label: this.getCaption(BylMasterDataStatusEnum.SUBMITED)},
            {value: BylMasterDataStatusEnum.CONFIRMED, label: this.getCaption(BylMasterDataStatusEnum.CONFIRMED)},
            {value: BylMasterDataStatusEnum.LOCKED, label: this.getCaption(BylMasterDataStatusEnum.LOCKED)},
            {value: BylMasterDataStatusEnum.SUBMITED_DELETED, label: this.getCaption(BylMasterDataStatusEnum.SUBMITED_DELETED)}
        ];

    }
}
