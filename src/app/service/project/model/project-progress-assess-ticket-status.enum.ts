
//借款单类型定义


import {BylIStatusItem} from '../../model/status.model';
import {BylSFRadioData} from "../../../business/common/sf-relative";

export const enum BylProjectProgressAssessTicketStatusEnum {
    UNSUBMITED = 1,
    SUBMITED = 2,
    CHECKED = 10,
    // CONFIRMED = 20,
    SETTLED = 30,
    DELETED = -1,
    SUBMITED_DELETED = -2,
    CHECKED_DELETED = -10,
    // COMFIRMED_DELETED = -20
}

export class BylProjectProgressAssessTicketStatusManager {

    static getCaption(status: number): string {
        switch (status) {
            case BylProjectProgressAssessTicketStatusEnum.UNSUBMITED:
                return '未提交';
            case BylProjectProgressAssessTicketStatusEnum.SUBMITED:
                return '已提交';
            case BylProjectProgressAssessTicketStatusEnum.CHECKED:
                return '已审核';
            // case BylProjectProgressAssessTicketStatusEnum.CONFIRMED:
            //     return '已确认';
            case BylProjectProgressAssessTicketStatusEnum.SETTLED:
                return '已结算';
            case BylProjectProgressAssessTicketStatusEnum.DELETED:
                return '删除';
            case BylProjectProgressAssessTicketStatusEnum.SUBMITED_DELETED:
                return '提交后作废';
            case BylProjectProgressAssessTicketStatusEnum.CHECKED_DELETED:
                return '审核后作废';
            // case BylProjectProgressAssessTicketStatusEnum.COMFIRMED_DELETED:
            //     return '确认后作废';
            default:
                return 'unknown';

        }

    }

    static getArray(): BylIStatusItem[] {
        return [
            {value: BylProjectProgressAssessTicketStatusEnum.UNSUBMITED, caption: this.getCaption(BylProjectProgressAssessTicketStatusEnum.UNSUBMITED)},
            {value: BylProjectProgressAssessTicketStatusEnum.SUBMITED, caption: this.getCaption(BylProjectProgressAssessTicketStatusEnum.SUBMITED)},
            {value: BylProjectProgressAssessTicketStatusEnum.CHECKED, caption: this.getCaption(BylProjectProgressAssessTicketStatusEnum.CHECKED)},
            // {value: BylProjectProgressAssessTicketStatusEnum.CONFIRMED, caption: this.getCaption(BylProjectProgressAssessTicketStatusEnum.CONFIRMED)},
            {value: BylProjectProgressAssessTicketStatusEnum.SETTLED, caption: this.getCaption(BylProjectProgressAssessTicketStatusEnum.SETTLED)},
            {value: BylProjectProgressAssessTicketStatusEnum.DELETED, caption: this.getCaption(BylProjectProgressAssessTicketStatusEnum.DELETED)},
            {value: BylProjectProgressAssessTicketStatusEnum.SUBMITED_DELETED, caption: this.getCaption(BylProjectProgressAssessTicketStatusEnum.SUBMITED_DELETED)},
            {value: BylProjectProgressAssessTicketStatusEnum.CHECKED_DELETED, caption: this.getCaption(BylProjectProgressAssessTicketStatusEnum.CHECKED_DELETED)},
            // {value: BylProjectProgressAssessTicketStatusEnum.COMFIRMED_DELETED, caption: this.getCaption(BylProjectProgressAssessTicketStatusEnum.COMFIRMED_DELETED)}
        ];
    }
    static getSFSelectDataArray(): BylSFRadioData[] {
        return [
            {value: BylProjectProgressAssessTicketStatusEnum.UNSUBMITED, label: this.getCaption(BylProjectProgressAssessTicketStatusEnum.UNSUBMITED)},
            {value: BylProjectProgressAssessTicketStatusEnum.SUBMITED, label: this.getCaption(BylProjectProgressAssessTicketStatusEnum.SUBMITED)},
            {value: BylProjectProgressAssessTicketStatusEnum.CHECKED, label: this.getCaption(BylProjectProgressAssessTicketStatusEnum.CHECKED)},
            // {value: BylProjectProgressAssessTicketStatusEnum.CONFIRMED, label: this.getCaption(BylProjectProgressAssessTicketStatusEnum.CONFIRMED)},
            {value: BylProjectProgressAssessTicketStatusEnum.SETTLED, label: this.getCaption(BylProjectProgressAssessTicketStatusEnum.SETTLED)},
            {value: BylProjectProgressAssessTicketStatusEnum.DELETED, label: this.getCaption(BylProjectProgressAssessTicketStatusEnum.DELETED)},
            {value: BylProjectProgressAssessTicketStatusEnum.SUBMITED_DELETED, label: this.getCaption(BylProjectProgressAssessTicketStatusEnum.SUBMITED_DELETED)},
            {value: BylProjectProgressAssessTicketStatusEnum.CHECKED_DELETED, label: this.getCaption(BylProjectProgressAssessTicketStatusEnum.CHECKED_DELETED)},
            // {value: BylProjectProgressAssessTicketStatusEnum.COMFIRMED_DELETED, label: this.getCaption(BylProjectProgressAssessTicketStatusEnum.COMFIRMED_DELETED)}
        ];

    }
}
