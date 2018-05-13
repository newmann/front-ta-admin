/**
 * @Description: 与后台交互的业务bean的通用属性定义
 *
 * @Author: newmannhu@qq.com
 * @Date：

 */
import {BylDatetimeUtils} from "../utils/datetime.utils";

export class BylEmbeddableModifyAction{
    modifyId: string;
    modifyCode: string;
    modifyName: string;
    modifyDateTime: number;
    get modifyDateTimeStr(): string{
        return BylDatetimeUtils.formatDateTime(this.modifyDateTime);
    }
}
