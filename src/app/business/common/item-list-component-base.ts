import {OnInit} from "@angular/core";
import {BylListFormData} from "../../service/model/list-form-data.model";
import {NzMessageService, NzModalService, NzModalRef} from "ng-zorro-antd";
import {Router} from "@angular/router";
import {BylConfigService} from "../../service/constant/config.service";
import {BylCrudEvent} from "./waiting/crud-waiting.component";
import {BylResultBody} from "../../service/model/result-body.model";
import {BylItemBaseService} from "../../service/service/item-base.service";

/**
 * @Description: Master-detail模型中detail list组件的抽象类
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-04-15 9:22
 **/
export abstract class BylItemListComponentBase<T> implements OnInit {

    public masterId:string;

    public businessService: BylItemBaseService<T>;
    public businessCrudComponent: any;

    // public crudUrl: string; //新增对象的url

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
                },
                nzMaskClosable: false
            });
            //
            this.modifyForm.destroy(result => {
                console.log(result);
                if (result.type === BylCrudEvent[BylCrudEvent.bylUpdate]) {
                    //更新对应的数据
                    this.listData.push(this.genListData(result.data));
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
            },
            nzMaskClosable: false
        });
        //
        this.modifyForm.destroy(result => {
            console.log(result);
            if (result.type === BylCrudEvent[BylCrudEvent.bylUpdate]) {
                //更新对应的数据
                this.updateListData(result.data);
            }
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

}
