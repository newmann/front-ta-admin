import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {NzMessageService} from "ng-zorro-antd";
import {RoleService} from "../../../../service/account/role.service";
import {ConfigService} from "../../../../service/constant/config.service";
import {ResultBody} from "../../../../service/model/result.body.model";
import {Role, RoleStatus} from "../../../../service/account/role.model";

@Component({
  selector: 'role-list',
  templateUrl: './role-list.component.html',
})
export class RoleListComponent  implements OnInit {
    q: any = {
        pi: 1, //当前页
        ps: 10, //每页条数
        sorter: '',
        status: null,
        statusList: []
    };
    expandQuery = false;//是否展开查询条件界面

    // pi = 1;//当前页
    // ps: number;//每页条数
    total: number; //总条数

    listData = [];//显示内容
    loading = false;
    args: any = { };//查询条件

    selectedRows: any[] = [];
    indeterminate = false;
    allChecked = false;

    //新增
    modalVisible = false;
    newRole: Role;

    constructor(
        private http: _HttpClient,
        private message: NzMessageService,
        private roleService: RoleService,
        private configService: ConfigService
    ) {
        this.q.ps = configService.PAGESIZE;
        this.q.statusList = RoleStatus;
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
        // this.roleService.
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
        this.args = {};
    }
}
