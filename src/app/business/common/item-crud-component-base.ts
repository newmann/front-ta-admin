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
import {BylTicketBaseModal} from "../../service/model/base-ticket.model";
import {BylTicketBaseService} from "../../service/service/ticket-base.service";
import {BylBaseItemModal} from "../../service/model/base-item.model";
import {BylItemBaseService} from "../../service/service/item-base.service";
import {BylDetailItemAddModel} from "../../service/model/detail-item-add.model";
/**
 * @Description: master-detail对象的detail类crud的抽象类
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 9:46
 **/

export abstract class BylTicketDetailCrudComponentBasePro<T extends BylBaseItemModal>
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

        let saveResult$: Observable<BylResultBody<BylDetailItemAddModel<T>>>;

        console.log('in BylItemCrudComponentBase ', this.businessData);

        let data = new BylDetailItemAddModel<T>();

        data.masterId = this.masterId;
        data.modifyDateTime = this.masterModifyDateTime;
        data.lineNo = this.lineNo;


        saveResult$ = this.businessService.addDetail(data);

        saveResult$.subscribe(
            data => {
                // this._loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                    // simpleDeepCopy(this.businessData,data.data);
                    //退出界面
                    //将保存到后台的数据回传到调用方
                    this.modalSubject.destroy(data.data.item);
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


    error(value: any) {
        console.log('error', value);
    }


}
