import {Component, Input, OnInit} from '@angular/core';
import {BylListComponentBase} from '../../../common/list-component-base';
import {Router} from '@angular/router';
import {NzMessageService, NzModalService, NzModalRef} from 'ng-zorro-antd';
import {BylListFormData} from '../../../../service/model/list-form-data.model';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylResultBody} from '../../../../service/model/result-body.model';
import {BylRoleQuery} from '../../../../service/account/query/role-query.model';
import {BylPermissionService} from '../../../../service/account/service/permission.service';
import * as moment from 'moment';
import {BylPermission} from '../../../../service/account/model/permission.model';
import {BylPermissionQuery} from '../../../../service/account/query/permission-query.model';
import {BylListFormFunctionModeEnum} from "../../../../service/model/list-form-function-mode.enum";
import {BylPermissionAvailablePoolsInterface} from "../../../../service/account/service/permission-related.interface";
import {BylPageResp} from "../../../../service/model/page-resp.model";
import {Observable} from "rxjs/Observable";
import {SFSchema, SFUISchema} from "@delon/form";

@Component({
  selector: 'byl-permission-list',
  templateUrl: './list.component.html',
})
export class BylPermissionListComponent extends BylListComponentBase<BylPermission> {

    @Input() masterId: string;//用户查询对应关系的界面，比如角色包含的用户等
    @Input() functionMode: BylListFormFunctionModeEnum = this.LIST_MODE;
    @Input() findAvailablePoolsService: BylPermissionAvailablePoolsInterface; //调用方传入查询函数
    @Input() selectModalForm: NzModalRef;

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public permissionService: BylPermissionService) {
        super(message, configService, modalService, router);

        this.businessService = permissionService;
        this.crudUrl = '';

    }


    /**
     * 根据查询的结果，生成界面显示的内容，重点是处理好checkec和disabled字段的值。
     * @param {Array<BylPermission>} findResult
     * @returns {Array<BylListFormData<BylPermission>>}
     */
    genListData(findResult: Array<BylPermission>): Array<BylListFormData<BylPermission>> {
        return findResult.map(data => {
            let item = new BylListFormData<BylPermission>();
            item.checked = false;
            item.item = new BylPermission();
            Object.assign(item.item, data);
            return item;
        });
    }

    /**
     *
     * @param q
     * @returns {BylRoleQuery}
     */
    genQueryModel(): any {
        let result = new BylPermissionQuery();

        Object.assign(result,this.qData);

        // if (this.qData.name) result.name = this.qData.name;
        // if (this.qData.modifyDateBegin) result.modifyDateBegin = moment(this.qData.modifyDateBegin).valueOf();
        // if (this.qData.modifyDateEnd) result.modifyDateEnd = moment(this.qData.modifyDateEnd).add(1, 'days').valueOf(); // 第二天的零点
        return result;
    }


    updateListData(newData: BylPermission) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item, newData);
            });
    }

    /**
     * 设置查询缺省值
     */
    setQDataDefaultValue(){
        let q = new BylPermissionQuery();

        Object.assign(this.qData,q);
    }

    batchSelect($event) {
        //将数据传出，并退出界面
        $event.preventDefault();
        // this.functionSubject$.next(this.selectedRows);
        this.selectModalForm.destroy(this.selectedRows);
    }

    /**
     * 自定义查找，覆盖BylListComponentBase.search()
     */
    search() {
        this.loading = true;

        this.clearGrid();

        let queryResult: Observable<BylResultBody<BylPageResp<BylPermission>>> ;
        if (this.functionMode === BylListFormFunctionModeEnum.SELECT) {
            queryResult = this.findAvailablePoolsService.findAvailablePermissionPoolsPage(this.genQueryModel(), this.page, this.masterId);
        } else {
            queryResult = this.permissionService.findPage(this.genQueryModel(), this.page);
        }

        queryResult.subscribe(
            data => {
                this.loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                    // 正确获取数据
                    this.total = data.data.total;

                    // this.listData = Array.from(data.data.rows);
                    this.listData = this.genListData(Array.from(data.data.rows));

                } else {
                    console.error(data.msg);
                    super.showMsg(data.msg);
                }
            },
            err => {
                this.loading = false;
                console.error(err);
                super.showMsg(err.toString());
            }
        );

    }

    //#region 查询条件
    queryDefaultData: any = {
        modifyDateBegin: moment(moment.now()).subtract(6,"month").format("YYYY-MM-DD"),
        modifyDateEnd: moment(moment.now()).format("YYYY-MM-DD") };
    queryUiSchema: SFUISchema = {};
    querySchema: SFSchema = {
        properties: {
            packageName: { type: 'string',
                title: '包名类似于'
            },
            moduleName: { type: 'string',
                title: '模块名类似于'
            },
            action: { type: 'string',
                title: '功能类似于'
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
