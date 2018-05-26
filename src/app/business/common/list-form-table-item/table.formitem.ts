import {Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BylListFormData} from "../../../service/model/list-form-data.model";
import {BylPageReq} from "../../../service/model/page-req.model";


// const noop = () => {
// };

@Component({
    selector: 'byl-list-form-table-item',
    templateUrl: './table.formitem.html'
})
export class BylListFormTableWidgetComponent /*implements ControlValueAccessor */ {
    @Input() public total: number; // 总条数
    @Input() public loading = false;

    @Input() public tableDefine:BylTableDefine; //表格

    @Input() set listData(value: Array<BylListFormData<any>>){
        // this._showDividerCount = 0;
        this._listData = value;
    }
    get listData(){
        return this._listData;
    }
    private _listData: Array<BylListFormData<any>> = []; // 显示内容

    @Output() selectedChange: EventEmitter<BylListFormData<any>> = new EventEmitter();
    @Output() pageChange: EventEmitter<BylPageReq> = new EventEmitter();

    @Output() entityAction: EventEmitter<BylTableClickAction> = new EventEmitter();


    public selectedRows: Array<BylListFormData<any>> = []; //被选中的数据
    public indeterminate = false;
    public allChecked = false; //是否全部选中

    // private _showDividerCount:number;

    public page: BylPageReq = { //分页定义
        page: 1, // 缺省当前页
        pageSize: 10, // 缺省每页条数
        sortField: '',
        sort: '',
        keyword: '',
    };


    // @Input() public search: ()=>{}; //查找过程，用于回调

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

    /**
     * 重置Grid
     */
    clearGrid() {
        this.listData = []; // 显示内容
        this.selectedRows = [];
        this.indeterminate = false;
        this.allChecked = false;
        // this._showDividerCount = 0;

    }
    pageIndexChange($event) {
        console.log('page index:' + this.page.page);
        console.log('$event:' + $event);
        this.page.page = $event;
        this.pageChange.emit(this.page);
        // this.search();
    }

    pageSizeChange($event) {
        console.log('pageSize:' + this.page.pageSize);
        console.log('$event:' + $event);
        this.page.pageSize = $event;
        this.pageChange.emit(this.page);
        // this.search();
    }

    getFieldData(data: any, fieldPath: string): any{



        let fieldArr = fieldPath.split(".");
        let result: any;
        // console.log(fieldArr);

        // if (fieldArr.length>1) {
        //     // console.log(data);
        //     // console.log(fieldPath);
        //     console.log("fieldPath:",data[fieldPath]);
        //
        // }

        result = data[fieldArr[0]];

        for (let i = 1; i < fieldArr.length; i ++) {
            result = result[fieldArr[i]];
        }

        return result;
    }

    entityClick(id: string, action: string){

        let msg = {actionName: action, id : id};
        this.entityAction.emit(msg);


    }

    getActionArray(dataItem: any): string[]{
        let result : string[] = [];
        this.tableDefine.entityAction.forEach(actionDefine =>{
            if (this.showAction(actionDefine,dataItem)) {
                result.push(actionDefine.actionName);
            }
        });
        return result;
    }

    showAction(actionDefine: BylTableActionDefine, dataItem: any): boolean{
        let result: boolean;
        if ( actionDefine.checkFieldPath){
            result = (actionDefine.checkFieldPath === '-') || (this.getFieldData(dataItem,actionDefine.checkFieldPath) === actionDefine.checkValue);
        }else {
            //在没有设置checkFieldPath的情况下，总是显示
            result = true;
        }

        // if(result) this._showDividerCount = this._showDividerCount + 1;

        return result;
    }

    // showDivider(): boolean{
    //     return this._showDividerCount > 1;
    // }
}

export interface BylTableColumn{
    label: string;
    fieldPath: string;
}

export interface BylTableDefine{
    showCheckbox: boolean;
    columns: BylTableColumn[],
    entityAction: BylTableActionDefine[]
}

export class BylTableActionDefine{
    actionName: string;
    checkFieldPath?: string = "-"; //根据这个字段的值判断是否显示
    checkValue?: any = null;//判断值
}

export interface BylTableClickAction{
    actionName: string;
    id: string;
}

export const ACTION_MODIFY = "修改";
export const ACTION_DELETE = "删除";
export const ACTION_LOCK = "锁定";
export const ACTION_UNLOCK = "解锁";

