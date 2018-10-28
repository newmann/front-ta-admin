/**
 * @Description: 关于字符处理的一些通用过程
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-03 20:40
 **/


import {BYL_URL_MOBILE_TAG} from '../constant/general.constant';

export class BylStringUtils {

    /**
     * 获取邮箱中含有的用户名称
     * @param {string} email
     * @returns {string}
     */
    static getEmailName(email: string): string {
        let pos = email.indexOf('@');
        return email.substr(0, pos);
    }

    /**
     * 拼接代码+名称字符串
     * @param {string} code
     * @param {string} name
     * @returns {string}
     */

    static mixCodeName(code: string, name: string): string {
        return name + ' [' + code + ']';
    }

    /**
     *  判断是否为mobile对应的url
     * @param {string} url
     * @returns {boolean}
     */
    static isMobileUrl(url: string): boolean {

        return url.substr(0, BYL_URL_MOBILE_TAG.length) === BYL_URL_MOBILE_TAG;

    }

    /**
     *  生成移动的路径链接
     * @param {string} url
     * @returns {string}
     */
    static genMobileUrl(url: string): string {
        return BYL_URL_MOBILE_TAG + url;
    }

    static removeMobileTag(url: string): string {
        if (this.isMobileUrl(url)) {
            return url.substring(BYL_URL_MOBILE_TAG.length);
        } else {
            return url;
        }
    }

    static isEmpty(value: undefined | null | string): boolean {
        if (typeof(value) === 'undefined') return true;

        if (value === null) return true;

        if (value.length === 0) return true;

        return false;

    }

    static isNotEmpty(value: undefined | null | string): boolean {
        return !(this.isEmpty(value));
    }
}
