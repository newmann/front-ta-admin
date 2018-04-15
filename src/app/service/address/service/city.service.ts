import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylResultBody} from '../../model/result-body.model';

import {Observable} from 'rxjs/Observable';

import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';


import {BylBaseService} from '../../service/base.service';
import {BylCity} from "../model/city.model";


/**
 * @Description: 省市查询service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylCityService extends BylBaseService<BylCity> {
    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/address/city';
    }

    findByProvinceId(provinceId: string): Observable<BylResultBody<Array<BylCity>>> {
        return this.http.get<BylResultBody<Array<BylCity>>>(this.BASE_API_URL + '/find-by-provinceid/' + provinceId);
    }

}
