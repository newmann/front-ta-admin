import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';


import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';
import {BylDetailBaseService} from "../../service/detail-base.service";
import {BylEmployeeAvailablePoolsInterface} from "./employee-related.interface";
import {BylEmployee} from "../model/employee.model";
import {BylPageResp} from "../../model/page-resp.model";
import {BylResultBody} from "../../model/result-body.model";
import {Observable} from "rxjs";
import {BylPageReq} from "../../model/page-req.model";
import {BylQueryReqBody} from "../../model/query-req-body.model";
import {BylEntityRelationAvailablePoolsQueryReqBody} from "../../account/model/entity-relation-available-pools-query-req-body.model";
import {BylWorkTypeConfigDetail} from "../model/work-type-config-detail.model";
import {BylOutsourceEmployeeAvailablePoolsInterface} from "./outsource-employee-related.interface";
import {BylOutsourceEmployee} from "../model/outsource-employee.model";
import {BylWorkTypeConfigTicket} from "../model/work-type-config-ticket.model";


/**
 * @Description: service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylWorkTypeConfigDetailService
    extends BylDetailBaseService<BylWorkTypeConfigDetail,BylWorkTypeConfigTicket>
    implements BylEmployeeAvailablePoolsInterface,BylOutsourceEmployeeAvailablePoolsInterface
{

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/project/work-type-config-detail';
    }

    findAvailableEmployeePoolsPage(query: any, page: BylPageReq, masterId?: string): Observable<BylResultBody<BylPageResp<BylEmployee>>> {
        let queryModel = new BylEntityRelationAvailablePoolsQueryReqBody<any>();
        queryModel.masterId = masterId;
        queryModel.pageReq = page;
        queryModel.queryReq = query;


        return this.http.post<BylResultBody<BylPageResp<BylEmployee>>>(this.BASE_API_URL + '/find-available-employee-pools', queryModel);

    }

    findAvailableOutsourceEmployeePoolsPage(query: any, page: BylPageReq, masterId?: string): Observable<BylResultBody<BylPageResp<BylOutsourceEmployee>>> {
        let queryModel = new BylEntityRelationAvailablePoolsQueryReqBody<any>();
        queryModel.masterId = masterId;
        queryModel.pageReq = page;
        queryModel.queryReq = query;


        return this.http.post<BylResultBody<BylPageResp<BylOutsourceEmployee>>>(this.BASE_API_URL + '/find-available-outsource-employee-pools', queryModel);

    }



    // findByBillNo(billNo: string): Observable<BylResultBody<BylExpenseTicket>> {
    //     return this.http.get<BylResultBody<BylExpenseTicket>>(this.BASE_API_URL + '/find-by-billno/' + billNo);
    // }

    // getNewBillNo(): Observable<BylResultBody<string>> {
    //     return this.http.get<BylResultBody<string>>(this.BASE_API_URL + '/get-new-billno');
    // }

    // getNewTicket(): Observable<BylResultBody<BylExpenseTicket>> {
    //     return this.http.get<BylResultBody<BylExpenseTicket>>(this.BASE_API_URL + '/new-ticket');
    // }

    // remove(updateItem: BylExpenseTicket): Observable<BylResultBody<boolean>> {
    //     return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/remove', updateItem);
    // }
    //
    // cancel(updateItem: BylExpenseTicket): Observable<BylResultBody<BylExpenseTicket>> {
    //     return this.http.post<BylResultBody<BylExpenseTicket>>(this.BASE_API_URL + '/cancel', updateItem);
    // }
    //
    // check(updateItem: BylExpenseTicket): Observable<BylResultBody<BylExpenseTicket>> {
    //     return this.http.post<BylResultBody<BylExpenseTicket>>(this.BASE_API_URL + '/check', updateItem);
    // }
    //
    // submit(updateItem: BylExpenseTicket): Observable<BylResultBody<BylExpenseTicket>> {
    //     return this.http.post<BylResultBody<BylExpenseTicket>>(this.BASE_API_URL + '/submit', updateItem);
    // }

    // addDetail(item: BylDetailAddModel<BylWorkTypeConfigDetail>) {
    //     return this.http.post<BylResultBody<BylDetailAddModel<BylWorkTypeConfigDetail>>>(this.BASE_API_URL + '/add-detail', item);
    // };
    //
    // deleteDetail(item: BylDetailDeleteModel<BylWorkTypeConfigDetail>) {
    //     return this.http.post<BylResultBody<BylDetailDeleteModel<BylWorkTypeConfigDetail>>>(this.BASE_API_URL + '/delete-detail', item);
    // };
    //
    // moveDetail(item: BylDetailMoveModel) {
    //     return this.http.post<BylResultBody<BylDetailMoveModel>>(this.BASE_API_URL + '/move-detail', item);
    // };
    //
    // fetchDetailByMasterID(masterId: string) {
    //     return this.http.post<BylResultBody<Array<BylWorkTypeConfigDetail>>>(this.BASE_API_URL + '/fetch-detail-by-masterid' + masterId);
    // };

    // confirm(updateItem: BylExpenseTicket): Observable<BylResultBody<BylExpenseTicket>> {
    //     return this.http.post<BylResultBody<BylExpenseTicket>>(this.BASE_API_URL + '/confirm', updateItem);
    // }

}
