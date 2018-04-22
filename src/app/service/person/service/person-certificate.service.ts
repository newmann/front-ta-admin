import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {Observable} from 'rxjs/Observable';

import {I18NService} from 'app/core/i18n/i18n.service';


import {BylPersonCertificate} from '../model/person-certificate.model';
import {BylConfigService} from '../../constant/config.service';
import {BylResultBody} from '../../model/result-body.model';
import {BylBaseService} from '../../service/base.service';
import {BylItemBaseService} from "../../service/item-base.service";



/**
 * @Description: 证件管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylPersonCertificateService extends BylItemBaseService<BylPersonCertificate>{
    // private BASE_API_URL = 'api/person/certificate';


    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL =  'api/person/person-certificate';
    }

    // add(item: BylPersonCertificate): Observable<BylResultBody<BylPersonCertificate>> {
    //     let formData = new FormData();                  // 可以增加表单数据
    //
    //
    //     return this.http.post<BylResultBody<BylPersonCertificate>>(this.BASE_API_URL + '/add', item);
    // }
}
