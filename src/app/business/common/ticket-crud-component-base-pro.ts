import {ElementRef, OnInit, ViewChild} from '@angular/core';
import {NzMessageService, NzModalService, NzModalRef} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';

import {BylConfigService} from '../../service/constant/config.service';
import {BylResultBody} from '../../service/model/result-body.model';

import {ReuseTabService} from '@delon/abc';
import {Observable} from 'rxjs';
import {BylCrudComponentBasePro} from "./crud-component-base-pro";
import {BylTicketBaseModal} from "../../service/model/ticket-base.model";
import {BylTicketBaseService} from "../../service/service/ticket-base.service";
import {BylTicketStatusEnum} from "../../service/model/ticket-status.enum";
/**
 * @Description: crud组件对象的抽象类
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 9:46
 **/

export abstract class BylTicketCrudComponentBasePro<T extends BylTicketBaseModal>
    extends BylCrudComponentBasePro<T>{
    submitLoading: boolean = false;
    cancelLoading: boolean = false;
    checkLoading: boolean = false;

    public businessService: BylTicketBaseService<T>;

    constructor(public msgService: NzMessageService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                // public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService
    ) {
        super(msgService, configService, activatedRoute, reuseTabService);

    }
    ngOnInit() {
        //如果是新增单据，则先现在好单据后，进入修改模式
        console.log("in Ticket Crud component ngOnInit, processType:",this.processType);

        if(this.processType === 'new'){
            this.businessService.getNewTicket().subscribe((data) => {
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                    console.log("in TicketCrudComponent, ngOnInit new ticket:", data);
                    //调出新生成的单据进行修改和调整

                    this.sourceId = data.data.id;
                    this.processType = this.sourceId;
                    this.loadData(this.sourceId);
                } else {
                    this.errMsg = data.msg;
                    this.reset();
                }
            },err =>{
                this.errMsg = err;
                this.reset();
            });
        } else {
            //进行后续处理
            super.ngOnInit();

        }

    }
    /**
     * 重置界面内容
     */
    reset() {

        console.log('reset form', this.businessData);

        super.reset();
        //设置可复用标签的名字：
        if (this.sourceId) {
            //说明是修改
            this.reuseTabService.title = '编辑-' + this.businessData.billNo;
        }

    }
    /**
     * 提交实体
     */
    submitEntity() {
        this.submitLoading = true;
        this.errMsg = '';
        this.getFormData();
        let saveResult$: Observable<BylResultBody<T>>;

        console.log('in BylTicketCrudComponentBasePro ', this.businessData);

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

        console.log('in BylTicketCrudComponentBasePro submitform', this.businessData);

        saveResult$ = this.businessService.cancel(this.businessData);

        this.followProcess(saveResult$);

    }


    /**
     * 审核
     *
     */
    checkEntity() {
        this.checkLoading = true;
        this.errMsg = '';

        let saveResult$: Observable<BylResultBody<T>>;

        console.log('in BylTicketCrudComponentBasePro confirmEntity', this.businessData);

        saveResult$ = this.businessService.check(this.businessData);

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
            },
            err => {
                this.errMsg = err.toString();
                this.setLoadingFalse();
            }
        );
    }

    setLoadingFalse(){
        this.submitLoading= false;
        this.checkLoading = false;
        this.cancelLoading = false;
    }

    showSaveButton(): boolean{
        return this.businessData.status === BylTicketStatusEnum.UNSUBMITED
            || this.businessData.status == BylTicketStatusEnum.SUBMITED ;
    }

    showSubmitButton():boolean{
        return this.businessData.status === BylTicketStatusEnum.UNSUBMITED;
            // || this.businessData.status == BylTicketStatusEnum.SUBMITED;
    }


    showCancelButton(): boolean{
        return this.businessData.status === BylTicketStatusEnum.SUBMITED;
    }

    showCheckButton(): boolean{
        return this.businessData.status === BylTicketStatusEnum.SUBMITED;

    }


    showBrowseButton(): boolean{
        return this.businessData.status === BylTicketStatusEnum.CHECKED
            || this.businessData.status === BylTicketStatusEnum.CHECKED_DELETED
            || this.businessData.status === BylTicketStatusEnum.SUBMITED_DELETED;
    }

}
