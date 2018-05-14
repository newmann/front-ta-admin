import {Component, OnInit} from '@angular/core';
import {BylListComponentBase} from '../../../common/list-component-base';
import {BylPerson} from '../../../../service/person/model/person.model';
import {Router} from '@angular/router';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylPersonService} from '../../../../service/person/service/person.service';
import {BylListFormData} from '../../../../service/model/list-form-data.model';

import {BylPersonQuery} from '../../../../service/person/query/person-query.model';
import {BylProjectQuery} from "../../../../service/project/query/project-query.model";
import {SFSchema, SFUISchema} from "@delon/form";
import * as moment from "moment";
import {BylIStatusItem} from "../../../../service/model/status.model";
import {BylMasterDataStatusManager} from "../../../../service/model/master-data-status.enum";


@Component({
    selector: 'byl-person-list',
    templateUrl: './list.component.html',
})
export class BylPersonListComponent extends BylListComponentBase<BylPerson> {
    // statusList: BylIStatusItem[]; //状态
    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public router: Router,
                public personService: BylPersonService) {
        super(message, configService, modalService, router);

        this.businessService = personService;
        this.crudUrl = '/person/person/crud';
        // this.statusList = BylMasterDataStatusManager.getArray();
        // this.querySchema.properties['status'].enum.push(...this.statusList); //设置查询条件中的状态字段
        // this.businessCrudComponent = BylPersonCrudComponent;
    }


    genListData(findResult: Array<BylPerson>): Array<BylListFormData<BylPerson>> {
        return findResult.map(data => {
            let item = new BylListFormData<BylPerson>();
            item.checked = false;
            // item.disabled = (data.status === BylRoleStatus.DELETED);
            item.item = new BylPerson();
            Object.assign(item.item, data);
            return item;
        });
    }

    genQueryModel(): any {
        let result = new BylPersonQuery();
        // if (qData.name) result.name = qData.name;
        // if (qData.modifyDateBegin) result.modifyDateBegin = moment(qData.modifyDateBegin).valueOf();
        // if (qData.modifyDateEnd) result.modifyDateEnd = moment(qData.modifyDateEnd).add(1,'days').valueOf();//第二天的零点
        // if (qData.status) result.status = qData.status;
        return result;
    }

    updateListData(newData: BylPerson) {
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
        let q = new BylPersonQuery();

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
                title: '姓名类似于'
            },
            idCard: { type: 'string',
                title: '身份证号类似于'
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
