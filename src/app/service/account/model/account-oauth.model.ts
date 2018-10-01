/**
 * @Description: 账户与第三方账户的关联
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-03 10:57
 **/
import {BylBaseModel} from "../../model/base.model";


export class BylAccountOauth extends BylBaseModel{
    userId: string;
    providerId: string;
    providerUserId: string;
    rank: number;
    displayName: string;
    profileUrl: string;
    imageUrl: string;
    accessToken: string;
    secret: string;
    refreshToken: string;
    expireTime: string;
}

