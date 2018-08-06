import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylResultBody} from '../../model/result-body.model';

import {Observable} from 'rxjs';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';
import {BylBorrowMoneyTicket} from '../model/borrow-money-ticket.model';
import {BylBaseService} from '../../service/base.service';
import {BylTicketBaseService} from "../../service/ticket-base.service";
import {BylProjectProgressAssessTicket} from "../model/project-progress-assess-ticket.model";


/**
 * @Description: 项目管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylProjectProgressAssessTicketService  extends BylTicketBaseService<BylProjectProgressAssessTicket> {

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/project/project-progress-assess-ticket';
    }

}
