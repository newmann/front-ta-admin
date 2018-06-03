import {Component, forwardRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {SFComponent, SFSchema, SFUISchema} from '@delon/form';
import {NzModalRef} from 'ng-zorro-antd';
import {simpleDeepCopy} from "../../../service/utils/object.utils";

@Component({
    selector: 'byl-list-query-form',
    templateUrl: './list-query.form.html'
})
export class BylListQueryFormComponent {
    @Input() defaultData: any = {};
    @Input() currentData: any = {};
    @Input() uiSchema: SFUISchema = {};
    @Input() schema: SFSchema = {};

    @ViewChild('sf') sfForm: SFComponent;

    constructor(private modal: NzModalRef) {
    }

    reset(){
        this.currentData = simpleDeepCopy({},this.defaultData);
        this.sfForm.reset();
    }

    submit(value: any) {
        this.modal.destroy(value);
    }

    quit() {
        this.modal.destroy(null);
    }

    getDefaultDataStr() {
        return JSON.stringify(this.defaultData);
    }

    change(value: any) {
        console.log('change', value);
    }

    error(value: any) {
        console.log('error', value);
    }
}
