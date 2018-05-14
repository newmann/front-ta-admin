import {Component, Input, OnInit} from '@angular/core';

import {ReuseTabService} from '@delon/abc';
import {NzMessageService, NzModalService, NzModalRef} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';

import {BylCrudComponentBase} from '../../../common/crud-component-base';
import {BylConfigService} from '../../../../service/constant/config.service';
import {FormBuilder, Validators} from '@angular/forms';


import {BylWorkTypeService} from "../../../../service/project/service/work-type.service";
import {BylWorkType} from "../../../../service/project/model/work-type.model";
import {BylCheckTypeEnumManager} from "../../../../service/project/model/check-type.enum";


@Component({
    selector: 'byl-work-type-crud',
    templateUrl: './crud.component.html',
})
export class BylWorkTypeCrudComponent extends BylCrudComponentBase<BylWorkType> {

    // permissionEntityType: PermissionEntityTypeEnum = PermissionEntityTypeEnum.ACCOUNT;

    @Input()
    set setSourceId(value: string) {
        this.sourceId = value;
    }

    newBusinessData(): BylWorkType {
        return new BylWorkType();
    }

    defineForm(): void {
        // 绑定验证模式
        this.form = this.fb.group({
            code: [null, Validators.compose([Validators.required])],
            name: [null, Validators.compose([Validators.required])],
            checkType: [null,Validators.compose([Validators.required])],
            standardTimeLength: [null, Validators.compose([Validators.required])],
            remarks: [null]
        });
    }

    constructor(public msgService: NzMessageService,
                public workTypeService: BylWorkTypeService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                // public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService,
                public fb: FormBuilder) {
        super(msgService, configService, /*modalService, modalSubject, */activatedRoute, reuseTabService, fb);

        this.businessService = workTypeService;

    }

    // ngOnInit() {
    //     console.log("执行crud init");
    //     super.ngOnInit();
    // }

    resetButtonClick($event: MouseEvent) {
        $event.preventDefault();
        this.reset();
    }


    getFormData() {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }

        Object.assign(this.businessData, this.form.value);

        console.table(this.businessData);

    }

    /**
     * 重置界面内容
     */
    reset() {

        console.log('reset form', this.businessData);

        // this.form.reset(this.businessData, {onlySelf: true, emitEvent: false});
        //
        // super.reset();
        console.log('checkTypeOptions:', this.checkTypeOptions);

        this.form.reset(this.businessData, {onlySelf: true, emitEvent: false});
        //
        // this.form.markAsPristine();
        // for (const key in this.form.controls) {
        //     this.form.controls[key].markAsPristine();
        // }
        // console.log('this.form.dirty' + this.form.dirty);
        // console.log('this.form.invalid' + this.form.invalid);

        super.reset();

        //设置可复用标签的名字：
        if (this.sourceId) {
            //说明是修改
            this.reuseTabService.title = '编辑-' + this.businessData.name;
        }


    }

    get checkTypeOptions(){
        let result =  [{value: "1", caption: "小时"},
            {value: "2", caption: " 天"}];
        return result;
        // return BylCheckTypeEnumManager.getArray();
    }

    //#region get form fields
    get code() {
        return this.form.controls.code;
    }

    get name() {
        return this.form.controls.name;
    }

    get checkType() {
        return this.form.controls.checkType;
    }

    get standardTimeLength() {
        return this.form.controls.standardTimeLength;
    }

    get remarks() {
        return this.form.controls.remarks;
    }

    //#endregion
}

