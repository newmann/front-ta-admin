import {Component, OnInit, ViewChild} from '@angular/core';
import {NzMessageService, NzModalService, NzModalRef, NzTreeComponent} from 'ng-zorro-antd';
import {BylListFormData} from '../../../../service/model/list-form-data.model';
import {Router} from '@angular/router';
import {BylIStatusItem} from '../../../../service/model/status.model';
import {BylResultBody} from '../../../../service/model/result-body.model';
import * as moment from 'moment';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylDepartment } from '../../../../service/account/model/department.model';
import {BylDepartmentService} from '../../../../service/account/service/department.service';
import {BylDepartmentQuery} from '../../../../service/account/query/department-query.model';
import {BylTreeDispalyModel} from '../../../../service/model/tree-display.model';
import {Observable, Subject, zip} from 'rxjs';
import {debounceTime, distinctUntilChanged, flatMap} from 'rxjs/operators';


// import {Observable} from 'rxjs/Observable';
// import {zip} from 'rxjs/observable/zip';
import {BylListComponentBase} from '../../../common/list-component-base';
import {BylMasterDataStatusEnum, BylMasterDataStatusManager} from '../../../../service/model/master-data-status.enum';
import {SFSchema, SFUISchema} from "@delon/form";
import {BylStringUtils} from "../../../../service/utils/string.utils";


@Component({
    selector: 'byl-department-list',
    templateUrl: './list.component.html',
})
export class BylDepartmentListComponent extends BylListComponentBase<BylDepartment> {

    statusList: BylIStatusItem[]; //状态

    filterData: string;

    nodes: Array<BylTreeDispalyModel<BylDepartment>> = [];

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

    private _treeExpand$: Subject<BylTreeDispalyModel<BylDepartment>> = new Subject<BylTreeDispalyModel<BylDepartment>>();

    private _nodeObservable: Observable<BylTreeDispalyModel<BylDepartment>>;
    private _departmentObservable: Observable<BylResultBody<Array<BylDepartment>>>;
    private _expandObservable: any;


    @ViewChild(NzTreeComponent) tree: NzTreeComponent;

    // filterNodes() {
    //     this.tree.ngModelNodes.filterNodes(this.filterData);
    //     if (!this.filterData) {
    //         this.tree.ngModelNodes.collapseAll();
    //     }
    // }

    onToggleExpanded(ev: any) {
        //只有在展开节点的时候重新从后台数据库刷新数据
        if (ev.isExpanded) {
            this._treeExpand$.next(ev.node);
        }

    }

    registerTreeToggleExpanded() {
        this._nodeObservable = this._treeExpand$.pipe(
            debounceTime(1000),
            distinctUntilChanged()
        );
        this._departmentObservable = this._nodeObservable.pipe(
            flatMap(node => {
                return this.departmentService.findDepartmendByParentId(node.item.id);
            })
        );

        this._expandObservable = zip(
            this._nodeObservable,
            this._departmentObservable,
            (node: BylTreeDispalyModel<BylDepartment>, data: BylResultBody<Array<BylDepartment>>) => ({node, data})
        );
        this._expandObservable.subscribe(
            ({node, data}) => {

                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {

                    // this.listData = Array.from(data.data.rows);
                    node.data.children = this.genNodeData(data.data);
                    // this.tree.treeModel.update();

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


    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                // public functionSubject$: NzModalRef,
                public router: Router,
                public departmentService: BylDepartmentService) {
        super(message, configService, modalService, router);

        this.businessService = departmentService;
        this.crudUrl = '/account/department/crud';
        // this.businessCrudComponent = BylPersonCrudComponent;
        this.statusList = BylMasterDataStatusManager.getArray();

        this.querySchema.properties['status'].enum.push(...this.statusList); //设置查询条件中的状态字段

        this.registerTreeToggleExpanded();

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

    updateNodeData(data: Array<BylTreeDispalyModel<BylDepartment>>, node: BylTreeDispalyModel<BylDepartment>): void {
        node.children = data;
    }

    /**
     * 根据查询的结果，生成界面显示的内容，重点是处理好checkec和disabled字段的值。
     */
    genNodeData(findResult: Array<BylDepartment>): Array<BylTreeDispalyModel<BylDepartment>> {
        return findResult.map(data => {
            let item = new BylTreeDispalyModel<BylDepartment>();
            item.item = new BylDepartment();
            Object.assign(item.item, data);
            item.key = item.item.id;
            item.title = BylStringUtils.mixCodeName(item.item.name, item.item.code);
            item.checked = false;
            item.disableCheckbox = (data.status === BylMasterDataStatusEnum.SUBMITED_DELETED);
            item.hasChildren = true;
            return item;
        });
    }

    // addNode(dept: BylDepartment): void {
    //     if (!(this.nodes)) this.nodes = [];
    //     let node = new BylTreeDispalyModel<BylDepartment>();
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
    // searchChildren(parentId:string) : Array<BylTreeDispalyModel<BylDepartment>>{
    //     if (parentId === "-") {
    //         return this.nodes;
    //     }else{
    //
    //     }
    // }


    reset() {
        this.qData.title = '';
        this.qData.modifyDate = Date();

    }

    batchDelete() {

    }

    batchApproval() {

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
        this.listData.forEach(item => {
            if (item.item.id === id) {
                Object.assign(lockItem, item.item);
            }
        });

        console.log('lockItem: ' + lockItem);
        if (!lockItem) return;

        lockItem.status = BylMasterDataStatusEnum.LOCKED;

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
        );
    }

    updateListData(newData: BylDepartment) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item, newData);
            });
    }



    /**
     * 重置Grid
     */
    clearGrid() {
        this.listData = []; // 显示内容
        this.selectedRows = [];
        this.indeterminate = false;
        this.allChecked = false;
    }

    genQueryModel(): any {
        let result = new BylDepartmentQuery();
        if (this.qData.name) result.name = this.qData.name;
        if (this.qData.modifyDateBegin) result.modifyDateBegin = moment(this.qData.modifyDateBegin).valueOf();
        if (this.qData.modifyDateEnd) result.modifyDateEnd = moment(this.qData.modifyDateEnd).add(1, 'days').valueOf(); //第二天的零点
        if (this.qData.status) result.status = this.qData.status;
        return result;
    }

    genListData(findResult: Array<BylDepartment>): Array<BylListFormData<BylDepartment>> {
        return findResult.map(data => {
            let item = new BylListFormData<BylDepartment>();
            item.checked = false;
            // item.disabled = (data.status === BylRoleStatus.SUBMITED_DELETED);
            item.item = new BylDepartment();
            Object.assign(item.item, data);
            return item;
        });
    }
    /**
     * 设置查询缺省值
     */
    setQDataDefaultValue(){
        let q = new BylDepartmentQuery();

        Object.assign(this.qData,q);
    }

    //#region 查询条件
    queryDefaultData: any = {
        modifyDateBegin: moment(moment.now()).subtract(6,"month").format("YYYY-MM-DD"),
        modifyDateEnd: moment(moment.now()).format("YYYY-MM-DD") };
    queryUiSchema: SFUISchema = {};
    querySchema: SFSchema = {
        properties: {
            code: { type: 'string',
                title: '代码类似于'
            },
            name: { type: 'string',
                title: '名称类似于'
            },
            status: {
                type: 'string',
                title: '状态',
                enum: [],
                ui: {
                    widget: 'tag'
                }
            },
            modifyDateBegin: { type: 'string',
                title: '最后修改日期大于等于',
                ui: { widget: 'date' }
            },
            modifyDateEnd: { type: 'string',
                title: '最后修改日期小于等于',
                ui: { widget: 'date' }
            }
        },
        required: []
    };
//#endregion

}
