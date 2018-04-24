/**
 * @Description: 与后台交互的业务bean的通用属性定义
 *
 * @Author: newmannhu@qq.com
 * @Date：

 */
export class BylEmbeddableContactMethod {
    contactId: string;
    contactCode: string;
    contactName: string;
    contactCountryId: string;
    contactCountryCode: string;
    contactCountryName: string;
    contactProvinceId: string;
    contactProvinceCode: string;
    contactProvinceName: string;
    contactCityId: string;
    contactCityCode: string;
    contactCityName: string;
    contactDetailAddress: string;
    contactZipCode: string;
    contactPhone: string;
    contactEmail: string;

    get fullContactMethod(): string {
        let result = '';
        if (this.contactCode) result = result + this.contactCode;
        if (this.contactName) result = result + this.contactName;
        if (this.contactCountryName) result = result + this.contactCountryName;
        if (this.contactProvinceName) result = result + '/' + this.contactProvinceName;
        if (this.contactCityName) result = result + '/' + this.contactCityName;
        if (this.contactDetailAddress) result = result + '/' + this.contactDetailAddress;
        if (this.contactZipCode) result = result + '/' + this.contactZipCode;
        if (this.contactPhone) result = result + '/' + this.contactPhone;
        if (this.contactEmail) result = result + '/' + this.contactEmail;
        return result;
    }
}
