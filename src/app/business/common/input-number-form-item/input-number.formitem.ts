import {Component, forwardRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';


// const noop = () => {
// };

@Component({
    selector: 'byl-input-number-formitem',
    templateUrl: './input-number.formitem.html'
})
export class BylInputNumberWidgetComponent /*implements ControlValueAccessor */ {
    @Input() public controlName: string;
    @Input() public labelCaption: string;
    @Input() public hostForm: FormGroup;
    @Input() public controlPath: string;
    @Input() public isRequired: boolean;
    @Input() public validatedExtraInfo: string;
    @Input() public min = 0;
    @Input() public max = Infinity;
    @Input() public precision: number;
    @Input() public step: number;
    get inputControl() {
        return this.hostForm.get(this.controlPath);
    }

}
