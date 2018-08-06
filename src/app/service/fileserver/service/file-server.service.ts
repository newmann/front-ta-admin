import {I18NService} from '@core/i18n/i18n.service';
import {_HttpClient} from '@delon/theme';
import {BylConfigService} from "../../constant/config.service";
import {Observable} from "rxjs/index";
import {HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";


/**
 *  @Author: xinsh
 * @Description: 与后台接口的基础类
 *  @Date: Created in  14:00 2018/4/13.
 */
@Injectable()
export class BylFileServerService {
    protected BASE_API_URL = 'api/file-server';

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {
    }

    serveFile(filename: string): Observable<HttpResponse<Blob>> {
        return this.http.get<HttpResponse<Blob>>(this.BASE_API_URL + '/serve-file?filename='+filename);
    }


}
