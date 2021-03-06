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
import {Observable} from "rxjs";
import {SFSchema, SFUISchema} from "@delon/form";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylListComponentBasePro} from "../../../common/list-component-base-pro";
import {
    ACTION_BROWSE,
    ACTION_CONFIRM,
    ACTION_DELETE,
    ACTION_LOCK,
    ACTION_MODIFY, ACTION_SUBMIT,
    ACTION_UNCONFIRM, ACTION_UNLOCK, BylTableDefine
} from "../../../common/list-form-table-item/table.formitem";
import {BylMasterDataStatusEnum} from "../../../../service/model/master-data-status.enum";
import {BylMenuLink} from "../../../../service/account/model/menu-link.model";
import {BylMenuLinkService} from "../../../../service/account/service/menu-link.service";
import {
    BylMenuLinkAvailablePoolsInterface,
    BylMenuLinkRelationInterface
} from "../../../../service/account/service/menu-link-related.interface";
import {BylPageReq} from "../../../../service/model/page-req.model";

@Component({
  selector: 'byl-menu_link-list',
  templateUrl: './list.component.html',
})
export class BylMenuLinkListComponent extends BylListComponentBasePro<BylMenuLink> {

    @Input() masterId: string;//用户查询对应关系的界面，比如角色包含的用户等
    @Input() functionMode: BylListFormFunctionModeEnum = this.LIST_MODE;
    @Input() findAvailablePoolsService: BylMenuLinkRelationInterface; //调用方传入查询函数
    // @Input() findAvailablePoolsService: (query: any, page: BylPageReq, masterId?: string) => Observable<BylResultBody<BylPageResp<BylMenuLink>>>;
    // @Input() selectModalForm: NzModalRef;

    initPermissionLoading: boolean = false;

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public modalRef: NzModalRef,
                public router: Router,
                public menuLinkService: BylMenuLinkService) {
        super(message, configService, modalService, router);

        this.businessService = menuLinkService;
        this.crudUrl = '';

    }


    /**
     * 根据查询的结果，生成界面显示的内容，重点是处理好checkec和disabled字段的值。
     * @param {Array<BylMenuLink>} findResult
     * @returns {Array<BylListFormData<BylMenuLink>>}
     */
    genListData(findResult: Array<BylMenuLink>): Array<BylListFormData<BylMenuLink>> {
        return findResult.map(data => {
            let item = new BylListFormData<BylMenuLink>();
            item.checked = false;
            item.item = new BylMenuLink();
            simpleDeepCopy(item.item, data);
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
        simpleDeepCopy(result, this.listQuery.queryData);

        // if (this.listQuery.queryData.packageName) result.packageName = this.listQuery.queryData.packageName;
        // if (this.listQuery.queryData.moduleName) result.moduleName = this.listQuery.queryData.moduleName;
        // if (this.listQuery.queryData.action) result.action = this.listQuery.queryData.action;

        // simpleDeepCopy(result,this.qData);

        // if (this.qData.name) result.name = this.qData.name;
        // if (this.qData.modifyDateBegin) result.modifyDateBegin = moment(this.qData.modifyDateBegin).valueOf();
        // if (this.qData.modifyDateEnd) result.modifyDateEnd = moment(this.qData.modifyDateEnd).add(1, 'days').valueOf(); // 第二天的零点
        return result;
    }


    updateListData(newData: BylMenuLink) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                simpleDeepCopy(item.item, newData);
            });
    }

    /**
     * 设置查询缺省值
     */
    setQDataDefaultValue(){
        let q = new BylPermissionQuery();

       simpleDeepCopy(this.qData,q);
    }

    batchSelect($event) {
        //将数据传出，并退出界面
        $event.preventDefault();
        // this.functionSubject$.next(this.selectedRows);
        // this.selectModalForm.destroy(this.selectedRows);
        this.modalRef.destroy(this.selectedRows);
    }

    /**
     * 自定义查找，覆盖BylListComponentBase.search()
     */
    search() {
        this.loading = true;

        // this.clearGrid();

        let queryResult: Observable<BylResultBody<BylPageResp<BylMenuLink>>> ;
        if (this.functionMode === BylListFormFunctionModeEnum.SELECT) {
            queryResult = this.findAvailablePoolsService.findAvailableMenuLinkPoolsPage(this.genQueryModel(), this.page, this.masterId);
        } else {

            console.log('in MenuLink List Component search', this.genQueryModel());

            queryResult = this.menuLinkService.findPage(this.genQueryModel(), this.page);
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
        // modifyDateBegin: moment(moment.now()).subtract(6,"month").format("YYYY-MM-DD"),
        // modifyDateEnd: moment(moment.now()).format("YYYY-MM-DD")
    };
    queryUiSchema: SFUISchema = {};
    querySchema: SFSchema = {
        properties: {
            defaultCaption: { type: 'string',
                title: '缺省名称类似于'
            },
            targetLink: { type: 'string',
                title: 'URL类似于'
            }
        },
        required: []
    };
//#endregion
    tableDefine:BylTableDefine ={
        showCheckbox: true,
        entityAction: [
        ],
        columns:[
            {label:"缺省名称", fieldPath: "defaultCaption" },
            {label:"URL", fieldPath: "targetLink" }
        ]};


    toggleInitPermissionButton(){
        this.initPermissionLoading = ! this.initPermissionLoading;
    }
}
