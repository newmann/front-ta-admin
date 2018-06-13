
//费用单类型定义


import {BylIStatusItem} from '../../model/status.model';
import {BylSFRadioData} from "../../../business/common/sf-relative";

export const enum BylWorkloadTicketStatusEnum {
    UNSUBMITED = 1,
    SUBMITED = 2,
    CHECKED = 10,
    // CONFIRMED = 20,
    SETTLED = 30,
    DELETED = -1,
    SUBMITED_DELETED = -2,
    CHECKED_DELETED = -10
}

export class BylWorkloadTicketStatusManager {

    static getCaption(status: number): string {
        switch (status) {
            case BylWorkloadTicketStatusEnum.UNSUBMITED:
                return '未提交';
            case BylWorkloadTicketStatusEnum.SUBMITED:
                return '已提交';
            case BylWorkloadTicketStatusEnum.CHECKED:
                return '已审核';
            // case BylWorkloadTicketStatusEnum.CONFIRMED:
            //     return '已确认';
            case BylWorkloadTicketStatusEnum.SETTLED:
                return '已结算';
            case BylWorkloadTicketStatusEnum.DELETED:
                return '删除';
            case BylWorkloadTicketStatusEnum.SUBMITED_DELETED:
                return '提交后作废';
            case BylWorkloadTicketStatusEnum.CHECKED_DELETED:
                return '审核后作废';
            // case BylWorkloadTicketStatusEnum.COMFIRMED_DELETED:
            //     return '确认后作废';
            // case BylWorkloadTicketStatusEnum.SETTLEED_DELETED:
            //     return '结算后作废';

            default:
                return 'unknown';

        }

    }

    static getArray(): BylIStatusItem[] {
        return [
            {value: BylWorkloadTicketStatusEnum.UNSUBMITED, caption: this.getCaption(BylWorkloadTicketStatusEnum.UNSUBMITED)},
            {value: BylWorkloadTicketStatusEnum.SUBMITED, caption: this.getCaption(BylWorkloadTicketStatusEnum.SUBMITED)},
            {value: BylWorkloadTicketStatusEnum.CHECKED, caption: this.getCaption(BylWorkloadTicketStatusEnum.CHECKED)},
            // {value: BylWorkloadTicketStatusEnum.CONFIRMED, caption: this.getCaption(BylWorkloadTicketStatusEnum.CONFIRMED)},
            {value: BylWorkloadTicketStatusEnum.SETTLED, caption: this.getCaption(BylWorkloadTicketStatusEnum.SETTLED)},
            {value: BylWorkloadTicketStatusEnum.DELETED, caption: this.getCaption(BylWorkloadTicketStatusEnum.DELETED)},
            {value: BylWorkloadTicketStatusEnum.SUBMITED_DELETED, caption: this.getCaption(BylWorkloadTicketStatusEnum.SUBMITED_DELETED)},
            {value: BylWorkloadTicketStatusEnum.CHECKED_DELETED, caption: this.getCaption(BylWorkloadTicketStatusEnum.CHECKED_DELETED)},
            // {value: BylWorkloadTicketStatusEnum.COMFIRMED_DELETED, caption: this.getCaption(BylWorkloadTicketStatusEnum.COMFIRMED_DELETED)}
            // {value: BylWorkloadTicketStatusEnum.SETTLEED_DELETED, caption: this.getCaption(BylWorkloadTicketStatusEnum.SETTLEED_DELETED)}
        ];
    }
    static getSFSelectDataArray(): BylSFRadioData[] {
        return [
            {value: BylWorkloadTicketStatusEnum.UNSUBMITED, label: this.getCaption(BylWorkloadTicketStatusEnum.UNSUBMITED)},
            {value: BylWorkloadTicketStatusEnum.SUBMITED, label: this.getCaption(BylWorkloadTicketStatusEnum.SUBMITED)},
            {value: BylWorkloadTicketStatusEnum.CHECKED, label: this.getCaption(BylWorkloadTicketStatusEnum.CHECKED)},
            // {value: BylWorkloadTicketStatusEnum.CONFIRMED, label: this.getCaption(BylWorkloadTicketStatusEnum.CONFIRMED)},
            {value: BylWorkloadTicketStatusEnum.SETTLED, label: this.getCaption(BylWorkloadTicketStatusEnum.SETTLED)},
            {value: BylWorkloadTicketStatusEnum.DELETED, label: this.getCaption(BylWorkloadTicketStatusEnum.DELETED)},
            {value: BylWorkloadTicketStatusEnum.SUBMITED_DELETED, label: this.getCaption(BylWorkloadTicketStatusEnum.SUBMITED_DELETED)},
            {value: BylWorkloadTicketStatusEnum.CHECKED_DELETED, label: this.getCaption(BylWorkloadTicketStatusEnum.CHECKED_DELETED)},
            // {value: BylWorkloadTicketStatusEnum.COMFIRMED_DELETED, label: this.getCaption(BylWorkloadTicketStatusEnum.COMFIRMED_DELETED)}
            // {value: BylWorkloadTicketStatusEnum.SETTLEED_DELETED, label: this.getCaption(BylWorkloadTicketStatusEnum.SETTLEED_DELETED)}
        ];

    }
}
