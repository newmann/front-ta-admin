
//费用单类型定义


import {BylIStatusItem} from '../../model/status.model';
import {BylSFRadioData} from "../../../business/common/sf-relative";

export const enum BylSettleTicketStatusEnum {
    UNSUBMITED = 1,
    SUBMITED = 2,
    CHECKED = 10,
    // CONFIRMED = 20,
    SETTLED = 30,
    DELETED = -1,
    SUBMITED_DELETED = -2,
    CHECKED_DELETED = -10,
    SETTLED_DELETED = -30
}

export class BylSettleTicketStatusManager {

    static getCaption(status: number): string {
        switch (status) {
            case BylSettleTicketStatusEnum.UNSUBMITED:
                return '未提交';
            case BylSettleTicketStatusEnum.SUBMITED:
                return '已提交';
            case BylSettleTicketStatusEnum.CHECKED:
                return '已审核';
            // case BylSettleTicketStatusEnum.CONFIRMED:
            //     return '已确认';
            case BylSettleTicketStatusEnum.SETTLED:
                return '已结算';
            case BylSettleTicketStatusEnum.DELETED:
                return '删除';
            case BylSettleTicketStatusEnum.SUBMITED_DELETED:
                return '提交后作废';
            case BylSettleTicketStatusEnum.CHECKED_DELETED:
                return '审核后作废';
            // case BylSettleTicketStatusEnum.COMFIRMED_DELETED:
            //     return '确认后作废';
            case BylSettleTicketStatusEnum.SETTLED_DELETED:
                return '结算后作废';

            default:
                return 'unknown';

        }

    }

    static getArray(): BylIStatusItem[] {
        return [
            {value: BylSettleTicketStatusEnum.UNSUBMITED, caption: this.getCaption(BylSettleTicketStatusEnum.UNSUBMITED)},
            {value: BylSettleTicketStatusEnum.SUBMITED, caption: this.getCaption(BylSettleTicketStatusEnum.SUBMITED)},
            {value: BylSettleTicketStatusEnum.CHECKED, caption: this.getCaption(BylSettleTicketStatusEnum.CHECKED)},
            // {value: BylSettleTicketStatusEnum.CONFIRMED, caption: this.getCaption(BylSettleTicketStatusEnum.CONFIRMED)},
            {value: BylSettleTicketStatusEnum.SETTLED, caption: this.getCaption(BylSettleTicketStatusEnum.SETTLED)},
            {value: BylSettleTicketStatusEnum.DELETED, caption: this.getCaption(BylSettleTicketStatusEnum.DELETED)},
            {value: BylSettleTicketStatusEnum.SUBMITED_DELETED, caption: this.getCaption(BylSettleTicketStatusEnum.SUBMITED_DELETED)},
            {value: BylSettleTicketStatusEnum.CHECKED_DELETED, caption: this.getCaption(BylSettleTicketStatusEnum.CHECKED_DELETED)},
            // {value: BylSettleTicketStatusEnum.COMFIRMED_DELETED, caption: this.getCaption(BylSettleTicketStatusEnum.COMFIRMED_DELETED)}
            {value: BylSettleTicketStatusEnum.SETTLED_DELETED, caption: this.getCaption(BylSettleTicketStatusEnum.SETTLED_DELETED)}
        ];
    }
    static getSFSelectDataArray(): BylSFRadioData[] {
        return [
            {value: BylSettleTicketStatusEnum.UNSUBMITED, label: this.getCaption(BylSettleTicketStatusEnum.UNSUBMITED)},
            {value: BylSettleTicketStatusEnum.SUBMITED, label: this.getCaption(BylSettleTicketStatusEnum.SUBMITED)},
            {value: BylSettleTicketStatusEnum.CHECKED, label: this.getCaption(BylSettleTicketStatusEnum.CHECKED)},
            // {value: BylSettleTicketStatusEnum.CONFIRMED, label: this.getCaption(BylSettleTicketStatusEnum.CONFIRMED)},
            {value: BylSettleTicketStatusEnum.SETTLED, label: this.getCaption(BylSettleTicketStatusEnum.SETTLED)},
            {value: BylSettleTicketStatusEnum.DELETED, label: this.getCaption(BylSettleTicketStatusEnum.DELETED)},
            {value: BylSettleTicketStatusEnum.SUBMITED_DELETED, label: this.getCaption(BylSettleTicketStatusEnum.SUBMITED_DELETED)},
            {value: BylSettleTicketStatusEnum.CHECKED_DELETED, label: this.getCaption(BylSettleTicketStatusEnum.CHECKED_DELETED)},
            // {value: BylSettleTicketStatusEnum.COMFIRMED_DELETED, label: this.getCaption(BylSettleTicketStatusEnum.COMFIRMED_DELETED)}
            {value: BylSettleTicketStatusEnum.SETTLED_DELETED, label: this.getCaption(BylSettleTicketStatusEnum.SETTLED_DELETED)}
        ];

    }
}
