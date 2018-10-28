import {Component, Input, ViewChild} from '@angular/core';

import {ReuseTabService} from '@delon/abc';
import {NzMessageService} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';

import {BylConfigService} from '../../../../service/constant/config.service';
import {SFSchema} from "@delon/form";
import {BylExpenseTicket} from "../../../../service/project/model/expense-ticket.model";
import {BylExpenseTicketService} from "../../../../service/project/service/expense-ticket.service";
import {BylEmbeddableProject} from "../../../../service/model/embeddable-project.model";
import {BylEntityReference} from "../../../../service/model/entity-reference.model";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylExpenseTicketStatusEnum} from "../../../../service/project/model/expense-ticket-status.enum";
import {BylCrudComponentTicket} from "../../../common/crud-component-ticket";
import {BylExpenseDetail} from "../../../../service/project/model/expense-detail.model";
import {BylExpenseTicketDetailListComponent} from "../../expense-ticket-detail/list/list.component";
import {BylDetailAddResultModel} from "../../../../service/model/detail-add-result.model";
import {BylDetailDeleteResultModel} from "../../../../service/model/detail-delete-result.model";
import {BylDetailUpdateResultModel} from "../../../../service/model/detail-update-Result.model";


@Component({
    selector: 'byl-expense-type-crud',
    templateUrl: './crud.component.html',
})
export class BylExpenseTicketCrudComponent
    extends BylCrudComponentTicket<BylExpenseDetail, BylExpenseTicket> {
    processType: string;

    @ViewChild('detailList') detailList: BylExpenseTicketDetailListComponent;

    newBusinessData(): BylExpenseTicket {
        return new BylExpenseTicket();
    }
    private _newSchema: SFSchema;
    private _modifySchema: SFSchema;
    private _browseSchema: SFSchema;

    @Input()
    set setSourceId(value: string) {
        this.sourceId = value;
    }

    defineForm(): void {
        this._modifySchema = {
            properties: {
                "billNo": {
                    "type": 'string',
                    "title": '单号',
                    "ui": {
                        widget: 'text'
                    }
                },

                "projectWidget": {
                    type: "string",
                    title: '所属项目',
                    ui: {
                        widget: 'bylProjectSelect',
                        placeholder: '请输入项目代码或名称，系统自动查找',
                        allowClear: 'true',
                        serverSearch: 'true',
                        showSearch: 'true',
                    }
                },

                "operationPeriod": {
                    type: "string",
                    title: '业务期间',
                    ui: {
                        widget: 'bylOperationPeriodSelect',
                        placeholder: '请输入业务期间的代码或名称，系统自动查找',
                        allowClear: 'true',
                        serverSearch: 'true',
                        showSearch: 'true',
                    }
                },
                // "beginDateWidget": {
                //     "type": "string",
                //     "title": '开始日期',
                //     format: 'date',
                //     ui: {
                //         format: BylDatetimeUtils.formatDateString,
                //         placeholder: '开始日期'
                //     }
                //
                // },
                // "endDateWidget": {
                //     "type": "string",
                //     "title": '截止日期',
                //     format: 'date',
                //     ui: {
                //         format: BylDatetimeUtils.formatDateString,
                //         placeholder: '截止日期'
                //     }
                //
                // },

                "remarks": {
                    "type": 'string',
                    "title": '备注'
                },
                "modifyDateTimeDisplay": {
                    "type": 'string',
                    "title": '最后修改时间',
                    "ui": {
                        widget: 'text'
                    }
                },
                "statusDisplay": {
                    "type": 'number',
                    "title": '状态',
                    "ui": {
                        widget: 'text'
                    }
                },

            },
            "required": ["projectWidget" , "operationPeriod"]

        };

        this._browseSchema = {
            properties: {
                "billNo": {
                    "type": 'string',
                    "title": '单号',
                    "ui": {
                        widget: 'text'
                    }
                },
                "projectDisplay": {
                    "type": "string",
                    "title": '所属项目',
                    "ui": {
                        widget: 'text'
                    }
                },
                "operationPeriodDisplay":{
                    "type": "string",
                    "title": '业务期间',
                    "ui": {
                        widget: 'text'
                    }
                },
                // "beginDateDisplay": {
                //     "type": "string",
                //     "title": '开始日期',
                //     ui: {
                //         widget: 'text'
                //     }
                //
                // },
                // "endDateDisplay": {
                //     "type": "string",
                //     "title": '截止日期',
                //     ui: {
                //         widget: 'text'
                //     }
                //
                // },
                "amount": {
                    "type": "string",
                    "title": '金额',
                    ui: {
                        widget: 'text'
                    }

                },


                "remarks": {
                    "type": 'string',
                    "title": '备注',
                    ui: {
                        widget: 'text'
                    }

                },
                "modifyDateTimeDisplay": {
                    "type": 'string',
                    "title": '最后修改时间',
                    "ui": {
                        widget: 'text'
                    }
                },
                "statusDisplay": {
                    "type": 'number',
                    "title": '状态',
                    "ui": {
                        widget: 'text'
                    }
                },

            },
            "required": ["projectDisplay" ,"operationPeriodDisplay"]

        };



    }

    // this.formUiSchema: SFUISchema = {};

    constructor(public msgService: NzMessageService,
                public expenseTicketService: BylExpenseTicketService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                // public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService,
                public router: Router) {
        super(msgService, configService, /*modalService, modalSubject, */activatedRoute, reuseTabService, router);
        //
        this.businessService = expenseTicketService;
        this.listFormUrl = "/project/expense-ticket/list";
        this.crudEntityName = "费用单";
    }

    // ngOnInit() {
    //     console.log("执行ngOninit");
    //
    //     this.sfForm = this.sf;
    //     super.ngOnInit();
    //
    //
    // }
    //
    // resetButtonClick($event: MouseEvent) {
    //     $event.preventDefault();
    //     this.reset();
    // }

    // /**
    //  * 重置界面内容
    //  */
    // reset() {
    //
    //     console.log('reset form', this.businessData);
    //
    //     super.reset();
    //     //设置可复用标签的名字：
    //     if (this.sourceId) {
    //         //说明是修改
    //         this.reuseTabService.title = '编辑-' + this.businessData.billNo;
    //     }
    //
    // }
    getFormData() {
        super.getFormData();
        if (this.businessData.projectWidget) {
            let p = new BylEmbeddableProject();
            p.projectId = this.businessData.projectWidget.id;
            p.projectCode = this.businessData.projectWidget.code;
            p.projectName = this.businessData.projectWidget.name;

            this.businessData.project = p ;
        }

        // if (this.businessData.operationPeriodWidget) {
        //     let p = new BylEmbeddableOperationPeriod();
        //
        //     simpleDeepCopy(p,this.businessData.operationPeriodWidget);
        //
        //     this.businessData.operationPeriod = p ;
        // }
        //
        // if (this.businessData.beginDateWidget) {
        //     this.businessData.beginDate =
        //         BylDatetimeUtils.convertDateTimeToMills(this.businessData.beginDateWidget);
        // }
        //
        // if (this.businessData.endDateWidget) {
        //     this.businessData.endDate =
        //         BylDatetimeUtils.convertDateTimeToMills(this.businessData.endDateWidget);
        // }


    }

    /**
     *  在调出一张历史单据进行修改的时候调用，
     *  可能需要一些个性化的处理
     */
    setFormData(data: BylExpenseTicket){
        super.setFormData(data);
        // this.projectList = [];

        // if (this.businessData.beginDate) {
        //     this.businessData.beginDateWidget = BylDatetimeUtils.convertMillsToDateTime(this.businessData.beginDate);
        //     this.defaultBusinessData.beginDateWidget = BylDatetimeUtils.convertMillsToDateTime(this.businessData.beginDate);
        // }
        //
        // if (this.businessData.endDate) {
        //     this.businessData.endDateWidget = BylDatetimeUtils.convertMillsToDateTime(this.businessData.endDate);
        //     this.defaultBusinessData.endDateWidget = BylDatetimeUtils.convertMillsToDateTime(this.businessData.endDate);
        // }
        if (this.businessData.project) {
            if ( this.businessData.project.projectId){
                let m = new BylEntityReference(this.businessData.project.projectId,
                    this.businessData.project.projectCode,
                    this.businessData.project.projectName);

                this.businessData.projectWidget = m;
                this.defaultBusinessData.projectWidget = m;

            }

        }
        // if (this.businessData.operationPeriod) {
        //     if ( this.businessData.operationPeriod.operatonPeriodId){
        //         let m = new BylEmbeddableOperationPeriod();
        //         simpleDeepCopy(m,this.businessData.operationPeriod);
        //
        //         this.businessData.operationPeriodWidget = m;
        //         this.defaultBusinessData.operationPeriodWidget = m;
        //
        //     }
        //
        // }

    }
    /**
     * 设置窗口定义的缺省值
     * 在reset内部首先调用
     *
     */
    setSchemaDefaultValue(){
        console.log("in setSchemaDefaultValue ");

        if (this.processType === 'new') {
            this.curSchema = simpleDeepCopy({},this._modifySchema);

        }else{
            //修改状态，需要根据单据的状态进一步判断
            switch (this.businessData.status){
                case BylExpenseTicketStatusEnum.UNSUBMITED:
                case  BylExpenseTicketStatusEnum.SUBMITED:
                    this.curSchema = simpleDeepCopy({},this._modifySchema);
                    console.log(this.curSchema);
                    break;

                default:
                    this.curSchema = simpleDeepCopy({},this._browseSchema);

            }
        }

    };

    // /**
    //  * 提交单据
    //  */
    // submitEntity() {
    //     this.loading = true;
    //     this.errMsg = '';
    //
    //     let saveResult$: Observable<BylResultBody<BylExpenseTicket>>;
    //
    //     console.log('in ProjectCRUD ', this.businessData);
    //
    //     saveResult$ = this.expenseTicketService.submit(this.businessData);
    //
    //     this.followProcess(saveResult$);
    // }

    // changeTicketModifyDateTime(value: number){
    //     this.businessData.modifyAction.modifyDateTime = value;
    //     this.defaultBusinessData.modifyAction.modifyDateTime = value;
    //     // this.reset();
    // };

    error(value: any) {
        console.log('error', value);
    }

    detailTabClick(){
        if (!this.detailList.haveSearched) this.detailList.search();
    }

    updateTicketForAddItem(addResult: BylDetailAddResultModel<BylExpenseDetail, BylExpenseTicket>): void {
        this.changeTicketAmount(addResult.ticket.amount);
        super.updateTicketForAddItem(addResult);
    }

    updateTicketForDeleteItem(deleteItemResult: BylDetailDeleteResultModel<BylExpenseDetail, BylExpenseTicket>): void {
        this.changeTicketAmount(deleteItemResult.ticket.amount);
        super.updateTicketForDeleteItem(deleteItemResult);
    }

    updateTicketForUpdateItem(updateItemResult: BylDetailUpdateResultModel<BylExpenseDetail, BylExpenseTicket>): void {
        this.changeTicketAmount(updateItemResult.ticket.amount);
        super.updateTicketForUpdateItem(updateItemResult);
    }

    /**
     * 单据明细修改之后，需要调整单据头的最后修改时间，以便进行多用户控制
     * @param {number} value
     */
    changeTicketAmount(value: number){
        // console.log("in WorkloadTicket Crud getModifyDateTimeChange, value ", value);
        this.businessData.amount = value;
        this.defaultBusinessData.amount = value;
        // this.reset();
    };
}

