/**
 * @Description: list界面查询条件
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-25 9:03
 **/

export class BylOperationPeriodQuery {
    code: string;
    name: string;
    // status = [BylProjectStatusEnum.UNSUBMITED,BylProjectStatusEnum.SUBMITED,BylProjectStatusEnum.RUNNING]; //缺省为未提交、已提交、运行中
    status: Array<number>;
    modifyDateBegin: number;
    modifyDateEnd: number;
}
