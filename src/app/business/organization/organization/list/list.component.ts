import {Component, Input, OnInit , Injector} from '@angular/core';
import {Router} from "@angular/router";
import {NzMessageService, NzModalRef, NzModalService} from "ng-zorro-antd";
import {BylListFormData} from "../../../../service/model/list-form-data.model";
import {BylConfigService} from "../../../../service/constant/config.service";
import {BylOrganization} from "../../../../service/organization/model/organization.model";
import {BylOrganizationService} from "../../../../service/organization/service/organization.service";
import {BylOrganizationQuery} from "../../../../service/organization/query/organization-query.model";
import * as moment from "moment";
import {SFSchema, SFUISchema} from "@delon/form";
import {BylListComponentBasePro} from "../../../common/list-component-base-pro";
import {ACTION_MODIFY, BylTableDefine} from "../../../common/list-form-table-item/table.formitem";
import {BylListFormFunctionModeEnum} from "../../../../service/model/list-form-function-mode.enum";
import {BylOrganizationAvailablePoolsInterface} from "../../../../service/organization/service/organization-available-pool.interface";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {Observable} from "rxjs";
import {BylPageResp} from "../../../../service/model/page-resp.model";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";

@Component({
  selector: 'byl-organization-list',
  templateUrl: './list.component.html',
})
export class BylOrganizationListComponent extends BylListComponentBasePro<BylOrganization> {

    @Input() functionMode: BylListFormFunctionModeEnum = BylListFormFunctionModeEnum.NORMAL;
    @Input() findAvailablePoolsService: BylOrganizationAvailablePoolsInterface; //调用方传入查询函数

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public injector: Injector,
                // public modalRef: NzModalRef,
                public router: Router,
                public organizationService: BylOrganizationService) {
        super(message, configService, modalService, router);

        this.businessService = organizationService;
        this.crudUrl = '/organization/organization/crud';
        // this.businessCrudComponent = BylPersonCrudComponent;
    }


    genListData(findResult: Array<BylOrganization>): Array<BylListFormData<BylOrganization>> {
        return findResult.map(data => {
            let item = new BylListFormData<BylOrganization>();
            item.checked = false;
            // item.disabled = (data.status === BylRoleStatus.SUBMITED_DELETED);
            item.item = new BylOrganization();
            Object.assign(item.item, data);
            return item;
        });
    }

    genQueryModel(): any {
        let result = new BylOrganizationQuery();
        simpleDeepCopy(result, this.listQuery.queryData);
        if (this.listQuery.queryData.modifyDateRange) {
            if (this.listQuery.queryData.modifyDateRange.length>0){
                result.modifyDateBegin = moment(moment(this.listQuery.queryData.modifyDateRange[0]).format(BylDatetimeUtils.formatDateString)).valueOf();
                result.modifyDateEnd = moment(moment(this.listQuery.queryData.modifyDateRange[1]).format(BylDatetimeUtils.formatDateString))
                    .add(1, 'days').valueOf();//第二天的零点
            }
        }
        return result;
    }

    updateListData(newData: BylOrganization) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item, newData);
            });
    }

    // modifyEntity(id:string){
    //     this.router.navigateByUrl("/person/person/crud/" + id);
    // }
    /**
     * 设置查询缺省值
     */
    setQDataDefaultValue(){
        let q = new BylOrganizationQuery();

        Object.assign(this.qData,q);
    }
    /**
     * 自定义查找，覆盖BylListComponentBase.search()
     */
    search() {
        this.loading = true;

        let queryResult: Observable<BylResultBody<BylPageResp<BylOrganization>>>;
        if (this.functionMode === BylListFormFunctionModeEnum.SELECT) {

            console.log(this.findAvailablePoolsService);

            queryResult = this.findAvailablePoolsService.findAvailableOrganizationPoolsPage(this.genQueryModel(), this.page);
        } else {
            queryResult = this.organizationService.findPage(this.genQueryModel(), this.page);
        }

        queryResult.subscribe(
            data => {
                this.loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                    // 正确获取数据
                    this.total = data.data.total;
                    console.log("in OrganizationListComponent:",data.data.rows);
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

    batchSelect($event) {
        //将数据传出，并退出界面
        $event.preventDefault();
        // this.functionSubject$.next(this.selectedRows);
        // this.selectModalForm.destroy(this.selectedRows);

        let modalRef: NzModalRef = this.injector.get(NzModalRef);
        if (modalRef) {
            modalRef.destroy(this.selectedRows);
        }

    }

    //#region 查询条件
    queryDefaultData: any = {
        // modifyDateBegin: moment(moment.now()).subtract(6,"month").format("YYYY-MM-DD"),
        // modifyDateEnd: moment(moment.now()).format("YYYY-MM-DD")
    };
    queryUiSchema: SFUISchema = {};
    querySchema: SFSchema = {
        properties: {
            name: { type: 'string',
                title: '名称类似于'
            },
            code: { type: 'string',
                title: '代码类似于'
            },
            simpleName: { type: 'string',
                title: '简称类似于'
            },
            modifyDateRange: {
                type: 'string',
                title: '最后修改日期大于等于',
                ui: { widget: 'date',mode: 'range' }
            }
            // modifyDateBegin: { type: 'string',
            //     title: '最后修改日期大于等于',
            //     ui: { widget: 'date' }
            // },
            // modifyDateEnd: { type: 'string',
            //     title: '最后修改日期小于等于',
            //     ui: { widget: 'date' }
            // }
        },
        required: []
    };
//#endregion

    tableDefine:BylTableDefine ={
        showCheckbox: true,
        entityAction: [
            {actionName: ACTION_MODIFY }
        ],
        columns:[
            {label:"代码", fieldPath: "code" },
            {label:"名称", fieldPath: "name" },
            {label:"简称", fieldPath: "simpleName" },
            {label:"法人代表", fieldPath: "legalPersonNameDisplay" },
            {label:"组织类型", fieldPath: "typeDisplay" },
            {label:"备注", fieldPath: "remarks" },
            {label:"最后修改时间", fieldPath: "modifyDateTimeDisplay" }
        ]};

}
