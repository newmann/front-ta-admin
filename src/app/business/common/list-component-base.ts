import {OnInit} from '@angular/core';
import {BylPageReq} from '../../service/model/page-req.model';
import {BylListFormData} from '../../service/model/list-form-data.model';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {BylConfigService} from '../../service/constant/config.service';
import {BylBaseService} from '../../service/service/base.service';
import {BylResultBody} from '../../service/model/result-body.model';
import {BylListFormFunctionModeEnum} from '../../service/model/list-form-function-mode.enum';

/**
 * @Description: list组件的抽象类
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-04-15 9:22
 **/
export abstract class BylListComponentBase<T> implements OnInit {

    LIST_MODE: BylListFormFunctionModeEnum = BylListFormFunctionModeEnum.NORMAL;
    SELECT_MODE: BylListFormFunctionModeEnum = BylListFormFunctionModeEnum.SELECT;


    public businessService: BylBaseService<T>;
    // public businessCrudComponent: any;

    public crudUrl: string; //新增对象的url

    public qData: any = {}; //查询条件中的数据

    public page: BylPageReq = { //分页定义
        page: 1, // 缺省当前页
        pageSize: 10, // 缺省每页条数
        sortField: '',
        sort: '',
        keyword: '',
    };
    public expandQuery = false; // 是否展开查询条件界面
    public total: number; // 总条数
    public listData: Array<BylListFormData<T>> = []; // 显示内容

    public selectedRows: Array<BylListFormData<T>> = []; //被选中的数据
    public indeterminate = false;
    public allChecked = false; //是否全部选中


    public loading = false;

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router) {


    }

    ngOnInit() {
        //设置查询条件的缺省值
        this.setQDataDefaultValue();
        console.log(this.qData);
    }

    checkAll(value: boolean) {
        this.listData.forEach(item => {
            if (!item.disabled) item.checked = value;
        });
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
     * 重置查询条件
     */
    resetQuery() {
        this.setQDataDefaultValue();

        console.log(this.qData);
    }

    /**
     * 显示新增界面
     */
    add() {
        // this.router.navigate(['/account/role/crud',"new"]);
        if (this.crudUrl) {
            this.router.navigate([this.crudUrl, 'new']);
            // this.router.navigateByUrl(this.crudUrl);
        }

    }

    unlockEntity(id: string){

    }

    modifyEntity(id: string) {
        if (this.crudUrl) {
            this.router.navigate([this.crudUrl, id]);
        }
    }

    /**
     * 查找
     */
    search() {
        this.loading = true;

        this.clearGrid();

        this.businessService.findPage(this.genQueryModel(), this.page).subscribe(
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
     * 重置Grid
     */
    clearGrid() {
        this.listData = []; // 显示内容
        this.selectedRows = [];
        this.indeterminate = false;
        this.allChecked = false;
    }

    pageSizeChange($event) {
        console.log('pageSize:' + this.page.pageSize);
        console.log('$event:' + $event);
        this.page.pageSize = $event;
        this.search();
    }

    /**
     * 根据查询的结果，生成界面显示的内容，重点是处理好checkec和disabled字段的值。
     * @param {Array<T>} findResult
     * @returns {Array<BylListFormData<T>>}
     */
    abstract genListData(findResult: Array<T>): Array<BylListFormData<T>>;

    /**
     * 生成查询条件
     * @returns {any}
     */
    abstract genQueryModel(): any;

    /**
     * 更新展示界面中的内容
     * @param {T} newData
     */
    abstract updateListData(newData: T);

    /**
     * 设置查询条件为缺省值
     */
    abstract setQDataDefaultValue();

}
