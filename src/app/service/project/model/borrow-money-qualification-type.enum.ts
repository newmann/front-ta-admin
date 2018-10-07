
//借款单类型定义


import {BylIStatusItem} from '../../model/status.model';
import {BylSFRadioData} from "../../../business/common/sf-relative";
import {BylBusinessEntityTypeEnum} from "../../model/business-entity-type.enum";

export const enum BylBorrowMoneyQualificationTypeEnum {
    PERSON = 1,
    ORGANIZATION = 2,
    EMPLOYEE = 3
}

export class BylBorrowMoneyQualificationTypeManager {

    static getCaption(status: number): string {
        switch (status) {
            case BylBorrowMoneyQualificationTypeEnum.PERSON:
                return '个体';
            case BylBorrowMoneyQualificationTypeEnum.ORGANIZATION:
                return '组织';
            case BylBorrowMoneyQualificationTypeEnum.EMPLOYEE:
                return '员工';

            default:
                return 'unknown';

        }

    }
    static getArray(): BylIStatusItem[] {
        return [
            {value: BylBorrowMoneyQualificationTypeEnum.PERSON, caption: this.getCaption(BylBorrowMoneyQualificationTypeEnum.PERSON)},
            {value: BylBorrowMoneyQualificationTypeEnum.ORGANIZATION, caption: this.getCaption(BylBorrowMoneyQualificationTypeEnum.ORGANIZATION)},
            {value: BylBorrowMoneyQualificationTypeEnum.EMPLOYEE, caption: this.getCaption(BylBorrowMoneyQualificationTypeEnum.EMPLOYEE)}
        ];
    }
    static getSFSelectDataArray(): BylSFRadioData[] {
        return [
            {value: BylBorrowMoneyQualificationTypeEnum.PERSON, label: this.getCaption(BylBorrowMoneyQualificationTypeEnum.PERSON)},
            {value: BylBorrowMoneyQualificationTypeEnum.ORGANIZATION, label: this.getCaption(BylBorrowMoneyQualificationTypeEnum.ORGANIZATION)},
            {value: BylBorrowMoneyQualificationTypeEnum.EMPLOYEE, label: this.getCaption(BylBorrowMoneyQualificationTypeEnum.EMPLOYEE)}
        ];

    }
}
