import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';
import {BylBaseService} from '../../service/base.service';
import {BylWorkType} from "../model/work-type.model";
import {BylOutsourcer} from "../model/outsourcer.model";



/**
 * @Description: 外包工组service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylOutsourcerService  extends BylBaseService<BylOutsourcer> {


    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/project/outsourcer';
    }

}
