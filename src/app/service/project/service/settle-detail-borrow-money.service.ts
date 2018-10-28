import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';


import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';
import {BylDetailBaseService} from "../../service/detail-base.service";
import {BylSettleDetailBorrowMoney} from "../model/settle-detail-borrow-money.model";
import {BylSettleTicket} from "../model/settle-ticket.model";


/**
 * @Description:
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylSettleDetailBorrowMoneyService
    extends BylDetailBaseService<BylSettleDetailBorrowMoney,BylSettleTicket>

{

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/project/settle-detail-borrow-money';
    }



}
