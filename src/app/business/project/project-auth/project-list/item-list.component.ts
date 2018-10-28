import {Component, Input, OnInit} from '@angular/core';
import {NzMessageService, NzModalRef, NzModalService} from "ng-zorro-antd";
import {BylConfigService} from "../../../../service/constant/config.service";
import {Router} from "@angular/router";
import {BylListFormData} from "../../../../service/model/list-form-data.model";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {from, Observable} from "rxjs";
import {BylListFormFunctionModeEnum} from "../../../../service/model/list-form-function-mode.enum";
import {BylProjectAuthService} from "../../../../service/project/service/project-auth.service";
import {BylAccountListComponent} from "../../../account/account/list/list.component";
import {BylAccount} from "../../../../service/account/model/account.model";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylProject} from "../../../../service/project/model/project.model";
import {BylProjectAuth} from "../../../../service/project/model/project-auth.model";
import {finalize, map} from "rxjs/internal/operators";
import {flatMap} from "rxjs/operators";
import {BylListComponentEntityRelation} from "../../../common/list-component-entity-relation";
import {BylAccountRelationInterface} from "../../../../service/account/service/account-related.interface";
import {BylAccountAddPoolListComponent} from "../../../account/account/add-pool-list/add-pool-list.component";

// export const enum PermissionEntityTypeEnum{
//     ROLE = 1,
//     ACCOUNT = 2
// }

@Component({
  selector: 'byl-project-auth-item-project-list',
  templateUrl: './item-list.component.html',
})
export class BylProjectAuthItemProjectListComponent extends BylListComponentEntityRelation<BylAccount>  {
    @Input() accountRelationService: BylAccountRelationInterface; //调用方，用户调出选择添加账户的窗口
    @Input()
    masterProject: BylProject;

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public projectAuthService: BylProjectAuthService) {
        super(message,configService,modalService,router);
        this.selectPoolsComponent = BylAccountAddPoolListComponent;
        this.selectPoolsTitle = "查找账户";
    }

    deleteRelation(idArray: Array<string>, masterId: string): Observable<BylResultBody<Boolean>> {
        return this.accountRelationService.deleteAccountRelation(idArray,masterId);
    }

    findEntities(masterId: string): Observable<BylResultBody<Array<BylAccount>>> {
        return this.accountRelationService.findEntityAccount(masterId);
    }

    getFindPoolsService(): any {
        return this.accountRelationService;
    }

    saveRelation(idArray: Array<string>, masterId: string): Observable<BylResultBody<Boolean>> {
        return this.accountRelationService.saveAccountRelation(idArray,masterId);
    }


    //
    // private _haveSearched: boolean =false; //是否已经查询过
    //
    // get haveSearched(): boolean{
    //     return this._haveSearched;
    // }
    //
    private _isAllowAll : boolean = false; //是否开放权限

    get isAllowAll(): boolean{
        return this._isAllowAll;
    }
    //
    // searchLoading: boolean =false; //search 按钮是否启动
    enableAllowAllLoading: boolean =false;
    disableAllowAllLoading: boolean = false;
    // batchDeleteLoading:boolean =false;
    //
    //
    // public listData : Array<BylListFormData<BylAccount>> = []; // 显示内容
    //
    // public selectedRows: Array<BylListFormData<BylAccount>> = []; //被选中的数据
    // public indeterminate = false;
    // public allChecked = false; //是否全部选中
    //
    //
    // public addForm: NzModalRef;//维护界面
    //
    // public loading = false;
    //
    // constructor(public message: NzMessageService,
    //             public configService: BylConfigService,
    //             public modalService: NzModalService,
    //             public router: Router,
    //             public projectAuthService: BylProjectAuthService) {
    //
    // }
    //
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
    //  * 选择账户
    //  */
    // addAccount() {
    //
    //
    //     this.addForm = this.modalService.create({
    //         nzTitle: '查找账户',
    //         nzZIndex: 9999, //最外层
    //         nzWidth: '90%',
    //         nzContent: BylAccountListComponent,
    //         nzFooter: null,
    //         // onOk() {
    //         //
    //         // },
    //         // onCancel() {
    //         //     console.log('Click cancel');
    //         // },
    //         nzComponentParams: {
    //             functionMode: BylListFormFunctionModeEnum.SELECT,
    //             findAvailablePoolsService: this.projectAuthService,
    //             masterId: this.masterProject.id,
    //             selectModalForm: this.addForm
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
    //         let projectAuthpools: Array<BylProjectAuth> = [];
    //         let accountpools: Array<BylAccount> = [];
    //         if ((typeof result) === 'object') {
    //             console.log('添加新增的个体数据');
    //             // let projectItem = new BylEmbeddableProject();
    //             // projectItem.projectId = this.masterProject.id;
    //             // projectItem.projectCode = this.masterProject.code;
    //             // projectItem.projectName = this.masterProject.name;
    //
    //             for (let item of result) {
    //                 let pa = new BylProjectAuth();
    //                 // let accountItem = new BylEmbeddableAccount();
    //                 // accountItem.accountId = item.item.id;
    //                 // accountItem.accountCode = item.item.username;
    //                 // accountItem.accountName = item.item.fullName;
    //
    //                 pa.projectId = this.masterProject.id;
    //                 pa.accountId = item.item.id;
    //
    //                 projectAuthpools.push(pa);
    //                 accountpools.push(item.item);
    //             }
    //         }
    //
    //         if (projectAuthpools.length > 0) {
    //             //todo 提交到数据库中,成功后显示到界面
    //             let batchAdd: Observable<BylResultBody< any >>;
    //             batchAdd = this.projectAuthService.batchtAdd(projectAuthpools);
    //             // // switch(this._masterEntityType) {
    //             // //     case PermissionEntityTypeEnum.ROLE:
    //             // //         batchAdd = this.projectAuthService.batchAddRolePermission(this.genRolePermissionArray(pools));
    //             // //         break;
    //             // //     case PermissionEntityTypeEnum.ACCOUNT:
    //             // //         batchAdd = this.projectAuthService.batchAddAccountPermission(this.genAccountPermissionArray(pools));
    //             // //         break;
    //             // //     default:
    //             // //         console.error("masterEntityType 错误",this._masterEntityType);
    //             // //         return;
    //             // // }
    //             //
    //             batchAdd.subscribe(
    //                 data => {
    //                     this.loading = false;
    //                     if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
    //                         // 正确添加数据后，直接添加到当前选中的权限，不像search过程，会重新刷新total值
    //                         this.listData = [...this.listData,...this.genListDataFromArray(accountpools)];
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
    //     this._haveSearched = true;
    //
    //     if (!this.masterProject) {return;}
    //
    //     this.toggleSearchButton();
    //
    //     //1、先检查是否为允许所有账户查看
    //     this.projectAuthService.checkAllowAllByProjectId(this.masterProject.id)
    //         .subscribe(
    //             data => {
    //
    //                 if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
    //                     // 正确获取数据
    //                     // this.total = data.data.total;
    //                     this._isAllowAll = data.data;
    //                     if (this._isAllowAll) {
    //                         this.toggleSearchButton();
    //                     }else{
    //                         //2、再查找有哪些账户可以查看
    //                         this.clearGrid();
    //                         let findResult:  Observable<BylResultBody<Array<BylAccount>>>;
    //                         findResult = this.projectAuthService.fetchAccountsByProjectId(this.masterProject.id);
    //                         findResult.subscribe(
    //                             data => {
    //
    //                                 if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
    //                                     // 正确获取数据
    //                                     // this.total = data.data.total;
    //
    //                                     this.listData = this.genListDataFromArray(Array.from(data.data));
    //
    //                                 } else {
    //                                     this.showMsg(data.msg);
    //                                 }
    //
    //                                 this.toggleSearchButton();
    //                             },
    //                             err => {
    //                                 this.toggleSearchButton();
    //                                 this.showMsg(err.toString());
    //                             }
    //                         );
    //
    //
    //                     }
    //
    //
    //                 } else {
    //                     this.showMsg(data.msg);
    //                     this.toggleSearchButton();
    //                 }
    //
    //             },
    //             err => {
    //                 this.toggleSearchButton();
    //                 this.showMsg(err.toString());
    //             }
    //
    //         );
    //
    // }
    //
    // toggleSearchButton(){
    //     this.searchLoading = ! this.searchLoading;
    // }
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
    // genListDataFromArray(findResult: Array<BylAccount>): Array<BylListFormData<BylAccount>>{
    //     return findResult.map(data => {
    //         return this.genListData(data);
    //     })
    // };
    //
    genListData(data: BylAccount): BylListFormData<BylAccount>{
        // return findResult.map(data => {
        let item = new BylListFormData<BylAccount>();
        item.checked = false;
        item.disabled = (this.masterProject.createAction.createId === data.id);//创建者自己不能删除
        item.item = new BylAccount();
        simpleDeepCopy(item.item,data);
        return item;
        // })
    }
    //
    //
    // /**
    //  * 删除明细
    //  * @param {string} id
    //  */
    // delete(id:string){
    //     if (!this.masterProject) return;
    //
    //     this.projectAuthService.deleteByProjectIdAndAccountId(this.masterProject.id, id)
    //         .subscribe(
    //             data => {
    //                 this.loading = false;
    //                 if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
    //                     // 正确获取数据
    //                     // this.total = data.data.total;
    //
    //                     this.listData = this.listData.filter(item => item.item.id !== id);
    //
    //
    //                 } else {
    //                     this.showMsg(data.msg);
    //                 }
    //             },
    //             err => {
    //                 this.loading = false;
    //                 console.log(err);
    //                 this.showMsg(err.toString());
    //             }
    //         );
    //
    // }
    //
    // /**
    //  * 批量删除
    //  */
    // batchDelete(){
    //     if (!this.masterProject) return;
    //     this.loading = true;
    //
    //     from(this.selectedRows).pipe(
    //         map(item=>item.item),
    //         flatMap(item=>{
    //             return this.projectAuthService.deleteByProjectIdAndAccountId(this.masterProject.id, item.id);
    //         }),
    //         finalize(()=>{
    //             console.log("in ProjectAuthListPorject batchDelete","do finalize");
    //             this.search();
    //         })
    //     ).subscribe(
    //         data => {
    //             this.loading = false;
    //             if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
    //                 console.log("in ProjectAuthListPorject batchDelete", data);
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
    enableAllowAll(){
        if (!this.masterProject) return;
        this.toggleEnableAllowAllButton();

        this.projectAuthService.enableAllowAll(this.masterProject.id)
            .subscribe(
                data => {

                    if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                        console.log("in ProjectAuthListPorject enableAllowAll", data);
                        this._isAllowAll = true;
                    } else {
                        this.showMsg(data.msg);
                    }
                    this.toggleEnableAllowAllButton();
                },
                err => {

                    this.toggleEnableAllowAllButton();

                    console.log(err);
                    this.showMsg(err.toString());

                }
            );

    }
    toggleEnableAllowAllButton(){
        this.enableAllowAllLoading = ! this.enableAllowAllLoading;
    }

    disableAllowAll(){
        if (!this.masterProject) return;
        this.toggleDisableAllowAllButton();

        this.projectAuthService.disableAllowAll(this.masterProject.id)
            .subscribe(
                data => {

                    if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                        console.log("in ProjectAuthListPorject enableAllowAll", data);
                        this.search();
                    } else {
                        this.showMsg(data.msg);
                    }
                    this.toggleDisableAllowAllButton();
                },
                err => {

                    this.toggleDisableAllowAllButton();

                    console.log(err);
                    this.showMsg(err.toString());

                }

            );
    }

    toggleDisableAllowAllButton(){
        this.disableAllowAllLoading = ! this.disableAllowAllLoading;
    }
}
