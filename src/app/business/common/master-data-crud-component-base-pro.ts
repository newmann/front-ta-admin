import {NzMessageService} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';

import {BylConfigService} from '../../service/constant/config.service';
import {Observable} from 'rxjs';
import {BylResultBody} from '../../service/model/result-body.model';

import {ReuseTabService} from '@delon/abc';
import {BylCrudComponentBasePro} from "./crud-component-base-pro";
import {BylMasterDataBaseModel} from "../../service/model/master-data-base.model";
import {BylMasterDataStatusEnum} from "../../service/model/master-data-status.enum";
import {BylMasterDataBaseService} from "../../service/service/master-data-base.service";

/**
 * @Description: crud组件对象的抽象类
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 9:46
 **/

export abstract class BylMasterDataCrudComponentBasePro<T extends BylMasterDataBaseModel>
    extends BylCrudComponentBasePro<T>{
    submitLoading: boolean = false;
    cancelLoading: boolean = false;
    lockLoading: boolean = false;
    unlockLoading: boolean =false;
    confirmLoading: boolean = false;
    unconfirmLoading: boolean = false;

    public businessService: BylMasterDataBaseService<T>;

    constructor(public msgService: NzMessageService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                // public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService
    ) {
        super(msgService, configService, activatedRoute, reuseTabService);

    }


    /**
     * 提交实体
     */
    submitEntity() {
        this.submitLoading = true;
        this.errMsg = '';
        this.getFormData();

        let saveResult$: Observable<BylResultBody<T>>;

        console.log('in BylMasterDataCrudComponentBasePro ', this.businessData);

        saveResult$ = this.businessService.submit(this.businessData);

        this.followProcess(saveResult$);
    }


    /**
     * 作废
     *
     */
    cancelEntity() {
        this.cancelLoading = true;
        this.errMsg = '';

        let saveResult$: Observable<BylResultBody<T>>;

        console.log('in BylMasterDataCrudComponentBasePro submitform', this.businessData);

        saveResult$ = this.businessService.cancel(this.businessData);

        this.followProcess(saveResult$);

    }

    /**
     * 锁定
     *
     */
    lockEntity() {
        this.lockLoading = true;
        this.errMsg = '';

        let saveResult$: Observable<BylResultBody<T>>;

        console.log('in BylMasterDataCrudComponentBasePro lockEntity', this.businessData);

        saveResult$ = this.businessService.lock(this.businessData);

        this.followProcess(saveResult$);

    }
    /**
     * 解除锁定
     *
     */
    unlockEntity() {
        this.unlockLoading = true;
        this.errMsg = '';

        let saveResult$: Observable<BylResultBody<T>>;

        console.log('in BylMasterDataCrudComponentBasePro unlockEntity', this.businessData);

        saveResult$ = this.businessService.unlock(this.businessData);

        this.followProcess(saveResult$);

    }

    /**
     * 确认
     *
     */
    confirmEntity() {
        this.confirmLoading = true;
        this.errMsg = '';

        let saveResult$: Observable<BylResultBody<T>>;

        console.log('in BylMasterDataCrudComponentBasePro confirmEntity', this.businessData);

        saveResult$ = this.businessService.confirm(this.businessData);

        this.followProcess(saveResult$);

    }
    /**
     * 取消确认，返回到提交状态
     */
    unconfirmEntity() {
        this.unconfirmLoading = true;
        this.errMsg = '';

        let saveResult$: Observable<BylResultBody<T>>;

        console.log('in BylMasterDataCrudComponentBasePro ', this.businessData);

        saveResult$ = this.businessService.unconfirm(this.businessData);

        this.followProcess(saveResult$);
    }

    protected followProcess(call$: Observable<BylResultBody<T>> ){
        call$.subscribe(
            data => {
                // this._loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                    // simpleDeepCopy(this.businessData,data.data);
                    this.setFormData(data.data);
                    this.reset(); //重置界面

                } else {

                    this.errMsg = data.msg;
                }
                this.setLoadingFalse();
                // this.loading = false;
                // this.submitLoading = false;
            },
            err => {
                this.errMsg = err.toString();
                this.setLoadingFalse();
                // this.loading = false;
            }
        );
    }

    setLoadingFalse(){
        this.submitLoading= false;
        this.unconfirmLoading = false;
        this.confirmLoading = false;
        this.lockLoading =false;
        this.unlockLoading =false;
        this.cancelLoading = false;
    }

    showSaveButton(): boolean{
        return this.businessData.status === BylMasterDataStatusEnum.UNSUBMITED
            || this.businessData.status == BylMasterDataStatusEnum.SUBMITED;
    }

    showSubmitButton():boolean{
        return this.businessData.status === BylMasterDataStatusEnum.UNSUBMITED;
    }

    showLockButton(): boolean{
        return this.businessData.status === BylMasterDataStatusEnum.CONFIRMED;
    }

    showUnlockButton(): boolean{
        return this.businessData.status === BylMasterDataStatusEnum.LOCKED;
    }

    showCancelButton(): boolean{
        return this.businessData.status === BylMasterDataStatusEnum.SUBMITED;
    }

    showConfirmButton(): boolean{
        return this.businessData.status === BylMasterDataStatusEnum.SUBMITED;

    }
    showUnconfirmButton(): boolean{
        return this.businessData.status === BylMasterDataStatusEnum.CONFIRMED;
    }

    showBrowseButton(): boolean{
        return this.businessData.status === BylMasterDataStatusEnum.CONFIRMED
            || this.businessData.status === BylMasterDataStatusEnum.LOCKED
            || this.businessData.status === BylMasterDataStatusEnum.SUBMITED_DELETED;
    }

}
