
//项目状态类型定义


import {BylIStatusItem} from '../../model/status.model';
import {BylSFRadioData} from "../../../business/common/sf-relative";

export const enum BylProjectStatusEnum {
    UNSUBMITED = 1,
    SUBMITED = 2,
    RUNNING = 10,
    ACHIEVEMENT = 20,
    DELETED = -1,
    SUBMITED_DELETED = -2,
    RUNNING_DELETED = -10
}

export class BylProjectStatusManager {

    static getCaption(status: number): string {
        switch (status) {
            case BylProjectStatusEnum.UNSUBMITED:
                return '未提交';
            case BylProjectStatusEnum.SUBMITED:
                return '已提交';
            case BylProjectStatusEnum.RUNNING:
                return '运行中';
            case BylProjectStatusEnum.ACHIEVEMENT:
                return '已完成';
            case BylProjectStatusEnum.DELETED:
                return '删除';
            case BylProjectStatusEnum.SUBMITED_DELETED:
                return '提交后作废';
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
            {value: BylProjectStatusEnum.RUNNING, caption: this.getCaption(BylProjectStatusEnum.RUNNING)},
            {value: BylProjectStatusEnum.ACHIEVEMENT, caption: this.getCaption(BylProjectStatusEnum.ACHIEVEMENT)},
            {value: BylProjectStatusEnum.DELETED, caption: this.getCaption(BylProjectStatusEnum.DELETED)},
            {value: BylProjectStatusEnum.SUBMITED_DELETED, caption: this.getCaption(BylProjectStatusEnum.SUBMITED_DELETED)},
            {value: BylProjectStatusEnum.RUNNING_DELETED, caption: this.getCaption(BylProjectStatusEnum.RUNNING_DELETED)}
        ];
    }

    static getSFSelectDataArray(): BylSFRadioData[] {
        return [
            {value: BylProjectStatusEnum.UNSUBMITED, label: this.getCaption(BylProjectStatusEnum.UNSUBMITED)},
            {value: BylProjectStatusEnum.SUBMITED, label: this.getCaption(BylProjectStatusEnum.SUBMITED)},
            {value: BylProjectStatusEnum.RUNNING, label: this.getCaption(BylProjectStatusEnum.RUNNING)},
            {value: BylProjectStatusEnum.ACHIEVEMENT, label: this.getCaption(BylProjectStatusEnum.ACHIEVEMENT)},
            {value: BylProjectStatusEnum.DELETED, label: this.getCaption(BylProjectStatusEnum.DELETED)},
            {value: BylProjectStatusEnum.SUBMITED_DELETED, label: this.getCaption(BylProjectStatusEnum.SUBMITED_DELETED)},
            {value: BylProjectStatusEnum.RUNNING_DELETED, label: this.getCaption(BylProjectStatusEnum.RUNNING_DELETED)}
        ];

    }
}
