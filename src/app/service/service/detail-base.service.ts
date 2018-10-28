import {I18NService} from '@core/i18n/i18n.service';
import {_HttpClient} from '@delon/theme';
import {BylConfigService} from '../constant/config.service';
import {Observable} from 'rxjs';
import {BylResultBody} from '../model/result-body.model';
import {BylBaseService} from "./base.service";
import {BylDetailMoveModel} from "../model/detail-move.model";
import {BylDetailDeleteModel} from "../model/detail-delete.model";
import {BylDetailAddModel} from "../model/detail-add.model";
import {BylDetailBaseModel} from "../model/detail-base.model";
import {BylDetailUpdateModel} from "../model/detail-update.model";
import {BylDetailBatchAddModel} from "../model/detail-batch-add.model";
import {BylTicketBaseModal} from "../model/ticket-base.model";
import {BylDetailAddResultModel} from "../model/detail-add-result.model";
import {BylDetailBatchAddResultModel} from "../model/detail-batch-add-result.model";
import {BylDetailUpdateResultModel} from "../model/detail-update-Result.model";
import {BylDetailDeleteResultModel} from "../model/detail-delete-result.model";
import {BylDetailMoveResultModel} from "../model/detail-move-result.model";


/**
 *  @Author: xinsh
 * @Description: 与后台接口的基础类
 *  @Date: Created in  14:00 2018/4/13.
 */

export class BylDetailBaseService<T extends BylDetailBaseModel, E extends BylTicketBaseModal> extends BylBaseService<T>{
    protected BASE_API_URL = 'api/';

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {
        super(http,configServer,i18nService);

    }

    findByMasterId(masterid: string): Observable<BylResultBody<Array<T>>> {
        return this.http.get<BylResultBody<Array<T>>>(this.BASE_API_URL + '/find-by-masterid/' + masterid);
    }

    addDetail(item: BylDetailAddModel<T>) {
        return this.http.post<BylResultBody<BylDetailAddResultModel<T,E>>>(this.BASE_API_URL + '/add-detail', item);
    };

    batchAddDetail(item: BylDetailBatchAddModel<T>) {
        return this.http.post<BylResultBody<BylDetailBatchAddResultModel<T,E>>>(this.BASE_API_URL + '/batch-add-detail', item);
    };

    updateDetail(item: BylDetailUpdateModel<T>) {
        return this.http.post<BylResultBody<BylDetailUpdateResultModel<T,E>>>(this.BASE_API_URL + '/update-detail', item);
    };

    deleteDetail(item: BylDetailDeleteModel<T>) {
        return this.http.post<BylResultBody<BylDetailDeleteResultModel<T,E>>>(this.BASE_API_URL + '/delete-detail', item);
    };

    moveDetail(item: BylDetailMoveModel) {
        return this.http.post<BylResultBody<BylDetailMoveResultModel<E>>>(this.BASE_API_URL + '/move-detail', item);
    };

    fetchDetailByMasterID(masterId: string) {
        return this.http.post<BylResultBody<Array<T>>>(this.BASE_API_URL + '/fetch-detail-by-masterid' + masterId);
    };
}
