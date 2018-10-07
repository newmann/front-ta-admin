import {Component, Input} from '@angular/core';

import {ReuseTabService} from '@delon/abc';
import {NzMessageService} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';

import {BylConfigService} from '../../../../service/constant/config.service';
import {SFSchema} from "@delon/form";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylTicketCrudComponentBasePro} from "../../../common/ticket-crud-component-base-pro";
import {BylWorkTypeConfigTicket} from "../../../../service/project/model/work-type-config-ticket.model";
import {BylWorkTypeConfigTicketService} from "../../../../service/project/service/work-type-config-ticket.service";
import {BylWorkTypeConfigTicketStatusEnum} from "../../../../service/project/model/work-type-config-ticket-status.enum";
import {BylEmbeddableOutsourcer} from "../../../../service/project/model/embeddable-outsourcer.model";
import {BylEntityReference} from "../../../../service/model/entity-reference.model";
import {BylEmbeddableWorkType} from "../../../../service/project/model/embeddable-work-type.model";


@Component({
    selector: 'byl-work-type-config-ticket-crud',
    templateUrl: './crud.component.html',
})
export class BylWorkTypeConfigTicketCrudComponent extends BylTicketCrudComponentBasePro<BylWorkTypeConfigTicket> {
    processType: string;

    // @ViewChild('sf') sf: SFComponent;

    newBusinessData(): BylWorkTypeConfigTicket {
        return new BylWorkTypeConfigTicket();
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
                "insider": {
                    "type": 'string',
                    "title": '是否内部员工',
                    'enum':[{value:true,label:"是"},{value: false, label: "否"}],
                    'ui': {
                        'widget': 'radio',
                        'styleType': 'button'
                    },
                    'default': 'false'
                },
                "outsourcerWidget": {
                    type: "string",
                    title: '外包团队',
                    ui: {
                        widget: 'bylOutsourcerSelect',
                        placeholder: '请输入外包团队的代码或名称，系统自动查找',
                        allowClear: 'true',
                        serverSearch: 'true',
                        showSearch: 'true',
                    }
                },
                "workTypeWidget": {
                    type: "string",
                    title: '目标工种',
                    ui: {
                        widget: 'bylWorkTypeSelect',
                        placeholder: '请输入工种的代码或名称，系统自动查找',
                        allowClear: 'true',
                        serverSearch: 'true',
                        showSearch: 'true',
                    }
                },

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
            required: ["insider","workTypeWidget"],
            if: {
                properties: { insider: { enum: [false] } }
            },
            then: {
                required: [ "outsourcerWidget"]
            },
            else: {
                required: [ ]
            }
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
                "insiderDisplay": {
                    "type": 'string',
                    "title": '是否内部员工',
                    "ui": {
                        widget: 'text'
                    }
                },

                "outsourcerDisplay":{
                    "type": "string",
                    "title": '外包团队',
                    "ui": {
                        widget: 'text'
                    }
                },
                "workTypeDisplay":{
                    "type": "string",
                    "title": '目标工种',
                    "ui": {
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
            "required": ["insiderDisplay", "workTypeDisplay"],
            if: {
                properties: { insider: { enum: [false] } }
            },
            then: {
                required: [ "outsourcerDisplay"]
            },
            else: {
                required: [ ]
            }
        };



    }

    // this.formUiSchema: SFUISchema = {};

    constructor(public msgService: NzMessageService,
                public workTypeConfigTicketService: BylWorkTypeConfigTicketService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                // public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService,
                public router:Router) {
        super(msgService, configService, /*modalService, modalSubject, */activatedRoute, reuseTabService, router);
        //
        this.businessService = workTypeConfigTicketService;
        this.listFormUrl = "/project/work-type-config-ticket/list";
        this.crudEntityName = "工种配置单";

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

    /**
     * 重置界面内容
     */
    reset() {

        console.log('reset form', this.businessData);

        super.reset();
        this.sfForm.validator();

        //设置可复用标签的名字：
        if (this.sourceId) {
            //说明是修改
            this.reuseTabService.title = '编辑-工种配置单[' + this.businessData.billNo +']';
        }

    }
    getFormData() {
        super.getFormData();
        if (this.businessData.outsourcerWidget) {
            let p = new BylEmbeddableOutsourcer();
            p.outsourcerId = this.businessData.outsourcerWidget.id;
            p.outsourcerCode = this.businessData.outsourcerWidget.code;
            p.outsourcerName = this.businessData.outsourcerWidget.name;

            this.businessData.outsourcer = p ;
        }

        if (this.businessData.workTypeWidget) {
            let p = new BylEmbeddableWorkType();
            p.workTypeId = this.businessData.workTypeWidget.id;
            p.workTypeCode = this.businessData.workTypeWidget.code;
            p.workTypeName = this.businessData.workTypeWidget.name;

            this.businessData.workType = p ;
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
    setFormData(data: BylWorkTypeConfigTicket){
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
        if (this.businessData.outsourcer) {
            if ( this.businessData.outsourcer.outsourcerId){
                let m = new BylEntityReference(this.businessData.outsourcer.outsourcerId,
                    this.businessData.outsourcer.outsourcerCode,
                    this.businessData.outsourcer.outsourcerName);

                this.businessData.outsourcerWidget = m;
                this.defaultBusinessData.outsourcerWidget = m;

            }

        }
        if (this.businessData.workType) {
            if ( this.businessData.workType.workTypeId){
                let m = new BylEntityReference(this.businessData.workType.workTypeId,
                    this.businessData.workType.workTypeCode,
                    this.businessData.workType.workTypeName);

                this.businessData.workTypeWidget = m;
                this.defaultBusinessData.workTypeWidget = m;

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
                case BylWorkTypeConfigTicketStatusEnum.UNSUBMITED:
                case  BylWorkTypeConfigTicketStatusEnum.SUBMITED:
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
    //     let saveResult$: Observable<BylResultBody<BylWorkTypeConfigTicket>>;
    //
    //     console.log('in ProjectCRUD ', this.businessData);
    //
    //     saveResult$ = this.expenseTicketService.submit(this.businessData);
    //
    //     this.followProcess(saveResult$);
    // }

    getModifyDateTimeChange(value: number){
        console.log("in ExpenseTicket Crud getModifyDateTimeChange, value ", value);
        this.businessData.modifyAction.modifyDateTime = value;
        this.defaultBusinessData.modifyAction.modifyDateTime = value;
        this.reset();
    };

    error(value: any) {
        console.log('error', value);
    }
}

