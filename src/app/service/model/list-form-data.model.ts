/**
 * @Description: 用来控制浏览窗口中显示数据，在一般正常的数据基础上，添加checked（是否被选择）、disabled(是否可以选择）
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-25 15:31
 **/

export class ListFormData<T>{
    checked: boolean;
    disabled: boolean;
    item: T;
}
