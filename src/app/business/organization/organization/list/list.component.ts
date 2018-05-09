import { Component, OnInit } from '@angular/core';
import {BylListComponentBase} from "../../../common/list-component-base";
import {Router} from "@angular/router";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {BylListFormData} from "../../../../service/model/list-form-data.model";
import {BylConfigService} from "../../../../service/constant/config.service";
import {BylOrganization} from "../../../../service/organization/model/organization.model";
import {BylOrganizationService} from "../../../../service/organization/service/organization.service";
import {BylOrganizationQuery} from "../../../../service/organization/query/organization-query.model";
import {BylProjectQuery} from "../../../../service/project/query/project-query.model";
import * as moment from "moment";
import {SFSchema, SFUISchema} from "@delon/form";

@Component({
  selector: 'byl-organization-list',
  templateUrl: './list.component.html',
})
export class BylOrganizationListComponent extends BylListComponentBase<BylOrganization> {

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public organizationService: BylOrganizationService) {
        super(message, configService, modalService, router);

        this.businessService = organizationService;
        this.crudUrl = '/organization/organization/crud';
        // this.businessCrudComponent = BylPersonCrudComponent;
    }


    genListData(findResult: Array<BylOrganization>): Array<BylListFormData<BylOrganization>> {
        return findResult.map(data => {
            let item = new BylListFormData<BylOrganization>();
            item.checked = false;
            // item.disabled = (data.status === BylRoleStatus.DELETED);
            item.item = new BylOrganization();
            Object.assign(item.item, data);
            return item;
        });
    }

    genQueryModel(): any {
        let result = new BylOrganizationQuery();
        // if (qData.name) result.name = qData.name;
        // if (qData.modifyDateBegin) result.modifyDateBegin = moment(qData.modifyDateBegin).valueOf();
        // if (qData.modifyDateEnd) result.modifyDateEnd = moment(qData.modifyDateEnd).add(1,'days').valueOf();//第二天的零点
        // if (qData.status) result.status = qData.status;
        return result;
    }

    updateListData(newData: BylOrganization) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item, newData);
            });
    }

    // modifyEntity(id:string){
    //     this.router.navigateByUrl("/person/person/crud/" + id);
    // }
    /**
     * 设置查询缺省值
     */
    setQDataDefaultValue(){
        let q = new BylOrganizationQuery();

        Object.assign(this.qData,q);
    }

    //#region 查询条件
    queryDefaultData: any = {
        modifyDateBegin: moment(moment.now()).subtract(6,"month").format("YYYY-MM-DD"),
        modifyDateEnd: moment(moment.now()).format("YYYY-MM-DD") };
    queryUiSchema: SFUISchema = {};
    querySchema: SFSchema = {
        properties: {
            name: { type: 'string',
                title: '名称类似于'
            },
            code: { type: 'string',
                title: '代码类似于'
            },
            simpleName: { type: 'string',
                title: '简称类似于'
            },

            modifyDateBegin: { type: 'string',
                title: '最后修改日期大于等于',
                ui: { widget: 'date' }
            },
            modifyDateEnd: { type: 'string',
                title: '最后修改日期小于等于',
                ui: { widget: 'date' }
            }
        },
        required: []
    };
//#endregion
}
