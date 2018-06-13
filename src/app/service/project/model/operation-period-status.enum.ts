
//项目状态类型定义


import {BylIStatusItem} from '../../model/status.model';
import {BylSFRadioData} from "../../../business/common/sf-relative";

export const enum BylOperationPeriodStatusEnum {
    //master data 统一的状态值
    UNSUBMITED = 1,
    SUBMITED = 2,
    CONFIRMED= 10,
    LOCKED = 20,
    DELETED = -1,
    SUBMITED_DELETED = -2,
    CONFIRMED_DELETED = -10,
    //项目自身个性化状态值
    CLOSE = 100


}

export class BylOperationPeriodStatusManager {

    static getCaption(status: number): string {
        switch (status) {
            case BylOperationPeriodStatusEnum.UNSUBMITED:
                return '未提交';
            case BylOperationPeriodStatusEnum.SUBMITED:
                return '已提交';
            case BylOperationPeriodStatusEnum.CONFIRMED:
                return '已确认';

            case BylOperationPeriodStatusEnum.CLOSE:
                return '已关账';
            case BylOperationPeriodStatusEnum.DELETED:
                return '删除';
            case BylOperationPeriodStatusEnum.SUBMITED_DELETED:
                return '提交后作废';
            case BylOperationPeriodStatusEnum.CONFIRMED_DELETED:
                return '确认后作废';

            default:
                return 'unknown';

        }

    }

    static getArray(): BylIStatusItem[] {
        return [
            {value: BylOperationPeriodStatusEnum.UNSUBMITED, caption: this.getCaption(BylOperationPeriodStatusEnum.UNSUBMITED)},
            {value: BylOperationPeriodStatusEnum.SUBMITED, caption: this.getCaption(BylOperationPeriodStatusEnum.SUBMITED)},
            {value: BylOperationPeriodStatusEnum.CONFIRMED, caption: this.getCaption(BylOperationPeriodStatusEnum.CONFIRMED)},
            {value: BylOperationPeriodStatusEnum.CLOSE, caption: this.getCaption(BylOperationPeriodStatusEnum.CLOSE)},
            {value: BylOperationPeriodStatusEnum.DELETED, caption: this.getCaption(BylOperationPeriodStatusEnum.DELETED)},
            {value: BylOperationPeriodStatusEnum.SUBMITED_DELETED, caption: this.getCaption(BylOperationPeriodStatusEnum.SUBMITED_DELETED)},
            {value: BylOperationPeriodStatusEnum.CONFIRMED_DELETED, caption: this.getCaption(BylOperationPeriodStatusEnum.CONFIRMED_DELETED)},
        ];
    }

    static getSFSelectDataArray(): BylSFRadioData[] {
        return [
            {value: BylOperationPeriodStatusEnum.UNSUBMITED, label: this.getCaption(BylOperationPeriodStatusEnum.UNSUBMITED)},
            {value: BylOperationPeriodStatusEnum.SUBMITED, label: this.getCaption(BylOperationPeriodStatusEnum.SUBMITED)},
            {value: BylOperationPeriodStatusEnum.CONFIRMED, label: this.getCaption(BylOperationPeriodStatusEnum.CONFIRMED)},
            {value: BylOperationPeriodStatusEnum.CLOSE, label: this.getCaption(BylOperationPeriodStatusEnum.CLOSE)},
            {value: BylOperationPeriodStatusEnum.DELETED, label: this.getCaption(BylOperationPeriodStatusEnum.DELETED)},
            {value: BylOperationPeriodStatusEnum.SUBMITED_DELETED, label: this.getCaption(BylOperationPeriodStatusEnum.SUBMITED_DELETED)},
            {value: BylOperationPeriodStatusEnum.CONFIRMED_DELETED, label: this.getCaption(BylOperationPeriodStatusEnum.CONFIRMED_DELETED)},
        ];

    }
}
