/**
 * @Description: 引用实体定义，一般包括id，code，name
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-04-24 20:30
 **/

export class BylEntityReference{
    id: string;
    code: string;
    name: string;
    constructor(id: string,
                code: string,
                name: string ){
        this.id = id;
        this.code = code;
        this.name = name;
    }


    getFullCaption() {
        if ((this.code) && (this.name)) {
            return this.name +"[" + this.code +"]";
        }else{
            return "[]";
        }

    }
}
