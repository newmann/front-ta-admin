import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';


import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';
import {BylDetailBaseService} from "../../service/detail-base.service";
import {BylWorkloadDetail} from "../model/workload-detail.model";
import {BylEmployeeAvailablePoolsInterface} from "./employee-related.interface";
import {BylEmployee} from "../model/employee.model";
import {BylPageResp} from "../../model/page-resp.model";
import {BylResultBody} from "../../model/result-body.model";
import {Observable} from "rxjs";
import {BylPageReq} from "../../model/page-req.model";
import {BylQueryReqBody} from "../../model/query-req-body.model";
import {BylEntityRelationAvailablePoolsQueryReqBody} from "../../account/model/entity-relation-available-pools-query-req-body.model";
import {BylOutsourceEmployeeAvailablePoolsInterface} from "./outsource-employee-related.interface";
import {BylOutsourceEmployee} from "../model/outsource-employee.model";
import {BylSettleDetailWorkload} from "../model/settle-detail-workload.model";
import {BylSettleDetailWorkloadTicket} from "../model/settle-detail-workload-ticket.model";
import {BylSettleDetailWorkloadTicketAvailablePoolsInterface} from "./settle-detail-workload-ticket-related.interface";
import {BylAccountQuery} from "../../account/query/account-query.model";
import {BylAccount} from "../../account/model/account.model";
import {BylSettleTicket} from "../model/settle-ticket.model";


/**
 * @Description:
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylSettleDetailWorkloadTicketService
    extends BylDetailBaseService<BylSettleDetailWorkloadTicket, BylSettleTicket>
    implements BylSettleDetailWorkloadTicketAvailablePoolsInterface

{

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/project/settle-detail-workload-ticket';
    }

    findAvailableSettleDetailWorkloadTicketPoolsPage(query: any, page: BylPageReq, masterId?: string): Observable<BylResultBody<BylPageResp<BylSettleDetailWorkloadTicket>>> {
        let queryModel = new BylEntityRelationAvailablePoolsQueryReqBody<any>();
        queryModel.masterId = masterId;
        queryModel.pageReq = page;
        queryModel.queryReq = query;

        return this.http.post<BylResultBody<BylPageResp<BylSettleDetailWorkloadTicket>>>(this.BASE_API_URL + '/find-available-settle-detail-workload-pools', queryModel);


    }



}
