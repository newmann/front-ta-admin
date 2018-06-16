import {I18NService} from '@core/i18n/i18n.service';
import {_HttpClient} from '@delon/theme';
import {BylConfigService} from '../constant/config.service';
import {Observable} from 'rxjs/Observable';
import {BylResultBody} from '../model/result-body.model';
import {BylQueryReqBody} from '../model/query-req-body.model';
import {BylPageReq} from '../model/page-req.model';
import {BylPageResp} from '../model/page-resp.model';
import {BylBaseService} from "./base.service";
import {BylItemMoveModel} from "../model/item-move.model";
import {BylItemDeleteModel} from "../model/item-delete.model";
import {BylItemAddModel} from "../model/item-add.model";
import {BylItemBaseModal} from "../model/item-base.model";
import {BylItemUpdateModel} from "../model/item-update.model";
import {BylItemBatchAddModel} from "../model/item-batch-add.model";


/**
 *  @Author: xinsh
 * @Description: 与后台接口的基础类
 *  @Date: Created in  14:00 2018/4/13.
 */

export class BylItemBaseService<T extends BylItemBaseModal> extends BylBaseService<T>{
    protected BASE_API_URL = 'api/';

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {
        super(http,configServer,i18nService);

    }

    findByMasterId(masterid: string): Observable<BylResultBody<Array<T>>> {
        return this.http.get<BylResultBody<Array<T>>>(this.BASE_API_URL + '/find-by-masterid/' + masterid);
    }

    addDetail(item: BylItemAddModel<T>) {
        return this.http.post<BylResultBody<BylItemAddModel<T>>>(this.BASE_API_URL + '/add-detail', item);
    };

    batchAddDetail(item: BylItemBatchAddModel<T>) {
        return this.http.post<BylResultBody<BylItemBatchAddModel<T>>>(this.BASE_API_URL + '/batch-add-detail', item);
    };

    updateDetail(item: BylItemUpdateModel<T>) {
        return this.http.post<BylResultBody<BylItemUpdateModel<T>>>(this.BASE_API_URL + '/update-detail', item);
    };

    deleteDetail(item: BylItemDeleteModel<T>) {
        return this.http.post<BylResultBody<BylItemDeleteModel<T>>>(this.BASE_API_URL + '/delete-detail', item);
    };

    moveDetail(item: BylItemMoveModel) {
        return this.http.post<BylResultBody<BylItemMoveModel>>(this.BASE_API_URL + '/move-detail', item);
    };

    fetchDetailByMasterID(masterId: string) {
        return this.http.post<BylResultBody<Array<T>>>(this.BASE_API_URL + '/fetch-detail-by-masterid' + masterId);
    };
}
