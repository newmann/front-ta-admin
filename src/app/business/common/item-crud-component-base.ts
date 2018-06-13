import {ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NzMessageService, NzModalService, NzModalRef} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';

import {BylConfigService} from '../../service/constant/config.service';
import {Subject} from 'rxjs/Subject';
import {BylResultBody} from '../../service/model/result-body.model';
import {BylBaseService} from '../../service/service/base.service';

import {ReuseTabService} from '@delon/abc';
import {Observable} from 'rxjs/Observable';
import {SFComponent, SFSchema, SFUISchema} from '@delon/form';
import {simpleDeepCopy} from '../../service/utils/object.utils';
import {BylCrudComponentBasePro} from "./crud-component-base-pro";
import {BylMasterDataBaseModel} from "../../service/model/master-data-base.model";
import {BylMasterDataStatusEnum} from "../../service/model/master-data-status.enum";
import {BylAccount} from "../../service/account/model/account.model";
import {BylMasterDataBaseService} from "../../service/service/master-data-base.service";
import {BylTicketBaseModal} from "../../service/model/ticket-base.model";
import {BylTicketBaseService} from "../../service/service/ticket-base.service";
import {BylItemBaseModal} from "../../service/model/item-base.model";
import {BylItemBaseService} from "../../service/service/item-base.service";
import {BylItemAddModel} from "../../service/model/item-add.model";
import {BylItemUpdateModel} from "../../service/model/item-update.model";
/**
 * @Description: master-detail对象的detail类crud的抽象类
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 9:46
 **/

export abstract class BylTicketDetailCrudComponentBasePro<T extends BylItemBaseModal>
    extends BylCrudComponentBasePro<T>{

    @Input()
    public masterModifyDateTime: number;

    @Input()
    public masterId: string;
    @Input()
    public lineNo: number;


    public businessService: BylItemBaseService<T>;

    constructor(public msgService: NzMessageService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService
    ) {
        super(msgService, configService, activatedRoute, reuseTabService);

    }

    /**
     * 提交实体
     */
    submitEntity() {
        this.loading = true;
        this.errMsg = '';

        let saveResult$: Observable<BylResultBody<any>>;

        this.getFormData();

        if (this.sourceId){
            //修改单据明细
            let updateData = new BylItemUpdateModel<T>();

            updateData.masterId = this.masterId;
            updateData.modifyDateTime = this.masterModifyDateTime;
            updateData.item = simpleDeepCopy({},this.businessData);

            console.log('in ItemCrud submitEntity,updateData:', updateData);

            saveResult$ = this.businessService.updateDetail(updateData);

        }else{
            //新增单据明细
            let data = new BylItemAddModel<T>();

            data.masterId = this.masterId;
            data.modifyDateTime = this.masterModifyDateTime;
            data.lineNo = this.lineNo;
            data.item = simpleDeepCopy({},this.businessData);

            console.log('in ItemCrud submitEntity,data:', data);

            saveResult$ = this.businessService.addDetail(data);
        }

        saveResult$.subscribe(
            saveData => {
                // this._loading = false;
                if (saveData.code === BylResultBody.RESULT_CODE_SUCCESS) {
                    // simpleDeepCopy(this.businessData,data.data);
                    //退出界面
                    //将保存到后台的数据回传到调用方
                    console.log("in ItemCrud submitEntity: ", saveData.data);
                    this.modalSubject.destroy(saveData.data);
                } else {

                    this.errMsg = saveData.msg;
                }
                this.loading = false;
            },
            err => {
                this.errMsg = err.toString();
                this.loading = false;
            }
        );

    }


    error(value: any) {
        console.log('error', value);
    }


}
