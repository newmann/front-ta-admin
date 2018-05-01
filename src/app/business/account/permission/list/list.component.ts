import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {BylListComponentBase} from '../../../common/list-component-base';
import {Router} from '@angular/router';
import {BylMasterDataStatusEnum, BylMasterDataStatusManager} from '../../../../service/model/master-data-status.enum';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {BylRoleService} from '../../../../service/account/service/role.service';
import {BylListFormData} from '../../../../service/model/list-form-data.model';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylResultBody} from '../../../../service/model/result-body.model';
import {BylRoleQuery} from '../../../../service/account/query/role-query.model';
import {BylPermissionService} from '../../../../service/account/service/permission.service';
import * as moment from 'moment';
import {BylPermission} from '../../../../service/account/model/permission.model';
import {BylPermissionQuery} from '../../../../service/account/query/permission-query.model';
import {BylProjectQuery} from "../../../../service/project/query/project-query.model";

@Component({
  selector: 'byl-permission-list',
  templateUrl: './list.component.html',
})
export class BylPermissionListComponent extends BylListComponentBase<BylPermission> {


    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public permissionService: BylPermissionService) {
        super(message, configService, modalService, router);

        this.businessService = permissionService;
        this.crudUrl = '/account/permission/crud';

    }


    /**
     * 根据查询的结果，生成界面显示的内容，重点是处理好checkec和disabled字段的值。
     * @param {Array<BylPermission>} findResult
     * @returns {Array<BylListFormData<BylPermission>>}
     */
    genListData(findResult: Array<BylPermission>): Array<BylListFormData<BylPermission>> {
        return findResult.map(data => {
            let item = new BylListFormData<BylPermission>();
            item.checked = false;
            item.item = new BylPermission();
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
        let result = new BylPermissionQuery();
        // if (this.qData.name) result.name = this.qData.name;
        // if (this.qData.modifyDateBegin) result.modifyDateBegin = moment(this.qData.modifyDateBegin).valueOf();
        // if (this.qData.modifyDateEnd) result.modifyDateEnd = moment(this.qData.modifyDateEnd).add(1, 'days').valueOf(); // 第二天的零点
        return result;
    }

    reset() {
        this.qData.name = '';
        this.qData.modifyDate = Date();

    }


    updateListData(newData: BylPermission) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item, newData);
            });
    }

    /**
     * 设置查询缺省值
     */
    setQDataDefaultValue(){
        let q = new BylPermissionQuery();

        Object.assign(this.qData,q);
    }


}
