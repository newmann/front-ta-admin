/**
 * @Description:
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-05-26 8:01
 **/
import * as deepExtend from 'extend';

export  function deepCopy(obj: any) {
    const result = deepExtend(true, { }, { _: obj });
    return result._;
}

export  function simpleDeepCopy(target: any, source: any) {
    return deepExtend(true, target, source);
}
