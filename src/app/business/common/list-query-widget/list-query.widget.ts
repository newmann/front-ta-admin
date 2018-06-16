import {Component, forwardRef, Input, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {NzMessageService, NzModalRef, NzModalService} from 'ng-zorro-antd';
import {BylListQueryFormComponent} from '../list-query-form/list-query.form';
import {SFSchema, SFUISchema} from '@delon/form';
import {BylConfigService} from '../../../service/constant/config.service';
import {BylListFormFunctionModeEnum} from '../../../service/model/list-form-function-mode.enum';
import {simpleDeepCopy} from "../../../service/utils/object.utils";
import {SFSchemaEnum, SFSchemaEnumType} from "@delon/form/src/src/schema";
import * as moment from 'moment';
import {BylDatetimeUtils} from "../../../service/utils/datetime.utils";


@Component({
    selector: 'byl-list-query-widget',
    templateUrl: './list-query.widget.html'
})
export class BylListQueryWidgetComponent implements OnInit{

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

    public queryDataDisplayArray: string[]; //查询条件展示信息

    get queryMessage() {
        let result = '';
        for (let prop of Object.getOwnPropertyNames(this.queryData)) {
            result = result + this.getSchemaTitle(prop) + ':' + this.queryData[prop] + '   ||  ';
        }
        return JSON.stringify(this.queryData) + '||' + result;

    }

    private getSchemaTitle(name: string): string {
        if(this.schema.properties[name]){
            return this.schema.properties[name].title;
        }

    }

    private getSchemaEnum(name: string):any[] {
        if (this.schema.properties[name]) {
            return this.schema.properties[name].enum;
        }

    }
    private getSchemaUIWidget(name: string): string {
        let ui = this.getSchemaUI(name);

        if (ui) {
             return ui.widget;
        }

    }

    private getSchemaUI(name: string):any {
        if(this.schema.properties[name]){
            return this.schema.properties[name].ui;
        }

    }

    private isDateRangeSchema(name: string):boolean {
        let ui = this.getSchemaUI(name);
        let result = false;
        if(ui){
            if (ui.widget) {
                if(ui.widget === 'date'){
                    if(ui.mode){
                        if (ui.mode === "range") result = true;
                    }
                }
            }
        }
        return result;
    }

    private isWidget(name: string):boolean {
        let ui = this.getSchemaUI(name);
        let result = false;
        if(ui){
            if (ui.widget) {
               result = true;
            }
        }
        return result;
    }

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService
    ) {
    }

    ngOnInit(): void {
        this.resetQueryDataDisplayArray();

    }

    resetQueryDataDisplayArray(){
        let item: string;
        this.queryDataDisplayArray = [];

        console.log('resetQueryDataDisplayArray',this.queryData);

        for (let prop of Object.getOwnPropertyNames(this.queryData)) {
            //判断是不是为筛选类型的字段，比如状态
            item = '';
            let selectArray = this.getSchemaEnum(prop);
            if (selectArray){
                item = this.getSchemaTitle(prop) + '：' + this.queryData[prop].map(item =>{
                    let data =  selectArray.filter(option => item == option.value );
                    return data[0].label;
                }).join('，');

            } else{
                //判断是不是日期范围类型的字段
                if(this.isDateRangeSchema(prop)){
                    if (this.queryData[prop]){
                        if(this.queryData[prop].length >0){
                            let beginDate = moment(this.queryData[prop][0]).format(BylDatetimeUtils.formatDateString);
                            let endDate = moment(this.queryData[prop][1]).format(BylDatetimeUtils.formatDateString);

                            item = this.getSchemaTitle(prop) + '：从' + beginDate + " 至" + endDate ;
                        }
                    }
                }else{
                    //对不同的select widget进行处理

                    if (this.isWidget(prop)){
                        console.log('isWidget');
                        switch (this.getSchemaUIWidget(prop)){
                            case 'select':
                                break;
                            case 'bylProjectSelect':
                                if (this.queryData[prop])  item = this.getSchemaTitle(prop) + '：' +
                                    this.queryData[prop].name + '[' + this.queryData[prop].code + ']';
                                break;
                            case 'bylOutsourcerSelect':
                                if (this.queryData[prop])  item = this.getSchemaTitle(prop) + '：' +
                                    this.queryData[prop].name + '[' + this.queryData[prop].code + ']';
                                break;
                            default:
                        }
                    } else{
                        if (this.queryData[prop])  item = this.getSchemaTitle(prop) + '：' + this.queryData[prop];
                    }

                }
            }

            if (item.length>0) this.queryDataDisplayArray.push(item);
        }

    };

    showQueryForm() {
        this.queryForm = this.modalService.create({
            nzTitle: '设置查询条件',
            nzZIndex: 9999, //最外层
            nzWidth: '80%',
            nzContent: BylListQueryFormComponent,
            nzFooter: null,
            nzComponentParams: {
                defaultData: this.defaultData,
                currentData: this.queryData,
                uiSchema: this.uiSchema,
                schema: this.schema
            },
            nzMaskClosable: false
        });

        this.queryForm.afterClose.subscribe((value: any) => {
            if(value) {
                this.queryData = simpleDeepCopy({}, value);
                this.resetQueryDataDisplayArray();
            }

        });
    }

}
