/**
 * @Description: 用来控制树形浏览窗口中显示数据，）
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-25 15:31
 **/

export class BylTreeListFormData<T>{
    level: number;
    expand: boolean;
    item: T;
    children?: BylTreeListFormData<T>[];
}
