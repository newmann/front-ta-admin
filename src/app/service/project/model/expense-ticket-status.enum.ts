
//费用单类型定义


import {BylIStatusItem} from '../../model/status.model';

export const enum BylExpenseTicketStatusEnum {
    UNSUBMITED = 1,
    SUBMITED = 2,
    CHECKED = 10,
    // CONFIRMED = 20,
    SETTLED = 30,
    DELETED = -1,
    SUBMITED_DELETED = -2,
    CHECKED_DELETED = -10,
    SETTLEED_DELETED = -30
}

export class BylExpenseTicketStatusManager {

    static getStatusCaption(status: number): string {
        switch (status) {
            case BylExpenseTicketStatusEnum.UNSUBMITED:
                return '未提交';
            case BylExpenseTicketStatusEnum.SUBMITED:
                return '已提交';
            case BylExpenseTicketStatusEnum.CHECKED:
                return '已审核';
            // case BylExpenseTicketStatusEnum.CONFIRMED:
            //     return '已确认';
            case BylExpenseTicketStatusEnum.SETTLED:
                return '已结算';
            case BylExpenseTicketStatusEnum.DELETED:
                return '删除';
            case BylExpenseTicketStatusEnum.SUBMITED_DELETED:
                return '提交后作废';
            case BylExpenseTicketStatusEnum.CHECKED_DELETED:
                return '审核后作废';
            // case BylExpenseTicketStatusEnum.COMFIRMED_DELETED:
            //     return '确认后作废';
            case BylExpenseTicketStatusEnum.SETTLEED_DELETED:
                return '结算后作废';

            default:
                return 'unknown';

        }

    }

    static getStatusArray(): BylIStatusItem[] {
        return [
            {value: BylExpenseTicketStatusEnum.UNSUBMITED, label: this.getStatusCaption(BylExpenseTicketStatusEnum.UNSUBMITED)},
            {value: BylExpenseTicketStatusEnum.SUBMITED, label: this.getStatusCaption(BylExpenseTicketStatusEnum.SUBMITED)},
            {value: BylExpenseTicketStatusEnum.CHECKED, label: this.getStatusCaption(BylExpenseTicketStatusEnum.CHECKED)},
            // {value: BylExpenseTicketStatusEnum.CONFIRMED, label: this.getStatusCaption(BylExpenseTicketStatusEnum.CONFIRMED)},
            {value: BylExpenseTicketStatusEnum.SETTLED, label: this.getStatusCaption(BylExpenseTicketStatusEnum.SETTLED)},
            {value: BylExpenseTicketStatusEnum.DELETED, label: this.getStatusCaption(BylExpenseTicketStatusEnum.DELETED)},
            {value: BylExpenseTicketStatusEnum.SUBMITED_DELETED, label: this.getStatusCaption(BylExpenseTicketStatusEnum.SUBMITED_DELETED)},
            {value: BylExpenseTicketStatusEnum.CHECKED_DELETED, label: this.getStatusCaption(BylExpenseTicketStatusEnum.CHECKED_DELETED)},
            // {value: BylExpenseTicketStatusEnum.COMFIRMED_DELETED, label: this.getStatusCaption(BylExpenseTicketStatusEnum.COMFIRMED_DELETED)}
            {value: BylExpenseTicketStatusEnum.SETTLEED_DELETED, label: this.getStatusCaption(BylExpenseTicketStatusEnum.SETTLEED_DELETED)}
        ];
    }
}
