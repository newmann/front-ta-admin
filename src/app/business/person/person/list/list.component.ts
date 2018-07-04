import {Component, Injector, Input} from '@angular/core';
import {BylPerson} from '../../../../service/person/model/person.model';
import {Router} from '@angular/router';
import {NzMessageService, NzModalRef, NzModalService} from 'ng-zorro-antd';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylPersonService} from '../../../../service/person/service/person.service';
import {BylListFormData} from '../../../../service/model/list-form-data.model';

import {BylPersonQuery} from '../../../../service/person/query/person-query.model';
import {SFSchema, SFUISchema} from "@delon/form";
import * as moment from "moment";
import {BylListComponentBasePro} from "../../../common/list-component-base-pro";
import {ACTION_MODIFY, BylTableDefine} from "../../../common/list-form-table-item/table.formitem";
import {BylListFormFunctionModeEnum} from "../../../../service/model/list-form-function-mode.enum";
import {BylPersonAvailablePoolsInterface} from "../../../../service/person/service/person-available-pool.interface";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {BylPageResp} from "../../../../service/model/page-resp.model";
import {Observable} from "rxjs";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";


@Component({
    selector: 'byl-person-list',
    templateUrl: './list.component.html',
})
export class BylPersonListComponent extends BylListComponentBasePro<BylPerson> {
    /**
     * 当前在什么状态，主要是为了兼容不同的功能，比如筛选用户的界面等等,暂先定义两个：
     * list:正常的浏览界面
     * select： 筛选界面，
     */

    @Input() functionMode: BylListFormFunctionModeEnum = BylListFormFunctionModeEnum.NORMAL;
    @Input() findAvailablePoolsService: BylPersonAvailablePoolsInterface; //调用方传入查询函数
    // @Input() selectModalForm: NzModalRef;

    // statusList: BylIStatusItem[]; //状态
    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public injector: Injector,
                // public modalRef: NzModalRef,
                public router: Router,
                public personService: BylPersonService) {
        super(message, configService, modalService, router);

        this.businessService = personService;
        this.crudUrl = '/person/person/crud';
        // this.statusList = BylMasterDataStatusManager.getArray();
        // this.querySchema.properties['status'].enum.push(...this.statusList); //设置查询条件中的状态字段
        // this.businessCrudComponent = BylPersonCrudComponent;
    }


    genListData(findResult: Array<BylPerson>): Array<BylListFormData<BylPerson>> {
        return findResult.map(data => {
            let item = new BylListFormData<BylPerson>();

            item.checked = false;
            // item.disabled = (data.status === BylRoleStatus.SUBMITED_DELETED);
            console.log("in PersonList genListData data", data);

            item.item = new BylPerson();

            console.log("in PersonList genListData before", item.item);
            // Object.assign(item.item, data);
            item.item = simpleDeepCopy(item.item, data);


            console.log("in PersonList genListData after", item.item);
            return item;
        });
    }

    genQueryModel(): any {
        let result = new BylPersonQuery();
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

    updateListData(newData: BylPerson) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                simpleDeepCopy(item.item, newData);
            });
    }

    /**
     * 自定义查找，覆盖BylListComponentBase.search()
     */
    search() {
        this.loading = true;

        let queryResult: Observable<BylResultBody<BylPageResp<BylPerson>>>;
        if (this.functionMode === BylListFormFunctionModeEnum.SELECT) {

            console.log(this.findAvailablePoolsService);

            queryResult = this.findAvailablePoolsService.findAvailablePersonPoolsPage(this.genQueryModel(), this.page);
        } else {
            queryResult = this.personService.findPage(this.genQueryModel(), this.page);
        }

        queryResult.subscribe(
            data => {
                this.loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                    // 正确获取数据
                    this.total = data.data.total;
                    console.log("in PersonListComponent:",data.data.rows);
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
    // modifyEntity(id:string){
    //     this.router.navigateByUrl("/person/person/crud/" + id);
    // }
    /**
     * 设置查询缺省值
     */
    setQDataDefaultValue(){
        let q = new BylPersonQuery();

        simpleDeepCopy(this.qData,q);
    }

    //#region 查询条件
    queryDefaultData: any = {
        modifyDateBegin: moment(moment.now()).subtract(6,"month").format("YYYY-MM-DD"),
        modifyDateEnd: moment(moment.now()).format("YYYY-MM-DD") };
    queryUiSchema: SFUISchema = {};
    querySchema: SFSchema = {
        properties: {
            name: { type: 'string',
                title: '姓名类似于'
            },
            idCard: { type: 'string',
                title: '身份证号类似于'
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
    tableDefine:BylTableDefine ={
        showCheckbox: true,
        entityAction: [
            {actionName: ACTION_MODIFY }
        ],
        columns:[
            {label:"身份证号码", fieldPath: "idCard" },
            {label:"名称", fieldPath: "name" },
            {label:"民族", fieldPath: "nationName" },
            {label:"政治面貌", fieldPath: "politicalStatusName" },
            {label:"籍贯", fieldPath: "nativePlace" },
            {label:"备注", fieldPath: "remarks" },
            {label:"最后修改时间", fieldPath: "modifyDateTimeDisplay" }
        ]};


    // pageChange(item: BylPageReq){
    //     this.page = item;
    //     this.search();
    // }
    //
    // selectedChange(data: BylListFormData<BylPerson>[]){
    //     this.selectedRows = data;
    //
    // }
    // entityAction(action: BylTableClickAction){
    //     switch(action.actionName){
    //         case ACTION_MODIFY:
    //             this.modifyEntity(action.id);
    //             break;
    //         default:
    //             console.warn("当前的Action为：" + action.actionName + "，没有对应的处理过程。");
    //     }
    //
    // }

}
