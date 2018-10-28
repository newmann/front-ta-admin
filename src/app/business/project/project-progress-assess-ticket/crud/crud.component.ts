import {Component, Input} from '@angular/core';
import {BylBorrowMoneyTicket} from '../../../../service/project/model/borrow-money-ticket.model';
import {FormBuilder} from '@angular/forms';
import {NzMessageService, UploadChangeParam, UploadFile} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';
import {ReuseTabService} from '@delon/abc';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylBorrowMoneyTicketService} from '../../../../service/project/service/borrow-money-ticket.service';
import {BylCrudComponentBasePro} from "../../../common/crud-component-base-pro";
import {BylEmbeddableProject} from "../../../../service/model/embeddable-project.model";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";
import {BylEntityReference} from "../../../../service/model/entity-reference.model";
import {BylBorrowMoneyQualificationPool} from "../../../../service/project/model/borrow-money-qualification-pool.model";
import {Observable, of} from "rxjs";
import {SFSchema, SFSchemaEnumType} from "@delon/form";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylBorrowMoneyTicketStatusEnum} from "../../../../service/project/model/borrow-money-ticket-status.enum";
import {BylEmbeddableBorrowAction} from "../../../../service/project/model/embeddable-borrow-action.model";
import {BylCrudComponentTicket} from "../../../common/crud-component-ticket";
import {BylProjectProgressAssessTicket} from "../../../../service/project/model/project-progress-assess-ticket.model";
import {BylProjectProgressAssessTicketService} from "../../../../service/project/service/project-progress-assess-ticket.service";


@Component({
    selector: 'byl-project-progress-assess-ticket-crud',
    templateUrl: './crud.component.html',
})
export class BylProjectProgressAssessTicketCrudComponent
    extends BylCrudComponentTicket<null, BylProjectProgressAssessTicket> {

    // @Input()
    // set setSourceId(value: string) {
    //     this.sourceId = value;
    // }

    newBusinessData(): BylProjectProgressAssessTicket {
        return new BylProjectProgressAssessTicket();
    }

    private _newSchema: SFSchema;
    private _modifySchema: SFSchema;
    private _browseSchema: SFSchema;

    // projectList: BylEmbeddableProject[];
    // borrowerList: BylBorrowMoneyQualificationPool[];

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

                "amount": {
                    "type": "number",
                    minimum: 0,
                    maximum: 100000000,
                    "title": '预计已完成金额（元）',
                    ui: {
                        precision: 2
                    },
                },

                "attachFileWidget": {
                    "type": "string",
                    "title": '预算明细文件',
                    ui: {
                        widget: 'bylFileUpload',
                        action: 'api/file-server/upload-file',
                        multiple: 'false',
                        resReName: 'data',
                        asyncData: () =>{
                            let item: SFSchemaEnumType;
                            if(this.businessData.attachFileUrl){
                                item = {
                                    uid: -1,
                                    name: this.businessData.attachFileName,
                                    url: this.businessData.attachFileUrl,
                                    response: {
                                        originalFileName: this.businessData.attachFileName,
                                        targetFileName: this.businessData.attachFileUrl
                                    }
                                };
                                return of([item]);
                            } else{
                                return of(null);
                            }

                        },
                        remove:(file: UploadFile) => {

                            return true;
                        },
                        change: (args: UploadChangeParam) =>{

                        },
                        type: 'select'

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
            "required": ["projectWidget" ,"operationPeriod","amount"]

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
                    type: "string",
                    title: '所属项目',
                    ui: {
                        widget: 'text'
                    }
                },

                "operationPeriodDisplay": {
                    type: "string",
                    title: '业务期间',
                    ui: {
                        widget: 'text'
                    }
                },
                "amount": {
                    "type": "string",
                    "title": '预计已完成金额（元）',
                    ui: {
                        widget: 'text'
                    }

                },

                "attachFileName": {
                    "type": "string",
                    "title": '预算明细文件',
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
            "required": ["projectWidget" ,"operationPeriodDispaly","amount"]

        };



    }

    constructor(public msgService: NzMessageService,
                public projectProgressAssessTicketService: BylProjectProgressAssessTicketService,
                // public projectService: BylProjectService,
                // public borrowMoneyQualificationPoolService: BylBorrowMoneyQualificationPoolService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                // public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService,
                public router: Router) {
        // super(msgService, configService, /*modalService, modalSubject, */activatedRoute, reuseTabService, fb);
        super(msgService, configService, /*modalService, modalSubject, */activatedRoute, reuseTabService, router);

        this.businessService = projectProgressAssessTicketService;
        this.listFormUrl = "/project/project-progress-assess-type/list";
        this.crudEntityName = "项目进度预估";
    }


    // resetButtonClick($event: MouseEvent) {
    //     $event.preventDefault();
    //     this.reset();
    // }

    // searchManager($event: MouseEvent) {
    //     $event.preventDefault();
    //     console.log('search manager');
    // }

    getFormData() {
        super.getFormData();

        if(this.businessData.attachFileWidget){
            console.log(this.businessData.attachFileWidget);
            this.businessData.attachFileName = this.businessData.attachFileWidget.originalFileName;
            this.businessData.attachFileUrl = this.businessData.attachFileWidget.targetFileName;
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
    setFormData(data: BylProjectProgressAssessTicket){
        super.setFormData(data);
        // if (this.businessData.attachFileUrl){
        //     this.businessData.attachFileWidget = [{
        //         uid:-1,
        //         name: this.businessData.attachFileName,
        //         url: "api/file-server/serve-file/"+ this.businessData.attachFileUrl
        //     }];
        //
        //     this.defaultBusinessData.attachFileWidget = [{
        //         uid:-1,
        //         name: this.businessData.attachFileName,
        //         url: "api/file-server/serve-file/"+ this.businessData.attachFileUrl
        //     }];
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


    error(value: any) {
        console.log('error', value);
    }

}
