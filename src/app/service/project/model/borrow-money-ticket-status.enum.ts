
//借款单类型定义


import {BylIStatusItem} from '../../model/status.model';

export const enum BylBorrowMoneyTicketStatusEnum {
    UNSUBMITED = 1,
    SUBMITED = 2,
    CHECKED = 10,
    CONFIRMED = 20,
    SETTLED = 30,
    DELETED = -1,
    SUBMITED_DELETED = -2,
    CHECKED_DELETED = -10,
    COMFIRMED_DELETED = -20
}

export class BylBorrowMoneyTicketStatusManager {

    static getStatusCaption(status: number): string {
        switch (status) {
            case BylBorrowMoneyTicketStatusEnum.UNSUBMITED:
                return '未提交';
            case BylBorrowMoneyTicketStatusEnum.SUBMITED:
                return '已提交';
            case BylBorrowMoneyTicketStatusEnum.CHECKED:
                return '已审核';
            case BylBorrowMoneyTicketStatusEnum.CONFIRMED:
                return '已确认';
            case BylBorrowMoneyTicketStatusEnum.SETTLED:
                return '已结算';
            case BylBorrowMoneyTicketStatusEnum.DELETED:
                return '删除';
            case BylBorrowMoneyTicketStatusEnum.SUBMITED_DELETED:
                return '提交后作废';
            case BylBorrowMoneyTicketStatusEnum.CHECKED_DELETED:
                return '审核后作废';
            case BylBorrowMoneyTicketStatusEnum.COMFIRMED_DELETED:
                return '确认后作废';
            default:
                return 'unknown';

        }

    }

    static getStatusArray(): BylIStatusItem[] {
        return [
            {value: BylBorrowMoneyTicketStatusEnum.UNSUBMITED, label: this.getStatusCaption(BylBorrowMoneyTicketStatusEnum.UNSUBMITED)},
            {value: BylBorrowMoneyTicketStatusEnum.SUBMITED, label: this.getStatusCaption(BylBorrowMoneyTicketStatusEnum.SUBMITED)},
            {value: BylBorrowMoneyTicketStatusEnum.CHECKED, label: this.getStatusCaption(BylBorrowMoneyTicketStatusEnum.CHECKED)},
            {value: BylBorrowMoneyTicketStatusEnum.CONFIRMED, label: this.getStatusCaption(BylBorrowMoneyTicketStatusEnum.CONFIRMED)},
            {value: BylBorrowMoneyTicketStatusEnum.SETTLED, label: this.getStatusCaption(BylBorrowMoneyTicketStatusEnum.SETTLED)},
            {value: BylBorrowMoneyTicketStatusEnum.DELETED, label: this.getStatusCaption(BylBorrowMoneyTicketStatusEnum.DELETED)},
            {value: BylBorrowMoneyTicketStatusEnum.SUBMITED_DELETED, label: this.getStatusCaption(BylBorrowMoneyTicketStatusEnum.SUBMITED_DELETED)},
            {value: BylBorrowMoneyTicketStatusEnum.CHECKED_DELETED, label: this.getStatusCaption(BylBorrowMoneyTicketStatusEnum.CHECKED_DELETED)},
            {value: BylBorrowMoneyTicketStatusEnum.COMFIRMED_DELETED, label: this.getStatusCaption(BylBorrowMoneyTicketStatusEnum.COMFIRMED_DELETED)}
        ];
    }
}
