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
        this.destroyModal();
    }

    change(value: any) {
        // console.log('change', value);
    }

    error(value: any) {
        // console.log('error', value);
    }

    destroyModal(): void {
        this.modal.destroy({ data: 'this the result data' });
    }
}
