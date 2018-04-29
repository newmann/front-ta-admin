import { Component, OnInit } from '@angular/core';
import {BylListComponentBase} from "../../../common/list-component-base";
import {Router} from "@angular/router";
import {BylListFormData} from "../../../../service/model/list-form-data.model";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {BylConfigService} from "../../../../service/constant/config.service";
import {BylBorrowMoneyTicketService} from "../../../../service/project/service/borrow-money-ticket.service";
import {BylBorrowMoneyTicket} from "../../../../service/project/model/borrow-money-ticket.model";
import {BylBorrowMoneyTicketQuery} from "../../../../service/project/query/borrow-money-ticket-query.model";
import {BylIStatusItem} from '../../../../service/model/status.model';

@Component({
  selector: 'byl-borrow-money-ticket-list',
  templateUrl: './list.component.html',
})
export class BylBorrowMoneyTicketListComponent  extends BylListComponentBase<BylBorrowMoneyTicket> {

    statusList: BylIStatusItem[]; //状态

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public borrowMoneyTicketService: BylBorrowMoneyTicketService) {
        super(message, configService, modalService, router);

        this.businessService = borrowMoneyTicketService;
        this.crudUrl = '/project/borrow-money-ticket/crud';
        // this.businessCrudComponent = BylPersonCrudComponent;
    }

    genListData(findResult: Array<BylBorrowMoneyTicket>): Array<BylListFormData<BylBorrowMoneyTicket>> {
        console.table(findResult);
        return findResult.map(data => {
            let item = new BylListFormData<BylBorrowMoneyTicket>();
            item.checked = false;
            // item.disabled = (data.status === BylRoleStatus.DELETED);
            item.item = new BylBorrowMoneyTicket();
            Object.assign(item.item, data);
            return item;
        });
    }

    genQueryModel(): any {
        let result = new BylBorrowMoneyTicketQuery();
        // if (qData.name) result.name = qData.name;
        // if (qData.modifyDateBegin) result.modifyDateBegin = moment(qData.modifyDateBegin).valueOf();
        // if (qData.modifyDateEnd) result.modifyDateEnd = moment(qData.modifyDateEnd).add(1,'days').valueOf();//第二天的零点
        // if (qData.status) result.status = qData.status;
        return result;
    }

    updateListData(newData: BylBorrowMoneyTicket) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item, newData);
            });
    }
}
