import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {I18NService} from 'app/core/i18n/i18n.service';
import {BylBaseService} from "../../service/base.service";
import {BylConfigService} from "../../constant/config.service";
import {BylSimpleEntityLogger} from "../model/simple-entity-logger.model";
import {Observable} from "rxjs";
import {BylResultBody} from "../../model/result-body.model";




/**
 * @Description: 通用实体操作日志查询
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylSimpleEntityLoggerService  extends BylBaseService<BylSimpleEntityLogger> {


    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/simple-entity-logger';
    }

    findByTargetId(id: string): Observable<BylResultBody<Array<BylSimpleEntityLogger>>> {
        return this.http.get<BylResultBody<Array<BylSimpleEntityLogger>>>(this.BASE_API_URL + '/find-by-targetid/' + id);
    }

}
