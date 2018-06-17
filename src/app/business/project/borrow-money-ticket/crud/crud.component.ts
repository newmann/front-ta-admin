import {Component, Input} from '@angular/core';
import {BylBorrowMoneyTicket} from '../../../../service/project/model/borrow-money-ticket.model';
import {FormBuilder} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';
import {ReuseTabService} from '@delon/abc';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylBorrowMoneyTicketService} from '../../../../service/project/service/borrow-money-ticket.service';
import {BylCrudComponentBasePro} from "../../../common/crud-component-base-pro";
import {BylEmbeddableProject} from "../../../../service/model/embeddable-project.model";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";
import {BylEntityReference} from "../../../../service/model/entity-reference.model";
import {BylBorrowMoneyQualificationPool} from "../../../../service/project/model/borrow-money-qualification-pool.model";
import {Observable} from "rxjs";
import {SFSchema} from "@delon/form";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylBorrowMoneyTicketStatusEnum} from "../../../../service/project/model/borrow-money-ticket-status.enum";
import {BylEmbeddableBorrowAction} from "../../../../service/project/model/embeddable-borrow-action.model";


@Component({
    selector: 'byl-borrow-money-ticket-crud',
    templateUrl: './crud.component.html',
})
export class BylBorrowMoneyTicketCrudComponent extends BylCrudComponentBasePro<BylBorrowMoneyTicket> {

    @Input()
    set setSourceId(value: string) {
        this.sourceId = value;
    }

    newBusinessData(): BylBorrowMoneyTicket {
        return new BylBorrowMoneyTicket();
    }

    private _newSchema: SFSchema;
    private _modifySchema: SFSchema;
    private _browseSchema: SFSchema;

    projectList: BylEmbeddableProject[];
    borrowerList: BylBorrowMoneyQualificationPool[];

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
                "borrowerWidget": {
                    "type": "string",
                    "title": '借款人',
                    "ui": {
                        widget: 'bylBorrowMoneyQualificationPoolSelect',
                        placeholder: '请输入借款人代码或名称，系统自动查找',
                        allowClear: 'true',
                        serverSearch: 'true',
                        showSearch: 'true',

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

                "reason": {
                    "type": "string",
                    "title": '借款原因'
                },
                "amount": {
                    "type": "string",
                    "title": '借款金额'
                },
                "borrowDateTimeWidget": {
                    "type": "string",
                    "title": '借款日期',
                    format: 'date',
                    ui: {
                        format: BylDatetimeUtils.formatDateString,
                        placeholder: '请借款日期'
                    }

                },

                "remarks": {
                    "type": 'string',
                    "title": '备注'
                },
                "statusDisplay": {
                    "type": 'number',
                    "title": '状态',
                    "ui": {
                        widget: 'text'
                    }
                },

            },
            "required": ["borrowerWidget","projectWidget" ,"reason","borrowDateTimeWidget","amount"]

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
                "borrowerDisplay": {
                    "type": "string",
                    "title": '借款人',
                    "ui": {
                        widget: 'text'
                    }
                },
                "projectDisplay": {
                    type: "string",
                    title: '所属项目',
                    ui: {
                        widget: 'text'
                    }
                },

                "reason": {
                    "type": "string",
                    "title": '借款原因',
                    ui: {
                        widget: 'text'
                    }

                },
                "amount": {
                    "type": "string",
                    "title": '借款金额',
                    ui: {
                        widget: 'text'
                    }

                },
                "borrowDateTimeDisplay": {
                    "type": "string",
                    "title": '借款日期',
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
                "statusDisplay": {
                    "type": 'number',
                    "title": '状态',
                    "ui": {
                        widget: 'text'
                    }
                },

            },
            "required": ["borrowerWidget","projectWidget" ,"reason","borrowDateTimeWidget","amount"]

        };



    }

    constructor(public msgService: NzMessageService,
                public borrowMoneyTicketService: BylBorrowMoneyTicketService,
                // public projectService: BylProjectService,
                // public borrowMoneyQualificationPoolService: BylBorrowMoneyQualificationPoolService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                // public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService,
                public fb: FormBuilder) {
        // super(msgService, configService, /*modalService, modalSubject, */activatedRoute, reuseTabService, fb);
        super(msgService, configService, /*modalService, modalSubject, */activatedRoute, reuseTabService);

        this.businessService = borrowMoneyTicketService;

    }

    // ngOnInit() {
    //     super.ngOnInit();
    // }

    resetButtonClick($event: MouseEvent) {
        $event.preventDefault();
        this.reset();
    }

    searchManager($event: MouseEvent) {
        $event.preventDefault();
        console.log('search manager');
    }

    getFormData() {
        super.getFormData();

        if (this.businessData.borrowerWidget) {
            let ba = new BylEmbeddableBorrowAction();
            ba.borrowType = this.businessData.borrowerWidget.type;
            ba.borrowId = this.businessData.borrowerWidget.poolId;
            ba.borrowCode = this.businessData.borrowerWidget.poolCode;
            ba.borrowName = this.businessData.borrowerWidget.poolName;

            this.businessData.borrowAction = ba;

        }

        if (this.businessData.borrowDateTimeWidget) {
            this.businessData.borrowAction.borrowDateTime =
                BylDatetimeUtils.convertDateTimeToMills(this.businessData.borrowDateTimeWidget);
        }

        if (this.businessData.projectWidget) {
            let p = new BylEmbeddableProject();
            p.projectId = this.businessData.projectWidget.id;
            p.projectCode = this.businessData.projectWidget.code;
            p.projectName = this.businessData.projectWidget.name;

            this.businessData.project = p ;
        }

    }
    /**
     *  在调出一张历史单据进行修改的时候调用，
     *  可能需要一些个性化的处理
     */
    setFormData(data: BylBorrowMoneyTicket){
        super.setFormData(data);
        // this.projectList = [];
        if (this.businessData.borrowAction) {
            if ( this.businessData.borrowAction.borrowId){
                let b = new BylBorrowMoneyQualificationPool();
                b.type = this.businessData.borrowAction.borrowType;
                b.poolId = this.businessData.borrowAction.borrowId;
                b.poolCode = this.businessData.borrowAction.borrowCode;
                b.poolName = this.businessData.borrowAction.borrowName;

                this.businessData.borrowerWidget = b;
                this.defaultBusinessData.borrowerWidget = b;

            }

            if (this.businessData.borrowAction.borrowDateTime) {
                this.businessData.borrowDateTimeWidget = BylDatetimeUtils.convertMillsToDateTime(this.businessData.borrowAction.borrowDateTime);
                this.defaultBusinessData.borrowDateTimeWidget = BylDatetimeUtils.convertMillsToDateTime(this.businessData.borrowAction.borrowDateTime);
            }

        }

        if (this.businessData.project) {
            if ( this.businessData.project.projectId){
                let m = new BylEntityReference(this.businessData.project.projectId,
                    this.businessData.project.projectCode,
                    this.businessData.project.projectName);

                this.businessData.projectWidget = m;
                this.defaultBusinessData.projectWidget = m;

            }

        }


    }

    // compareFn = (o1: any, o2: any) => o1 && o2 ? o1.projectId === o2.projectId : o1 === o2;
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
                case BylBorrowMoneyTicketStatusEnum.UNSUBMITED:
                    this.curSchema = simpleDeepCopy({},this._modifySchema);
                    console.log(this.curSchema);
                    break;

                case  BylBorrowMoneyTicketStatusEnum.SUBMITED:
                    this.curSchema = simpleDeepCopy({},this._modifySchema);
                    console.log(this.curSchema);
                    break;

                default:
                    this.curSchema = simpleDeepCopy({},this._browseSchema);

            }
        }

    };

    /**
     * 重置界面内容
     */
    reset() {
        super.reset();

        //设置可复用标签的名字：
        if (this.sourceId) {
            //说明是修改
            this.reuseTabService.title = '编辑-' + this.businessData.billNo;
        }

    }

    /**
     * 提交单据
     */
    submitEntity() {
        this.loading = true;
        this.errMsg = '';

        let saveResult$: Observable<BylResultBody<BylBorrowMoneyTicket>>;

        console.log('in ProjectCRUD ', this.businessData);

        saveResult$ = this.borrowMoneyTicketService.submit(this.businessData);

        this.followProcess(saveResult$);
    }


    /**
     * 作废
     * @param {BylBorrowMoneyTicket} entity
     */
    cancelEntity(entity: BylBorrowMoneyTicket) {
        this.loading = true;
        this.errMsg = '';

        let saveResult$: Observable<BylResultBody<BylBorrowMoneyTicket>>;

        console.log('in CrudBasePro submitform', this.businessData);

        saveResult$ = this.borrowMoneyTicketService.cancel(this.businessData);

        this.followProcess(saveResult$);

    }

    /**
     * 审核借款单
     * @param {BylBorrowMoneyTicket} entity
     */
    checkEntity(entity: BylBorrowMoneyTicket) {
        this.loading = true;
        this.errMsg = '';

        let saveResult$: Observable<BylResultBody<BylBorrowMoneyTicket>>;

        console.log('in BorrowMoneyTicketCrud ', this.businessData);

        saveResult$ = this.borrowMoneyTicketService.check(this.businessData);

        this.followProcess(saveResult$);

    }

    /**
     * 确认借款单
     * @param {BylBorrowMoneyTicket} entity
     */
    confirmEntity(entity: BylBorrowMoneyTicket) {
        this.loading = true;
        this.errMsg = '';

        let saveResult$: Observable<BylResultBody<BylBorrowMoneyTicket>>;

        console.log('in BorrowMoneyTicketCrud ', this.businessData);

        saveResult$ = this.borrowMoneyTicketService.confirm(this.businessData);

        this.followProcess(saveResult$);

    }

    private followProcess(call$: Observable<BylResultBody<BylBorrowMoneyTicket>> ){
        call$.subscribe(
            data => {
                // this._loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                    this.setFormData(data.data);
                    this.reset(); //重置界面

                } else {

                    this.errMsg = data.msg;
                }
                this.loading = false;
            },
            err => {
                this.errMsg = err.toString();
                this.loading = false;
            }
        );
    }

    showSaveButton(): boolean{
        return this.businessData.status === BylBorrowMoneyTicketStatusEnum.UNSUBMITED
            || this.businessData.status == BylBorrowMoneyTicketStatusEnum.SUBMITED;
    }

    showSubmitButton():boolean{
        return this.businessData.status === BylBorrowMoneyTicketStatusEnum.UNSUBMITED;
    }

    showCheckButton(): boolean{
        return this.businessData.status === BylBorrowMoneyTicketStatusEnum.SUBMITED;
    }

    showConfirmButton(): boolean{
        return this.businessData.status === BylBorrowMoneyTicketStatusEnum.CHECKED;
    }

    showCancelButton(): boolean{
        return this.businessData.status === BylBorrowMoneyTicketStatusEnum.SUBMITED
            || this.businessData.status === BylBorrowMoneyTicketStatusEnum.CHECKED
            || this.businessData.status === BylBorrowMoneyTicketStatusEnum.CONFIRMED;
    }



    error(value: any) {
        console.log('error', value);
    }

}
