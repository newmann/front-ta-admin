import {Component, forwardRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BylSelectOption} from "../select-option";


// const noop = () => {
// };

@Component({
    selector: 'byl-radio-formitem',
    templateUrl: './radio.formitem.html',
    preserveWhitespaces: false
})
export class BylRadioWidgetComponent /*implements ControlValueAccessor */ {
    @Input() public controlName: string;
    @Input() public labelCaption: string;
    // @Input() public placeHolder: string;
    @Input() public hostForm: FormGroup;
    @Input() public controlPath: string;
    @Input() public isRequired: boolean;
    @Input() public validatedExtraInfo: string;
    @Input() public selectOptions: Array<BylSelectOption>;

    get inputControl() {
        return this.hostForm.get(this.controlPath);
    }

}
