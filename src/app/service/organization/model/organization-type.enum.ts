
//组织类型


import {BylIStatusItem} from "../../model/status.model";

export const enum BylOrganizationTypeEnum {
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

            default:
                return 'unknown';

        }

    }
    static getArray(): BylIStatusItem[] {
        return [
            {value: BylOrganizationTypeEnum.TEAM, caption: this.getCaption(BylOrganizationTypeEnum.TEAM)},
            {value: BylOrganizationTypeEnum.CORP, caption: this.getCaption(BylOrganizationTypeEnum.CORP)},
            {value: BylOrganizationTypeEnum.GOV, caption: this.getCaption(BylOrganizationTypeEnum.GOV)},
            {value: BylOrganizationTypeEnum.ASSOCIATION, caption: this.getCaption(BylOrganizationTypeEnum.ASSOCIATION)}

        ];
    }
}
