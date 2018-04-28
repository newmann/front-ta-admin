
//项目状态类型定义


import {BylIStatusItem} from '../../model/status.model';

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

    static getStatusCaption(status: number): string {
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

    static getStatusArray(): BylIStatusItem[] {
        return [
            {value: BylProjectStatusEnum.UNSUBMITED, caption: this.getStatusCaption(BylProjectStatusEnum.UNSUBMITED)},
            {value: BylProjectStatusEnum.SUBMITED, caption: this.getStatusCaption(BylProjectStatusEnum.SUBMITED)},
            {value: BylProjectStatusEnum.RUNNING, caption: this.getStatusCaption(BylProjectStatusEnum.RUNNING)},
            {value: BylProjectStatusEnum.ACHIEVEMENT, caption: this.getStatusCaption(BylProjectStatusEnum.ACHIEVEMENT)},
            {value: BylProjectStatusEnum.DELETED, caption: this.getStatusCaption(BylProjectStatusEnum.DELETED)},
            {value: BylProjectStatusEnum.SUBMITED_DELETED, caption: this.getStatusCaption(BylProjectStatusEnum.SUBMITED_DELETED)},
            {value: BylProjectStatusEnum.RUNNING_DELETED, caption: this.getStatusCaption(BylProjectStatusEnum.RUNNING_DELETED)}
        ];
    }
}
