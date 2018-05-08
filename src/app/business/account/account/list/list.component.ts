import {Component, Input, OnInit} from '@angular/core';
import {NzMessageService, NzModalService, NzModalRef} from 'ng-zorro-antd';
import {BylListFormData} from '../../../../service/model/list-form-data.model';
import {BylConfigService} from '../../../../service/constant/config.service';
import {Router} from '@angular/router';
import {BylListComponentBase} from '../../../common/list-component-base';
import {BylPersonQuery} from '../../../../service/person/query/person-query.model';
import {BylAccount} from '../../../../service/account/model/account.model';
import {BylAccountService} from '../../../../service/account/service/account.service';
import {BylAccountQuery} from '../../../../service/account/query/account-query.model';
import {BylResultBody} from '../../../../service/model/result-body.model';
import {BylPageResp} from '../../../../service/model/page-resp.model';
import {Observable} from 'rxjs/Observable';
import {BylAccountAvailablePoolsInterface} from '../../../../service/account/service/account-related.interface';
import {BylProjectQuery} from '../../../../service/project/query/project-query.model';
import {BylListFormFunctionModeEnum} from '../../../../service/model/list-form-function-mode.enum';
import {SFSchema, SFUISchema} from '@delon/form';
import {BylListQueryFormComponent} from '../../../common/list-query-form/list-query.form';


@Component({
    selector: 'byl-account-list',
    templateUrl: './list.component.html',
})
export class BylAccountListComponent extends BylListComponentBase<BylAccount> {
    // LIST_MODE:BylListFormFunctionModeEnum = BylListFormFunctionModeEnum.NORMAL;

    @Input() masterId: string; //用户查询对应关系的界面，比如角色包含的用户等

    /**
     * 当前在什么状态，主要是为了兼容不同的功能，比如筛选用户的界面等等,暂先定义两个：
     * list:正常的浏览界面
     * select： 筛选界面，
     */

    @Input() functionMode: BylListFormFunctionModeEnum = BylListFormFunctionModeEnum.NORMAL;
    @Input() findAvailablePoolsService: BylAccountAvailablePoolsInterface; //调用方传入查询函数
    @Input() selectModalForm: NzModalRef;
    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                // public functionSubject$: NzModalRef,
                public router: Router,
                public accountService: BylAccountService) {
        super(message, configService, modalService, router);

        this.businessService = accountService;
        this.crudUrl = '/account/account/crud';
        // this.businessCrudComponent = BylPersonCrudComponent;
    }


    genListData(findResult: Array<BylAccount>): Array<BylListFormData<BylAccount>> {
        return findResult.map(data => {
            let item = new BylListFormData<BylAccount>();
            item.checked = false;
            // item.disabled = (data.status === BylRoleStatus.DELETED);
            item.item = new BylAccount();
            Object.assign(item.item, data);
            return item;
        });
    }

    genQueryModel(): any {
        let result = new BylAccountQuery();
        // if (qData.name) result.name = qData.name;
        // if (qData.modifyDateBegin) result.modifyDateBegin = moment(qData.modifyDateBegin).valueOf();
        // if (qData.modifyDateEnd) result.modifyDateEnd = moment(qData.modifyDateEnd).add(1,'days').valueOf();//第二天的零点
        // if (qData.status) result.status = qData.status;
        return result;
    }

    updateListData(newData: BylAccount) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item, newData);
            });
    }

    // modifyEntity(id:string){
    //     this.router.navigateByUrl("/person/person/crud/" + id);
    // }

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

        let queryResult: Observable<BylResultBody<BylPageResp<BylAccount>>>;
        if (this.functionMode === BylListFormFunctionModeEnum.SELECT) {

            console.log(this.findAvailablePoolsService);

            queryResult = this.findAvailablePoolsService.findAvailableAccountPoolsPage(this.genQueryModel(), this.page, this.masterId);
        } else {
            queryResult = this.accountService.findPage(this.genQueryModel(), this.page);
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

    /**
     * 设置查询缺省值
     */
    setQDataDefaultValue() {
        let q = new BylAccountQuery();

        Object.assign(this.qData, q);
    }

    queryDefaultData: any = { };
    queryUiSchema: SFUISchema = {};
    querySchema: SFSchema = {
        properties: {
            code: { type: 'string' },
            fullName: { type: 'string' },
            nickname: { type: 'string' },
            modifyDateBegin: { type: 'string', format: 'date' },
            modifyDateEnd: { type: 'string', format: 'date' }
        },
        required: []
    };

    queryForm: NzModalRef;

    showQueryForm() {
        this.queryForm = this.modalService.create({
            nzTitle: '输入查询条件',
            nzZIndex: 9999, //最外层
            nzWidth: '80%',
            nzContent: BylListQueryFormComponent,
            nzFooter: null,
            // onOk() {
            //
            // },
            // onCancel() {
            //     console.log('Click cancel');
            // },
            nzComponentParams: {
                defaultData: this.queryDefaultData,
                uiSchema: this.queryUiSchema,
                schema: this.querySchema
            },
            nzMaskClosable: false
        });

        this.queryForm.afterClose.subscribe((value: any) => {
            console.log(value);
        });
    }
}
