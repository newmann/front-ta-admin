import { Component } from '@angular/core';
import {BylListComponentBasePro} from "../../../common/list-component-base-pro";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {Router} from "@angular/router";
import {NzMessageService, NzModalRef, NzModalService} from "ng-zorro-antd";
import {BylListFormData} from "../../../../service/model/list-form-data.model";
import {BylProjectManagerPoolQuery} from "../../../../service/project/query/project-manager-pool-query.model";
import {BylConfigService} from "../../../../service/constant/config.service";
import {BylPersonListComponent} from "../../../person/person/list/list.component";
import {BylOrganizationListComponent} from "../../../organization/organization/list/list.component";
import * as moment from "moment";
import {SFSchema, SFUISchema} from "@delon/form";
import {BylIStatusItem} from "../../../../service/model/status.model";
import {BylBusinessEntityTypeManager,BylBusinessEntityTypeEnum} from "../../../../service/model/business-entity-type.enum";
import {BylPageReq} from "../../../../service/model/page-req.model";
import {
    ACTION_DELETE, ACTION_MODIFY, BylTableClickAction,
    BylTableDefine
} from "../../../common/list-form-table-item/table.formitem";
import {BylListFormFunctionModeEnum} from "../../../../service/model/list-form-function-mode.enum";
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";
import {BylProjectAuth} from "../../../../service/project/model/project-auth.model";
import {BylProjectAuthService} from "../../../../service/project/service/project-auth.service";
import {BylProjectAuthQuery} from "../../../../service/project/query/project-auth-query.model";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";

@Component({
  selector: 'byl-project-auth-list',
  templateUrl: './list.component.html',
})
export class BylProjectAuthListComponent extends BylListComponentBasePro<BylProjectAuth> {
    public addPoolReveal: NzModalRef; // 账户筛选窗口

    // businessEntityType: BylIStatusItem[]; // 实体类型
    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public projectAuthService: BylProjectAuthService) {
        super(message, configService, modalService, router);

        this.businessService = projectAuthService;
        this.crudUrl = '';

        // this.businessCrudComponent = BylPersonCrudComponent;
    }


    genListData(findResult: Array<BylProjectAuth>): Array<BylListFormData<BylProjectAuth>> {
        return findResult.map(data => {
            let item = new BylListFormData<BylProjectAuth>();
            item.checked = false;
            // item.disabled = (data.status === BylRoleStatus.SUBMITED_DELETED);
            item.item = new BylProjectAuth();
            Object.assign(item.item, data);
            return item;
        });
    }

    genQueryModel(): any {
        let result = new BylProjectAuthQuery();


        // if (this.listQuery.queryData.code) result.code = this.listQuery.queryData.code;
        // if (this.listQuery.queryData.name) result.name = this.listQuery.queryData.name;
        simpleDeepCopy(result, this.listQuery.queryData);

        if (this.listQuery.queryData.modifyDateRange) {
            if (this.listQuery.queryData.modifyDateRange.length>0){
                result.modifyDateBegin = moment(moment(this.listQuery.queryData.modifyDateRange[0]).format(BylDatetimeUtils.formatDateString)).valueOf();
                result.modifyDateEnd = moment(moment(this.listQuery.queryData.modifyDateRange[1]).format(BylDatetimeUtils.formatDateString))
                    .add(1, 'days').valueOf();//第二天的零点
            }
        }
        // if (qData.name) result.name = qData.name;
        // if (qData.modifyDateBegin) result.modifyDateBegin = moment(qData.modifyDateBegin).valueOf();
        // if (qData.modifyDateEnd) result.modifyDateEnd = moment(qData.modifyDateEnd).add(1,'days').valueOf();//第二天的零点
        // if (qData.status) result.status = qData.status;
        return result;
    }

    /**
     * 这个过程不会使用，因为没有新增的界面
     * @param {BylProjectAuth} newData
     */
    updateListData(newData: BylProjectAuth) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item, newData);
            });
    }

    /**
     * 设置查询缺省值
     */
    setQDataDefaultValue(){
        let q = new BylProjectAuthQuery();

        Object.assign(this.qData,q);
    }


    deleteEntity(id: string){
        //从数据库中删除
        this.projectAuthService.deleteById(id)
            .subscribe(data => {
                    this.loading = false;
                    if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                        // 删除当前列表中的数据
                        this.listData = this.listData.filter(item=> item.item.id !== id);

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

    //#region 查询条件
    queryDefaultData: any = {
        type: [1,2]
        // modifyDateBegin: moment(moment.now()).subtract(6,"month").format("YYYY-MM-DD"),
        // modifyDateEnd: moment(moment.now()).format("YYYY-MM-DD")
    };
    queryUiSchema: SFUISchema = {};
    querySchema: SFSchema = {
        properties: {
            projectCode: { type: 'string',
                title: '项目代码类似于'
            },
            projectName: { type: 'string',
                title: '项目名称类似于'
            },

            accountCode: { type: 'string',
                title: '账户代码类似于'
            },
            accountName: { type: 'string',
                title: '账户名称类似于'
            },
            modifyDateRange: {
                type: 'string',
                title: '最后修改日期大于等于',
                ui: { widget: 'date', mode: 'range' }
            }
        },
        required: []
    };
//#endregion

    //#region 结果表定义
    tableDefine:BylTableDefine ={
        showCheckbox: true,
        entityAction: [
            {actionName: ACTION_DELETE }
        ],
        columns:[
            {label:"项目代码", fieldPath: "projectCode" },
            {label:"项目名称", fieldPath: "projectName" },
            {label:"账户代码", fieldPath: "accountCode" },
            {label:"账户名称", fieldPath: "accountName" },
            {label:"备注", fieldPath: "remarks" },
            {label:"最后修改时间", fieldPath: "modifyDateTimeDisplay" }
        ]};


}
