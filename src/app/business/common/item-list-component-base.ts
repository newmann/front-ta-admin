import {EventEmitter, OnInit, Output} from "@angular/core";
import {BylListFormData} from "../../service/model/list-form-data.model";
import {NzMessageService, NzModalService, NzModalRef} from "ng-zorro-antd";
import {Router} from "@angular/router";
import {BylConfigService} from "../../service/constant/config.service";
import {BylCrudEvent} from "./waiting/crud-waiting.component";
import {BylResultBody} from "../../service/model/result-body.model";
import {BylItemBaseService} from "../../service/service/item-base.service";
import {BylItemBaseModal} from "../../service/model/item-base.model";
import {BylItemAddModel} from "../../service/model/item-add.model";
import {BylExpenseDetail} from "../../service/project/model/expense-detail.model";
import {BylItemDeleteModel} from "../../service/model/item-delete.model";
import {simpleDeepCopy} from "../../service/utils/object.utils";
import {BylItemMoveModel} from "../../service/model/item-move.model";
import {BylItemUpdateModel} from "../../service/model/item-update.model";

/**
 * @Description: Master-detail模型中detail list组件的抽象类
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-04-15 9:22
 **/
export abstract class BylItemListComponentBase<T extends BylItemBaseModal> implements OnInit {

    public masterId:string; //单据头的id
    public masterModifyDateTime:number;//单据头的最后修改时间

    public businessService: BylItemBaseService<T>;
    public businessCrudComponent: any;

    // public crudUrl: string; //新增对象的url
    @Output()
    changeModifyDateTime: EventEmitter<number> = new EventEmitter<number>();

    public listData : Array<BylListFormData<T>> = []; // 显示内容

    public selectedRows: Array<BylListFormData<T>> = []; //被选中的数据
    public indeterminate = false;
    public allChecked = false; //是否全部选中


    public modifyForm: NzModalRef;//维护界面

    public loading = false;

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router) {


    }

    ngOnInit() {

    }

    checkAll(value: boolean) {
        this.listData.forEach(item =>{if (!item.disabled) item.checked = value;});
        this.refreshStatus();
    }

    refreshStatus() {
        const allChecked = this.listData.every(value => value.disabled || value.checked);
        const allUnChecked = this.listData.every(value => value.disabled || !value.checked);
        this.allChecked = allChecked;
        this.indeterminate = (!allChecked) && (!allUnChecked);
        this.selectedRows = this.listData.filter(value => value.checked);
        // this.totalCallNo = this.selectedRows.reduce((total, cv) => total + cv.callNo, 0);
    }

    showMsg(msg: string) {
        this.message.info(msg);
    }

    /**
     * 显示新增界面
     */
    add() {
        // this.router.navigate(['/account/role/crud',"new"]);
        // if (this.crudUrl) {
            this.modifyForm = this.modalService.create({
                nzTitle: '新增',
                nzContent: this.businessCrudComponent,
                // onOk() {
                //
                // },
                // onCancel() {
                //     console.log('Click cancel');
                // },
                nzComponentParams: {
                    sourceId: null,
                    masterId: this.masterId,
                    masterModifyDateTime: this.masterModifyDateTime
                },
                nzFooter: null,
                nzMaskClosable: false
            });
            //
            this.modifyForm.afterClose.subscribe(result => {
                console.log("in Item List add, result:", result);
                if(result){
                    this.processAddItemResult(result);
                    // if (result.type === BylCrudEvent[BylCrudEvent.bylUpdate]) {
                    //     //更新对应的数据
                    //     this.listData.push(this.genListData(result.data));
                    // }

                }
            });
        // }

    }

    modifyEntity(id:string) {

        this.modifyForm = this.modalService.create({
            nzTitle: '修改',
            nzContent: this.businessCrudComponent,
            // onOk() {
            //
            // },
            // onCancel() {
            //     console.log('Click cancel');
            // },
            nzComponentParams: {
                sourceId: id,
                masterId: this.masterId,
                masterModifyDateTime: this.masterModifyDateTime
            },
            nzFooter: null,
            nzMaskClosable: false
        });
        //
        this.modifyForm.afterClose.subscribe(result => {
            console.log(result);
            if(result){
                this.processModifyItemResult(result);
                // if (result.type === BylCrudEvent[BylCrudEvent.bylUpdate]) {
                //     //更新对应的数据
                //     this.updateListData(result.data);
                // }

            }
        });
    }
    /**
     * 删除明细
     * @param {string} id
     */
    delete(deleteItem: T) {
        console.log("in Item List delete, deleteItem:", deleteItem);
        this.loading = true;
        let item: BylItemDeleteModel<T> = new BylItemDeleteModel();
        item.masterId = this.masterId;
        item.modifyDateTime = this.masterModifyDateTime;
        item.item = simpleDeepCopy({}, deleteItem);
        console.log("in Item List delete, item:", item);

        this.businessService.deleteDetail(item)
            .subscribe(data => {
                    // this._loading = false;
                    if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                        //删除完成后，刷新一次
                        this.masterModifyDateTime = data.data.modifyDateTime;
                        this.changeModifyDateTime.emit(this.masterModifyDateTime);

                        this.search();
                        // this.listData = this.listData.filter(value=> value.item.id !== deleteItem.id);

                    } else {

                        this.message.error(data.msg);
                    }
                    this.loading = false;
                },
                err => {
                    this.message.error(err.toString());
                    this.loading = false;
                });
    }
    /**
     * 查找
     */
    search() {
        this.loading = true;

        this.clearGrid();

        this.businessService.findByMasterId(this.masterId).subscribe(
            data => {
                this.loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                    // 正确获取数据
                    // this.total = data.data.total;

                    this.listData = this.genListDataFromArray(Array.from(data.data));


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


    /**
     * 重置Grid
     */
    clearGrid(){
        this.listData = []; // 显示内容
        this.selectedRows = [];
        this.indeterminate = false;
        this.allChecked = false;
    }



    processAddItemResult(addResult: BylItemAddModel<T>){
        this.masterModifyDateTime = addResult.modifyDateTime;

        console.log("in ExpenseTicketDetail list processAddItemResult: ", addResult);
        this.listData=[...this.listData,this.genListData(addResult.item)];

        console.log("in ExpenseTicketDetail list processAddItemResult: ", this.listData);
        this.changeModifyDateTime.emit(this.masterModifyDateTime);

    };

    processModifyItemResult(modifyResult: BylItemUpdateModel<T>){
        this.masterModifyDateTime = modifyResult.modifyDateTime;
        this.updateListData( modifyResult.item);

        this.changeModifyDateTime.emit(this.masterModifyDateTime);

    };

    /**
     * 根据查询的结果，生成界面显示的内容，重点是处理好checkec和disabled字段的值。
     * @param {Array<T>} findResult
     * @returns {Array<BylListFormData<T>>}
     */
    abstract genListData(findResult: T): BylListFormData<T>;

    genListDataFromArray(findResult: Array<T>): Array<BylListFormData<T>>{
        return findResult.map(data => {
            return this.genListData(data);
        })
    };
    /**
     * 更新展示界面中的内容
      * @param {T} newData
     */
    abstract updateListData(newData:T);

    moveUp(lineNo: number) {
        this.moveAction(lineNo,lineNo -1);

    }

    moveDown(lineNo: number) {
        this.moveAction(lineNo,lineNo +1);
    }


    moveAction(fromLineNo: number, toLineNo: number){
        let moveItem : BylItemMoveModel = new BylItemMoveModel();
        moveItem.masterId = this.masterId;
        moveItem.modifyDateTime = this.masterModifyDateTime;
        moveItem.fromLineNo = fromLineNo;
        moveItem.toLineNo = toLineNo;
        if (moveItem.toLineNo<=0) return; //出错了，直接返回
        console.log("in Item List moveAction:", moveItem);

        this.businessService.moveDetail(moveItem)
            .subscribe(data => {
                    // this._loading = false;
                    if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                        //删除完成后，刷新一次
                        this.masterModifyDateTime = data.data.modifyDateTime;
                        this.changeModifyDateTime.emit(this.masterModifyDateTime);

                        this.search();
                        // this.listData = this.listData.filter(value=> value.item.id !== deleteItem.id);

                    } else {

                        this.message.error(data.msg);
                    }
                    this.loading = false;
                },
                err => {
                    this.message.error(err.toString());
                    this.loading = false;
                });

    }
}
