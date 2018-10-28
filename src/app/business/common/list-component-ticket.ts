import {OnInit, ViewChild} from '@angular/core';
import {BylPageReq} from '../../service/model/page-req.model';
import {BylListFormData} from '../../service/model/list-form-data.model';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {BylConfigService} from '../../service/constant/config.service';
import {BylBaseService} from '../../service/service/base.service';
import {BylResultBody} from '../../service/model/result-body.model';
import {BylListFormFunctionModeEnum} from '../../service/model/list-form-function-mode.enum';
import {
    ACTION_BROWSE,
    ACTION_CANCEL, ACTION_CHECK, ACTION_CONFIRM,
    ACTION_DELETE,
    ACTION_LOCK,
    ACTION_MODIFY, ACTION_SUBMIT, ACTION_UNCONFIRM, ACTION_UNLOCK, BylListFormTableWidgetComponent,
    BylTableClickAction
} from "./list-form-table-item/table.formitem";
import {Observable} from "rxjs";

import {BylListComponentBasePro} from "./list-component-base-pro";
import {BylMasterDataBaseService} from "../../service/service/master-data-base.service";
import {BylMasterDataBaseModel} from "../../service/model/master-data-base.model";
import {BylTicketBaseService} from "../../service/service/ticket-base.service";
import {BylTicketBaseModal} from "../../service/model/ticket-base.model";

/**
 * @Description: 单据类list组件的抽象类
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-04-15 9:22
 **/
export abstract class BylListComponentTicket<T extends BylTicketBaseModal>
    extends BylListComponentBasePro<T>{


    public businessService: BylTicketBaseService<T>;



    public loading = false;

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router) {
        super(message, configService, modalService, router);

    }


    showDeleteEntity(entity: any){
        this.modalService.confirm({
            nzTitle: '确认要进行删除操作吗?',
            nzContent: '<b style="color: red;">删除之后不可恢复，请谨慎操作。</b>',
            nzOkText: '删除',
            nzOkType: 'danger',
            nzOnOk: () => {
                this.deleteEntity(entity);
            },
            nzCancelText: '取消',
            nzOnCancel: () => console.log('showDeleteEntity Cancel')
        });
    }

    deleteEntity(entity: any) {
        this.businessService.remove(entity).subscribe(
            data => {
                // option.loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                    //将显示界面中的数据删除掉
                    this.listData = this.listData.filter(item =>{
                        return item.item.id !== entity.id;
                    })

                } else {
                    this.message.error(data.msg);
                }
            },
            err => {
                // option.loading = false;
                this.message.error(err.toString());
            }
        );
    }

    // showLockEntity(entity: any){
    //     this.modalService.confirm({
    //         nzTitle: '确认要进行锁定操作吗?',
    //         nzContent: '<b style="color: red;">锁定之后，该记录不能被正常使用，请谨慎操作。</b>',
    //         nzOkText: '锁定',
    //         nzOkType: 'primary',
    //         nzOnOk: () => {
    //             this.lockEntity(entity);
    //         },
    //         nzCancelText: '取消',
    //         nzOnCancel: () => console.log('showLockEntity Cancel')
    //     });
    // }
    // lockEntity(entity: any) {
    //     this.actionResult$ = this.businessService.lock(entity);
    //     this.actionFollowProcess(this.actionResult$);
    // }
    //
    // showUnlockEntity(entity: any){
    //     this.modalService.confirm({
    //         nzTitle: '确认要进行解锁操作吗?',
    //         nzContent: '<b style="color: red;">解锁之后，该记录可以被正常使用。</b>',
    //         nzOkText: '锁定',
    //         nzOkType: 'primary',
    //         nzOnOk: () => {
    //             this.unlockEntity(entity);
    //         },
    //         nzCancelText: '取消',
    //         nzOnCancel: () => console.log('showUnlockEntity Cancel')
    //     });
    // }
    //
    // unlockEntity(entity: any) {
    //     this.actionResult$ = this.businessService.unlock(entity);
    //     this.actionFollowProcess(this.actionResult$);
    // }

    showSubmitEntity(entity: any){
        this.modalService.confirm({
            nzTitle: '确认要进行提交操作吗?',
            nzContent: '<b style="color: red;">提交之后，该记录将永久保存在数据库中，不能被彻底删除。</b>',
            nzOkText: '提交',
            nzOkType: 'primary',
            nzOnOk: () => {
                this.submitEntity(entity);
            },
            nzCancelText: '取消',
            nzOnCancel: () => console.log('showSubmitEntity Cancel')
        });
    }

    submitEntity(entity: any) {
        this.actionResult$ = this.businessService.submit(entity);
        this.actionFollowProcess(this.actionResult$);
    }

    showCheckEntity(entity: any){
        this.modalService.confirm({
            nzTitle: '确认要进行确认操作吗?',
            nzContent: '<b style="color: red;">确认之后，该记录不能进行修改调整。</b>',
            nzOkText: '确认',
            nzOkType: 'primary',
            nzOnOk: () => {
                this.checkEntity(entity);
            },
            nzCancelText: '取消',
            nzOnCancel: () => console.log('showConfirmEntity Cancel')
        });
    }

    checkEntity(entity: any) {
        this.actionResult$ = this.businessService.check(entity);
        this.actionFollowProcess(this.actionResult$);
    }


    showCancelEntity(entity: any){
        this.modalService.confirm({
            nzTitle: '确认要进行作废操作吗?',
            nzContent: '<b style="color: red;">作废之后，该记录将不能恢复，请谨慎操作。</b>',
            nzOkText: '作废',
            nzOkType: 'danger',
            nzOnOk: () => {
                this.cancelEntity(entity);
            },
            nzCancelText: '取消',
            nzOnCancel: () => console.log('showCancelEntity Cancel')
        });
    }
    cancelEntity(entity: any) {
        this.actionResult$ = this.businessService.cancel(entity);
        this.actionFollowProcess(this.actionResult$);
    }

    browseEntity(entity:any) {
        this.modifyEntity(entity);
    }

    entityAction(action: BylTableClickAction){
        switch(action.actionName){
            case ACTION_BROWSE:
                this.browseEntity(action.rowItem);
                break;

            case ACTION_DELETE:
                this.showDeleteEntity(action.rowItem);
                break;

            case ACTION_MODIFY:
                this.modifyEntity(action.rowItem);
                break;
            case ACTION_SUBMIT:
                this.showSubmitEntity(action.rowItem);
                break;
            case ACTION_CANCEL:
                this.showCancelEntity(action.rowItem);
                break;
            case ACTION_CHECK:
                this.showCheckEntity(action.rowItem);
                break;

            default:
                console.log("In ListComponentTicket ,当前的Action为：" + action.actionName + "，没有对应的处理过程。");
        }

    }





}
