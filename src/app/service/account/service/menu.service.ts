import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BylConfigService} from '../../constant/config.service';
import {I18NService} from 'app/core/i18n/i18n.service';

import {BylBaseService} from '../../service/base.service';
import {BylAccount} from "../model/account.model";
import {BylAccountQuery} from '../query/account-query.model';
import {BylQueryReqBody} from '../../model/query-req-body.model';
import {BylPageResp} from '../../model/page-resp.model';
import {BylResultBody} from '../../model/result-body.model';
import {Observable} from 'rxjs';
import {BylPageReq} from '../../model/page-req.model';
import {BylAccountPermission} from "../model/account-permission.model";
import {
    BylFindEntityPermissionInterface, BylPermissionAvailablePoolsInterface,
    BylSavePermissionRelationInterface
} from "./permission-related.interface";
import {BylPermission} from "../model/permission.model";
import {BylEntityRelationAvailablePoolsQueryReqBody} from "../model/entity-relation-available-pools-query-req-body.model";
import {BylEntityRelations} from "../model/entity-relations.model";
import {BylMasterDataBaseService} from "../../service/master-data-base.service";
import {BylCheckAvailableReq} from "../../model/check-avaiable-req.model";
import {BylAccountResetPasswordModel} from "../model/account-reset-password.model";
import {BylTreeBaseService} from "../../service/tree-base.service";
import {BylMenu} from "../model/menu.model";



/**
 * @Description: 账户管理service
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 21:31
 **/
@Injectable()
export class BylMenuService  extends BylTreeBaseService<BylMenu>
    {


    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {

        super(http, configServer, i18nService);

        this.BASE_API_URL = 'api/account/menu';
    }

}
