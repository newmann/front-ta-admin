
//项目状态类型定义


import {BylIStatusItem} from '../../model/status.model';
import {BylSFRadioData} from "../../../business/common/sf-relative";

export const enum BylProjectStatusEnum {
    //master data 统一的状态值
    UNSUBMITED = 1,
    SUBMITED = 2,
    CONFIRMED= 10,
    LOCKED = 20,
    DELETED = -1,
    SUBMITED_DELETED = -2,
    CONFIRMED_DELETED = -10,
    //项目自身个性化状态值
    RUNNING = 100,
    ACHIEVEMENT = 110,
    RUNNING_DELETED = -100

}

export class BylProjectStatusManager {

    static getCaption(status: number): string {
        switch (status) {
            case BylProjectStatusEnum.UNSUBMITED:
                return '未提交';
            case BylProjectStatusEnum.SUBMITED:
                return '已提交';
            case BylProjectStatusEnum.CONFIRMED:
                return '已确认';

            case BylProjectStatusEnum.RUNNING:
                return '运行中';
            case BylProjectStatusEnum.ACHIEVEMENT:
                return '已完成';
            case BylProjectStatusEnum.DELETED:
                return '删除';
            case BylProjectStatusEnum.SUBMITED_DELETED:
                return '提交后作废';
            case BylProjectStatusEnum.CONFIRMED_DELETED:
                return '确认后作废';

            case BylProjectStatusEnum.RUNNING_DELETED:
                return '运行中作废';
            default:
                return 'unknown';

        }

    }

    static getArray(): BylIStatusItem[] {
        return [
            {value: BylProjectStatusEnum.UNSUBMITED, caption: this.getCaption(BylProjectStatusEnum.UNSUBMITED)},
            {value: BylProjectStatusEnum.SUBMITED, caption: this.getCaption(BylProjectStatusEnum.SUBMITED)},
            {value: BylProjectStatusEnum.CONFIRMED, caption: this.getCaption(BylProjectStatusEnum.CONFIRMED)},
            {value: BylProjectStatusEnum.RUNNING, caption: this.getCaption(BylProjectStatusEnum.RUNNING)},
            {value: BylProjectStatusEnum.ACHIEVEMENT, caption: this.getCaption(BylProjectStatusEnum.ACHIEVEMENT)},
            {value: BylProjectStatusEnum.DELETED, caption: this.getCaption(BylProjectStatusEnum.DELETED)},
            {value: BylProjectStatusEnum.SUBMITED_DELETED, caption: this.getCaption(BylProjectStatusEnum.SUBMITED_DELETED)},
            {value: BylProjectStatusEnum.CONFIRMED_DELETED, caption: this.getCaption(BylProjectStatusEnum.CONFIRMED_DELETED)},
            {value: BylProjectStatusEnum.RUNNING_DELETED, caption: this.getCaption(BylProjectStatusEnum.RUNNING_DELETED)}
        ];
    }

    static getSFSelectDataArray(): BylSFRadioData[] {
        return [
            {value: BylProjectStatusEnum.UNSUBMITED, label: this.getCaption(BylProjectStatusEnum.UNSUBMITED)},
            {value: BylProjectStatusEnum.SUBMITED, label: this.getCaption(BylProjectStatusEnum.SUBMITED)},
            {value: BylProjectStatusEnum.CONFIRMED, label: this.getCaption(BylProjectStatusEnum.CONFIRMED)},
            {value: BylProjectStatusEnum.RUNNING, label: this.getCaption(BylProjectStatusEnum.RUNNING)},
            {value: BylProjectStatusEnum.ACHIEVEMENT, label: this.getCaption(BylProjectStatusEnum.ACHIEVEMENT)},
            {value: BylProjectStatusEnum.DELETED, label: this.getCaption(BylProjectStatusEnum.DELETED)},
            {value: BylProjectStatusEnum.SUBMITED_DELETED, label: this.getCaption(BylProjectStatusEnum.SUBMITED_DELETED)},
            {value: BylProjectStatusEnum.CONFIRMED_DELETED, label: this.getCaption(BylProjectStatusEnum.CONFIRMED_DELETED)},
            {value: BylProjectStatusEnum.RUNNING_DELETED, label: this.getCaption(BylProjectStatusEnum.RUNNING_DELETED)}
        ];

    }
}
