import {I18NService} from '@core/i18n/i18n.service';
import {_HttpClient} from '@delon/theme';
import {BylConfigService} from '../constant/config.service';
import {Observable} from 'rxjs';
import {BylResultBody} from '../model/result-body.model';
import {BylQueryReqBody} from '../model/query-req-body.model';
import {BylPageReq} from '../model/page-req.model';
import {BylPageResp} from '../model/page-resp.model';
import {BylBaseService} from "./base.service";
import {BylTicketBaseModal} from "../model/ticket-base.model";
import {BylExpenseTicket} from "../project/model/expense-ticket.model";
import {BylDetailMoveModel} from "../model/detail-move.model";
import {BylDetailDeleteModel} from "../model/detail-delete.model";
import {BylDetailAddModel} from "../model/detail-add.model";
import {BylExpenseDetail} from "../project/model/expense-detail.model";
import {BylDetailBaseModel} from "../model/detail-base.model";


/**
 *  @Author: xinsh
 * @Description: 与后台接口的基础类
 *  @Date: Created in  14:00 2018/4/13.
 */

export class BylTicketBaseService<T extends BylTicketBaseModal> extends BylBaseService<T>{
    // protected BASE_API_URL = 'api/';

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {
        super(http,configServer,i18nService);
    }

    findByBillNo(billNo: string): Observable<BylResultBody<T>> {
        return this.http.get<BylResultBody<T>>(this.BASE_API_URL + '/find-by-billno/' + billNo);
    }
    getNewTicket(): Observable<BylResultBody<T>> {
        return this.http.get<BylResultBody<T>>(this.BASE_API_URL + '/new-ticket');
    }

    // fetchByBillNo(billNO: string): Observable<BylResultBody<T>> {
    //     return this.http.get<BylResultBody<T>>(this.BASE_API_URL + '/fetch-by-billno/' + billNO);
    // }

    remove(item: T): Observable<BylResultBody<boolean>> {
        return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/remove', item);
    }

    submit(item: T): Observable<BylResultBody<T>> {
        return this.http.post<BylResultBody<T>>(this.BASE_API_URL + '/submit', item);
    }

    check(item: T): Observable<BylResultBody<T>> {
        return this.http.post<BylResultBody<T>>(this.BASE_API_URL + '/check', item);
    }
    cancel(item: T): Observable<BylResultBody<T>> {
        return this.http.post<BylResultBody<T>>(this.BASE_API_URL + '/cancel' ,item);
    }


}
