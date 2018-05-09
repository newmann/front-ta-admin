import {Component, forwardRef, Input, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {NzMessageService, NzModalRef, NzModalService} from 'ng-zorro-antd';
import {BylListQueryFormComponent} from '../list-query-form/list-query.form';
import {SFSchema, SFUISchema} from '@delon/form';
import {BylConfigService} from '../../../service/constant/config.service';
import {BylListFormFunctionModeEnum} from '../../../service/model/list-form-function-mode.enum';


@Component({
    selector: 'byl-list-query-widget',
    templateUrl: './list-query.widget.html'
})
export class BylListQueryWidgetComponent {

    @Input()
    set defaultData(value: any) {
        this._defaultData = value;
        this.queryData = value;
    };

    get defaultData() {
        return this._defaultData;
    }

    private _defaultData: any = {};

    @Input() actionTemplateRef: TemplateRef<void>;

    @Input() uiSchema: SFUISchema = {};
    @Input() schema: SFSchema = {};

    queryForm: NzModalRef;

    public queryData: any; //保存最新的查询条件

    get queryMessage() {
        let result = '';
        for (let prop of Object.getOwnPropertyNames(this.queryData)) {
            result = result + this.getTitle(prop) + ':' + this.queryData[prop] + '   ||  ';
        }
        return JSON.stringify(this.queryData) + '||' + result;

    }

    private getTitle(name: string): string {
        return this.schema.properties[name].title;
    }

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService
    ) {
    }

    showQueryForm() {
        this.queryForm = this.modalService.create({
            nzTitle: '设置查询条件',
            nzZIndex: 9999, //最外层
            nzWidth: '80%',
            nzContent: BylListQueryFormComponent,
            nzFooter: null,
            nzComponentParams: {
                defaultData: this.defaultData,
                uiSchema: this.uiSchema,
                schema: this.schema
            },
            nzMaskClosable: false
        });

        this.queryForm.afterClose.subscribe((value: any) => {
            Object.assign(this.queryData, value);
        });
    }

}
