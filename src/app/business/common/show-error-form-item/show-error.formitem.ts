import {Component, forwardRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';


// const noop = () => {
// };

@Component({
    selector: 'byl-show-error-formitem',
    templateUrl: './show-error.formitem.html'
})
export class BylShowErrorFormItemComponent {
    @Input() public errorMessage: string;
    @Input() public msgTitle = "保存数据错误";
}
