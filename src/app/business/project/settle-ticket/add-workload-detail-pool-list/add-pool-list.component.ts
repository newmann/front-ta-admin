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
import {BylWorkloadDetail} from "../../../../service/project/model/workload-detail.model";
import {BylWorkloadDetailService} from "../../../../service/project/service/workload-detail.service";
import {BylWorkloadDetailAvailablePoolsInterface} from "../../../../service/project/service/workload-detail-related.interface";
import {BylSettleDetailWorkloadTicket} from "../../../../service/project/model/settle-detail-workload-ticket.model";
import {BylSettleDetailWorkloadTicketService} from "../../../../service/project/service/settle-detail-workload-ticket.service";
import {BylSettleDetailWorkloadTicketAvailablePoolsInterface} from "../../../../service/project/service/settle-detail-workload-ticket-related.interface";

@Component({
  selector: 'byl-settle-detail-workload-detail-add-pool-list',
  templateUrl: './add-pool-list.component.html',
})
export class BylSettleDetailWorkloadDetailAddPoolListComponent extends BylListComponentBasePro<BylSettleDetailWorkloadTicket> {

    @Input() masterId: string;//这里的masterId是结算对象的id，不是单据的id

    // @Input() functionMode: BylListFormFunctionModeEnum = this.LIST_MODE;
    // @Input() findAvailablePoolsService: BylSettleDetailWorkloadTicketAvailablePoolsInterface; //调用方传入查询函数
    // @Input() selectModalForm: NzModalRef;

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public modalRef: NzModalRef,
                public router: Router,
                public workloadDetailService: BylSettleDetailWorkloadTicketService) {
        super(message, configService, modalService, router);

        this.businessService = workloadDetailService;
        this.crudUrl = '';

    }


    /**
     * 根据查询的结果，生成界面显示的内容，重点是处理好checkec和disabled字段的值。
     * @param {Array<BylSettleDetailWorkloadTicket>} findResult
     * @returns {Array<BylListFormData<BylSettleDetailWorkloadTicket>>}
     */
    genListData(findResult: Array<BylSettleDetailWorkloadTicket>): Array<BylListFormData<BylSettleDetailWorkloadTicket>> {
        return findResult.map(data => {
            let item = new BylListFormData<BylSettleDetailWorkloadTicket>();
            item.checked = false;
            item.item = new BylSettleDetailWorkloadTicket();
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


    updateListData(newData: BylSettleDetailWorkloadTicket) {
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
        // this.selectModalForm.destroy(this.selectedRows);
        this.modalRef.destroy(this.selectedRows)
    }

    /**
     * 自定义查找，覆盖BylListComponentBase.search()
     */
    search() {
        this.loading = true;

        // this.clearGrid();

        let queryResult: Observable<BylResultBody<BylPageResp<BylSettleDetailWorkloadTicket>>> ;
        queryResult = this.workloadDetailService.findAvailableSettleDetailWorkloadTicketPoolsPage(this.genQueryModel(), this.page, this.masterId);
        // queryResult = this.findAvailablePoolsService.findAvailableSettleDetailWorkloadTicketPoolsPage(this.genQueryModel(), this.page, this.masterId);

        queryResult.subscribe(
            data => {
                this.loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                    // 正确获取数据
                    this.total = data.data.total;

                    // this.listData = Array.from(data.data.rows);
                    console.log('in settle-ticket add-pool-list component',data.data.rows);
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
            workloadTicketNo: { type: 'string',
                title: '考情单号类似于'
            }
            // ,
            // moduleName: { type: 'string',
            //     title: '模块名类似于'
            // },
            // action: { type: 'string',
            //     title: '功能类似于'
            // }
            // ,
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
        ],
        columns:[
            {label:"所在项目", fieldPath: "projectDisplay" },
            {label:"考勤单号", fieldPath: "workloadTicketNo" },
            {label:"考勤明细行号", fieldPath: "workloadDetailLineNo" },
            {label:"工种类型", fieldPath: "workTypeDisplay" },
            {label:"统计类型", fieldPath: "checkTypeDisplay" },
            {label:"标准时长", fieldPath: "standardTimeLength" },
            {label:"数量合计", fieldPath: "shouldPayCount" }
        ]};

}
