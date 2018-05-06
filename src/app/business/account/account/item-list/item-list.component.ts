import {Component, Input, OnInit} from '@angular/core';
import {NzMessageService, NzModalService, NzModalRef} from "ng-zorro-antd";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {BylConfigService} from "../../../../service/constant/config.service";
import {Router} from "@angular/router";
import {BylListFormData} from "../../../../service/model/list-form-data.model";
import {BylCrudEvent} from "../../../common/waiting/crud-waiting.component";
import {BylAccount} from "../../../../service/account/model/account.model";
import {BylAccountListComponent} from "../list/list.component";
import {
    BylAccountAvailablePoolsInterface, BylFindEntityAccountInterface,
    BylSaveAccountRelationInterface
} from "../../../../service/account/service/account-related.interface";
import {BylListFormFunctionModeEnum} from "../../../../service/model/list-form-function-mode.enum";

// export const enum AccountEntityTypeEnum{
//     ROLE = 1,
//     DEPARTMENT = 2
// }

@Component({
  selector: 'byl-account-item-list',
  templateUrl: './item-list.component.html',
})
export class BylAccountItemListComponent implements OnInit {

    private _masterId: string;
    @Input()
    set masterId(value: string){
        this._masterId = value;
    }

    @Input() findAvailablePoolsService: BylAccountAvailablePoolsInterface; //调用方，用户调出选择添加账户的窗口

    @Input() saveAccountRelationService: BylSaveAccountRelationInterface; //调用方传入查询函数
    @Input() findEntityAccountService: BylFindEntityAccountInterface; //调用方传入查询已经对应的账户

    public listData : Array<BylListFormData<BylAccount>> = []; // 显示内容

    public selectedRows: Array<BylListFormData<BylAccount>> = []; //被选中的数据
    public indeterminate = false;
    public allChecked = false; //是否全部选中


    public addForm: NzModalRef;//维护界面

    public loading = false;

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router
                ) {

    }

    ngOnInit(){

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
     * 从账户中选择可用的资源
     */
    addAccount() {


        this.addForm = this.modalService.create({
            nzTitle: '查找账户',
            nzZIndex: 9999, //最外层
            nzWidth: '90%',
            nzContent: BylAccountListComponent,
            // onOk() {
            //
            // },
            // onCancel() {
            //     console.log('Click cancel');
            // },
            nzComponentParams: {
                functionMode: BylListFormFunctionModeEnum.SELECT,
                findAvailablePoolsService: this.findAvailablePoolsService,
                masterId: this._masterId
            },
            nzMaskClosable: false
        });
        // this.addForm.next(BylCrudEvent[BylCrudEvent.bylSaving]);

        this.addForm.destroy(result => {
            console.info(result);

            console.info(typeof result);

            //返回的是选中的账户数组
            let pools: Array<BylAccount> = [];
            if ((typeof result) === 'object') {
                console.log('添加新增的个体数据');
                for (let item of result) {
                    pools.push(item.item);
                }
            }

            if (pools.length > 0) {
                //todo 提交到数据库中,成功后显示到界面

                // 根据类型生成角色或账户权限
                this.saveAccountRelationService.saveAccountRelation(this.genAccountArray(pools),this._masterId)
                    .subscribe(
                        data => {
                            this.loading = false;
                            if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                                // 正确添加数据后，直接添加到当前选中的权限，不像search过程，会重新刷新total值
                                this.listData.push(...this.genListDataFromArray(pools));

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
    // /**
    //  * 显示添加权限界面
    //  */
    // add() {
    //     // this.router.navigate(['/account/role/crud',"new"]);
    //     // if (this.crudUrl) {
    //     this.modifyForm = this.modalService.open({
    //         title: '添加',
    //         content: this.businessCrudComponent,
    //         // onOk() {
    //         //
    //         // },
    //         // onCancel() {
    //         //     console.log('Click cancel');
    //         // },
    //         footer: false,
    //         componentParams: {
    //             sourceId: null,
    //             masterId: this.masterId,
    //         },
    //         maskClosable: false
    //     });
    //     //
    //     this.modifyForm.subscribe(result => {
    //         console.log(result);
    //         if (result.type === BylCrudEvent[BylCrudEvent.bylUpdate]) {
    //             //更新对应的数据
    //             this.listData.push(this.genListData(result.data));
    //         }
    //     });
    //     // }
    //
    // }

    /**
     * 查找
     */
    search() {

        this.loading = true;
        this.clearGrid();

        this.findEntityAccountService.findEntityAccount(this._masterId)
            .subscribe(
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

    genListDataFromArray(findResult: Array<BylAccount>): Array<BylListFormData<BylAccount>>{
        return findResult.map(data => {
            return this.genListData(data);
        })
    };

    genListData(data: BylAccount): BylListFormData<BylAccount>{
        // return findResult.map(data => {
        let item = new BylListFormData<BylAccount>();
        item.checked = false;
        // item.disabled = (data.status === BylRoleStatus.DELETED);
        item.item = new BylAccount();
        Object.assign(item.item,data);
        return item;
        // })
    }

    genAccountArray(selectedArray: Array<BylAccount>): Array<string>{
        let result: Array<string> = [];

        selectedArray.forEach((item) =>{
            result.push(item.id);
        });

        return result;
    }


    /**
     * 删除明细
     * @param {string} id
     */
    delete(id:string){

    }

    /**
     * 批量删除
     */
    batchDelete(){

    }



}
