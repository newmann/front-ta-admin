import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';


import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';
import {BylDetailBaseService} from "../../service/detail-base.service";
import {BylSettleDetailBorrowMoneyTicket} from "../model/settle-detail-borrow-money-ticket.model";
import {BylSettleDetailBorrowMoneyTicketAvailablePoolsInterface} from "./settle-detail-borrow-money-ticket-related.interface";
import {BylPageReq} from "../../model/page-req.model";
import {BylPageResp} from "../../model/page-resp.model";
import {BylResultBody} from "../../model/result-body.model";
import {Observable} from "rxjs/Rx";
import {BylEntityRelationAvailablePoolsQueryReqBody} from "../../account/model/entity-relation-available-pools-query-req-body.model";
import {BylSettleDetailWorkloadTicket} from "../model/settle-detail-workload-ticket.model";
import {BylSettleTicket} from "../model/settle-ticket.model";


/**
 * @Description:
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylSettleDetailBorrowMoneyTicketService
    extends BylDetailBaseService<BylSettleDetailBorrowMoneyTicket,BylSettleTicket>
    implements BylSettleDetailBorrowMoneyTicketAvailablePoolsInterface

{

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/project/settle-detail-borrow-money-ticket';
    }

    findAvailableSettleDetailBorrowMoneyTicketPoolsPage(query: any, page: BylPageReq, masterId?: string): Observable<BylResultBody<BylPageResp<BylSettleDetailBorrowMoneyTicket>>> {
        let queryModel = new BylEntityRelationAvailablePoolsQueryReqBody<any>();
        queryModel.masterId = masterId;
        queryModel.pageReq = page;
        queryModel.queryReq = query;

        return this.http.post<BylResultBody<BylPageResp<BylSettleDetailBorrowMoneyTicket>>>(this.BASE_API_URL + '/find-available-settle-detail-borrow-money-pools', queryModel);

    }



}
