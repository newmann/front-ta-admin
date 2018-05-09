import {Component, forwardRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';


// const noop = () => {
// };

@Component({
    selector: 'byl-radio-formitem',
    templateUrl: './radio.formitem.html'
})
export class BylRadioWidgetComponent /*implements ControlValueAccessor */ {
    @Input() public controlName: string;
    @Input() public labelCaption: string;
    // @Input() public placeHolder: string;
    @Input() public hostForm: FormGroup;
    @Input() public controlPath: string;
    @Input() public isRequired: boolean;
    @Input() public validatedExtraInfo: string;
    @Input() public selectOptions: Array<any>;

    get inputControl() {
        return this.hostForm.get(this.controlPath);
    }

}
