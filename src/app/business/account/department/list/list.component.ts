import {Component, OnInit, ViewChild} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {BylListFormData} from "../../../../service/model/list-form-data.model";
import {Router} from "@angular/router";
import {BylIStatusItem} from "../../../../service/model/status.model";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {BylPageReq} from "../../../../service/model/page-req.model";
import * as moment from "moment";
import {BylConfigService} from "../../../../service/constant/config.service";
import {BylCrudEvent} from "../../../common/waiting/crud-waiting.component";
import {BylDepartment, BylDepartmentStatus} from "../../../../service/account/model/department.model";
import {BylDepartmentService} from "../../../../service/account/service/department.service";
import {BylDepartmentQuery} from "../../../../service/account/query/department-query.model";
import {BylDepartmentCrudComponent} from "../crud/crud.component";
import {NzTreeComponent} from "ng-tree-antd";
import {BylLoggerService} from "../../../../service/utils/logger";
import {BaseTree} from "../../../../service/model/base-tree.model";
import {mixCodeName} from "../../../../service/utils/string.utils";
import {Subject} from "rxjs/Subject";
import {debounceTime, distinctUntilChanged, flatMap} from "rxjs/operators";


import {Observable} from "rxjs/Observable";
import {zip} from "rxjs/observable/zip";

@Component({
  selector: 'byl-department-list',
  templateUrl: './list.component.html',
})
export class BylDepartmentListComponent implements OnInit {
    q: any = {
        code: '',
        name: '',
        modifyDateBegin: moment().subtract(1,'week').format('l'),
        modifyDateEnd: moment().format('l'),
        status: [1]
    };

    page:BylPageReq ={
        page: 1,// 缺省当前页
        pageSize: 10,// 缺省每页条数
        sortField: 'code',
        sort: '',
        keyword: '',
    };

    expandQuery = false; // 是否展开查询条件界面
    statusList: BylIStatusItem[]; //状态


    listData : Array<BylListFormData<BylDepartment>> = []; // 显示内容
    loading = false;
    // args: any = { };//查询条件
    sortMap: any = {};

    selectedRows: Array<BylListFormData<BylDepartment>> = [];
    indeterminate = false;
    allChecked = false;

    nodes: Array<BaseTree<BylDepartment>> = [];

    options = {
        allowDrag: false
        // getChildren: (node: any) => {
        //     return new Promise((resolve, reject) => {
        //         setTimeout(() => resolve([
        //             { name: 'async data1' },
        //             { name: 'async data2', hasChildren: true }
        //         ]), 1000);
        //     });
        // }
    };

    private _treeExpand$: Subject<BaseTree<BylDepartment>> = new Subject<BaseTree<BylDepartment>>();

    private _nodeObservable: Observable<BaseTree<BylDepartment>>;
    private _departmentObservable: Observable<BylResultBody<Array<BylDepartment>>>;
    private _expandObservable: any;


    @ViewChild(NzTreeComponent) tree: NzTreeComponent;
    filterNodes() {
        this.tree.treeModel.filterNodes(this.q);
        if (!this.q) {
            this.tree.treeModel.collapseAll();
        }
    }

    onToggleExpanded(ev: any) {
        this.logger.log('basic', 'onEvent', ev);
        //只有在展开节点的时候重新从后台数据库刷新数据
        if (ev.isExpanded){
            this._treeExpand$.next(ev.node);
        }

    }

    registerTreeToggleExpanded(){
        this._nodeObservable = this._treeExpand$.pipe(
            debounceTime(1000),
            distinctUntilChanged()
        );
        this._departmentObservable = this._nodeObservable.pipe(
            flatMap(node =>{
                return this.departmentService.findDepartmendByParentId(node.id);
            })
        );

        this._expandObservable = zip(
            this._nodeObservable,
            this._departmentObservable,
            (node: BaseTree<BylDepartment>, data: BylResultBody<Array<BylDepartment>>) => ({node,data})
        );
        this._expandObservable.subscribe(
            ({node,data}) => {
                this.logger.info("_expandOberservable","node",node);
                this.logger.info("_expandOberservable","data",data);

                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {

                    // this.listData = Array.from(data.data.rows);
                    this.logger.log(data.data);
                    node.data.children = this.genNodeData(data.data);
                    this.tree.treeModel.update();

                } else {
                    this.showMsg(data.msg);
                }
            },
            err => {
                console.log(err);
                this.showMsg(err.toString());
            }

        );


    }

    private _modifyForm: NzModalSubject;//维护界面
    // 新增
    // modalVisible = false;
    // newDepartment: BylDepartment;

    constructor(private message: NzMessageService,
                private logger: BylLoggerService,
                private departmentService: BylDepartmentService,
                private configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router) {
        this.q.ps = configService.PAGESIZE;
        this.statusList = BylDepartmentService.statusArray();

        this.registerTreeToggleExpanded();

        // this.newDepartment = new BylDepartment();
    }

    checkAll(value: boolean) {
        this.listData.forEach(item =>{if (!item.disabled) item.checked = value;});
        this.refreshStatus();
    }

    // refChecked() {
    //     this.selectedRows = this.listData.filter(w => w.checked);
    //     const checkedCount = this.selectedRows.length;
    //     this.allChecked = checkedCount === this.listData.length;
    //     this.indeterminate = this.allChecked ? false : checkedCount > 0;
    // }

    ngOnInit() {

    }

    showMsg(msg: string) {
        this.message.info(msg);
    }

    /**
     * 显示新增界面
     */
    add() {
        // this.router.navigate(['/account/role/crud',"new"]);

        this.router.navigateByUrl('/account/department/crud/new');

        // this.modalVisible = true;
        // this.newDepartment = new BylDepartment();
    }




    showModifyForm(id:string) {

        this._modifyForm = this.modalService.open({
            title: '修改',
            content: BylDepartmentCrudComponent,
            // onOk() {
            //
            // },
            // onCancel() {
            //     console.log('Click cancel');
            // },
            footer: false,
            componentParams: {
                sourceDepartmentId: id
            },
            maskClosable: false
        });
        //
        this._modifyForm.subscribe(result => {
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

        this.departmentService.findDepartmendByParentId('-').subscribe(
            data => {
                this.loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {

                    // this.listData = Array.from(data.data.rows);
                    this.nodes = this.genNodeData(data.data);

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

    updateNodeData(data: Array<BaseTree<BylDepartment>>, node: BaseTree<BylDepartment>): void{
        node.children = data;
    }

    /**
     * 根据查询的结果，生成界面显示的内容，重点是处理好checkec和disabled字段的值。
     */
    genNodeData(findResult: Array<BylDepartment>):Array<BaseTree<BylDepartment>>{
        return findResult.map(data => {
            let item = new BaseTree<BylDepartment>();
            item.item = new BylDepartment();
            Object.assign(item.item,data);
            item.id = item.item.id;
            item.name = mixCodeName(item.item.name,item.item.code);
            item.checked = false;
            item.disableCheckbox = (data.status === BylDepartmentStatus.DELETED_DEPARTMENT);
            item.hasChildren = true;
            return item;
        })
    }

    // addNode(dept: BylDepartment): void {
    //     if (!(this.nodes)) this.nodes = [];
    //     let node = new BaseTree<BylDepartment>();
    //     node.item = new BylDepartment();
    //     Object.assign(node.item,dept);
    //     node.id = node.item.id;
    //     node.name = mixCodeName(node.item.name,node.item.code);
    //     node.checked = false;
    //     node.disableCheckbox =(node.item.status === BylDepartmentStatus.DELETED_DEPARTMENT);
    //     node.hasChildren = true;
    //     /**
    //      *定位策略：
    //      * 1、找到id = dept.parentid的节点
    //      * 2、在节点的children中，找id = dept.id的节点，如果没有找到，则添加，如果找到了，则替换。
    //      */
    //
    //
    //     this.nodes.filter(item => item.item.id === node.item.parentId)
    //         .map(item =>{
    //
    //         })
    // }
    //
    // searchChildren(parentId:string) : Array<BaseTree<BylDepartment>>{
    //     if (parentId === "-") {
    //         return this.nodes;
    //     }else{
    //
    //     }
    // }
    /**
     *
     * @param q
     * @returns {BylDepartmentQuery}
     */
    getDepartmentQueryModel(q:any):BylDepartmentQuery{
        let result = new BylDepartmentQuery();
        if (q.name) result.name = q.name;
        if (q.modifyDateBegin) result.modifyDateBegin = moment(q.modifyDateBegin).valueOf();
        if (q.modifyDateEnd) result.modifyDateEnd = moment(q.modifyDateEnd).add(1,'days').valueOf();//第二天的零点
        if (q.status) result.status = q.status;
        return result;
    }

    reset() {
        this.q.name = '';
        this.q.modifyDate = Date();

    }

    batchDelete() {

    }

    batchApproval() {

    }

    sort(field: string, value: any) {
        this.sortMap = {};
        this.sortMap[field] = value;
        this.q.sorter = value ? `${field}_${value}` : '';
        this.search();
    }

    refreshStatus() {
        const allChecked = this.listData.every(value => value.disabled || value.checked);
        const allUnChecked = this.listData.every(value => value.disabled || !value.checked);
        this.allChecked = allChecked;
        this.indeterminate = (!allChecked) && (!allUnChecked);
        this.selectedRows = this.listData.filter(value => value.checked);
        // this.totalCallNo = this.selectedRows.reduce((total, cv) => total + cv.callNo, 0);
    }

    /**
     * 将当前记录锁定
     * @param {string} id
     */
    lockDepartment(id: string) {
        let lockItem = new BylDepartment();
        this.listData.forEach(item =>{
            if (item.item.id === id) {
                Object.assign(lockItem, item.item);
            }
        });

        console.log("lockItem: " + lockItem);
        if (!lockItem) return;

        lockItem.status = BylDepartmentStatus.LOCKED_DEPARTMENT.valueOf();

        this.departmentService.update(lockItem).subscribe(
            data => {
                this.loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {

                    // this.listData = Array.from(data.data.rows);
                    this.updateListData(data.data);

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

    updateListData(newData:BylDepartment){
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item,newData);
            })
    }

    getStatusCaption(status: number): string {
        return BylDepartmentService.getStatusCaption(status);
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


}
