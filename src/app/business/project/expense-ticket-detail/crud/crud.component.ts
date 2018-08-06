import {Component, Input, OnInit} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {BylCrudComponentBase} from '../../../common/crud-component-base';
import {BylPersonAddress} from '../../../../service/person/model/person-address.model';
import {BylConfigService} from '../../../../service/constant/config.service';
import {NzMessageService, NzModalService, NzModalRef, UploadFile} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ReuseTabService} from '@delon/abc';
import {BylResultBody} from "../../../../service/model/result-body.model";
import {BylUploadFileNameMapModel} from "../../../../service/model/upload-file-name-map.model";
import * as moment from 'moment';
import {BylSimpleEntityLoggerService} from "../../../../service/simple-entity-logger/service/simple-entity-logger.service";
import {BylExpenseDetail} from "../../../../service/project/model/expense-detail.model";
import {BylExpenseDetailService} from "../../../../service/project/service/expense-detail.service";
import {BylCrudComponentBasePro} from "../../../common/crud-component-base-pro";
import {SFSchema} from "@delon/form";
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";
import {BylEmbeddableProject} from "../../../../service/model/embeddable-project.model";
import {BylEmbeddableExpenseType} from "../../../../service/project/model/embeddable-expense-type.model";
import {BylBorrowMoneyTicket} from "../../../../service/project/model/borrow-money-ticket.model";
import {BylEntityReference} from "../../../../service/model/entity-reference.model";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylBorrowMoneyTicketStatusEnum} from "../../../../service/project/model/borrow-money-ticket-status.enum";
import {BylTicketDetailCrudComponentBasePro} from "../../../common/item-crud-component-base";

@Component({
  selector: 'byl-expense-ticket-detail-crud',
  templateUrl: './crud.component.html'
})
export class BylExpenseTicketDetailCrudComponent extends BylTicketDetailCrudComponentBasePro<BylExpenseDetail> {
    private _newSchema: SFSchema;
    private _modifySchema: SFSchema;
    private _browseSchema: SFSchema;

    // @Input() sourceId: string;
    //
    // @Input() masterId: string;

    newBusinessData(): BylExpenseDetail {
        return new BylExpenseDetail();
    }

    constructor(public msgService: NzMessageService,
                public expenseDetailService: BylExpenseDetailService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService
                ) {
        super(msgService, configService, /*modalService, */modalSubject, activatedRoute, reuseTabService);

        this.businessService = expenseDetailService;

    }
    defineForm(): void {
        this._newSchema = {
            properties: {

                "expenseTypeWidget": {
                    type: "string",
                    title: '费用类型',
                    ui: {
                        widget: 'bylExpenseTypeSelect',
                        placeholder: '请输入费用类型的代码或名称，系统自动查找',
                        allowClear: 'true',
                        serverSearch: 'true',
                        showSearch: 'true',
                    }
                },
                "amount": {
                    "type": "number",
                    minimum: 0,
                    maximum: 100000000,
                    "title": '金额（元）',
                    ui: {
                        precision: 2
                    },
                },
                "remarks": {
                    "type": 'string',
                    "title": '备注'
                },

            },
            "required": ["expenseTypeWidget" , "amount"]

        };

    }

    /**
     * 设置窗口定义的缺省值
     * 在reset内部首先调用
     *
     */
    setSchemaDefaultValue(){
        console.log("in setSchemaDefaultValue ");
        this.curSchema = simpleDeepCopy({},this._newSchema);

    };
    //
    // /**
    //  * 重置界面内容
    //  */
    // reset() {
    //     super.reset();
    //
    //     //设置可复用标签的名字：
    //     if (this.sourceId) {
    //         //说明是修改
    //         this.reuseTabService.title = '编辑-' + this.businessData.billNo;
    //     }
    //
    // }


    getFormData() {
        super.getFormData();
        if (this.businessData.expenseTypeWidget) {
            let p = new BylEmbeddableExpenseType();
            p.expenseTypeId = this.businessData.expenseTypeWidget.id;
            p.expenseTypeCode = this.businessData.expenseTypeWidget.code;
            p.expenseTypeName = this.businessData.expenseTypeWidget.name;

            this.businessData.expenseType = p ;
        }
    }
    /**
     *  在调出一张历史单据进行修改的时候调用，
     *  可能需要一些个性化的处理
     */
    setFormData(data: BylExpenseDetail) {
        super.setFormData(data);
        if (this.businessData.expenseType) {
            if ( this.businessData.expenseType.expenseTypeId){
                let m = new BylEntityReference(this.businessData.expenseType.expenseTypeId,
                    this.businessData.expenseType.expenseTypeCode,
                    this.businessData.expenseType.expenseTypeName);

                this.businessData.expenseTypeWidget = m;
                this.defaultBusinessData.expenseTypeWidget = m;

            }

        }

    }
}
