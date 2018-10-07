import {Input, OnInit} from '@angular/core';
import {NzMessageService, NzModalRef, NzModalService} from "ng-zorro-antd";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {BylListFormData} from "../../service/model/list-form-data.model";
import {BylConfigService} from "../../service/constant/config.service";
import {BylListFormFunctionModeEnum} from "../../service/model/list-form-function-mode.enum";
import {BylResultBody} from "../../service/model/result-body.model";
import {simpleDeepCopy} from "../../service/utils/object.utils";
import {BylBaseModel} from "../../service/model/base.model";
import {BylPageResp} from "../../service/model/page-resp.model";
import {BylPageReq} from "../../service/model/page-req.model";

/**
 * 用于定义实体之间关系的抽象类
 * 比如，一个角色下面有多个账户，一个账户下面有多个权限等
 *
 */
export abstract class BylEntityRelationListComponentBase<T extends BylBaseModel> {

    // private _masterEntityType: PermissionEntityTypeEnum;
    // @Input()
    // set masterEntityType(value: PermissionEntityTypeEnum){
    //     this._masterEntityType = value;
    // }

    private _haveSearched: boolean =false; //是否已经查询过

    get haveSearched(): boolean{
        return this._haveSearched;
    }

    protected _masterId: string;
    @Input()
    set masterId(value: string){
        this._masterId = value;
    }


    @Input() ReadOnly: boolean = false;

    // @Input() relationService: any; //调用方，用户调出选择添加账户的窗口

    selectPoolsComponent: any; //可以添加待选内容的节面
    selectPoolsTitle: string;

    // abstract findAvailablePools(query: any, page: BylPageReq, masterId?: string): Observable<BylResultBody<BylPageResp<T>>>;
    abstract saveRelation(idArray: Array<string>, masterId: string) : Observable<BylResultBody<Boolean>>;
    abstract findEntities(masterId: string) : Observable<BylResultBody<Array<T>>>;
    abstract deleteRelation(idArray: Array<string>, masterId: string) : Observable<BylResultBody<Boolean>>;
    abstract getFindPoolsService(): any;//用户汇总界面使用。

    // @Input() saveMenuLinkRelationService: BylSaveMenuLinkRelationInterface; //调用方传入查询函数
    // @Input() findEntityMenuLinkService: BylFindEntityMenuLinkInterface; //调用方传入查询已经对应的账户
    //
    // @Input() deleteMenuLinkRelationService: BylDeleteMenuLinkRelationInterface; //调用方传入查询函数

    public listData : Array<BylListFormData<T>> = []; // 显示内容

    public selectedRows: Array<BylListFormData<T>> = []; //被选中的数据
    public indeterminate = false;
    public allChecked = false; //是否全部选中


    public addForm: NzModalRef;//维护界面

    public searhing =false;

    public deleting = false;

    public loading = false;

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router) {

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
     * 选择菜单定义
     */
    addRelation() {


        this.addForm = this.modalService.create({
            nzTitle: this.selectPoolsTitle,
            nzZIndex: 9999, //最外层
            nzWidth: '90%',
            nzContent: this.selectPoolsComponent,
            nzFooter: null,
            // onOk() {
            //
            // },
            // onCancel() {
            //     console.log('Click cancel');
            // },
            nzComponentParams: {
                functionMode: BylListFormFunctionModeEnum.SELECT,
                findAvailablePoolsService: this.getFindPoolsService(),
                masterId: this._masterId,
                // selectModalForm: this.addForm
            },
            nzMaskClosable: false
        });
        // this.addForm.next(BylCrudEvent[BylCrudEvent.bylSaving]);

        this.addForm.afterClose.subscribe(result => {
            console.info(result);

            console.info(typeof result);

            //返回的是选中的账户数组
            let pools: Array<T> = [];
            if ((typeof result) === 'object') {
                console.log('添加新增的个体数据');
                for (let item of result) {
                    pools.push(item.item);
                }
            }

            if (pools.length > 0) {
                //todo 提交到数据库中,成功后显示到界面
                let batchAdd: Observable<BylResultBody< any >>;

                // 根据类型生成角色或账户权限
                batchAdd = this.saveRelation(this.genIdsFromArray(pools),
                    this._masterId);
                // switch(this._masterEntityType) {
                //     case PermissionEntityTypeEnum.ROLE:
                //         batchAdd = this.permissionService.batchAddRolePermission(this.genRolePermissionArray(pools));
                //         break;
                //     case PermissionEntityTypeEnum.ACCOUNT:
                //         batchAdd = this.permissionService.batchAddAccountPermission(this.genAccountPermissionArray(pools));
                //         break;
                //     default:
                //         console.error("masterEntityType 错误",this._masterEntityType);
                //         return;
                // }

                batchAdd.subscribe(
                    data => {
                        this.loading = false;
                        if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                            // 正确添加数据后，直接添加到当前选中的权限，不像search过程，会重新刷新total值
                            this.listData = [...this.listData, ...this.genListDataFromArray(pools)];

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


    /**
     * 查找
     */
    search() {

        if (!this._masterId) {return;}

        this._haveSearched = true;

        this.searhing = true;
        this.loading = true;

        this.clearGrid();
        let findResult:  Observable<BylResultBody<Array<T>>>;

        findResult = this.findEntities(this._masterId);

        // switch (this._masterEntityType){
        //     case PermissionEntityTypeEnum.ACCOUNT:
        //         findResult = this.permissionService.findByAccountId(this._masterId);
        //         break;
        //     case PermissionEntityTypeEnum.ROLE:
        //         findResult = this.permissionService.findByRoleId(this._masterId);
        //         break;
        //     default:
        //         findResult = null;
        // }
        //
        // if (findResult === null) {return ;}

        findResult.subscribe(
            data => {
                this.searhing = false;
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
                this.searhing = false;
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

    genListDataFromArray(findResult: Array<T>): Array<BylListFormData<T>>{
        return findResult.map(data => {
            return this.genListData(data);
        })
    };

    genListData(data: T): BylListFormData<T>{
        // return findResult.map(data => {
        let item = new BylListFormData<T>();
        item.checked = false;
        // item.disabled = (data.status === BylRoleStatus.SUBMITED_DELETED);
        item.item = <T>{};
        simpleDeepCopy(item.item,data);
        return item;
        // })
    }


    /**
     * 删除明细
     * @param {string} id
     */
    delete(id:string){
        this.loading = true;
        let ids: Array<string> = [];

        ids.push(id);

        this.deleteRelation(ids,this._masterId)
            .subscribe(
                data => {
                    this.loading = false;
                    if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                        // 正确获取数据
                        // this.total = data.data.total;

                        this.listData = this.listData.filter(item =>item.item.id !== id);


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
    }

    /**
     * 批量删除
     */
    batchDelete(){
        if (this.selectedRows.length == 0) return;

        this.deleting = true;
        this.loading = true;
        let ids: Array<string> = [];

        this.selectedRows.forEach( item =>{ ids.push(item.item.id)});

        this.deleteRelation(ids,this._masterId)
            .subscribe(
                data => {
                    this.deleting = false;
                    this.loading = false;

                    if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                        // 正确获取数据
                        // this.total = data.data.total;

                        this.listData = this.listData.filter(item =>!item.checked);
                        this.selectedRows = [];
                        this.indeterminate = false;
                        this.allChecked = false;
                    } else {
                        this.showMsg(data.msg);
                    }
                },
                err => {
                    this.deleting = false;
                    this.loading = false;

                    console.log(err);
                    this.showMsg(err.toString());
                }
            )

    }

    genIdsFromArray(entityArray: Array<T>) : Array<string>{

        let result: Array<string> = [];

        entityArray.forEach((item) =>{
            result.push(item.id);
        });

        return result;
    }


}
