import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylResultBody} from '../../model/result-body.model';

import {Observable} from 'rxjs/Observable';

import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';


import {BylNation} from './nation.model';
import {BylBaseService} from '../../service/base.service';


/**
 * @Description: 民族查询service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class NationService extends BylBaseService<BylNation> {
    // private BASE_API_URL = 'api/person/nation';

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/person/nation';
    }

    // findByAll(): Observable<BylResultBody<BylNation>> {
    //     return this.http.get<BylResultBody<BylNation>>(this.BASE_API_URL + '/find-all/');
    // }

}
