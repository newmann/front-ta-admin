import {Component, Input} from '@angular/core';

import {ReuseTabService} from '@delon/abc';
import {NzMessageService} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';

import {BylConfigService} from '../../../../service/constant/config.service';
import {SFSchema} from "@delon/form";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylTicketCrudComponentBasePro} from "../../../common/ticket-crud-component-base-pro";
import {BylSettleTicket} from "../../../../service/project/model/settle-ticket.model";
import {BylSettleTicketService} from "../../../../service/project/service/settle-ticket.service";
import {BylEmbeddableSettleResourse} from "../../../../service/project/model/embeddable-settle-resourse.model";
import {BylSettleTicketStatusEnum} from "../../../../service/project/model/settle-ticket-status.enum";
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";
import {BylBorrowMoneyQualificationPool} from "../../../../service/project/model/borrow-money-qualification-pool.model";
import {Observable} from "rxjs/index";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {BylTicketStatusEnum} from "../../../../service/model/ticket-status.enum";

import { default as ngLang } from '@angular/common/locales/zh-Hans';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd';

@Component({
    selector: 'byl-settle-ticket-crud',
    templateUrl: './crud.component.html',
})
export class BylSettleTicketCrudComponent extends BylTicketCrudComponentBasePro<BylSettleTicket> {
    // processType: string;


    // @ViewChild('sf') sf: SFComponent;
    // private _detailLoaded:boolean = false;

    newBusinessData(): BylSettleTicket {
        return new BylSettleTicket();
    }
    private _newSchema: SFSchema;
    private _modifySchema: SFSchema;
    private _browseSchema: SFSchema;

    public settleLoading: boolean =false;

    @Input()
    set setSourceId(value: string) {
        this.sourceId = value;
    }

    defineForm(): void {
        this._modifySchema = {
            properties: {
                // "billNo": {
                //     "type": 'string',
                //     "title": '单号',
                //     "ui": {
                //         widget: 'text'
                //     }
                // },

                "settleResourseWidget": {
                    type: "string",
                    title: '结算对象',
                    ui: {
                        widget: 'bylBorrowMoneyQualificationPoolSelect',
                        placeholder: '请输入确认状态员工（或可借款资源中的个体或组织）的代码或名称，系统自动查找',
                        allowClear: 'true',
                        serverSearch: 'true',
                        showSearch: 'true',
                    }
                },


                "shouldPayWorkloadDays": {
                    "type": 'string',
                    "title": '考勤累计天数',
                    'ui': {
                        'widget': 'text'
                    }
                },

                "shouldPayWorkloadHours": {
                    "type": 'string',
                    "title": '考勤累计小时数',
                    'ui': {
                        'widget': 'text'
                    }
                },

                "shouldPayWorkloadAmount": {
                    "type": "number",
                    minimum: 0,
                    maximum: 100000000,
                    "title": '考勤应付金额（元）',
                    ui: {
                        precision: 2
                    },
                },
                "shouldPayOther": {
                    "type": "number",
                    minimum: 0,
                    maximum: 100000000,
                    "title": '其他应付金额（元）',
                    ui: {
                        precision: 2
                    },
                },

                "borrowAmount": {
                    "type": 'string',
                    "title": '考勤累计小时数',
                    'ui': {
                        'widget': 'text'
                    }
                },

                "deduct": {
                    "type": "number",
                    minimum: 0,
                    maximum: 100000000,
                    "title": '其他应扣金额（元）',
                    ui: {
                        precision: 2
                    },
                },
                "payDate": {
                    "type": "number",
                    "title": '付款日期',

                    ui: {
                        widget: 'date',
                        placeholder: '付款日期'
                    }

                },
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
                // "modifyDateTimeDisplay": {
                //     "type": 'string',
                //     "title": '最后修改时间',
                //     "ui": {
                //         widget: 'text'
                //     }
                // },
                // "statusDisplay": {
                //     "type": 'number',
                //     "title": '状态',
                //     "ui": {
                //         widget: 'text'
                //     }
                // },

            },
            "required": ["settleResourseWidget"]
        };

        this._browseSchema = {
            properties: {
                // "billNo": {
                //     "type": 'string',
                //     "title": '单号',
                //     "ui": {
                //         widget: 'text'
                //     }
                // },
                "settleResourseDisplay": {
                    type: "string",
                    title: '结算对象',
                    ui: {
                        widget: 'text'
                    }
                },


                "shouldPayWorkloadDays": {
                    "type": 'string',
                    "title": '考勤累计天数',
                    'ui': {
                        'widget': 'text'
                    }
                },

                "shouldPayWorkloadHours": {
                    "type": 'string',
                    "title": '考勤累计小时数',
                    'ui': {
                        'widget': 'text'
                    }
                },

                "shouldPayWorkloadAmount": {
                    "type": "string",
                    "title": '考勤应付金额（元）',
                    ui: {
                        'widget': 'text'
                    },
                },
                "shouldPayOther": {
                    "type": "string",
                    "title": '其他应付金额（元）',
                    ui: {
                        'widget': 'text'
                    },
                },

                "borrowAmount": {
                    "type": 'string',
                    "title": '考勤累计小时数',
                    'ui': {
                        'widget': 'text'
                    }
                },

                "deduct": {
                    "type": "number",
                    "title": '其他应扣金额（元）',
                    ui: {
                        'widget': 'text'
                    },
                },
                "payDateDisplay": {
                    "type": "string",
                    "title": '付款日期',
                    ui: {
                        'widget': 'text'
                    }

                },



                "remarks": {
                    "type": 'string',
                    "title": '备注',
                    ui: {
                        widget: 'text'
                    }

                },
                // "modifyDateTimeDisplay": {
                //     "type": 'string',
                //     "title": '最后修改时间',
                //     "ui": {
                //         widget: 'text'
                //     }
                // },
                // "statusDisplay": {
                //     "type": 'number',
                //     "title": '状态',
                //     "ui": {
                //         widget: 'text'
                //     }
                // },

            },
            "required": ["settleResourseDisplay"]

        };



    }

    // this.formUiSchema: SFUISchema = {};

    constructor(public msgService: NzMessageService,
                public settleTicketService: BylSettleTicketService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                // public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService,
                public router: Router) {
        super(msgService, configService, /*modalService, modalSubject, */activatedRoute, reuseTabService, router);
        //
        this.businessService = settleTicketService;
        this.listFormUrl = "/project/settle-ticket/list";
        this.crudEntityName = "结算单";
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


    getFormData() {
        super.getFormData();
        if (this.businessData.settleResourseWidget) {
            let p = new BylEmbeddableSettleResourse();
            p.settleResourseType = this.businessData.settleResourseWidget.type;
            p.settleResourseId = this.businessData.settleResourseWidget.poolId;
            p.settleResourseCode = this.businessData.settleResourseWidget.poolCode;
            p.settleResourseName = this.businessData.settleResourseWidget.poolName;
            this.businessData.settleResourse = p ;
        }

        // if (this.businessData.operationPeriodWidget) {
        //     let p = new BylEmbeddableOperationPeriod();
        //
        //     simpleDeepCopy(p,this.businessData.operationPeriodWidget);
        //
        //     this.businessData.operationPeriod = p ;
        // }
        //
        if (this.businessData.payDateWidget) {
            this.businessData.payDate =
                BylDatetimeUtils.convertDateTimeToMills(this.businessData.payDateWidget);
        }
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
    setFormData(data: BylSettleTicket){
        super.setFormData(data);
        // this.projectList = [];

        // if (this.businessData.beginDate) {
        //     this.businessData.beginDateWidget = BylDatetimeUtils.convertMillsToDateTime(this.businessData.beginDate);
        //     this.defaultBusinessData.beginDateWidget = BylDatetimeUtils.convertMillsToDateTime(this.businessData.beginDate);
        // }
        //
        if (this.businessData.payDate) {
            this.businessData.payDateWidget = BylDatetimeUtils.convertMillsToDateTime(this.businessData.payDate);
            this.defaultBusinessData.payDateWidget = BylDatetimeUtils.convertMillsToDateTime(this.businessData.payDate);
        }
        if (this.businessData.settleResourse) {
            if ( this.businessData.settleResourse.settleResourseId){
                let b = new BylBorrowMoneyQualificationPool();
                b.type = this.businessData.settleResourse.settleResourseType;
                b.poolId = this.businessData.settleResourse.settleResourseId;
                b.poolCode = this.businessData.settleResourse.settleResourseCode;
                b.poolName = this.businessData.settleResourse.settleResourseName;

                this.businessData.settleResourseWidget = b;
                this.defaultBusinessData.settleResourseWidget = b;

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
                case BylSettleTicketStatusEnum.UNSUBMITED:
                case  BylSettleTicketStatusEnum.SUBMITED:
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
    //     let saveResult$: Observable<BylResultBody<BylSettleTicket>>;
    //
    //     console.log('in ProjectCRUD ', this.businessData);
    //
    //     saveResult$ = this.expenseTicketService.submit(this.businessData);
    //
    //     this.followProcess(saveResult$);
    // }

    /**
     * 结算
     *
     */
    settleEntity() {
        this.settleLoading = true;
        this.errMsg = '';

        let saveResult$: Observable<BylResultBody<BylSettleTicket>>;

        console.log('in BylTicketCrudComponentBasePro confirmEntity', this.businessData);

        saveResult$ = this.settleTicketService.settle(this.businessData);

        this.followProcess(saveResult$);

    }

    setLoadingFalse(){
        super.setLoadingFalse();
        this.settleLoading= false;
    }

    showSettleButton(): boolean{
        return this.businessData.status === BylSettleTicketStatusEnum.SETTLED;
    }

    showBrowseButton(): boolean{
        return this.businessData.status === BylSettleTicketStatusEnum.CHECKED
            || this.businessData.status === BylSettleTicketStatusEnum.CHECKED_DELETED
            || this.businessData.status === BylSettleTicketStatusEnum.SUBMITED_DELETED
            || this.businessData.status === BylSettleTicketStatusEnum.SETTLED
            || this.businessData.status === BylSettleTicketStatusEnum.SETTLEED_DELETED;
    }

    getModifyDateTimeChange(value: number){
        console.log("in SettleTicket Crud getModifyDateTimeChange, value ", value);
        this.businessData.modifyAction.modifyDateTime = value;
        this.defaultBusinessData.modifyAction.modifyDateTime = value;
        this.reset();
    };

    error(value: any) {
        console.log('error', value);
    }

    detailWorkloadTabClick(){

    }

    detailBorrowMoneyTabClick(){

    }

}

