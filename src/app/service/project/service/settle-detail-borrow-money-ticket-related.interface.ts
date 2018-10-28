import {Observable} from 'rxjs';
import {BylResultBody} from '../../model/result-body.model';
import {BylPageReq} from "../../model/page-req.model";
import {BylPageResp} from "../../model/page-resp.model";
import {BylWorkloadDetail} from "../model/workload-detail.model";
import {BylPermission} from "../../account/model/permission.model";
import {BylSettleDetailWorkloadTicket} from "../model/settle-detail-workload-ticket.model";
import {BylSettleDetailBorrowMoneyTicket} from "../model/settle-detail-borrow-money-ticket.model";


export interface BylSettleDetailBorrowMoneyTicketAvailablePoolsInterface {

    /**
     * 按分页方式返回不同查询条件下的值
     * @returns {Observable<BylResultBody<BylLoginResultModel>>}
     */
    findAvailableSettleDetailBorrowMoneyTicketPoolsPage(query: any, page: BylPageReq, masterId?: string): Observable<BylResultBody<BylPageResp<BylSettleDetailBorrowMoneyTicket>>>;

}
