/**
 * @Description: list界面查询条件
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-25 9:03
 **/

export class BylWorkTypeConfigTicketQuery {
    billNo: string;
    // projectId: string;

    status: Array<number> = [1,2, 10];
    modifyDateBegin: number = 0;
    modifyDateEnd: number = 0;
}
