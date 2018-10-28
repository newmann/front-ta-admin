import {Component, Input} from '@angular/core';
import {BylListComponentTicketDetail} from "../../../common/list-component-ticket-detail";
import {NzMessageService, NzModalRef, NzModalService} from "ng-zorro-antd";
import {BylConfigService} from "../../../../service/constant/config.service";
import {Router} from "@angular/router";
import {BylListFormData} from "../../../../service/model/list-form-data.model";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylEmployeeItemListComponent} from "../../employee/item-list/item-list.component";
import {BylDetailBatchAddModel} from "../../../../service/model/detail-batch-add.model";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {BylOutsourceEmployeeItemListComponent} from "../../outsource-employee/item-list/item-list.component";
import {BylSettleDetailWorkload} from "../../../../service/project/model/settle-detail-workload.model";
import {BylSettleDetailWorkloadService} from "../../../../service/project/service/settle-detail-workload.service";
import {BylSettleTicket} from "../../../../service/project/model/settle-ticket.model";


@Component({
    selector: 'byl-settle-detail-workload-list',
    templateUrl: './list.component.html',
})
export class BylSettleDetailWorkLoadListComponent
    extends BylListComponentTicketDetail<BylSettleDetailWorkload,BylSettleTicket> {



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
                public settleDetailWorkloadService: BylSettleDetailWorkloadService) {
        super(message, configService, modalService, router);

        this.businessService = settleDetailWorkloadService;

        // this.businessCrudComponent = BylExpenseTicketDetailCrudComponent;
    }

    ngOnInit() {
    }

    genListData(data: BylSettleDetailWorkload): BylListFormData<BylSettleDetailWorkload> {
        let item = new BylListFormData<BylSettleDetailWorkload>();
        item.checked = false;
        // item.disabled = (data.status === BylRoleStatus.SUBMITED_DELETED);
        item.item = new BylSettleDetailWorkload();
        simpleDeepCopy(item.item, data);
        return item;
    }


    updateListData(newData: BylSettleDetailWorkload) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                simpleDeepCopy(item.item, newData);
            })
    }


    // addResourse(){
    //     if (this._outsourcerWidget){
    //         //查找导入外包商员工
    //         this.addForm = this.modalService.create({
    //             nzTitle: '添加员工',
    //             nzZIndex: 9999, //最外层
    //             nzWidth: '90%',
    //             nzContent: BylOutsourceEmployeeItemListComponent,
    //             nzFooter: null,
    //             // onOk() {
    //             //
    //             // },
    //             // onCancel() {
    //             //     console.log('Click cancel');
    //             // },
    //             nzComponentParams: {
    //                 findAvailablePoolsService: this.settleDetailWorkloadService,
    //                 masterId: this.masterId,
    //                 outsourcerWidget: this._outsourcerWidget
    //             },
    //             nzMaskClosable: false
    //         });
    //     }else{
    //         //查找导入内部员工
    //         this.addForm = this.modalService.create({
    //             nzTitle: '添加员工',
    //             nzZIndex: 9999, //最外层
    //             nzWidth: '90%',
    //             nzContent: BylEmployeeItemListComponent,
    //             nzFooter: null,
    //             // onOk() {
    //             //
    //             // },
    //             // onCancel() {
    //             //     console.log('Click cancel');
    //             // },
    //             nzComponentParams: {
    //                 findAvailablePoolsService: this.settleDetailWorkloadService,
    //                 masterId: this.masterId,
    //             },
    //             nzMaskClosable: false
    //         });
    //     }

        // this.addForm.next(BylCrudEvent[BylCrudEvent.bylSaving]);

    //     this.addForm.afterClose.subscribe(result => {
    //         console.info(result);
    //
    //         console.info(typeof result);
    //
    //         //返回的是选中的账户数组
    //         let pools: Array<BylSettleDetailWorkload> = [];
    //         if ((typeof result) === 'object') {
    //             for (let item of result) {
    //                 let t = new BylSettleDetailWorkload();
    //                 t.resourseId = item.id;
    //                 t.resourseCode = item.code;
    //                 t.resourseName = item.name;
    //                 if(item.workType){
    //                     if (item.workType.workTypeId) {
    //                         t.fromWorkTypeId = item.workType.workTypeId;
    //                         t.fromWorkTypeCode = item.workType.workTypeCode;
    //                         t.fromWorkTypeName = item.workType.workTypeName;
    //                     }
    //
    //                 }
    //
    //
    //                 pools.push(t);
    //
    //             }
    //         }
    //
    //         if (pools.length > 0) {
    //             //提交到数据库中,成功后显示到界面
    //             let batchData: BylDetailBatchAddModel<BylSettleDetailWorkload> = new BylDetailBatchAddModel();
    //             batchData.items = pools;
    //             batchData.masterId = this.masterId;
    //             batchData.modifyDateTime = this.masterModifyDateTime;
    //
    //             console.log("in WorkTypeConfigDetail addResourse", batchData);
    //             // 根据类型生成角色或账户权限
    //             this.settleDetailWorkloadService.batchAddDetail(batchData)
    //                 .subscribe(
    //                     data => {
    //                         this.loading = false;
    //                         if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
    //                             //1.修改当前的时间戳
    //                             this.masterModifyDateTime = data.data.modifyDateTime;
    //                             //2。显示返回值
    //                             this.listData = [...this.listData,...this.genListDataFromArray(data.data.items) ];
    //                             //3. 将时间戳返回到调用方
    //                             this.changeModifyDateTime.emit(this.masterModifyDateTime);
    //
    //                         } else {
    //                             this.showMsg(data.msg);
    //                         }
    //                     },
    //                     err => {
    //                         this.loading = false;
    //                         console.log(err);
    //                         this.showMsg(err.toString());
    //                     }
    //                 );
    //         }
    //     });
    //
    // }


}
