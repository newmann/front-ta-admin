import {I18NService} from '@core/i18n/i18n.service';
import {_HttpClient} from '@delon/theme';
import {BylConfigService} from '../constant/config.service';
import {Observable} from 'rxjs/Observable';
import {BylResultBody} from '../model/result-body.model';
import {BylQueryReqBody} from '../model/query-req-body.model';
import {BylPageReq} from '../model/page-req.model';
import {BylPageResp} from '../model/page-resp.model';
import {BylBaseService} from "./base.service";
import {BylDetailItemMoveModel} from "../model/detail-item-move.model";
import {BylDetailItemDeleteModel} from "../model/detail-item-delete.model";
import {BylDetailItemAddModel} from "../model/detail-item-add.model";
import {BylBaseItemModal} from "../model/base-item.model";


/**
 *  @Author: xinsh
 * @Description: 与后台接口的基础类
 *  @Date: Created in  14:00 2018/4/13.
 */

export class BylItemBaseService<T extends BylBaseItemModal> extends BylBaseService<T>{
    protected BASE_API_URL = 'api/';

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {
        super(http,configServer,i18nService);

    }

    findByMasterId(masterid: string): Observable<BylResultBody<Array<T>>> {
        return this.http.get<BylResultBody<Array<T>>>(this.BASE_API_URL + '/find-by-masterid/' + masterid);
    }

    addDetail(item: BylDetailItemAddModel<T>) {
        return this.http.post<BylResultBody<BylDetailItemAddModel<T>>>(this.BASE_API_URL + '/add-detail', item);
    };

    deleteDetail(item: BylDetailItemDeleteModel<T>) {
        return this.http.post<BylResultBody<BylDetailItemDeleteModel<T>>>(this.BASE_API_URL + '/delete-detail', item);
    };

    moveDetail(item: BylDetailItemMoveModel) {
        return this.http.post<BylResultBody<BylDetailItemMoveModel>>(this.BASE_API_URL + '/move-detail', item);
    };

    fetchDetailByMasterID(masterId: string) {
        return this.http.post<BylResultBody<Array<T>>>(this.BASE_API_URL + '/fetch-detail-by-masterid' + masterId);
    };
}
