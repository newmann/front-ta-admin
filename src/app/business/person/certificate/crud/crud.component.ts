import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {BylCrudComponentBase} from '../../../common/crud-component-base';
import {BylPersonAddress} from '../../../../service/person/model/person-address.model';
import {BylPersonCertificate} from '../../../../service/person/model/person-certificate.model';
import {BylProvinceService} from '../../../../service/address/service/province.service';
import {BylCityService} from '../../../../service/address/service/city.service';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylPersonAddressService} from '../../../../service/person/service/person-address.service';
import {NzMessageService, NzModalService, NzModalSubject, UploadFile} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ReuseTabService} from '@delon/abc';
import {BylCountryService} from '../../../../service/address/service/country.service';
import {BylPersonCertificateService} from '../../../../service/person/service/person-certificate.service';

@Component({
  selector: 'byl-person-certificate-crud',
  templateUrl: './crud.component.html',
    styles: [`
  :host ::ng-deep .avatar-uploader,
  :host ::ng-deep .avatar-uploader-trigger,
  :host ::ng-deep .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }

  :host ::ng-deep .avatar-uploader {
    display: block;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
  }

  :host ::ng-deep .avatar-uploader-trigger {
    display: table-cell;
    vertical-align: middle;
    font-size: 28px;
    color: #999;
  }
  `]
})
export class BylPersonCertificateCrudComponent extends BylCrudComponentBase<BylPersonCertificate> {
    frontPhoto: string;
    backPhoto: string;

    newBusinessData(): BylPersonCertificate {
        return new BylPersonCertificate();
    }
    constructor(public msgService: NzMessageService,
                public personCertificateService: BylPersonCertificateService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public modalSubject: NzModalSubject,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService,
                public fb: FormBuilder) {
        super(msgService, configService, modalService, modalSubject, activatedRoute, reuseTabService, fb);

        this.businessService = personCertificateService;

    }
    defineForm(): void {
        // 绑定验证模式
        this.form = this.fb.group({
            type: [null, Validators.compose([Validators.required])],
            code: [null, Validators.compose([Validators.required])],
            issueDate: [null],
            effectiveDate: [null, Validators.compose([Validators.required])],
            frontPhotoUrl: [null],
            backPhotoUrl: [null],
            remarks: [null]
        });

    }
    formResetButtonClick($event): void {
        $event.preventDefault();
        this.resetCrudForm();
    }

    /**
     * 重置界面内容
     */

    resetCrudForm(): void {
        this.form.reset({
            type: this.businessData.type,
            code: this.businessData.code,
            issueDate: this.businessData.issueDate,
            effectiveDate: this.businessData.effectiveDate,
            remarks: this.businessData.remarks
        }, {onlySelf: true, emitEvent: false});

        this.frontPhoto = this.businessData.frontPhotoUrl;
        this.backPhoto = this.businessData.backPhotoUrl;

    }

    getFormData() {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }

        console.log('log', this.form.value);
        Object.assign(this.businessData, this.form.value);

    }

    beforeUpload = (file: File) => {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            this.msgService.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            this.msgService.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    }

    private getBase64(img: File, callback: (img: any) => void) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange(info: { file: UploadFile }, photoUrl: string) {
        if (info.file.status === 'uploading') {
            this.loading = true;
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, (img: any) => {
                this.loading = false;
                photoUrl = img;
            });
        }
    }

    //#region 获取界面控件对象
    get type() {
        return this.form.controls.type;
    }

    get code() {
        return this.form.controls.code;
    }

    get issueDate() {
        return this.form.controls.issueDate;
    }

    get effectiveDate() {
        return this.form.controls.effectiveDate;
    }

    get remarks() {
        return this.form.controls.remarks;
    }

    //#endregion

}
