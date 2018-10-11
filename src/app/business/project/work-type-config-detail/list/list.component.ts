import {Component, Input} from '@angular/core';
import {BylItemListComponentBase} from "../../../common/item-list-component-base";
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
import {BylItemBatchAddModel} from "../../../../service/model/item-batch-add.model";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {BylOutsourceEmployeeItemListComponent} from "../../outsource-employee/item-list/item-list.component";


@Component({
    selector: 'byl-work-type-config-detail-list',
    templateUrl: './list.component.html',
})
export class BylWorkTypeConfigDetailListComponent
    extends BylItemListComponentBase<BylWorkTypeConfigDetail> {



    @Input()
    set setMasterId(value: string) {
        this.masterId = value;
    }

    @Input()
    set setModifyDateTime(value: number) {
        this.masterModifyDateTime = value;
    }

    private _outsourcerWidget: any;
    @Input()
    set setOutsourcerWidget(value: any){
        this._outsourcerWidget = value;
    }

    @Input() ReadOnly: boolean = false;

    public addForm: NzModalRef; //维护界面

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public workTypeConfigDetailService: BylWorkTypeConfigDetailService) {
        super(message, configService, modalService, router);

        this.businessService = workTypeConfigDetailService;

        // this.businessCrudComponent = BylExpenseTicketDetailCrudComponent;
    }

    ngOnInit() {
    }

    genListData(data: BylWorkTypeConfigDetail): BylListFormData<BylWorkTypeConfigDetail> {
        let item = new BylListFormData<BylWorkTypeConfigDetail>();
        item.checked = false;
        // item.disabled = (data.status === BylRoleStatus.SUBMITED_DELETED);
        item.item = new BylWorkTypeConfigDetail();
        simpleDeepCopy(item.item, data);
        return item;
    }


    updateListData(newData: BylWorkTypeConfigDetail) {
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
                    findAvailablePoolsService: this.workTypeConfigDetailService,
                    masterId: this.masterId,
                    outsourcerWidget: this._outsourcerWidget
                },
                nzMaskClosable: false
            });
        }else{
            //查找导入内部员工
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
                    findAvailablePoolsService: this.workTypeConfigDetailService,
                    masterId: this.masterId,
                },
                nzMaskClosable: false
            });
        }

        // this.addForm.next(BylCrudEvent[BylCrudEvent.bylSaving]);

        this.addForm.afterClose.subscribe(result => {
            console.info(result);

            console.info(typeof result);

            //返回的是选中的账户数组
            let pools: Array<BylWorkTypeConfigDetail> = [];
            if ((typeof result) === 'object') {
                for (let item of result) {
                    let t = new BylWorkTypeConfigDetail();
                    t.resourseId = item.id;
                    t.resourseCode = item.code;
                    t.resourseName = item.name;
                    if(item.workType){
                        if (item.workType.workTypeId) {
                            t.fromWorkTypeId = item.workType.workTypeId;
                            t.fromWorkTypeCode = item.workType.workTypeCode;
                            t.fromWorkTypeName = item.workType.workTypeName;
                        }

                    }


                    pools.push(t);

                }
            }

            if (pools.length > 0) {
                //提交到数据库中,成功后显示到界面
                let batchData: BylItemBatchAddModel<BylWorkTypeConfigDetail> = new BylItemBatchAddModel();
                batchData.items = pools;
                batchData.masterId = this.masterId;
                batchData.modifyDateTime = this.masterModifyDateTime;

                console.log("in WorkTypeConfigDetail addResourse", batchData);
                // 根据类型生成角色或账户权限
                this.workTypeConfigDetailService.batchAddDetail(batchData)
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


}
