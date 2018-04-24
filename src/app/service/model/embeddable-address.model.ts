/**
 * @Description: 与后台交互的业务bean的通用属性定义
 *
 * @Author: newmannhu@qq.com
 * @Date：

 */
export class BylEmbeddableAddress{

    countryId: string;
    countryCode: string;
    countryName: string;
    provinceId: string;
    provinceCode: string;
    provinceName: string;
    cityId: string;
    cityCode: string;
    cityName: string;
    detailAddress: string;
    zipCode: string;

    get fullAddress(): string{
        let result = "";
        if (this.countryName) result = result +this.countryName;
        if ( this.provinceName) result = result + "/" + this.provinceName;
        if (this.cityName) result = result +"/" + this.cityName;
        if ( this.detailAddress ) result = result + "/" + this.detailAddress;
        if ( this.zipCode ) result = result + "/" + this.zipCode;
        return result;
    }
}
