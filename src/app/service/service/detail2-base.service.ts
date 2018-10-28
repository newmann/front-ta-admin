import {I18NService} from '@core/i18n/i18n.service';
import {_HttpClient} from '@delon/theme';
import {BylConfigService} from '../constant/config.service';
import {Observable} from 'rxjs';
import {BylResultBody} from '../model/result-body.model';
import {BylBaseService} from "./base.service";
import {BylDetail2BaseModal} from "../model/detail2-base.model";
import {BylDetail2AddModel} from "../model/detail2-add.model";
import {BylDetail2UpdateModel} from "../model/detail2-update.model";
import {BylDetail2DeleteModel} from "../model/detail2-delete.model";
import {BylDetail2MoveModel} from "../model/detail2-move.model";
import {BylDetailBatchAddModel} from "../model/detail-batch-add.model";
import {BylDetail2BatchAddModel} from "../model/detail2-batch-add.model";


/**
 *  @Author: xinsh
 * @Description: 与后台接口的基础类
 *  @Date: Created in  14:00 2018/4/13.
 */

export class BylDetail2BaseService<T extends BylDetail2BaseModal>
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

    addDetail(item: BylDetail2AddModel<T>) {
        return this.http.post<BylResultBody<BylDetail2AddModel<T>>>(this.BASE_API_URL + '/add-detail', item);
    };

    batchAddDetail(item: BylDetail2BatchAddModel<T>) {
        return this.http.post<BylResultBody<BylDetail2BatchAddModel<T>>>(this.BASE_API_URL + '/batch-add-detail', item);
    };

    updateDetail(item: BylDetail2UpdateModel<T>) {
        return this.http.post<BylResultBody<BylDetail2UpdateModel<T>>>(this.BASE_API_URL + '/update-detail', item);
    };

    deleteDetail(item: BylDetail2DeleteModel<T>) {
        return this.http.post<BylResultBody<BylDetail2DeleteModel<T>>>(this.BASE_API_URL + '/delete-detail', item);
    };

    moveDetail(item: BylDetail2MoveModel) {
        return this.http.post<BylResultBody<BylDetail2MoveModel>>(this.BASE_API_URL + '/move-detail', item);
    };

    // fetchDetailByMasterID(masterId: string) {
    //     return this.http.post<BylResultBody<Array<T>>>(this.BASE_API_URL + '/fetch-detail-by-masterid' + masterId);
    // };
}
