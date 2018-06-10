
//单据的共性状态，由于enum不能继承，所以这个状态仅仅用于基类的处理，
import {BylIStatusItem} from './status.model';
import {BylSFRadioData} from "../../business/common/sf-relative";

export const enum BylTicketStatusEnum {
    UNSUBMITED = 1,
    SUBMITED = 2,
    CHECKED= 10,
    DELETED = -1,
    SUBMITED_DELETED = -2,
    CHECKED_DELETED = -10
}

export class BylTicketStatusManager {

    static getCaption(status: number): string {
        switch (status) {
            case BylTicketStatusEnum.UNSUBMITED:
                return '未提交';
            case BylTicketStatusEnum.SUBMITED:
                return '提交';
            case BylTicketStatusEnum.CHECKED:
                return '审核';
            case BylTicketStatusEnum.DELETED:
                return '删除';
            case BylTicketStatusEnum.SUBMITED_DELETED:
                return '提交后作废';
            case BylTicketStatusEnum.CHECKED_DELETED:
                return '审核后作废';

            default:
                return 'unknown';

        }

    }

    static getArray(): BylIStatusItem[] {
        return [
            {value: BylTicketStatusEnum.UNSUBMITED, caption: this.getCaption(BylTicketStatusEnum.UNSUBMITED)},
            {value: BylTicketStatusEnum.SUBMITED, caption: this.getCaption(BylTicketStatusEnum.SUBMITED)},
            {value: BylTicketStatusEnum.CHECKED, caption: this.getCaption(BylTicketStatusEnum.CHECKED)},
            {value: BylTicketStatusEnum.CHECKED_DELETED, caption: this.getCaption(BylTicketStatusEnum.CHECKED_DELETED)},
            {value: BylTicketStatusEnum.SUBMITED_DELETED, caption: this.getCaption(BylTicketStatusEnum.SUBMITED_DELETED)}
        ];
    }

    static getSFSelectDataArray(): BylSFRadioData[] {
        return [
            {value: BylTicketStatusEnum.UNSUBMITED, label: this.getCaption(BylTicketStatusEnum.UNSUBMITED)},
            {value: BylTicketStatusEnum.SUBMITED, label: this.getCaption(BylTicketStatusEnum.SUBMITED)},
            {value: BylTicketStatusEnum.CHECKED, label: this.getCaption(BylTicketStatusEnum.CHECKED)},
            {value: BylTicketStatusEnum.CHECKED_DELETED, label: this.getCaption(BylTicketStatusEnum.CHECKED_DELETED)},
            {value: BylTicketStatusEnum.SUBMITED_DELETED, label: this.getCaption(BylTicketStatusEnum.SUBMITED_DELETED)}
        ];

    }
}
