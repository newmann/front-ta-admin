
//借款单类型定义


import {BylIStatusItem} from '../../model/status.model';
import {BylSFRadioData} from "../../../business/common/sf-relative";

export const enum BylEmployeeStatusEnum {
    UNSUBMITED = 1,
    SUBMITED = 2,
    CONFIRMED= 10,
    LOCKED = 20,
    DELETED = -1,
    SUBMITED_DELETED = -2,
    CONFIRMED_DELETED = -10,

    LEAVE = 100

}

export class BylEmployeeStatusManager {

    static getCaption(status: number): string {
        switch (status) {
            case BylEmployeeStatusEnum.UNSUBMITED:
                return '未提交';
            case BylEmployeeStatusEnum.SUBMITED:
                return '提交';
            case BylEmployeeStatusEnum.CONFIRMED:
                return '已确认';
            case BylEmployeeStatusEnum.LEAVE:
                return '离职';

            case BylEmployeeStatusEnum.LOCKED:
                return '锁定';
            case BylEmployeeStatusEnum.DELETED:
                return '删除';
            case BylEmployeeStatusEnum.SUBMITED_DELETED:
                return '提交后作废';
            case BylEmployeeStatusEnum.CONFIRMED_DELETED:
                return '确认后作废';
            default:
                return 'unknown';

        }

    }

    static getArray(): BylIStatusItem[] {
        return [
            {value: BylEmployeeStatusEnum.UNSUBMITED, caption: this.getCaption(BylEmployeeStatusEnum.UNSUBMITED)},
            {value: BylEmployeeStatusEnum.SUBMITED, caption: this.getCaption(BylEmployeeStatusEnum.SUBMITED)},
            {value: BylEmployeeStatusEnum.CONFIRMED, caption: this.getCaption(BylEmployeeStatusEnum.CONFIRMED)},
            {value: BylEmployeeStatusEnum.LEAVE, caption: this.getCaption(BylEmployeeStatusEnum.LEAVE)},

            {value: BylEmployeeStatusEnum.LOCKED, caption: this.getCaption(BylEmployeeStatusEnum.LOCKED)},
            {value: BylEmployeeStatusEnum.SUBMITED_DELETED, caption: this.getCaption(BylEmployeeStatusEnum.SUBMITED_DELETED)},
            {value: BylEmployeeStatusEnum.CONFIRMED_DELETED, caption: this.getCaption(BylEmployeeStatusEnum.CONFIRMED_DELETED)}

        ];
    }

    static getSFSelectDataArray(): BylSFRadioData[] {
        return [
            {value: BylEmployeeStatusEnum.UNSUBMITED, label: this.getCaption(BylEmployeeStatusEnum.UNSUBMITED)},
            {value: BylEmployeeStatusEnum.SUBMITED, label: this.getCaption(BylEmployeeStatusEnum.SUBMITED)},
            {value: BylEmployeeStatusEnum.CONFIRMED, label: this.getCaption(BylEmployeeStatusEnum.CONFIRMED)},
            {value: BylEmployeeStatusEnum.LEAVE, label: this.getCaption(BylEmployeeStatusEnum.LEAVE)},

            {value: BylEmployeeStatusEnum.LOCKED, label: this.getCaption(BylEmployeeStatusEnum.LOCKED)},
            {value: BylEmployeeStatusEnum.SUBMITED_DELETED, label: this.getCaption(BylEmployeeStatusEnum.SUBMITED_DELETED)},
            {value: BylEmployeeStatusEnum.CONFIRMED_DELETED, label: this.getCaption(BylEmployeeStatusEnum.CONFIRMED_DELETED)}
        ];

    }
}
