import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {NzMessageService, NzModalRef, NzModalService} from 'ng-zorro-antd';
import {BylListFormData} from '../../../../service/model/list-form-data.model';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylResultBody} from '../../../../service/model/result-body.model';
import {BylRoleQuery} from '../../../../service/account/query/role-query.model';
import {BylPermissionQuery} from '../../../../service/account/query/permission-query.model';
import {BylPageResp} from "../../../../service/model/page-resp.model";
import {Observable} from "rxjs";
import {SFSchema, SFUISchema} from "@delon/form";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylListComponentBasePro} from "../../../common/list-component-base-pro";
import {BylTableDefine} from "../../../common/list-form-table-item/table.formitem";
import {BylSettleDetailBorrowMoneyTicket} from "../../../../service/project/model/settle-detail-borrow-money-ticket.model";
import {BylSettleDetailBorrowMoneyTicketService} from "../../../../service/project/service/settle-detail-borrow-money-ticket.service";

@Component({
  selector: 'byl-settle-detail-borrow-money-ticket-add-pool-list',
  templateUrl: './add-pool-list.component.html',
})
export class BylSettleDetailBorrowMoneyTicketAddPoolListComponent extends BylListComponentBasePro<BylSettleDetailBorrowMoneyTicket> {

    @Input() masterId: string;//这里的masterId是结算对象的id，不是单据的id

    // @Input() functionMode: BylListFormFunctionModeEnum = this.LIST_MODE;
    // @Input() findAvailablePoolsService: BylSettleDetailWorkloadTicketAvailablePoolsInterface; //调用方传入查询函数
    // @Input() selectModalForm: NzModalRef;

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public modalRef: NzModalRef,
                public router: Router,
                public settleDetailBorrowMoneyTicketService: BylSettleDetailBorrowMoneyTicketService) {
        super(message, configService, modalService, router);

        this.businessService = settleDetailBorrowMoneyTicketService;
        this.crudUrl = '';

    }


    /**
     * 根据查询的结果，生成界面显示的内容，重点是处理好checkec和disabled字段的值。
     * @param {Array<BylSettleDetailBorrowMoneyTicket>} findResult
     * @returns {Array<BylListFormData<BylSettleDetailBorrowMoneyTicket>>}
     */
    genListData(findResult: Array<BylSettleDetailBorrowMoneyTicket>): Array<BylListFormData<BylSettleDetailBorrowMoneyTicket>> {
        return findResult.map(data => {
            let item = new BylListFormData<BylSettleDetailBorrowMoneyTicket>();
            item.checked = false;
            item.item = new BylSettleDetailBorrowMoneyTicket();
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


    updateListData(newData: BylSettleDetailBorrowMoneyTicket) {
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

        let queryResult: Observable<BylResultBody<BylPageResp<BylSettleDetailBorrowMoneyTicket>>> ;
        queryResult = this.settleDetailBorrowMoneyTicketService.findAvailableSettleDetailBorrowMoneyTicketPoolsPage(this.genQueryModel(), this.page, this.masterId);
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
            borrowMoneyTicketNo: { type: 'string',
                title: '借款单号类似于'
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
            {label:"借款单号", fieldPath: "borrowMoneyTicketNo" },
            {label:"金额", fieldPath: "amount" }
        ]};

}
