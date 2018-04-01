import {FormGroup} from "@angular/forms";
import {Input} from "@angular/core";

/**
 * @Description: crud组件对象的抽象类
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 9:46
 **/

export class BylCrudBase{
    public form: FormGroup;
    public loading = false;
    public errMsg = '';  // 保存时错误信息
    public savingReveal: any;
    public sourceId: string;
    public processType: string;


}
