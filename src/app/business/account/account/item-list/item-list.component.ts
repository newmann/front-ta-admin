import {Component, Input} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {BylResultBody} from '../../../../service/model/result-body.model';
import {BylConfigService} from '../../../../service/constant/config.service';
import {Router} from '@angular/router';
import {BylAccount} from '../../../../service/account/model/account.model';
import {BylAccountRelationInterface} from '../../../../service/account/service/account-related.interface';
import {BylEntityRelationListComponentBase} from "../../../common/entity-relation-list.component-base";
import {Observable} from "rxjs/index";
import {BylAccountAddPoolListComponent} from "../add-pool-list/add-pool-list.component";

// export const enum AccountEntityTypeEnum{
//     ROLE = 1,
//     DEPARTMENT = 2
// }

@Component({
    selector: 'byl-account-item-list',
    templateUrl: './item-list.component.html',
})
export class BylAccountItemListComponent extends BylEntityRelationListComponentBase<BylAccount>{
    @Input() accountRelationService: BylAccountRelationInterface; //调用方，用户调出选择添加账户的窗口
    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router) {
        super(message,configService,modalService,router);
        this.selectPoolsComponent = BylAccountAddPoolListComponent;
        this.selectPoolsTitle = "查找账户";
    }
    deleteRelation(idArray: Array<string>, masterId: string): Observable<BylResultBody<Boolean>> {
        return this.accountRelationService.deleteAccountRelation(idArray,masterId);
    }

    findEntities(masterId: string): Observable<BylResultBody<Array<BylAccount>>> {
        return this.accountRelationService.findEntityAccount(masterId);
    }

    saveRelation(idArray: Array<string>, masterId: string): Observable<BylResultBody<Boolean>> {
        return this.accountRelationService.saveAccountRelation(idArray,masterId);
    }

    getFindPoolsService(): any {
        return this.accountRelationService;
    }


}
