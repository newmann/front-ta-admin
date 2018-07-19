/**
 * @Description: 树的结构模型
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 15:21
 **/

export class BylTreeDispalyModel<T>{
    //用来给node tree展示用
    key: string;
    title: string;
    halfChecked: boolean;
    checked: boolean;
    disableCheckbox: boolean;
    hasChildren: boolean;
    children: Array<BylTreeDispalyModel<T>> = [] ;

    //具体对象的数据
    item : T;
}

