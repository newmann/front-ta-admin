import {I18NService} from '@core/i18n/i18n.service';
import {_HttpClient} from '@delon/theme';
import {BylConfigService} from '../constant/config.service';
import {Observable} from 'rxjs';
import {BylResultBody} from '../model/result-body.model';
import {BylBaseService} from "./base.service";
import {BylItemDetailBaseModal} from "../model/item-detail-base.model";
import {BylItemDetailAddModel} from "../model/item-detail-add.model";
import {BylItemDetailUpdateModel} from "../model/item-detail-update.model";
import {BylItemDetailDeleteModel} from "../model/item-detail-delete.model";
import {BylItemDetailMoveModel} from "../model/item-detail-move.model";
import {BylItemBatchAddModel} from "../model/item-batch-add.model";
import {BylItemDetailBatchAddModel} from "../model/item-detail-batch-add.model";


/**
 *  @Author: xinsh
 * @Description: 与后台接口的基础类
 *  @Date: Created in  14:00 2018/4/13.
 */

export class BylItemDetailBaseService<T extends BylItemDetailBaseModal>
    extends BylBaseService<T>{
    protected BASE_API_URL = 'api/';

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {
        super(http,configServer,i18nService);

    }

    findByDetailId(detailid: string): Observable<BylResultBody<Array<T>>> {
        return this.http.get<BylResultBody<Array<T>>>(this.BASE_API_URL + '/find-by-detailid/' + detailid);
    }

    addDetail(item: BylItemDetailAddModel<T>) {
        return this.http.post<BylResultBody<BylItemDetailAddModel<T>>>(this.BASE_API_URL + '/add-detail', item);
    };

    batchAddDetail(item: BylItemDetailBatchAddModel<T>) {
        return this.http.post<BylResultBody<BylItemDetailBatchAddModel<T>>>(this.BASE_API_URL + '/batch-add-detail', item);
    };

    updateDetail(item: BylItemDetailUpdateModel<T>) {
        return this.http.post<BylResultBody<BylItemDetailUpdateModel<T>>>(this.BASE_API_URL + '/update-detail', item);
    };

    deleteDetail(item: BylItemDetailDeleteModel<T>) {
        return this.http.post<BylResultBody<BylItemDetailDeleteModel<T>>>(this.BASE_API_URL + '/delete-detail', item);
    };

    moveDetail(item: BylItemDetailMoveModel) {
        return this.http.post<BylResultBody<BylItemDetailMoveModel>>(this.BASE_API_URL + '/move-detail', item);
    };

    // fetchDetailByMasterID(masterId: string) {
    //     return this.http.post<BylResultBody<Array<T>>>(this.BASE_API_URL + '/fetch-detail-by-masterid' + masterId);
    // };
}
