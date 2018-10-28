import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BylListComponentTicketDetail} from "../../../common/list-component-ticket-detail";
import {NzMessageService, NzModalRef, NzModalService} from "ng-zorro-antd";
import {BylConfigService} from "../../../../service/constant/config.service";
import {Router} from "@angular/router";
import {BylListFormData} from "../../../../service/model/list-form-data.model";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylEmployeeListComponent} from "../../employee/list/list.component";
import {BylEmployee} from "../../../../service/project/model/employee.model";
import {BylWorkTypeConfigDetail} from "../../../../service/project/model/work-type-config-detail.model";
import {BylWorkTypeConfigDetailService} from "../../../../service/project/service/work-type-config-detail.service";
import {BylEmployeeItemListComponent} from "../../employee/item-list/item-list.component";
import {BylDetailBatchAddModel} from "../../../../service/model/detail-batch-add.model";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {BylOutsourceEmployeeItemListComponent} from "../../outsource-employee/item-list/item-list.component";
import {BylSettleDetailWorkload} from "../../../../service/project/model/settle-detail-workload.model";
import {BylSettleDetailWorkloadTicket} from "../../../../service/project/model/settle-detail-workload-ticket.model";
import {BylSettleDetailWorkloadTicketService} from "../../../../service/project/service/settle-detail-workload-ticket.service";
import {BylSettleDetailWorkloadDetailAddPoolListComponent} from "../add-workload-detail-pool-list/add-pool-list.component";
import {BylSettleTicket} from "../../../../service/project/model/settle-ticket.model";
import {BylDetailBatchAddResultModel} from "../../../../service/model/detail-batch-add-result.model";


@Component({
    selector: 'byl-settle-detail-workload-Ticket-list',
    templateUrl: './list.component.html',
})
export class BylSettleDetailWorkLoadTicketListComponent
    extends BylListComponentTicketDetail<BylSettleDetailWorkloadTicket,BylSettleTicket> {



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

    // @Output()
    // batchAddItem: EventEmitter<BylDetailBatchAddResultModel<BylSettleDetailWorkloadTicket,BylSettleTicket>> = new EventEmitter<BylDetailBatchAddResultModel<BylSettleDetailWorkloadTicket,BylSettleTicket>>();

    public addForm: NzModalRef; //维护界面

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public settleDetailWorkloadTicketService: BylSettleDetailWorkloadTicketService) {
        super(message, configService, modalService, router);

        this.businessService = settleDetailWorkloadTicketService;

        // this.businessCrudComponent = BylExpenseTicketDetailCrudComponent;
    }

    ngOnInit() {
    }

    genListData(data: BylSettleDetailWorkloadTicket): BylListFormData<BylSettleDetailWorkloadTicket> {
        let item = new BylListFormData<BylSettleDetailWorkloadTicket>();
        item.checked = false;
        // item.disabled = (data.status === BylRoleStatus.SUBMITED_DELETED);
        item.item = new BylSettleDetailWorkloadTicket();
        simpleDeepCopy(item.item, data);
        return item;
    }


    updateListData(newData: BylSettleDetailWorkloadTicket) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                simpleDeepCopy(item.item, newData);
            })
    }


    addResourse(){
            //查找导入考勤单明细
        this.addForm = this.modalService.create({
            nzTitle: '添加考勤单',
            nzZIndex: 9999, //最外层
            nzWidth: '90%',
            nzContent: BylSettleDetailWorkloadDetailAddPoolListComponent,
            nzFooter: null,
            // onOk() {
            //
            // },
            // onCancel() {
            //     console.log('Click cancel');
            // },
            nzComponentParams: {
                // findAvailablePoolsService: this.settleDetailWorkloadTicketService,
                masterId: this.masterTicket.settleResourse.settleResourseId
            },
            nzMaskClosable: false
        });

        // this.addForm.next(BylCrudEvent[BylCrudEvent.bylSaving]);

        this.addForm.afterClose.subscribe(result => {
            console.info('in settle-ticket workload-ticket-list component ',result);

            console.info(typeof result);

            //返回的是选中的考勤单明细
            let pools: Array<BylSettleDetailWorkloadTicket> = [];
            if ((typeof result) === 'object') {
                for (let item of result) {
                    let t = new BylSettleDetailWorkloadTicket();

                    t.masterId = this.masterId;
                    simpleDeepCopy(t.project,item.item.project);
                    t.workloadTicketId = item.item.workloadTicketId;
                    t.workloadTicketNo = item.item.workloadTicketNo;
                    t.workloadDetailId = item.item.workloadDetailId;
                    t.workloadDetailLineNo = item.item.workloadDetailLineNo;
                    t.checkType = item.item.checkType;
                    t.shouldPayCount = item.item.shouldPayCount;
                    t.standardTimeLength = item.item.standardTimeLength;

                    // t.resourseId = item.id;
                    // t.resourseCode = item.code;
                    // t.resourseName = item.name;
                    if(item.item.workType){
                      simpleDeepCopy(t.workType, item.item.workType);

                    }


                    pools.push(t);

                }
            }

            if (pools.length > 0) {
                //提交到数据库中,成功后显示到界面
                let batchData: BylDetailBatchAddModel<BylSettleDetailWorkloadTicket> = new BylDetailBatchAddModel();
                batchData.items = pools;
                batchData.masterId = this.masterId;
                batchData.modifyDateTime = this.masterModifyDateTime;

                console.log("in WorkTypeConfigDetail addResourse", batchData);
                // 根据类型生成角色或账户权限
                this.settleDetailWorkloadTicketService.batchAddDetail(batchData)
                    .subscribe(
                        data => {
                            this.loading = false;
                            if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {

                                this.processBatchAddResult(data.data);

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

    processBatchAddResult(batchAddResult: BylDetailBatchAddResultModel<BylSettleDetailWorkloadTicket,BylSettleTicket>){
        //1.修改当前的时间戳
        this.masterModifyDateTime = batchAddResult.ticket.modifyAction.modifyDateTime;
        //2。显示返回值
        this.listData = [...this.listData,...this.genListDataFromArray(batchAddResult.details) ];
        //3. 将时间戳返回到调用方
        this.batchAddItem.emit(batchAddResult);

    }


}
