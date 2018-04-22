import {Component, Input, OnInit} from '@angular/core';
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
import {BylResultBody} from "../../../../service/model/result-body.model";
import {BylUploadFileNameMapModel} from "../../../../service/model/upload-file-name-map.model";
import * as moment from 'moment';

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

  .avatar-img {
      width: 150px;
      max-height: 100%;
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
    // uploadUrl = "/api/file-manage/upload-file";
    public typeOptions = [{value: '身份证', label: '身份证'}, {value: '军官证', label: '军官证'}, {
        value: '驾驶证',
        label: '驾驶证'
    }];

    @Input() sourceId: string;

    @Input() masterId: string;

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
            // frontPhotoUrl: [null],
            // backPhotoUrl: [null],
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
        this.businessData.type = this.type.value;
        this.businessData.code = this.code.value;

        if (this.issueDate.value)  this.businessData.issueDate = moment(this.issueDate.value).valueOf();

        this.businessData.effectiveDate = moment(this.effectiveDate.value).valueOf();

        this.businessData.masterId = this.masterId;

        if (this.remarks.value) {
            this.businessData.remarks = this.remarks.value.toString();
        }

    }

    handleFrontPhotoChange(info: { file: UploadFile,event: any }) {


        if (info.file.status === 'uploading') {
            console.log("In handleFrontPhotoChange uploading");
            console.log("file:", JSON.stringify(info.file));
            console.log("event:", JSON.stringify(info.event));

            this.loading = true;
            return;
        }
        if (info.file.status === 'done') {
            console.log("In handleFrontPhotoChange uploading");
            console.log("file:", JSON.stringify(info.file));
            console.log("event:", JSON.stringify(info.event));
            //获取返回的信息
            const serverResp :BylResultBody<BylUploadFileNameMapModel> = info.file.response;
            console.log("serverResp:", JSON.stringify(serverResp));
            if (serverResp.code === BylResultBody.RESULT_CODE_SUCCESS){
                // Get this url from response in real world.
                this.businessData.frontPhotoUrl = serverResp.data.targetFileName;

                this.loading = false;
                this.frontPhoto = info.file.thumbUrl;

                // this.getBase64(info.file.originFileObj, (img: any) => {
                //     this.loading = false;
                //     this.frontPhoto = img;
                // });

            }
        }
    }

    handleBackPhotoChange(info: { file: UploadFile,event: any }) {

        console.log("In handleFrontPhotoChange ");
        if (info.file.status === 'uploading') {
            this.loading = true;
            return;
        }
        if (info.file.status === 'done') {
            //获取返回的信息
            const serverResp :BylResultBody<BylUploadFileNameMapModel> = info.file.response;
            if (serverResp.code === BylResultBody.RESULT_CODE_SUCCESS) {
                this.businessData.backPhotoUrl = serverResp.data.targetFileName;

                this.loading = false;
                this.backPhoto = info.file.thumbUrl;

                // Get this url from response in real world.
                // this.getBase64(info.file.originFileObj, (img: any) => {
                //     this.loading = false;
                //     this.frontPhoto = img;
                // });
            }
        }
    }


    // private getBase64(img: File, callback: (img: any) => void) {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result));
    //     reader.readAsDataURL(img);
    // }

    // handleChange(info: { file: UploadFile,event: any }, photoUrl: string) {
    //     if (info.file.status === 'uploading') {
    //         this.loading = true;
    //         return;
    //     }
    //     if (info.file.status === 'done') {
    //         // Get this url from response in real world.
    //         this.getBase64(info.file.originFileObj, (img: any) => {
    //             this.loading = false;
    //             photoUrl = img;
    //         });
    //     }
    // }

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
