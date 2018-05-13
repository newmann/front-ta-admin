
//组织类型


import {BylIStatusItem} from "../../model/status.model";

export const enum BylOrganizationTypeEnum {
    TEAM =  0,
    CORP = 1,
    GOV = 2,
    ASSOCIATION = 3

}

export class BylOrganizationTypeManager {

    static getStatusCaption(status: number): string {
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
    static getStatusArray(): BylIStatusItem[] {
        return [
            {value: BylOrganizationTypeEnum.TEAM, label: this.getStatusCaption(BylOrganizationTypeEnum.TEAM)},
            {value: BylOrganizationTypeEnum.CORP, label: this.getStatusCaption(BylOrganizationTypeEnum.CORP)},
            {value: BylOrganizationTypeEnum.GOV, label: this.getStatusCaption(BylOrganizationTypeEnum.GOV)},
            {value: BylOrganizationTypeEnum.ASSOCIATION, label: this.getStatusCaption(BylOrganizationTypeEnum.ASSOCIATION)}

        ];
    }
}
