import {Observable} from 'rxjs';
import {BylResultBody} from '../../model/result-body.model';
import {BylPageReq} from "../../model/page-req.model";
import {BylPageResp} from "../../model/page-resp.model";
import {BylWorkloadDetail} from "../model/workload-detail.model";
import {BylPermission} from "../../account/model/permission.model";
import {BylSettleDetailWorkloadTicket} from "../model/settle-detail-workload-ticket.model";


export interface BylSettleDetailWorkloadTicketAvailablePoolsInterface {

    /**
     * 按分页方式返回不同查询条件下的值
     * @returns {Observable<BylResultBody<BylLoginResultModel>>}
     */
    findAvailableSettleDetailWorkloadTicketPoolsPage(query: any, page: BylPageReq, masterId?: string): Observable<BylResultBody<BylPageResp<BylSettleDetailWorkloadTicket>>>;

}
