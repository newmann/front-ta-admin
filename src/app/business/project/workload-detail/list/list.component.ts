import {Component, Input} from '@angular/core';
import {BylItemListComponentBase} from "../../../common/item-list-component-base";
import {NzMessageService, NzModalRef, NzModalService} from "ng-zorro-antd";
import {BylConfigService} from "../../../../service/constant/config.service";
import {Router} from "@angular/router";
import {BylListFormData} from "../../../../service/model/list-form-data.model";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylWorkloadDetail} from "../../../../service/project/model/workload-detail.model";
import {BylWorkloadDetailService} from "../../../../service/project/service/workload-detail.service";
import {BylEmployeeListComponent} from "../../employee/list/list.component";
import {BylEmployee} from "../../../../service/project/model/employee.model";
import {BylOutsourceEmployeeItemListComponent} from "../../outsource-employee/item-list/item-list.component";
import {BylWorkTypeConfigDetail} from "../../../../service/project/model/work-type-config-detail.model";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {BylItemBatchAddModel} from "../../../../service/model/item-batch-add.model";
import {BylEmployeeItemListComponent} from "../../employee/item-list/item-list.component";
import {BylWorkloadDetailDetailBrowserComponent} from "../../workload-detail-detail/list/list.component";
import {BylWorkloadTicket} from "../../../../service/project/model/workload-ticket.model";
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";
import {BylItemUpdateModel} from "../../../../service/model/item-update.model";


@Component({
    selector: 'byl-workload-detail-list',
    templateUrl: './list.component.html',
})
export class BylWorkloadDetailListComponent
    extends BylItemListComponentBase<BylWorkloadDetail> {

    // @Input()
    // set setMasterId(value: string) {
    //     this.masterId = value;
    // }
    //
    // @Input()
    // set setModifyDateTime(value: number) {
    //     this.masterModifyDateTime = value;
    // }

    private _oldShouldPayCount:number; //判断明细的明细记录中是否进行调整

    private _outsourcerWidget: any;
    @Input()
    set setOutsourcerWidget(value: any){
        this._outsourcerWidget = value;
    }

    @Input()
    set setWorkloadTicket(value: BylWorkloadTicket){
        this.workloadTicket = value;
        this.masterId = value.id;
        this.masterModifyDateTime = value.modifyAction.modifyDateTime;
    }


    workloadTicket: BylWorkloadTicket;

    public addForm: NzModalRef; //维护界面

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public workloadTicketDetailService: BylWorkloadDetailService) {
        super(message, configService, modalService, router);

        this.businessService = workloadTicketDetailService;

        // this.businessCrudComponent = BylExpenseTicketDetailCrudComponent;
    }

    ngOnInit() {
    }

    genListData(data: BylWorkloadDetail): BylListFormData<BylWorkloadDetail> {
        let item = new BylListFormData<BylWorkloadDetail>();
        item.checked = false;
        // item.disabled = (data.status === BylRoleStatus.SUBMITED_DELETED);
        item.item = new BylWorkloadDetail();
        simpleDeepCopy(item.item, data);
        return item;
    }


    updateListData(newData: BylWorkloadDetail) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                simpleDeepCopy(item.item, newData);
            })
    }


    addResourse(){
        if (this._outsourcerWidget){
            //查找导入外包商员工
            this.addForm = this.modalService.create({
                nzTitle: '添加员工',
                nzZIndex: 9999, //最外层
                nzWidth: '90%',
                nzContent: BylOutsourceEmployeeItemListComponent,
                nzFooter: null,
                // onOk() {
                //
                // },
                // onCancel() {
                //     console.log('Click cancel');
                // },
                nzComponentParams: {
                    findAvailablePoolsService: this.workloadTicketDetailService,
                    masterId: this.masterId,
                    outsourcerWidget: this._outsourcerWidget
                },
                nzMaskClosable: false
            });
        }else {
            this.addForm = this.modalService.create({
                nzTitle: '添加员工',
                nzZIndex: 9999, //最外层
                nzWidth: '90%',
                nzContent: BylEmployeeItemListComponent,
                nzFooter: null,
                // onOk() {
                //
                // },
                // onCancel() {
                //     console.log('Click cancel');
                // },
                nzComponentParams: {
                    findAvailablePoolsService: this.workloadTicketDetailService,
                    masterId: this.masterId,
                },
                nzMaskClosable: false
            });
        }
        // this.addForm.next(BylCrudEvent[BylCrudEvent.bylSaving]);

        this.addForm.afterClose.subscribe(result => {
            //返回的是选中的账户数组
            let pools: Array<BylWorkloadDetail> = [];
            if ((typeof result) === 'object') {
                for (let item of result) {
                    let t = new BylWorkloadDetail();
                    t.resourseId = item.id;
                    t.resourseCode = item.code;
                    t.resourseName = item.name;
                    if(item.workType){
                        if (item.workType.workTypeId) {
                            t.workType.workTypeId = item.workType.workTypeId;
                            t.workType.workTypeCode = item.workType.workTypeCode;
                            t.workType.workTypeName = item.workType.workTypeName;
                        }

                    }


                    pools.push(t);

                }
            }

            if (pools.length > 0) {
                //提交到数据库中,成功后显示到界面
                let batchData: BylItemBatchAddModel<BylWorkloadDetail> = new BylItemBatchAddModel();
                batchData.items = pools;
                batchData.masterId = this.masterId;
                batchData.modifyDateTime = this.masterModifyDateTime;

                console.log("in WorkloadDetail addResourse", batchData);
                // 根据类型生成角色或账户权限
                this.workloadTicketDetailService.batchAddDetail(batchData)
                    .subscribe(
                        data => {
                            this.loading = false;
                            if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                                //1.修改当前的时间戳
                                this.masterModifyDateTime = data.data.modifyDateTime;
                                //2。显示返回值
                                this.listData = [...this.listData,...this.genListDataFromArray(data.data.items) ];
                                //3. 将时间戳返回到调用方
                                this.changeModifyDateTime.emit(this.masterModifyDateTime);

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

    modifyDetail(entity: BylWorkloadDetail){
        if(! entity.workType){
            //员工没有设置工种类型，这提示错误
            this.showMsg("当前员工没有设置工种类型，请设置完整后再设置考勤明细。");
            return;
        }
        this._oldShouldPayCount = entity.shouldPayCount;

        this.addForm = this.modalService.create({
            nzTitle: '设置明细考勤 - ' + entity.resourseName +"["+ entity.resourseCode +"] - "
                + entity.workType.workTypeName +"["+ entity.workType.workTypeCode +"]",
            nzZIndex: 9999, //最外层
            nzWidth: '90%',
            nzContent: BylWorkloadDetailDetailBrowserComponent,
            nzFooter: null,
            nzClosable: false, //只能通过component中的按钮退出，以便相应的处理
            // onOk() {
            //
            // },
            // onCancel() {
            //     console.log('Click cancel');
            // },
            nzComponentParams: {
                // beginDate: BylDatetimeUtils.convertMillsToDateTime(this.workloadTicket.operationPeriod.operatonPeriodBeginDate),
                // endDate: BylDatetimeUtils.convertMillsToDateTime(this.workloadTicket.operationPeriod.operatonPeriodEndDate),
                setWorkloadTicket: this.workloadTicket,
                workloadDetail: entity
            },
            nzMaskClosable: false
        });

        this.addForm.afterClose.subscribe(
            (value: BylWorkloadDetail)=>{
                if(this._oldShouldPayCount !== value.shouldPayCount){
                    //进入明细的明细界面后，有调整，这保存。
                    this.loading = true;

                    let saveValue : BylItemUpdateModel<BylWorkloadDetail> = new BylItemUpdateModel<BylWorkloadDetail>();
                    saveValue.masterId = this.workloadTicket.id;
                    saveValue.modifyDateTime = this.workloadTicket.modifyAction.modifyDateTime;
                    //将传回的明细记录保存到数据库中，以便同步考勤日期
                    saveValue.item = simpleDeepCopy({},value);

                    this.workloadTicketDetailService.updateDetail(saveValue)
                        .subscribe(
                            data => {
                                this.loading = false;
                                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                                    //1.修改当前的时间戳
                                    this.masterModifyDateTime = data.data.modifyDateTime;
                                    //2。显示返回值
                                    this.updateListData(data.data.item);
                                    //3. 将时间戳返回到调用方
                                    this.changeModifyDateTime.emit(this.masterModifyDateTime);

                                } else {
                                    this.showMsg(data.msg);
                                }
                            },
                            err => {
                                this.loading = false;
                                console.log(err);
                                this.showMsg(err.toString());
                            }
                        )
                }else{
                    //考勤数字没有修改，但有可能调整了其他内容，所以还要判断一下时间戳
                    if( this.masterModifyDateTime !== this.workloadTicket.modifyAction.modifyDateTime){
                        this.masterModifyDateTime = this.workloadTicket.modifyAction.modifyDateTime;
                        this.changeModifyDateTime.emit(this.masterModifyDateTime);

                    }
                }
            },
            err => {
                console.log(err);
                this.showMsg(err.toString());
            }
        );

    }

}
