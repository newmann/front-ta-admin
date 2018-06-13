import {BylDatetimeUtils} from "../../utils/datetime.utils";

/**
 * @Description: 与后台交互的业务bean的通用属性定义
 *
 * @Author: newmannhu@qq.com
 * @Date：

 */
export class BylEmbeddableOperationPeriod{
    operatonPeriodId: string;
    operatonPeriodCode: string;
    operatonPeriodName: string;
    operatonPeriodBeginDate: number;
    operatonPeriodEndDate: number;

    get getFullCaption(): string{
        if(this.operatonPeriodId){
            return this.operatonPeriodName + "["
                + BylDatetimeUtils.formatDate(this.operatonPeriodBeginDate)
                + ' - '
                + BylDatetimeUtils.formatDate(this.operatonPeriodEndDate)
                + ']';
        }else{
            return null;
        }
    }
}
