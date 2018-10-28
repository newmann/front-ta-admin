import {Injectable} from "@angular/core";
import {_HttpClient} from "@delon/theme";
import {BylConfigService} from "../../constant/config.service";
import {I18NService} from "app/core/i18n/i18n.service";
import {BylPersonAddress} from "../model/person-address.model";
import {BylBaseService} from "../../service/base.service";
import {Observable} from "rxjs/index";
import {BylResultBody} from "../../model/result-body.model";


/**
 * @Description: 个体管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylPersonAddressService extends BylBaseService<BylPersonAddress>{
    // private BASE_API_URL = "api/person/address";

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = "api/person/person-address";
    }

    findByPersonId(presonId: string): Observable<BylResultBody<Array<BylPersonAddress>>> {
        return this.http.get<BylResultBody<Array<BylPersonAddress>>>(this.BASE_API_URL + '/find-by-personid/' + presonId);
    }
}
