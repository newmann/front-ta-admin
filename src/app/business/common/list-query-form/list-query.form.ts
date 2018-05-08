import {Component, forwardRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {SFSchema, SFUISchema} from '@delon/form';
import {NzModalRef} from 'ng-zorro-antd';

@Component({
    selector: 'byl-list-query-form',
    templateUrl: './list-query.form.html'
})
export class BylListQueryFormComponent {
    @Input() defaultData: any = { };
    @Input() uiSchema: SFUISchema = {};
    @Input() schema: SFSchema = {};

    constructor(private modal: NzModalRef) {
    }

    submit(value: any) {
        this.modal.destroy(value);
    }

    quit(){
        this.modal.destroy(null);
    }

    getDefaultDataStr(){
        return JSON.stringify(this.defaultData);
    }
    // change(value: any) {
    //     // console.log('change', value);
    // }
    //
    // error(value: any) {
    //     // console.log('error', value);
    // }
}
