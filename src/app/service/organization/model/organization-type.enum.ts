
//组织类型


import {BylIStatusItem} from "../../model/status.model";
import {BylProjectStatusEnum} from "../../project/model/project-status.enum";
import {BylSFRadioData} from "../../../business/common/sf-relative";

export const enum BylOrganizationTypeEnum {
    UNKNOWN = -1,
    TEAM =  0,
    CORP = 1,
    GOV = 2,
    ASSOCIATION = 3

}

export class BylOrganizationTypeManager {

    static getCaption(status: number): string {
        switch (status) {
            case BylOrganizationTypeEnum.TEAM:
                return "团队";
            case BylOrganizationTypeEnum.CORP:
                return "公司";
            case BylOrganizationTypeEnum.GOV:
                return "政府";
            case BylOrganizationTypeEnum.ASSOCIATION:
                return "协会";
            case BylOrganizationTypeEnum.UNKNOWN:
                return "未知";

            default:
                return 'unknown';

        }

    }
    static getArray(): BylIStatusItem[] {
        return [
            {value: BylOrganizationTypeEnum.TEAM, caption: this.getCaption(BylOrganizationTypeEnum.TEAM)},
            {value: BylOrganizationTypeEnum.CORP, caption: this.getCaption(BylOrganizationTypeEnum.CORP)},
            {value: BylOrganizationTypeEnum.GOV, caption: this.getCaption(BylOrganizationTypeEnum.GOV)},
            {value: BylOrganizationTypeEnum.ASSOCIATION, caption: this.getCaption(BylOrganizationTypeEnum.ASSOCIATION)},
            {value: BylOrganizationTypeEnum.UNKNOWN, caption: this.getCaption(BylOrganizationTypeEnum.UNKNOWN)}
        ];
    }
    static getSFSelectDataArray(): BylSFRadioData[] {
        return [
            {value: BylOrganizationTypeEnum.TEAM, label: this.getCaption(BylOrganizationTypeEnum.TEAM)},
            {value: BylOrganizationTypeEnum.CORP, label: this.getCaption(BylOrganizationTypeEnum.CORP)},
            {value: BylOrganizationTypeEnum.GOV, label: this.getCaption(BylOrganizationTypeEnum.GOV)},
            {value: BylOrganizationTypeEnum.ASSOCIATION, label: this.getCaption(BylOrganizationTypeEnum.ASSOCIATION)},
            {value: BylOrganizationTypeEnum.UNKNOWN, label: this.getCaption(BylOrganizationTypeEnum.UNKNOWN)}
        ];

    }
}
