import {Component, Input} from '@angular/core';
import {BylListComponentTicketDetail} from "../../../common/list-component-ticket-detail";
import {NzMessageService, NzModalRef, NzModalService} from "ng-zorro-antd";
import {BylConfigService} from "../../../../service/constant/config.service";
import {Router} from "@angular/router";
import {BylListFormData} from "../../../../service/model/list-form-data.model";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylSettleDetailBorrowMoney} from "../../../../service/project/model/settle-detail-borrow-money.model";
import {BylSettleDetailBorrowMoneyService} from "../../../../service/project/service/settle-detail-borrow-money.service";
import {BylSettleTicket} from "../../../../service/project/model/settle-ticket.model";


@Component({
    selector: 'byl-settle-detail-borrow-money-list',
    templateUrl: './list.component.html',
})
export class BylSettleDetailBorrowMoneyListComponent
    extends BylListComponentTicketDetail<BylSettleDetailBorrowMoney,BylSettleTicket> {



    @Input()
    set setMasterId(value: string) {
        this.masterId = value;
    }

    @Input()
    set setModifyDateTime(value: number) {
        this.masterModifyDateTime = value;
    }
    // @Input()
    // set setModifyDateTime(value: number) {
    //     this.masterModifyDateTime = value;
    // }
    //
    // private _outsourcerWidget: any;
    // @Input()
    // set setOutsourcerWidget(value: any){
    //     this._outsourcerWidget = value;
    // }

    // @Input() readOnly: boolean = false;

    public addForm: NzModalRef; //维护界面

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public settleDetailBorrowMoneyService: BylSettleDetailBorrowMoneyService) {
        super(message, configService, modalService, router);

        this.businessService = settleDetailBorrowMoneyService;

        // this.businessCrudComponent = BylExpenseTicketDetailCrudComponent;
    }

    ngOnInit() {
    }

    genListData(data: BylSettleDetailBorrowMoney): BylListFormData<BylSettleDetailBorrowMoney> {
        let item = new BylListFormData<BylSettleDetailBorrowMoney>();
        item.checked = false;
        // item.disabled = (data.status === BylRoleStatus.SUBMITED_DELETED);
        item.item = new BylSettleDetailBorrowMoney();
        simpleDeepCopy(item.item, data);
        return item;
    }


    updateListData(newData: BylSettleDetailBorrowMoney) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                simpleDeepCopy(item.item, newData);
            })
    }





}
