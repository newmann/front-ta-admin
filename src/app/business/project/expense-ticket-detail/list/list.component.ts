import {Component, Input, OnInit} from '@angular/core';
import {BylItemListComponentBase} from "../../../common/item-list-component-base";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {BylConfigService} from "../../../../service/constant/config.service";
import {Router} from "@angular/router";
import {BylListFormData} from "../../../../service/model/list-form-data.model";
import {BylExpenseDetailService} from "../../../../service/project/service/expense-detail.service";
import {BylExpenseDetail} from "../../../../service/project/model/expense-detail.model";
import {BylExpenseTicketDetailCrudComponent} from "../crud/crud.component";

@Component({
  selector: 'byl-expense-ticket-detail-list',
  templateUrl: './list.component.html',
})
export class BylExpenseTicketDetailListComponent extends BylItemListComponentBase<BylExpenseDetail>  {

    @Input()
    set setMasterId(value: string){
        this.masterId = value;
    }
    @Input()
    set setModifyDateTime(value: number){
        this.masterModifyDateTime = value;
    }

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public expenseTicketDetailService: BylExpenseDetailService) {
        super(message,configService,modalService,router);

        this.businessService = expenseTicketDetailService;

        this.businessCrudComponent = BylExpenseTicketDetailCrudComponent;
    }
    ngOnInit() {
    }

    genListData(data: BylExpenseDetail): BylListFormData<BylExpenseDetail>{
            let item = new BylListFormData<BylExpenseDetail>();
            item.checked = false;
            // item.disabled = (data.status === BylRoleStatus.SUBMITED_DELETED);
            item.item = new BylExpenseDetail();
            Object.assign(item.item,data);
            return item;
    }


    updateListData(newData:BylExpenseDetail){
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item,newData);
            })
    }

    /**
     * 删除明细
     * @param {string} id
     */
    delete(id:string){

    }

    moveUp(lineNo: number){

    }

    moveDown(lineNo: number){

    }

}
