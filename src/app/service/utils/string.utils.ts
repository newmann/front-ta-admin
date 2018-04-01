/**
 * @Description: 关于字符处理的一些通用过程
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-03 20:40
 **/


/**
 * 获取邮箱中含有的用户名称
 * @param {string} email
 * @returns {string}
 */
export function getEmailName(email: string): string{
    let pos = email.indexOf('@');
    return email.substr(0,pos);
}

/**
 * 拼接代码+名称字符串
 * @param {string} code
 * @param {string} name
 * @returns {string}
 */
export function mixCodeName(code: string, name: string): string{
    return name + '(' + code + ')';
}
