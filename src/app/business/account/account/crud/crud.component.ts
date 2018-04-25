import {Component, Input, OnInit} from '@angular/core';

import {ReuseTabService} from "@delon/abc";
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {ActivatedRoute} from "@angular/router";
import * as moment from "moment";
import {BylCrudComponentBase} from "../../../common/crud-component-base";
import {BylConfigService} from "../../../../service/constant/config.service";
import {FormBuilder, Validators} from "@angular/forms";
import {BylAccount} from "../../../../service/account/model/account.model";
import {BylAccountService} from "../../../../service/account/service/account.service";

@Component({
  selector: 'byl-account-crud',
  templateUrl: './crud.component.html',
})
export class BylAccountCrudComponent extends BylCrudComponentBase<BylAccount> {


    @Input()
    set setSourceId(value: string) {
        this.sourceId = value;
    }

    newBusinessData(): BylAccount {
        return new BylAccount();
    }

    defineForm(): void {
        // 绑定验证模式
        this.form = this.fb.group({
            username: [null, Validators.compose([Validators.required])],
            fullName: [null],
            nickname: [null],
            password: [null, Validators.compose([Validators.required])],
            email: [null],
            phone: [null],
            remarks: [null]
        });


    }

    constructor(public msgService: NzMessageService,
                public accountService: BylAccountService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public modalSubject: NzModalSubject,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService,
                public fb: FormBuilder) {
        super(msgService, configService, modalService, modalSubject, activatedRoute, reuseTabService, fb);

        this.businessService = accountService;

    }

    ngOnInit() {
        super.ngOnInit();
    }

    resetButtonClick($event: MouseEvent) {
        $event.preventDefault();
        this.reset();
    }



    getFormData() {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }

        Object.assign(this.businessData,this.form.value);

        console.table(this.businessData);

    }

    /**
     * 重置界面内容
     */
    reset() {


        this.form.reset(this.businessData
        , {onlySelf: true, emitEvent: false});

        super.reset();

        //设置可复用标签的名字：
        if (this.sourceId) {
            //说明是修改
            this.reuseTabService.title = '编辑-' + this.businessData.username;
        }

    }



    //#region get form fields
    get username() {
        return this.form.controls.username;
    }

    get fullName() {
        return this.form.controls.fullName;
    }
    get nickname() {
        return this.form.controls.nickname;
    }
    get password() {
        return this.form.controls.password;
    }
    get email() {
        return this.form.controls.email;
    }

    get phone() {
        return this.form.controls.phone;
    }
    get remarks() {
        return this.form.controls.remarks;
    }

    //#endregion
}

