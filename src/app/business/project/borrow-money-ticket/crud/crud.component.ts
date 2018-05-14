import {Component, Input, OnInit} from '@angular/core';
import {BylCrudComponentBase} from '../../../common/crud-component-base';
import {BylBorrowMoneyTicket} from '../../../../service/project/model/borrow-money-ticket.model';
import {FormBuilder, Validators} from '@angular/forms';
import {NzMessageService, NzModalService, NzModalRef} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';
import {ReuseTabService} from '@delon/abc';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylBorrowMoneyTicketService} from '../../../../service/project/service/borrow-money-ticket.service';
import {BylSimpleEntityLoggerService} from "../../../../service/simple-entity-logger/service/simple-entity-logger.service";


@Component({
    selector: 'byl-borrow-money-ticket-crud',
    templateUrl: './crud.component.html',
})
export class BylBorrowMoneyTicketListCrudComponent extends BylCrudComponentBase<BylBorrowMoneyTicket> {
    public borrowTypeOptions = [
        {caption: '1', value: '个体'},
        {caption: '2', value: '组织'}
    ];

    @Input()
    set setSourceId(value: string) {
        this.sourceId = value;
    }

    newBusinessData(): BylBorrowMoneyTicket {
        return new BylBorrowMoneyTicket();
    }

    defineForm(): void {
        // 绑定验证模式
        this.form = this.fb.group({
            billNo: [null, Validators.compose([Validators.required])],
            borrowType: [null, Validators.compose([Validators.required])],

            borrowId: [null],
            borrowCode: [null, Validators.compose([Validators.required])],
            borrowName: [null],

            projectId: [null],
            projectCode: [null, Validators.compose([Validators.required])],
            projectName: [null],

            reason: [null, Validators.compose([Validators.required])],
            amount: [null, Validators.compose([Validators.required])],
            borowDate: [null, Validators.compose([Validators.required])],

            remarks: [null]
        });


    }

    constructor(public msgService: NzMessageService,
                public borrowMoneyTicketService: BylBorrowMoneyTicketService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                // public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService,
                public fb: FormBuilder) {
        super(msgService, configService, /*modalService, modalSubject, */activatedRoute, reuseTabService, fb);


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
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }

        Object.assign(this.businessData, this.form.value);

        // console.table(this.form.value);
        // this.businessData.code = this.code.value;
        // this.businessData.name = this.name.value;
        // this.businessData.managerId = this.managerId.value;
        // this.businessData.managerCode = this.managerCode.value;
        // this.businessData.managerName = this.managerName.value;
        //
        // this.businessData.address.countryId = this.addressTreevalue[0].value;
        // this.businessData.address.countryCode = this.addressTreevalue[0].value;
        // this.businessData.address.countryName = this.addressTreevalue[0].caption;
        //
        // this.businessData.address.provinceId = this.addressTreevalue[1].value;
        // this.businessData.address.provinceCode = this.addressTreevalue[1].value;
        // this.businessData.address.provinceName = this.addressTreevalue[1].caption;
        //
        // this.businessData.address.cityId = this.addressTreevalue[2].value;
        // this.businessData.address.cityCode = this.addressTreevalue[2].value;
        // this.businessData.address.cityName = this.addressTreevalue[2].caption;
        //
        // this.businessData.address.detailAddress = this.detailAddress.value;
        //
        // if (this.zipCode.value) this.businessData.address.zipCode = this.zipCode.value;
        //
        // if (this.planBeginDate.value) {
        //     this.businessData.planBeginDate = moment(this.planBeginDate.value).valueOf();
        // }
        // if (this.planEndDate.value) {
        //     this.businessData.planEndDate = moment(this.planEndDate.value).valueOf();
        // }
        //
        //
        // if (this.remarks.value) {
        //     this.businessData.remarks = this.remarks.value.toString();
        // }
        // console.table(this.businessData);

    }

    /**
     * 重置界面内容
     */
    reset() {
        // let country = {value: this.businessData.address.countryCode, caption: this.businessData.address.countryName};
        // this.addressTreevalue[0] = country;
        //
        // let province = {value: this.businessData.address.provinceCode, caption: this.businessData.address.provinceName};
        // this.addressTreevalue[1] = province;
        //
        // let city = {value: this.businessData.address.cityCode, caption: this.businessData.address.cityName};
        // this.addressTreevalue[2] = city;
        //
        this.form.reset(this.businessData, {onlySelf: true, emitEvent: false});

        super.reset();

        //设置可复用标签的名字：
        if (this.sourceId) {
            //说明是修改
            this.reuseTabService.title = '编辑-' + this.businessData.name;
        }


        // this.form.markAsPristine();
        // // for (const key in this.form.controls) {
        // //     this.form.controls[key].markAsPristine();
        // // }
        // this.logger.log('this.form.dirty' + this.form.dirty);
        // this.logger.log('this.form.invalid' + this.form.invalid);
    }

    //#region get form fields
    get billNo() {
        return this.form.controls.billNo;
    }

    get projectId() {
        return this.form.controls.projectId;
    }

    get projectCode() {
        return this.form.controls.projectCode;
    }

    get projectName() {
        return this.form.controls.projectName;
    }

    get reason() {
        return this.form.controls.reason;
    }

    get amount() {
        return this.form.controls.amount;
    }

    get borrowType() {
        return this.form.controls.borrowType;
    }

    get borrowId() {
        return this.form.controls.borrowId;
    }

    get borrowCode() {
        return this.form.controls.borrowCode;
    }

    get borrowName() {
        return this.form.controls.borrowName;
    }

    get borrowDate() {
        return this.form.controls.borrowDate;
    }

    get remarks() {
        return this.form.controls.remarks;
    }

    //#endregion
}
