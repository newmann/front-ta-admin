import {Component, OnInit} from '@angular/core';
import {_HttpClient, MenuService} from '@delon/theme';
import {NzMessageService, NzModalService, NzModalSubject} from 'ng-zorro-antd';
import {RoleService} from '../../../../service/account/service/role.service';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylResultBody} from '../../../../service/model/result-body.model';
import {Role, RoleStatus} from '../../../../service/account/model/role.model';
import {BylIStatusItem} from '../../../../service/model/status.model';
import {Router} from '@angular/router';
import {Observable} from "rxjs/Observable";
import {BylCrudEvent, BylCrudWaitingComponent} from "../../../common/waiting/crud-waiting.component";
import {BylRoleCrudComponent} from "../crud/crud.component";
import * as moment from 'moment';
import {BylPageReq} from "../../../../service/model/page-req.model";
import {RoleQueryModel} from "../../../../service/account/query/role-query.model";
import {BylListFormData} from "../../../../service/model/list-form-data.model";

@Component({
    selector: 'byl-role-list',
    templateUrl: './role-list.component.html',
})
export class BylRoleListComponent implements OnInit {
    q: any = {
        name: '',
        modifyDateBegin: moment().subtract(1,'week').format('l'),
        modifyDateEnd: moment().format('l'),
        status: [1]
    };

    page:BylPageReq ={
        page: 1,// 缺省当前页
        pageSize: 10,// 缺省每页条数
        sortField: 'name',
        sort: '',
        keyword: '',
    };

    expandQuery = false; // 是否展开查询条件界面
    statusList: BylIStatusItem[]; //状态

    // pi = 1;//当前页
    // ps: number;//每页条数
    total: number; // 总条数

    listData : Array<BylListFormData<Role>> = []; // 显示内容
    loading = false;
    // args: any = { };//查询条件
    sortMap: any = {};

    selectedRows: Array<BylListFormData<Role>> = [];
    indeterminate = false;
    allChecked = false;

    private _modifyForm: NzModalSubject;//维护界面
    // 新增
    // modalVisible = false;
    // newRole: Role;

    constructor(private message: NzMessageService,
                private roleService: RoleService,
                private configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router) {
        this.q.ps = configService.PAGESIZE;
        this.statusList = RoleService.statusArray();
        // this.newRole = new Role();
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

        this.router.navigateByUrl('/account/role/crud/new');

        // this.modalVisible = true;
        // this.newRole = new Role();
    }
    // modify(id: string) {
    //     this.router.navigate(['/account/role/crud', id]);
    // }

    /**
     * 保存新增内容
     */
    // saveNew() {
    //     // this.showMsg(JSON.stringify(this.newRole));
    //     //设置保存的对象状态
    //     this.newRole.status = RoleStatus.NORMAL_ROLE;
    //     this.roleService.add(this.newRole).subscribe(
    //         data => {
    //             this.loading = false;
    //             if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
    //                 //正确获取数据
    //                 //保存正确后：1、显示成功数据，2、添加到显示界面中，3、掩藏新增界面
    //                 this.showMsg('成功新增角色！');
    //                 this.listData.push(data.data);
    //                 this.modalVisible = false;
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

    showModifyForm(id:string) {

        this._modifyForm = this.modalService.open({
            title: '修改',
            content: BylRoleCrudComponent,
            // onOk() {
            //
            // },
            // onCancel() {
            //     console.log('Click cancel');
            // },
            footer: false,
            componentParams: {
                sourceRoleId: id
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

        this.roleService.findPage(this.getRoleQueryModel(this.q),this.page).subscribe(
            data => {
                this.loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                    // 正确获取数据
                    this.total = data.data.total;

                    // this.listData = Array.from(data.data.rows);
                    this.listData = this.genListData(Array.from(data.data.rows));

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
     * 根据查询的结果，生成界面显示的内容，重点是处理好checkec和disabled字段的值。
     * @param {Array<Role>} findResult
     * @returns {Array<BylListFormData<Role>>}
     */
    genListData(findResult: Array<Role>):Array<BylListFormData<Role>>{
        return findResult.map(data => {
            let item = new BylListFormData<Role>();
            item.checked = false;
            item.disabled = (data.status === RoleStatus.DELETED_ROLE);
            item.item = new Role();
            Object.assign(item.item,data);
            return item;
        })
    }
    /**
     *
     * @param q
     * @returns {RoleQueryModel}
     */
    getRoleQueryModel(q:any):RoleQueryModel{
        let result = new RoleQueryModel();
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



    /**
     * 将当前记录锁定
     * @param {string} id
     */
    lockRole(id: string) {
        let lockItem = new Role();
        this.listData.forEach(item =>{
            if (item.item.id === id) {
                Object.assign(lockItem, item.item);
            }
        });

        console.log("lockItem: " + lockItem);
        if (!lockItem) return;

        lockItem.status = RoleStatus.LOCKED_ROLE.valueOf();

        this.roleService.update(lockItem).subscribe(
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

    updateListData(newData:Role){
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item,newData);
            })
    }

    getStatusCaption(status: number): string {
        return RoleService.getStatusCaption(status);
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

    pageSizeChange($event){
        console.log("pageSize:" + this.page.pageSize);
        console.log("$event:" + $event);
        this.page.pageSize = $event;
        this.search();
    }
}
