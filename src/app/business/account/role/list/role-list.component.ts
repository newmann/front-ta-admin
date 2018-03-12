import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {NzMessageService} from "ng-zorro-antd";
import {RoleService} from "../../../../service/account/role.service";
import {ConfigService} from "../../../../service/constant/config.service";
import {ResultBody} from "../../../../service/model/result.body.model";
import {Role, RoleStatus} from "../../../../service/account/role.model";
import {IStatusItem} from "../../../../service/model/status.model";

@Component({
  selector: 'role-list',
  templateUrl: './role-list.component.html',
})
export class RoleListComponent  implements OnInit {
    q: any = {
        pi: 1, //当前页
        ps: 10, //每页条数
        name: '',
        sorter: '',
        modifyDate: Date(),
        status: null,
        statusList: []
    };
    expandQuery = false;//是否展开查询条件界面
    expandForm = false;

    // pi = 1;//当前页
    // ps: number;//每页条数
    total: number; //总条数

    listData = [];//显示内容
    loading = false;
    // args: any = { };//查询条件
    sortMap: any = {};

    selectedRows: any[] = [];
    indeterminate = false;
    allChecked = false;

    //新增
    modalVisible = false;
    newRole: Role;

    constructor(
        private message: NzMessageService,
        private roleService: RoleService,
        private configService: ConfigService
    ) {
        this.q.ps = configService.PAGESIZE;
        this.q.statusList = RoleService.statusArray();
        this.newRole = new Role();
    }

    checkAll() {
        this.listData.forEach(item => item.checked = this.allChecked);
        this.refChecked();
    }

    refChecked() {
        this.selectedRows = this.listData.filter(w => w.checked);
        const checkedCount = this.selectedRows.length;
        this.allChecked = checkedCount === this.listData.length;
        this.indeterminate = this.allChecked ? false : checkedCount > 0;
    }

    ngOnInit() {

    }

    showMsg(msg: string) {
        this.message.info(msg);
    }

    /**
     * 显示新增界面
     */
    add(){
        this.modalVisible = true;
        this.newRole = new Role();
    }

    /**
     * 保存新增内容
     */
    saveNew(){
        // this.showMsg(JSON.stringify(this.newRole));
        //设置保存的对象状态
        this.newRole.status = RoleStatus.NORMAL_ROLE;
        this.roleService.add(this.newRole).subscribe(
            data => {
                this.loading = false;
                if (data.code === ResultBody.RESULT_CODE_SUCCESS) {
                    //正确获取数据
                    //保存正确后：1、显示成功数据，2、添加到显示界面中，3、掩藏新增界面
                    this.showMsg('成功新增角色！');
                    this.listData.push(data.data);
                    this.modalVisible = false;

                } else {
                    this.showMsg(data.msg);
                }
            },
            err => {
                this.loading = false;
                console.log(err);
                this.showMsg( err.toString());
            }
        )
    }
    /**
     * 查找
     */
    search(){
        this.roleService.findPageNormal(this.q.pi).subscribe(
            data => {
                this.loading = false;
                if (data.code === ResultBody.RESULT_CODE_SUCCESS) {
                    //正确获取数据
                    this.total = data.data.total;

                    this.listData = Array.from(data.data.rows);

                } else {
                    this.showMsg(data.msg);
                }
            },
            err => {
                this.loading = false;
                console.log(err);
                this.showMsg( err.toString());
            }

        )
    }

    clear(){
        this.q.name = '';
        this.q.modifyDate = Date();

    }

    batchDelete(){

    }

    batchApproval(){

    }

    sort(field: string, value: any) {
        this.sortMap = {};
        this.sortMap[field] = value;
        this.q.sorter = value ? `${field}_${value}` : '';
        this.search();
    }

    refreshStatus() {
        // const allChecked = this.curRows.every(value => value.disabled || value.checked);
        // const allUnChecked = this.curRows.every(value => value.disabled || !value.checked);
        // this.allChecked = allChecked;
        // this.indeterminate = (!allChecked) && (!allUnChecked);
        // this.selectedRows = this.data.filter(value => value.checked);
        // this.totalCallNo = this.selectedRows.reduce((total, cv) => total + cv.callNo, 0);
    }

    update(id: string){

    }

    getStatusCaption(status: number): string{
        return RoleService.getStatusCaption(status);
    }
}
