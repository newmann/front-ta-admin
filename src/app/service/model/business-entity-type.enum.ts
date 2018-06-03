
//最主要的实体类型定义
import {BylIStatusItem} from './status.model';
import {BylSFRadioData} from "../../business/common/sf-relative";

export const enum BylBusinessEntityTypeEnum {
    PERSON = 1,
    ORGANIZATION = 2
}

export class BylBusinessEntityTypeManager {

    static getCaption(status: number): string {
        switch (status) {
            case BylBusinessEntityTypeEnum.PERSON:
                return '个体';
            case BylBusinessEntityTypeEnum.ORGANIZATION:
                return '组织';
            default:
                return 'unknown';

        }

    }
    static getArray(): BylIStatusItem[] {
        return [
            {value: BylBusinessEntityTypeEnum.PERSON, caption: this.getCaption(BylBusinessEntityTypeEnum.PERSON)},
            {value: BylBusinessEntityTypeEnum.ORGANIZATION, caption: this.getCaption(BylBusinessEntityTypeEnum.ORGANIZATION)}
        ];
    }
    static getSFSelectDataArray(): BylSFRadioData[] {
        return [
            {value: BylBusinessEntityTypeEnum.PERSON, label: this.getCaption(BylBusinessEntityTypeEnum.PERSON)},
            {value: BylBusinessEntityTypeEnum.ORGANIZATION, label: this.getCaption(BylBusinessEntityTypeEnum.ORGANIZATION)}
        ];

    }
}
