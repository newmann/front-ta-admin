import {Component, Input, OnInit} from '@angular/core';
import {BylPermission} from "../../../../service/account/model/permission.model";
import {NzMessageService, NzModalRef, NzModalService} from "ng-zorro-antd";
import {BylConfigService} from "../../../../service/constant/config.service";
import {Router} from "@angular/router";
import {BylPermissionService} from "../../../../service/account/service/permission.service";
import {BylListFormData} from "../../../../service/model/list-form-data.model";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {BylPermissionListComponent} from "../list/list.component";
import {Observable} from "rxjs";
import {BylListFormFunctionModeEnum} from "../../../../service/model/list-form-function-mode.enum";
import {
    BylFindEntityPermissionInterface,
    BylPermissionAvailablePoolsInterface, BylPermissionRelationInterface,
    BylSavePermissionRelationInterface
} from "../../../../service/account/service/permission-related.interface";
import {BylEntityRelationListComponentBase} from "../../../common/entity-relation-list.component-base";
import {BylMenuLinkListComponent} from "../../menu-link/list/list.component";
import {BylMenuLinkRelationInterface} from "../../../../service/account/service/menu-link-related.interface";
import {BylPermissionAddPoolListComponent} from "../add-pool-list/add-pool-list.component";

// export const enum PermissionEntityTypeEnum{
//     ROLE = 1,
//     ACCOUNT = 2
// }

@Component({
  selector: 'byl-permission-item-list',
  templateUrl: './item-list.component.html',
})
export class BylPermissionItemListComponent extends BylEntityRelationListComponentBase<BylPermission> {

    // private _haveSearched: boolean =false; //是否已经查询过
    //
    // get haveSearched(): boolean{
    //     return this._haveSearched;
    // }
    //
    // @Input()
    // ReadOnly: boolean = false;
    //
    // private _masterId: string;
    // @Input()
    // set masterId(value: string){
    //     this._masterId = value;
    // }
    //
    // @Input() findAvailablePoolsService: BylPermissionAvailablePoolsInterface; //调用方，用户调出选择添加账户的窗口
    //
    // @Input() savePermissionRelationService: BylSavePermissionRelationInterface; //调用方传入查询函数
    // @Input() findEntityPermissionService: BylFindEntityPermissionInterface; //调用方传入查询已经对应的账户
    //
    // public listData : Array<BylListFormData<BylPermission>> = []; // 显示内容
    //
    // public selectedRows: Array<BylListFormData<BylPermission>> = []; //被选中的数据
    // public indeterminate = false;
    // public allChecked = false; //是否全部选中
    //
    //
    // public addForm: NzModalRef;//维护界面
    //
    // public loading = false;
    @Input() permissionRelationService: BylPermissionRelationInterface; //调用方，用户调出选择添加账户的窗口
    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router) {
        super(message,configService,modalService,router);
        this.selectPoolsComponent = BylPermissionAddPoolListComponent;
        this.selectPoolsTitle = "查找权限定义";
    }

    deleteRelation(idArray: Array<string>, masterId: string): Observable<BylResultBody<Boolean>> {
        return this.permissionRelationService.deletePermissionRelation(idArray,masterId);
    }

    findEntities(masterId: string): Observable<BylResultBody<Array<BylPermission>>> {
        return this.permissionRelationService.findEntityPermission(masterId);
    }

    getFindPoolsService(): any {
        return this.permissionRelationService;
    }

    saveRelation(idArray: Array<string>, masterId: string): Observable<BylResultBody<Boolean>> {
        return this.permissionRelationService.savePermissionRelation(idArray,masterId);
    }

    // ngOnInit(){
    //
    // }
    // checkAll(value: boolean) {
    //     this.listData.forEach(item =>{if (!item.disabled) item.checked = value;});
    //     this.refreshStatus();
    // }
    //
    // refreshStatus() {
    //     const allChecked = this.listData.every(value => value.disabled || value.checked);
    //     const allUnChecked = this.listData.every(value => value.disabled || !value.checked);
    //     this.allChecked = allChecked;
    //     this.indeterminate = (!allChecked) && (!allUnChecked);
    //     this.selectedRows = this.listData.filter(value => value.checked);
    //     // this.totalCallNo = this.selectedRows.reduce((total, cv) => total + cv.callNo, 0);
    // }
    //
    // showMsg(msg: string) {
    //     this.message.info(msg);
    // }
    // /**
    //  * 选择权限
    //  */
    // addPermission() {
    //
    //
    //     this.addForm = this.modalService.create({
    //         nzTitle: '查找权限',
    //         nzZIndex: 9999, //最外层
    //         nzWidth: '90%',
    //         nzContent: BylPermissionListComponent,
    //         nzFooter: null,
    //         // onOk() {
    //         //
    //         // },
    //         // onCancel() {
    //         //     console.log('Click cancel');
    //         // },
    //         nzComponentParams: {
    //             functionMode: BylListFormFunctionModeEnum.SELECT,
    //             findAvailablePoolsService: this.findAvailablePoolsService,
    //             masterId: this._masterId,
    //             // selectModalForm: this.addForm
    //         },
    //         nzMaskClosable: false
    //     });
    //     // this.addForm.next(BylCrudEvent[BylCrudEvent.bylSaving]);
    //
    //     this.addForm.afterClose.subscribe(result => {
    //         console.info(result);
    //
    //         console.info(typeof result);
    //
    //         //返回的是选中的账户数组
    //         let pools: Array<BylPermission> = [];
    //         if ((typeof result) === 'object') {
    //             console.log('添加新增的个体数据');
    //             for (let item of result) {
    //                 pools.push(item.item);
    //             }
    //         }
    //
    //         if (pools.length > 0) {
    //             //todo 提交到数据库中,成功后显示到界面
    //             let batchAdd: Observable<BylResultBody< any >>;
    //
    //             // 根据类型生成角色或账户权限
    //             batchAdd = this.savePermissionRelationService.savePermissionRelation(this.genPermissionArray(pools),
    //                 this._masterId);
    //             // switch(this._masterEntityType) {
    //             //     case PermissionEntityTypeEnum.ROLE:
    //             //         batchAdd = this.permissionService.batchAddRolePermission(this.genRolePermissionArray(pools));
    //             //         break;
    //             //     case PermissionEntityTypeEnum.ACCOUNT:
    //             //         batchAdd = this.permissionService.batchAddAccountPermission(this.genAccountPermissionArray(pools));
    //             //         break;
    //             //     default:
    //             //         console.error("masterEntityType 错误",this._masterEntityType);
    //             //         return;
    //             // }
    //
    //             batchAdd.subscribe(
    //                 data => {
    //                     this.loading = false;
    //                     if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
    //                         // 正确添加数据后，直接添加到当前选中的权限，不像search过程，会重新刷新total值
    //                         this.listData = [...this.listData,...this.genListDataFromArray(pools)];
    //
    //                     } else {
    //                         this.showMsg(data.msg);
    //                     }
    //                 },
    //                 err => {
    //                     this.loading = false;
    //                     console.log(err);
    //                     this.showMsg(err.toString());
    //                 }
    //             );
    //         }
    //     });
    // }
    // // /**
    // //  * 显示添加权限界面
    // //  */
    // // add() {
    // //     // this.router.navigate(['/account/role/crud',"new"]);
    // //     // if (this.crudUrl) {
    // //     this.modifyForm = this.modalService.open({
    // //         title: '添加',
    // //         content: this.businessCrudComponent,
    // //         // onOk() {
    // //         //
    // //         // },
    // //         // onCancel() {
    // //         //     console.log('Click cancel');
    // //         // },
    // //         footer: false,
    // //         componentParams: {
    // //             _sourceId: null,
    // //             masterId: this.masterId,
    // //         },
    // //         maskClosable: false
    // //     });
    // //     //
    // //     this.modifyForm.subscribe(result => {
    // //         console.log(result);
    // //         if (result.type === BylCrudEvent[BylCrudEvent.bylUpdate]) {
    // //             //更新对应的数据
    // //             this.listData.push(this.genListData(result.data));
    // //         }
    // //     });
    // //     // }
    // //
    // // }
    //
    // /**
    //  * 查找
    //  */
    // search() {
    //
    //     if (!this._masterId) {return;}
    //
    //     this.loading = true;
    //
    //     this._haveSearched = true;
    //
    //     this.clearGrid();
    //     let findResult:  Observable<BylResultBody<Array<BylPermission>>>;
    //
    //     findResult = this.findEntityPermissionService.findEntityPermission(this._masterId);
    //
    //     // switch (this._masterEntityType){
    //     //     case PermissionEntityTypeEnum.ACCOUNT:
    //     //         findResult = this.permissionService.findByAccountId(this._masterId);
    //     //         break;
    //     //     case PermissionEntityTypeEnum.ROLE:
    //     //         findResult = this.permissionService.findByRoleId(this._masterId);
    //     //         break;
    //     //     default:
    //     //         findResult = null;
    //     // }
    //     //
    //     // if (findResult === null) {return ;}
    //
    //     findResult.subscribe(
    //         data => {
    //             this.loading = false;
    //             if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
    //                 // 正确获取数据
    //                 // this.total = data.data.total;
    //
    //                 this.listData = this.genListDataFromArray(Array.from(data.data));
    //
    //
    //             } else {
    //                 this.showMsg(data.msg);
    //             }
    //         },
    //         err => {
    //             this.loading = false;
    //             console.log(err);
    //             this.showMsg(err.toString());
    //         }
    //     );
    // }
    //
    //
    // /**
    //  * 重置Grid
    //  */
    // clearGrid(){
    //     this.listData = []; // 显示内容
    //     this.selectedRows = [];
    //     this.indeterminate = false;
    //     this.allChecked = false;
    // }
    //
    // genListDataFromArray(findResult: Array<BylPermission>): Array<BylListFormData<BylPermission>>{
    //     return findResult.map(data => {
    //         return this.genListData(data);
    //     })
    // };
    //
    // genListData(data: BylPermission): BylListFormData<BylPermission>{
    //     // return findResult.map(data => {
    //     let item = new BylListFormData<BylPermission>();
    //     item.checked = false;
    //     // item.disabled = (data.status === BylRoleStatus.SUBMITED_DELETED);
    //     item.item = new BylPermission();
    //     Object.assign(item.item,data);
    //     return item;
    //     // })
    // }
    //
    //
    // /**
    //  * 删除明细
    //  * @param {string} id
    //  */
    // delete(id:string){
    //
    // }
    //
    // /**
    //  * 批量删除
    //  */
    // batchDelete(){
    //
    // }
    //
    // genPermissionArray(permissionArray: Array<BylPermission>) : Array<string>{
    //
    //     let result: Array<string> = [];
    //
    //     permissionArray.forEach((item) =>{
    //         result.push(item.id);
    //     });
    //
    //     return result;
    // }
    //
    // // genAccountPermissionArray(permissionArray: Array<BylPermission>) : Array<BylAccountPermission>{
    // //
    // //     let result: Array<BylAccountPermission> = [];
    // //
    // //     permissionArray.forEach((item) =>{
    // //        let p = new BylAccountPermission();
    // //        p.accountId = this._masterId;
    // //        p.permissionId = item.id;
    // //        result.push(p);
    // //     });
    // //
    // //     return result;
    // // }
    // //
    // // genRolePermissionArray(permissionArray: Array<BylPermission>) : Array<BylRolePermission>{
    // //
    // //     let result: Array<BylRolePermission> = [];
    // //
    // //     permissionArray.forEach((item) =>{
    // //         let p = new BylRolePermission();
    // //         p.roleId = this._masterId;
    // //         p.permissionId = item.id;
    // //         result.push(p);
    // //     });
    // //
    // //     return result;
    // // }

}
