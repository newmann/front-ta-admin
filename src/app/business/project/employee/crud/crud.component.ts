import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';

import {ReuseTabService} from '@delon/abc';
import {NzMessageService} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';
import {BylConfigService} from '../../../../service/constant/config.service';
import {SFSchema} from "@delon/form";
import {map} from "rxjs/operators";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {BylEmployee} from "../../../../service/project/model/employee.model";
import {BylEmployeeService} from "../../../../service/project/service/employee.service";
import * as moment from 'moment';
import {BylCrudComponentMasterData} from "../../../common/crud-component-master-data";
import {deepCopy, simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylMasterDataStatusEnum} from "../../../../service/model/master-data-status.enum";
import {Observable} from "rxjs";
import {BylEmployeeStatusEnum} from "../../../../service/project/model/employee-status.enum";
import {BylPersonRelation} from "../../../../service/person/model/person-relation.model";
import {BYL_SHOW_MODE_BROWSE, BYL_SHOW_MODE_UPDATE} from "../../../../service/constant/general.constant";
import {BylEmbeddablePerson} from "../../../../service/person/model/embeddable-person.model";
import {BylBorrowMoneyQualificationPool} from "../../../../service/project/model/borrow-money-qualification-pool.model";
import {BylEntityReference} from "../../../../service/model/entity-reference.model";
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";
import {BylBorrowMoneyTicket} from "../../../../service/project/model/borrow-money-ticket.model";
import {BylStringUtils} from "../../../../service/utils/string.utils";


@Component({
    selector: 'byl-employee-crud',
    templateUrl: './crud.component.html',
})
export class BylEmployeeCrudComponent extends BylCrudComponentMasterData<BylEmployee> implements OnInit{
    // processType: string;
    leaveLoading: boolean =false;

    private _newSchema: SFSchema;
    private _modifySchema: SFSchema;
    private _browseSchema: SFSchema;

    // get personRelation():BylPersonRelation{
    //     // this.getFormData();
    //     if(this.businessData){
    //         let value = new BylPersonRelation();
    //         value.masterId = this.businessData.id;
    //         simpleDeepCopy(value.person,this.businessData.person);
    //
    //         return value;
    //     }
    // }
    //
    // get showMode(): string{
    //     if (this.showBrowseButton()) {
    //         return BYL_SHOW_MODE_BROWSE ;
    //     }  else {
    //         return BYL_SHOW_MODE_UPDATE;
    //     }
    //
    // }

    newBusinessData(): BylEmployee {
        return new BylEmployee();
    }

    @Input()
    set setSourceId(value: string) {
        this.sourceId = value;
    }

    defineForm(): void {
        this._newSchema = {
            properties: {
                "code": {
                    "type": 'string',
                    "title": '代码',
                    "ui": {
                        "validator": (value: string) => {
                            if (BylStringUtils.isEmpty(value)) {
                                console.log('check code:', value);
                                return [];
                            }

                            return this.employeeService.checkCodeAvailable({data: value,id: this.sourceId}).pipe(
                                map((res) => {
                                    if (res.code === BylResultBody.RESULT_CODE_SUCCESS) {
                                        if (res.data) {
                                            return [];
                                        } else {
                                            return ([{keyword: 'required', message: '工种代码'+ value + '已存在'}]);
                                        }

                                    } else {
                                        return ([{keyword: 'required', message: res.msg}]);
                                    }
                                  }
                                ));
                        }
                    }
                },
                "name": {
                    "type": 'string',
                    "title": '姓名'
                },
                "personWidget": {
                    "type": 'string',
                    "title": '绑定的个体',
                    ui: {
                        widget: 'bylPersonSelect',
                        placeholder: '请输入个体代码或名称，系统自动查找',
                        allowClear: 'true',
                        serverSearch: 'true',
                        showSearch: 'true'
                    }
                },
                "enterDateDF": {
                    "type": 'string',
                    "title": '入职日期',
                    'format': 'date',
                    ui: {
                        widget: 'date',
                        placeholder: '请选择入职日期日期'
                    }
                },
                "leaveDateDF": {
                    "type": 'string',
                    "title": '离职日期',
                    'format': 'date',
                    ui: {
                        widget: 'date',
                        placeholder: '请选择离职日期日期'
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
            "required": ["code", "name"]
        };
        this._browseSchema = {
            properties: {
                "code": {
                    "type": 'string',
                    "title": '代码',
                    "ui": {
                        widget: 'text'
                    }
                },
                "name": {
                    "type": 'string',
                    "title": '姓名',
                    "ui": {
                        widget: 'text'
                    }
                },
                "personDisplay": {
                    "type": "string",
                    "title": '绑定的个体',
                    "ui": {
                        widget: 'text'
                    }
                },
                "enterDateDisplay": {
                    "type": 'string',
                    "title": '入职日期',
                    'format': 'date',
                    "ui": {
                        widget: 'text'
                    }
                },
                "leaveDateDisplay": {
                    "type": 'string',
                    "title": '离职日期',
                    'format': 'date',
                    "ui": {
                        widget: 'text'
                    }

                },

                "remarks": {
                    "type": 'string',
                    "title": '备注',
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
            "required": ["code", "name"]
        };
        // BylCheckTypeEnumManager.getArray().forEach((item) =>{
        //     let option = {label: item.caption, value: item.value};
        //     this.newSchema.properties['checkType'].enum.push(option);
        // });

        // this.newSchema.properties['checkType'].default = BylCheckTypeEnum.DAY;

    }
    /**
     * 设置窗口定义的缺省值
     */
    setSchemaDefaultValue(){
        if (this.processType === 'new') {
            this.curSchema = simpleDeepCopy({},this._newSchema);

        }else{
            //修改状态，需要根据单据的状态进一步判断
            switch (this.businessData.status){
                case BylMasterDataStatusEnum.UNSUBMITED:
                case BylMasterDataStatusEnum.SUBMITED:
                    this.curSchema = simpleDeepCopy({},this._newSchema);
                    break;
                default:
                    this.curSchema = simpleDeepCopy({},this._browseSchema);

            }
        }
        // super.setSchemaDefaultValue();
        // this.newSchema.properties.gender.enum.push(...BylGenderEnumManager.getSFSelectDataArray());
    };

    // defaultFormData: BylEmployee = new BylEmployee();

    // this.formUiSchema: SFUISchema = {};

    constructor(public msgService: NzMessageService,
                public employeeService: BylEmployeeService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                // public modalSubject: NzModalRef,
                public cd: ChangeDetectorRef,
                public activatedRoute: ActivatedRoute,
                public router:Router,
                public reuseTabService: ReuseTabService) {
        super(msgService, configService, /*modalService, modalSubject, */activatedRoute, reuseTabService, router);
        //
        this.businessService = employeeService;
        this.listFormUrl = "/project/employee/list";
        this.crudEntityName = "员工";

    }

    ngOnInit(){
        super.ngOnInit();
        this.cd.detectChanges();
    }

    getFormData() {
        // for (const i in this.form.controls) {
        //     this.form.controls[i].markAsDirty();
        // }
        super.getFormData();

        if (this.businessData.enterDateDF) {
             this.businessData.enterDate = moment(this.businessData.enterDateDF).valueOf();
        }
        if (this.businessData.leaveDateDF) {
            this.businessData.leaveDate = moment(this.businessData.leaveDateDF).valueOf();

        }
        if (this.businessData.personWidget){
            let p = new BylEmbeddablePerson();
            p.personId = this.businessData.personWidget.id;
            p.personIDCard = this.businessData.personWidget.code;
            p.personName = this.businessData.personWidget.name;
            this.businessData.person = p;
        }
        // Object.assign(this.businessData, this.sfForm.value);
        console.log("in EmployeeCrud getFormData:" , this.businessData);

    }
    /**
     *  在调出一张历史单据进行修改的时候调用，
     *  可能需要一些个性化的处理
     */
    setFormData(data: BylEmployee){
        super.setFormData(data);


        if (this.businessData.person) {
            if ( this.businessData.person.personId){
                let m = new BylEntityReference(this.businessData.person.personId,
                    this.businessData.person.personIDCard,
                    this.businessData.person.personName);

                this.businessData.personWidget = m;
                this.defaultBusinessData.personWidget = m;

            }

        }

        if (this.businessData.enterDate) {
            this.businessData.enterDateDF = BylDatetimeUtils.convertMillsToDateTime(this.businessData.enterDate);
        }

        if (this.businessData.leaveDate) {
            this.businessData.leaveDateDF = BylDatetimeUtils.convertMillsToDateTime(this.businessData.leaveDate);
        }

    }
    //
    /**
     * 重置界面内容
     */
    reset() {

        super.reset();
        //设置可复用标签的名字：
        if (this.sourceId) {
            //说明是修改
            this.reuseTabService.title = '编辑-' + this.crudEntityName + "[" +this.businessData.code +"]";
        }

    }


    error(value: any) {
        console.log('error', value);
    }

    setLoadingFalse(){
        this.leaveLoading =false;
        super.setLoadingFalse();

    }
    /**
     * 员工离职
     */
    leaveEntity() {
        this.leaveLoading = true;
        this.errMsg = '';

        let saveResult$: Observable<BylResultBody<BylEmployee>>;

        console.log('in EmployeeCRUD ', this.businessData);

        saveResult$ = this.employeeService.leave(this.businessData);

        this.followProcess(saveResult$);
    }

    showLeaveButton(): boolean{
        return this.businessData.status === BylEmployeeStatusEnum.LEAVE;
    }

    showBrowseButton(): boolean{
        return this.businessData.status === BylEmployeeStatusEnum.CONFIRMED
            || this.businessData.status === BylEmployeeStatusEnum.LOCKED
            || this.businessData.status === BylEmployeeStatusEnum.SUBMITED_DELETED
            || this.businessData.status === BylEmployeeStatusEnum.LEAVE;

    }

    addPerson(){
        this.router.navigateByUrl("/person/person/crud/new");
    }
}

