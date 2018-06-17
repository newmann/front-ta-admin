import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';


import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';
import {BylItemBaseService} from "../../service/item-base.service";
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


/**
 * @Description: 考勤登记单明细service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylWorkloadDetailService
    extends BylItemBaseService<BylWorkloadDetail>
    implements BylEmployeeAvailablePoolsInterface,BylOutsourceEmployeeAvailablePoolsInterface
{

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/project/workload-detail';
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

    // addDetail(item: BylItemAddModel<BylWorkloadDetail>) {
    //     return this.http.post<BylResultBody<BylItemAddModel<BylWorkloadDetail>>>(this.BASE_API_URL + '/add-detail', item);
    // };
    //
    // deleteDetail(item: BylItemDeleteModel<BylWorkloadDetail>) {
    //     return this.http.post<BylResultBody<BylItemDeleteModel<BylWorkloadDetail>>>(this.BASE_API_URL + '/delete-detail', item);
    // };
    //
    // moveDetail(item: BylItemMoveModel) {
    //     return this.http.post<BylResultBody<BylItemMoveModel>>(this.BASE_API_URL + '/move-detail', item);
    // };
    //
    // fetchDetailByMasterID(masterId: string) {
    //     return this.http.post<BylResultBody<Array<BylWorkloadDetail>>>(this.BASE_API_URL + '/fetch-detail-by-masterid' + masterId);
    // };

    // confirm(updateItem: BylExpenseTicket): Observable<BylResultBody<BylExpenseTicket>> {
    //     return this.http.post<BylResultBody<BylExpenseTicket>>(this.BASE_API_URL + '/confirm', updateItem);
    // }

}
