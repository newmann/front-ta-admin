import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalService, NzModalSubject} from 'ng-zorro-antd';
import {BylRoleService} from '../../../../service/account/service/role.service';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylResultBody} from '../../../../service/model/result-body.model';
import {BylRole} from '../../../../service/account/model/role.model';
import {BylIStatusItem} from '../../../../service/model/status.model';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {BylRoleQuery} from '../../../../service/account/query/role-query.model';
import {BylListFormData} from '../../../../service/model/list-form-data.model';
import {BylMasterDataStatusEnum, BylMasterDataStatusManager} from '../../../../service/model/master-data-status.enum';
import {BylListComponentBase} from '../../../common/list-component-base';

@Component({
    selector: 'byl-role-list',
    templateUrl: './role-list.component.html',
})
export class BylRoleListComponent extends BylListComponentBase<BylRole> {


    statusList: BylIStatusItem[]; //状态


    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public roleService: BylRoleService) {
        super(message, configService, modalService, router);

        this.businessService = roleService;
        this.crudUrl = '/account/role/crud';
        // this.businessCrudComponent = BylPersonCrudComponent;

        this.statusList = BylMasterDataStatusManager.getStatusArray();

    }

    // checkAll(value: boolean) {
    //     this.listData.forEach(item => {
    //         if (!item.disabled) item.checked = value;
    //     });
    //     this.refreshStatus();
    // }

    // refreshStatus() {
    //     const allChecked = this.listData.every(value => value.disabled || value.checked);
    //     const allUnChecked = this.listData.every(value => value.disabled || !value.checked);
    //     this.allChecked = allChecked;
    //     this.indeterminate = (!allChecked) && (!allUnChecked);
    //     this.selectedRows = this.listData.filter(value => value.checked);
    //     // this.totalCallNo = this.selectedRows.reduce((total, cv) => total + cv.callNo, 0);
    // }







    /**
     * 根据查询的结果，生成界面显示的内容，重点是处理好checkec和disabled字段的值。
     * @param {Array<BylRole>} findResult
     * @returns {Array<BylListFormData<BylRole>>}
     */
    genListData(findResult: Array<BylRole>): Array<BylListFormData<BylRole>> {
        return findResult.map(data => {
            let item = new BylListFormData<BylRole>();
            item.checked = false;
            item.disabled = (data.status === BylMasterDataStatusEnum.DELETED);
            item.item = new BylRole();
            Object.assign(item.item, data);
            return item;
        });
    }

    /**
     *
     * @param q
     * @returns {BylRoleQuery}
     */
    genQueryModel(): any {
        let result = new BylRoleQuery();
        if (this.qData.name) result.name = this.qData.name;
        if (this.qData.modifyDateBegin) result.modifyDateBegin = moment(this.qData.modifyDateBegin).valueOf();
        if (this.qData.modifyDateEnd) result.modifyDateEnd = moment(this.qData.modifyDateEnd).add(1, 'days').valueOf(); // 第二天的零点
        if (this.qData.status) result.status = this.qData.status;
        return result;
    }

    reset() {
        this.qData.name = '';
        this.qData.modifyDate = Date();

    }

    batchDelete() {

    }

    batchApproval() {

    }


    /**
     * 将当前记录锁定
     * @param {string} id
     */
    lockRole(id: string) {
        let lockItem = new BylRole();
        this.listData.forEach(item => {
            if (item.item.id === id) {
                Object.assign(lockItem, item.item);
            }
        });

        console.log('lockItem: ' + lockItem);
        if (!lockItem) return;

        lockItem.status = BylMasterDataStatusEnum.LOCKED.valueOf();

        this.roleService.update(lockItem).subscribe(
            data => {
                this.loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {

                    // this.listData = Array.from(data.data.rows);
                    this.updateListData(data.data);

                } else {
                    this.showMsg(data.msg);
                }
            },
            err => {
                this.loading = false;
                console.log(err);
                this.showMsg(err.toString());
            }
        );
    }

    updateListData(newData: BylRole) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item, newData);
            });
    }

    getStatusCaption(status: number): string {
        return BylMasterDataStatusManager.getStatusCaption(status);
    }




}
