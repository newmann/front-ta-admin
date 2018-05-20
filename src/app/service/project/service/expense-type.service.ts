import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';
import {BylBaseService} from '../../service/base.service';
import {BylWorkType} from "../model/work-type.model";
import {BylExpenseType} from "../model/expense-type.model";
import {Observable} from "rxjs/Observable";
import {BylCheckAvailableReq} from "../../model/check-avaiable-req.model";
import {BylResultBody} from "../../model/result-body.model";



/**
 * @Description: 工种类型service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylExpenseTypeService  extends BylBaseService<BylExpenseType> {


    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/project/expense-type';
    }

    checkCodeAvailable(data: BylCheckAvailableReq): Observable<BylResultBody<boolean>> {
        return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/check-code-available', data);

    }

    // checkNameAvailable(data: BylCheckAvailableReq): Observable<BylResultBody<boolean>> {
    //     return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/check-name-available', data);
    // }

}
