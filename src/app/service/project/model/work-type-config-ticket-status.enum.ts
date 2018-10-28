
//费用单类型定义


import {BylIStatusItem} from '../../model/status.model';
import {BylSFRadioData} from "../../../business/common/sf-relative";

export const enum BylWorkTypeConfigTicketStatusEnum {
    UNSUBMITED = 1,
    SUBMITED = 2,
    CHECKED = 10,
    // CONFIRMED = 20,
    // SETTLED = 30,
    DELETED = -1,
    SUBMITED_DELETED = -2,
    // CHECKED_DELETED = -10
}

export class BylWorkTypeConfigTicketStatusManager {

    static getCaption(status: number): string {
        switch (status) {
            case BylWorkTypeConfigTicketStatusEnum.UNSUBMITED:
                return '未提交';
            case BylWorkTypeConfigTicketStatusEnum.SUBMITED:
                return '已提交';
            case BylWorkTypeConfigTicketStatusEnum.CHECKED:
                return '已审核';
            // case BylWorkTypeConfigTicketStatusEnum.CONFIRMED:
            //     return '已确认';
            // case BylWorkTypeConfigTicketStatusEnum.SETTLED:
            //     return '已结算';
            case BylWorkTypeConfigTicketStatusEnum.DELETED:
                return '删除';
            case BylWorkTypeConfigTicketStatusEnum.SUBMITED_DELETED:
                return '提交后作废';
            // case BylWorkTypeConfigTicketStatusEnum.CHECKED_DELETED:
            //     return '审核后作废';
            // case BylWorkTypeConfigTicketStatusEnum.COMFIRMED_DELETED:
            //     return '确认后作废';
            // case BylWorkTypeConfigTicketStatusEnum.SETTLED_DELETED:
            //     return '结算后作废';

            default:
                return 'unknown';

        }

    }

    static getArray(): BylIStatusItem[] {
        return [
            {value: BylWorkTypeConfigTicketStatusEnum.UNSUBMITED, caption: this.getCaption(BylWorkTypeConfigTicketStatusEnum.UNSUBMITED)},
            {value: BylWorkTypeConfigTicketStatusEnum.SUBMITED, caption: this.getCaption(BylWorkTypeConfigTicketStatusEnum.SUBMITED)},
            {value: BylWorkTypeConfigTicketStatusEnum.CHECKED, caption: this.getCaption(BylWorkTypeConfigTicketStatusEnum.CHECKED)},
            // {value: BylWorkTypeConfigTicketStatusEnum.CONFIRMED, caption: this.getCaption(BylWorkTypeConfigTicketStatusEnum.CONFIRMED)},
            // {value: BylWorkTypeConfigTicketStatusEnum.SETTLED, caption: this.getCaption(BylWorkTypeConfigTicketStatusEnum.SETTLED)},
            {value: BylWorkTypeConfigTicketStatusEnum.DELETED, caption: this.getCaption(BylWorkTypeConfigTicketStatusEnum.DELETED)},
            {value: BylWorkTypeConfigTicketStatusEnum.SUBMITED_DELETED, caption: this.getCaption(BylWorkTypeConfigTicketStatusEnum.SUBMITED_DELETED)},
            // {value: BylWorkTypeConfigTicketStatusEnum.CHECKED_DELETED, caption: this.getCaption(BylWorkTypeConfigTicketStatusEnum.CHECKED_DELETED)},
            // {value: BylWorkTypeConfigTicketStatusEnum.COMFIRMED_DELETED, caption: this.getCaption(BylWorkTypeConfigTicketStatusEnum.COMFIRMED_DELETED)}
            // {value: BylWorkTypeConfigTicketStatusEnum.SETTLED_DELETED, caption: this.getCaption(BylWorkTypeConfigTicketStatusEnum.SETTLED_DELETED)}
        ];
    }
    static getSFSelectDataArray(): BylSFRadioData[] {
        return [
            {value: BylWorkTypeConfigTicketStatusEnum.UNSUBMITED, label: this.getCaption(BylWorkTypeConfigTicketStatusEnum.UNSUBMITED)},
            {value: BylWorkTypeConfigTicketStatusEnum.SUBMITED, label: this.getCaption(BylWorkTypeConfigTicketStatusEnum.SUBMITED)},
            {value: BylWorkTypeConfigTicketStatusEnum.CHECKED, label: this.getCaption(BylWorkTypeConfigTicketStatusEnum.CHECKED)},
            // {value: BylWorkTypeConfigTicketStatusEnum.CONFIRMED, label: this.getCaption(BylWorkTypeConfigTicketStatusEnum.CONFIRMED)},
            // {value: BylWorkTypeConfigTicketStatusEnum.SETTLED, label: this.getCaption(BylWorkTypeConfigTicketStatusEnum.SETTLED)},
            {value: BylWorkTypeConfigTicketStatusEnum.DELETED, label: this.getCaption(BylWorkTypeConfigTicketStatusEnum.DELETED)},
            {value: BylWorkTypeConfigTicketStatusEnum.SUBMITED_DELETED, label: this.getCaption(BylWorkTypeConfigTicketStatusEnum.SUBMITED_DELETED)},
            // {value: BylWorkTypeConfigTicketStatusEnum.CHECKED_DELETED, label: this.getCaption(BylWorkTypeConfigTicketStatusEnum.CHECKED_DELETED)},
            // {value: BylWorkTypeConfigTicketStatusEnum.COMFIRMED_DELETED, label: this.getCaption(BylWorkTypeConfigTicketStatusEnum.COMFIRMED_DELETED)}
            // {value: BylWorkTypeConfigTicketStatusEnum.SETTLED_DELETED, label: this.getCaption(BylWorkTypeConfigTicketStatusEnum.SETTLED_DELETED)}
        ];

    }
}
