import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';
import {BylBaseService} from '../../service/base.service';
import {BylOutsourceEmployee} from "../model/outsource-employee.model";
import {BylResultBody} from "../../model/result-body.model";
import {Observable} from "rxjs/Observable";
import {BylCheckAvailableReq} from "../../model/check-avaiable-req.model";
import {BylMasterDataBaseService} from "../../service/master-data-base.service";



/**
 * @Description: 外包工组员工service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylOutsourceEmployeeService
    extends BylMasterDataBaseService<BylOutsourceEmployee> {


    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/project/outsource-employee';
    }

    checkCodeAvailable(data: BylCheckAvailableReq): Observable<BylResultBody<boolean>> {
        return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/check-code-available', data);

    }

    fetchAvailableByCodeOrName(searchstr : string): Observable < BylResultBody < Array<BylOutsourceEmployee> >> {
        return this.http.get<BylResultBody<Array<BylOutsourceEmployee>>>(this.BASE_API_URL+"/fetch-available-by-code-or-name/" + searchstr);
    }
}
