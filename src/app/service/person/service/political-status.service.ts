import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';

import {I18NService} from 'app/core/i18n/i18n.service';


import {BylPoliticalStatus} from '../model/political-status.model';
import {BylConfigService} from '../../constant/config.service';
import {BylBaseService} from '../../service/base.service';


/**
 * @Description: 政治面貌查询service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylPoliticalStatusService extends BylBaseService<BylPoliticalStatus>{

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
               protected i18nService: I18NService) {
        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/person/political-status';

    }



}
