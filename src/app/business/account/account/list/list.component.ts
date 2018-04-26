import {Component, Input, OnInit} from '@angular/core';
import {NzMessageService, NzModalService, NzModalSubject} from 'ng-zorro-antd';
import {BylListFormData} from "../../../../service/model/list-form-data.model";
import {BylConfigService} from "../../../../service/constant/config.service";
import {Router} from "@angular/router";
import {BylListComponentBase} from "../../../common/list-component-base";
import {BylPersonQuery} from "../../../../service/person/query/person-query.model";
import {BylAccount} from "../../../../service/account/model/account.model";
import {BylAccountService} from "../../../../service/account/service/account.service";
import {BylAccountQuery} from "../../../../service/account/query/account-query.model";

@Component({
  selector: 'byl-account-list',
  templateUrl: './list.component.html',
})
export class BylAccountListComponent extends BylListComponentBase<BylAccount> {
    /**
     * 当前在什么状态，主要是为了兼容不同的功能，比如筛选用户的界面等等,暂先定义两个：
     * list:正常的浏览界面
     * select： 筛选界面，
     */

    @Input() functionMode: string;

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public functionSubject$: NzModalSubject,
                public router: Router,
                public accountService: BylAccountService) {
        super(message, configService, modalService, router);

        this.businessService = accountService;
        this.crudUrl = '/account/account/crud';
        // this.businessCrudComponent = BylPersonCrudComponent;
    }


    genListData(findResult: Array<BylAccount>): Array<BylListFormData<BylAccount>> {
        return findResult.map(data => {
            let item = new BylListFormData<BylAccount>();
            item.checked = false;
            // item.disabled = (data.status === RoleStatus.DELETED_ROLE);
            item.item = new BylAccount();
            Object.assign(item.item, data);
            return item;
        });
    }

    genQueryModel(): any {
        let result = new BylAccountQuery();
        // if (q.name) result.name = q.name;
        // if (q.modifyDateBegin) result.modifyDateBegin = moment(q.modifyDateBegin).valueOf();
        // if (q.modifyDateEnd) result.modifyDateEnd = moment(q.modifyDateEnd).add(1,'days').valueOf();//第二天的零点
        // if (q.status) result.status = q.status;
        return result;
    }

    updateListData(newData: BylAccount) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item, newData);
            });
    }

    // modifyEntity(id:string){
    //     this.router.navigateByUrl("/person/person/crud/" + id);
    // }

    batchSelect() {
        //将数据传出，并退出界面
        this.functionSubject$.next(this.selectedRows);
        this.functionSubject$.destroy('onCancel');
    }

}
