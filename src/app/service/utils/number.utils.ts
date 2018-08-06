/**
 * @Description: 关于金额等处理的一些通用过程
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-03 20:40
 **/


/**
 * 转化为两位小数，比如金额的角和分
 * @param {number} value
 * @returns {number}
 */
export function divideBy100AndPrecision2(value: number ): number {
    return Number((value / 100).toFixed(2));
}

/**
 * 将两位小数转化为整数,并取证
 * @param {number} value
 * @returns {number}
 */
export function multiplyBy100AndToInteger(value: number ): number {
    return Number((value * 100).toFixed(0));
}
