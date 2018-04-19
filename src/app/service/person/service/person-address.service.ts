import {Injectable} from "@angular/core";
import {_HttpClient} from "@delon/theme";
import {BylResultBody} from "../../model/result-body.model";
import {LoginResultModel} from "../../auth/login-result.model";
import {Observable} from "rxjs/Observable";

import {BylPageResp} from "../../model/page-resp.model";
import {BylPageReq} from "../../model/page-req.model";
import {BylConfigService} from "../../constant/config.service";
import {I18NService} from "app/core/i18n/i18n.service";
import {BylIStatusItem} from "../../model/status.model";

import {BylQueryReqBody} from "../../model/query-req-body.model";
import {BylPersonAddress} from "../model/person-address.model";
import {BylPersonQuery} from "../query/person-query.model";
import {BylBaseService} from '../../service/base.service';
import {BylItemBaseService} from "../../service/item-base.service";



/**
 * @Description: 个体管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylPersonAddressService extends BylItemBaseService<BylPersonAddress>{
    // private BASE_API_URL = "api/person/address";

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = "api/person/person-address";
    }

}
