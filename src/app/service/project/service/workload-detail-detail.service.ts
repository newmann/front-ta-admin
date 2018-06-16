import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';


import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';
import {BylItemDetailBaseService} from "../../service/item-detail-base.service";
import {BylWorkloadDetailDetail} from "../model/workload-detail-detail.model";


/**
 * @Description: 考勤登记单明细的明细service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylWorkloadDetailDetailService extends BylItemDetailBaseService<BylWorkloadDetailDetail> {

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/project/workload-detail-detail';
    }


}
