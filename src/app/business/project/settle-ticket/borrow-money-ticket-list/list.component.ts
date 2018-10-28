import {Component, Input} from '@angular/core';
import {BylListComponentTicketDetail} from "../../../common/list-component-ticket-detail";
import {NzMessageService, NzModalRef, NzModalService} from "ng-zorro-antd";
import {BylConfigService} from "../../../../service/constant/config.service";
import {Router} from "@angular/router";
import {BylListFormData} from "../../../../service/model/list-form-data.model";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylDetailBatchAddModel} from "../../../../service/model/detail-batch-add.model";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {BylSettleDetailWorkloadTicketService} from "../../../../service/project/service/settle-detail-workload-ticket.service";
import {BylSettleDetailWorkloadDetailAddPoolListComponent} from "../add-workload-detail-pool-list/add-pool-list.component";
import {BylSettleDetailBorrowMoneyTicket} from "../../../../service/project/model/settle-detail-borrow-money-ticket.model";
import {BylSettleDetailBorrowMoneyTicketService} from "../../../../service/project/service/settle-detail-borrow-money-ticket.service";
import {BylSettleTicket} from "../../../../service/project/model/settle-ticket.model";
import {BylSettleDetailBorrowMoneyTicketAddPoolListComponent} from "../add-borrow-money-ticket-pool-list/add-pool-list.component";


@Component({
    selector: 'byl-settle-detail-borrow-money-Ticket-list',
    templateUrl: './list.component.html',
})
export class BylSettleDetailBorrowMoneyTicketListComponent
    extends BylListComponentTicketDetail<BylSettleDetailBorrowMoneyTicket,BylSettleTicket> {



    // @Input()
    // set setMasterId(value: string) {
    //     this.masterId = value;
    // }

    @Input()
    set setSettleTicket(value: BylSettleTicket) {
        this.masterTicket = value;
        this.masterId = value.id;
    }

    masterTicket: BylSettleTicket;

    @Input()
    set setModifyDateTime(value: number) {
        this.masterModifyDateTime = value;
    }

    // private _outsourcerWidget: any;
    // @Input()
    // set setOutsourcerWidget(value: any){
    //     this._outsourcerWidget = value;
    // }

    @Input() readOnly: boolean = false;

    public addForm: NzModalRef; //维护界面

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public settleDetailBorrowMoneyTicketService: BylSettleDetailBorrowMoneyTicketService) {
        super(message, configService, modalService, router);

        this.businessService = settleDetailBorrowMoneyTicketService;

        // this.businessCrudComponent = BylExpenseTicketDetailCrudComponent;
    }

    ngOnInit() {
    }

    genListData(data: BylSettleDetailBorrowMoneyTicket): BylListFormData<BylSettleDetailBorrowMoneyTicket> {
        let item = new BylListFormData<BylSettleDetailBorrowMoneyTicket>();
        item.checked = false;
        // item.disabled = (data.status === BylRoleStatus.SUBMITED_DELETED);
        item.item = new BylSettleDetailBorrowMoneyTicket();
        simpleDeepCopy(item.item, data);
        return item;
    }


    updateListData(newData: BylSettleDetailBorrowMoneyTicket) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                simpleDeepCopy(item.item, newData);
            })
    }


    addResourse(){
            //查找导入考勤单明细
        this.addForm = this.modalService.create({
            nzTitle: '添加借款单',
            nzZIndex: 9999, //最外层
            nzWidth: '90%',
            nzContent: BylSettleDetailBorrowMoneyTicketAddPoolListComponent,
            nzFooter: null,
            // onOk() {
            //
            // },
            // onCancel() {
            //     console.log('Click cancel');
            // },
            nzComponentParams: {
                // findAvailablePoolsService: this.settleDetailBorrowMoneyTicketService,
                masterId: this.masterTicket.settleResourse.settleResourseId
            },
            nzMaskClosable: false
        });

        // this.addForm.next(BylCrudEvent[BylCrudEvent.bylSaving]);

        this.addForm.afterClose.subscribe(result => {
            console.info(result);

            console.info(typeof result);

            //返回的是选中的考勤单明细
            let pools: Array<BylSettleDetailBorrowMoneyTicket> = [];
            if ((typeof result) === 'object') {
                for (let item of result) {
                    let t = new BylSettleDetailBorrowMoneyTicket();
                    simpleDeepCopy(t.project,item.item.project);
                    t.borrowMoneyTicketId = item.item.borrowMoneyTicketId;
                    t.borrowMoneyTicketNo = item.item.borrowMoneyTicketNo;
                    t.amount = item.item.amount;
                    // t.resourseId = item.id;
                    // t.resourseCode = item.code;
                    // t.resourseName = item.name;
                    // if(item.workType){
                    //     if (item.workType.workTypeId) {
                    //         simpleDeepCopy(t.workType, item.workType);
                    //     }
                    //
                    // }


                    pools.push(t);

                }
            }

            if (pools.length > 0) {
                //提交到数据库中,成功后显示到界面
                let batchData: BylDetailBatchAddModel<BylSettleDetailBorrowMoneyTicket> = new BylDetailBatchAddModel();
                batchData.items = pools;
                batchData.masterId = this.masterId;
                batchData.modifyDateTime = this.masterModifyDateTime;

                console.log("in WorkTypeConfigDetail addResourse", batchData);
                // 根据类型生成角色或账户权限
                this.settleDetailBorrowMoneyTicketService.batchAddDetail(batchData)
                    .subscribe(
                        data => {
                            this.loading = false;
                            if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                                //1.修改当前的时间戳
                                this.masterModifyDateTime = data.data.ticket.modifyAction.modifyDateTime;
                                //2。显示返回值
                                this.listData = [...this.listData,...this.genListDataFromArray(data.data.details) ];
                                //3. 将时间戳返回到调用方
                                // this.changeModifyDateTime.emit(this.masterModifyDateTime);
                                this.batchAddItem.emit(data.data);

                            } else {
                                this.showMsg(data.msg);
                            }
                        },
                        err => {
                            this.loading = false;
                            console.log(err);
                            this.showMsg(err.toString());
                        }
                    );
            }
        });

    }


}
