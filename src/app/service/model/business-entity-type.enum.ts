
//最主要的实体类型定义
import {BylIStatusItem} from './status.model';

export const enum BylBusinessEntityTypeEnum {
    PERSON = 1,
    ORGANIZATION = 2
}

export class BylBusinessEntityTypeManager {

    static getStatusCaption(status: number): string {
        switch (status) {
            case BylBusinessEntityTypeEnum.PERSON:
                return '个体';
            case BylBusinessEntityTypeEnum.ORGANIZATION:
                return '组织';
            default:
                return 'unknown';

        }

    }

    static getStatusArray(): BylIStatusItem[] {
        return [
            {value: BylBusinessEntityTypeEnum.PERSON, caption: this.getStatusCaption(BylBusinessEntityTypeEnum.PERSON)},
            {value: BylBusinessEntityTypeEnum.ORGANIZATION, caption: this.getStatusCaption(BylBusinessEntityTypeEnum.ORGANIZATION)}
        ];
    }
}
