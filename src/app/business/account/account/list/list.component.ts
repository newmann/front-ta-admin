import {Component, Injector} from '@angular/core';
import {NzMessageService, NzModalRef, NzModalService} from 'ng-zorro-antd';
import {BylListFormData} from '../../../../service/model/list-form-data.model';
import {BylConfigService} from '../../../../service/constant/config.service';
import {Router} from '@angular/router';
import {BylAccount} from '../../../../service/account/model/account.model';
import {BylAccountService} from '../../../../service/account/service/account.service';
import {BylAccountQuery} from '../../../../service/account/query/account-query.model';
import {BylResultBody} from '../../../../service/model/result-body.model';
import {BylPageResp} from '../../../../service/model/page-resp.model';
import {Observable} from 'rxjs';
import {SFSchema, SFUISchema} from '@delon/form';
import * as moment from "moment";
import {
    ACTION_BROWSE,
    ACTION_CONFIRM,
    ACTION_DELETE,
    ACTION_LOCK,
    ACTION_MODIFY,
    ACTION_SUBMIT,
    ACTION_UNCONFIRM,
    ACTION_UNLOCK,
    BylTableDefine
} from "../../../common/list-form-table-item/table.formitem";
import {BylMasterDataStatusEnum, BylMasterDataStatusManager} from "../../../../service/model/master-data-status.enum";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";
import {BylListComponentMasterData} from "../../../common/list-component-master-data";


@Component({
    selector: 'byl-account-list',
    templateUrl: './list.component.html',
})
export class BylAccountListComponent extends BylListComponentMasterData<BylAccount> {
    // LIST_MODE:BylListFormFunctionModeEnum = BylListFormFunctionModeEnum.CONFIRMED;

    // @Input() masterId: string; //用户查询对应关系的界面，比如角色包含的用户等

    /**
     * 当前在什么状态，主要是为了兼容不同的功能，比如筛选用户的界面等等,暂先定义两个：
     * list:正常的浏览界面
     * select： 筛选界面，
     */

    // @Input() functionMode: BylListFormFunctionModeEnum = BylListFormFunctionModeEnum.NORMAL;
    // @Input() findAvailablePoolsService: BylAccountAvailablePoolsInterface; //调用方传入查询函数
    // @Input() selectModalForm: NzModalRef;
    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public injector: Injector,
                // public modalRef: NzModalRef,
                public router: Router,
                public accountService: BylAccountService) {
        super(message, configService, modalService, router);

        this.businessService = accountService;
        this.crudUrl = '/account/account/crud';
        // this.businessCrudComponent = BylPersonCrudComponent;
        this.querySchema.properties['status'].enum.push(...BylMasterDataStatusManager.getSFSelectDataArray()); //设置查询条件中的状态字段
    }

    ngOnInit(){
        super.ngOnInit();
    }

    genListData(findResult: Array<BylAccount>): Array<BylListFormData<BylAccount>> {
        return findResult.map(data => {
            let item = new BylListFormData<BylAccount>();
            item.checked = false;
            // item.disabled = (data.status === BylRoleStatus.SUBMITED_DELETED);
            item.item = new BylAccount();

            simpleDeepCopy(item.item, data);

            return item;
        });
    }

    genQueryModel(): any {
        let result = new BylAccountQuery();
        simpleDeepCopy(result, this.listQuery.queryData);
        // if (this.listQuery.queryData.username) result.username = this.qData.username;
        // if (this.listQuery.queryData.fullName) result.fullName = this.qData.fullName;
        // if (this.listQuery.queryData.nickname) result.nickname = this.qData.nickname;
        if (this.listQuery.queryData.modifyDateRange) {
            if (this.listQuery.queryData.modifyDateRange.length>0){
                result.modifyDateBegin = moment(moment(this.listQuery.queryData.modifyDateRange[0]).format(BylDatetimeUtils.formatDateString)).valueOf();
                result.modifyDateEnd = moment(moment(this.listQuery.queryData.modifyDateRange[1]).format(BylDatetimeUtils.formatDateString))
                    .add(1, 'days').valueOf();//第二天的零点
            }
        }
        // if (this.listQuery.queryData.status) {
        //     result.status = [];
        //     result.status.push(...this.listQuery.queryData.status);
        // }

        return result;
    }

    updateListData(newData: BylAccount) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                let p = new BylAccount();
                simpleDeepCopy(p, newData);
                item.item = p;
            });
    }

    // modifyEntity(id:string){
    //     this.router.navigateByUrl("/person/person/crud/" + id);
    // }

    batchSelect($event) {
        //将数据传出，并退出界面
        $event.preventDefault();
        // this.functionSubject$.next(this.selectedRows);
        // this.selectModalForm.destroy(this.selectedRows);
        // this.modalRef.destroy(this.selectedRows);
        let modalRef: NzModalRef = this.injector.get(NzModalRef);
        if (modalRef) {
            modalRef.destroy(this.selectedRows);
        }
    }
    // /**
    //  * 将当前记录锁定
    //  * @param {string} id
    //  */
    // lockEntity(id: string) {
    //     let lockItem = new BylAccount();
    //     this.listData.forEach(item => {
    //         if (item.item.id === id) {
    //             simpleDeepCopy(lockItem, item.item);
    //         }
    //     });
    //
    //     if (!lockItem.id) return;
    //
    //     lockItem.status = BylMasterDataStatusEnum.LOCKED.valueOf();
    //
    //     this.updateAccount(lockItem);
    // }
    // /**
    //  * 将当前记录锁定
    //  * @param {string} id
    //  */
    // unlockEntity(id: string) {
    //     let lockItem = new BylAccount();
    //     this.listData.forEach(item => {
    //         if (item.item.id === id) {
    //             simpleDeepCopy(lockItem, item.item);
    //         }
    //     });
    //
    //     if (!lockItem.id) return;
    //
    //     lockItem.status = BylMasterDataStatusEnum.CONFIRMED.valueOf();
    //
    //     this.updateAccount(lockItem);
    // }

    // updateAccount(item: BylAccount){
    //     this.accountService.update(item).subscribe(
    //         data => {
    //             this.loading = false;
    //             if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
    //
    //                 // this.listData = Array.from(data.data.rows);
    //
    //                 this.updateListData(data.data);
    //
    //             } else {
    //                 this.showMsg(data.msg);
    //             }
    //         },
    //         err => {
    //             this.loading = false;
    //             console.log(err);
    //             this.showMsg(err.toString());
    //         }
    //     );
    //
    // }
    /**
     * 自定义查找，覆盖BylListComponentBase.search()
     */
    search() {

        this.loading = true;
        // this.selectedRows = [];
        this.listWidget.clearGrid();

        let queryResult: Observable<BylResultBody<BylPageResp<BylAccount>>>;

        queryResult = this.accountService.findPage(this.genQueryModel(), this.page);

        queryResult.subscribe(
            data => {
                this.loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                    // 正确获取数据
                    this.total = data.data.total;

                    console.log("in AccountList Component:", data.data);

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

    /**
     * 设置查询缺省值
     */
    setQDataDefaultValue() {
        let q = new BylAccountQuery();

        Object.assign(this.qData, q);
    }
//#region 查询条件
    queryDefaultData: any = {
        status:[BylMasterDataStatusEnum.CONFIRMED]
        // modifyDateBegin: moment(moment.now()).subtract(6,"month").format("YYYY-MM-DD"),
        // modifyDateEnd: moment(moment.now()).format("YYYY-MM-DD")
    };
    queryUiSchema: SFUISchema = {};
    querySchema: SFSchema = {
        properties: {
            username: { type: 'string',
                title: '代码类似于'
                },
            fullName: { type: 'string',
                title: '姓名类似于'
                },
            nickname: { type: 'string',
                title: '昵称类似于'
                },
            status: {
                type: 'string',
                title: '状态',
                enum: [],
                ui: {
                    widget: 'tag'
                }
            },
            modifyDateRange: {
                type: 'string',
                title: '最后修改日期大于等于',
                ui: { widget: 'date', mode:'range' }
                }
        },
        required: []
    };
//#endregion


    tableDefine:BylTableDefine ={
        showCheckbox: false,
        entityAction: [
            {actionName: ACTION_DELETE,checkFieldPath: "status" ,checkValue: BylMasterDataStatusEnum.UNSUBMITED },
            {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylMasterDataStatusEnum.UNSUBMITED },
            {actionName: ACTION_SUBMIT,checkFieldPath: "status" ,checkValue: BylMasterDataStatusEnum.UNSUBMITED },

            {actionName: ACTION_MODIFY,checkFieldPath: "status" ,checkValue: BylMasterDataStatusEnum.SUBMITED },
            {actionName: ACTION_CONFIRM,checkFieldPath: "status" ,checkValue: BylMasterDataStatusEnum.SUBMITED },

            {actionName: ACTION_UNCONFIRM,checkFieldPath: "status" ,checkValue: BylMasterDataStatusEnum.CONFIRMED },
            {actionName: ACTION_LOCK,checkFieldPath: "status" ,checkValue: BylMasterDataStatusEnum.CONFIRMED },
            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylMasterDataStatusEnum.CONFIRMED },

            {actionName: ACTION_UNLOCK,checkFieldPath: "status" ,checkValue: BylMasterDataStatusEnum.LOCKED },
            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylMasterDataStatusEnum.LOCKED },

            {actionName: ACTION_BROWSE,checkFieldPath: "status" ,checkValue: BylMasterDataStatusEnum.SUBMITED_DELETED }

            ],
        columns:[
        {label:"代码", fieldPath: "username" },
        {label:"姓名", fieldPath: "fullName" },
        {label:"昵称", fieldPath: "nickname" },
        {label:"备注", fieldPath: "remarks" },
        {label:"最后修改时间", fieldPath: "modifyDateTimeDisplay" },
        {label:"状态", fieldPath: "statusDisplay" },
    ]};




    // batchDelete(){
    //
    // };
    //
    // batchApproval(){
    //
    // }
}
