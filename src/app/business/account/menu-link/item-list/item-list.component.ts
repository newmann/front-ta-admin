import {Component, Input, OnInit} from '@angular/core';
import {NzMessageService, NzModalRef, NzModalService} from "ng-zorro-antd";
import {BylConfigService} from "../../../../service/constant/config.service";
import {Router} from "@angular/router";
import {BylListFormData} from "../../../../service/model/list-form-data.model";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {Observable} from "rxjs";
import {BylListFormFunctionModeEnum} from "../../../../service/model/list-form-function-mode.enum";
import {BylMenuLink} from "../../../../service/account/model/menu-link.model";
import {BylMenuLinkRelationInterface} from "../../../../service/account/service/menu-link-related.interface";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylMenuLinkListComponent} from "../list/list.component";
import {BylListComponentEntityRelation} from "../../../common/list-component-entity-relation";
import {BylPageResp} from "../../../../service/model/page-resp.model";
import {BylPageReq} from "../../../../service/model/page-req.model";


@Component({
  selector: 'byl-menu-link-item-list',
  templateUrl: './item-list.component.html',
})
export class BylMenuLinkItemListComponent extends BylListComponentEntityRelation<BylMenuLink>
    implements OnInit
    {

    @Input() menuRelationService: BylMenuLinkRelationInterface; //调用方，用户调出选择添加账户的窗口

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router) {
        super(message,configService,modalService,router);
        this.selectPoolsComponent = BylMenuLinkListComponent;
        this.selectPoolsTitle = "查找菜单定义";
    }
    //
    ngOnInit(){
        // console.log("In MenuLink Item List:",this.menuRelationService);
        //
        // this.findAvailablePools = this.menuRelationService.findAvailableMenuLinkPoolsPage;
        // this.findEntities = this.menuRelationService.findEntityMenuLink;
        // this.saveRelation = this.menuRelationService.saveMenuLinkRelation;
        // this.deleteRelation = this.menuRelationService.deleteMenuLinkRelation;
    }

    deleteRelation(idArray: Array<string>, masterId: string): Observable<BylResultBody<Boolean>> {
        return this.menuRelationService.deleteMenuLinkRelation(idArray,masterId);
    }
    //
    // findAvailablePools(query: any, page: BylPageReq, masterId?: string): Observable<BylResultBody<BylPageResp<BylMenuLink>>> {
    //     return this.menuRelationService.findAvailableMenuLinkPoolsPage(query,page,masterId);
    // }

    findEntities(masterId: string): Observable<BylResultBody<Array<BylMenuLink>>> {
        return this.menuRelationService.findEntityMenuLink(masterId);
    }

    saveRelation(idArray: Array<string>, masterId: string): Observable<BylResultBody<Boolean>> {
        return this.menuRelationService.saveMenuLinkRelation(idArray,masterId);
    }

    getFindPoolsService(): any {
        return this.menuRelationService;
    }


}
