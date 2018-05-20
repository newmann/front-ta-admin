import {BylDatetimeUtils} from "../../utils/datetime.utils";

/**
 * @Description: 与后台交互的业务bean的通用属性定义
 *
 * @Author: newmannhu@qq.com
 * @Date：

 */
export class BylEmbeddableBorrowAction{

    borrowType: number;

    borrowId: string;
    borrowCode: string;
    borrowName: string;
    borrowDateTime: number;
    borrowDateTimeDateFormat: Date;
    // get borrowDateTimeDateFormat(): Date{
    //     return BylDatetimeUtils.formatMillsToDateTime(this.borrowDateTime);
    // }
    //
    // set borrowDateTimeDateFormat(value: Date){
    //     this.borrowDateTime = value.getMilliseconds();
    // }

    getBorrowerFullCaption() {
        if ((this.borrowCode) && (this.borrowName)) {
            return this.borrowName +"[" + this.borrowCode +"]";
        }else{
            return "[]";
        }

    }
}
