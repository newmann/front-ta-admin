import {Component, forwardRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';


// const noop = () => {
// };

@Component({
    selector: 'byl-date-formitem',
    templateUrl: './date.formitem.html',
    // host: {
    //       // 宿主元素 click 事件，触发 focus() 事件
    //       '(click)': 'entityLoggerClick()'
    //   },
    // providers: [{
    //     provide: NG_VALUE_ACCESSOR,
    //     useExisting: forwardRef(() => BylEntityLoggerComponent),
    //     multi: true
    // }],
    encapsulation: ViewEncapsulation.None
})
export class BylDateWidgetComponent /*implements ControlValueAccessor */ {
    @Input() public controlName: string;
    @Input() public labelCaption: string;
    @Input() public placeHolder: string;
    @Input() public selectMode: string; //选项
    @Input() public hostForm: FormGroup;
    @Input() public controlPath: string;
    @Input() public isRequired: boolean;
    @Input() public validatedExtraInfo: string;
    @Input() public selectOptions: Array<any>;

    get inputControl() {
        return this.hostForm.get(this.controlPath);
    }

}
