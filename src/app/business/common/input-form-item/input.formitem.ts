import {Component, forwardRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';


// const noop = () => {
// };

@Component({
    selector: 'byl-input-formitem',
    templateUrl: './input.formitem.html'
})
export class BylInputWidgetComponent /*implements ControlValueAccessor */ {
    @Input() public controlName: string;
    @Input() public labelCaption: string;
    @Input() public placeHolder: string;
    @Input() public hostForm: FormGroup;
    @Input() public controlPath: string;
    @Input() public isRequired: boolean;
    @Input() public validatedExtraInfo: string;


    get inputControl() {
        return this.hostForm.get(this.controlPath);
    }

}
