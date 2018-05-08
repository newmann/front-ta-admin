import {Component, forwardRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';


// const noop = () => {
// };

@Component({
    selector: 'byl-select-info-formitem',
    templateUrl: './select-info.formitem.html'
})
export class BylSelectInfoFormItemComponent {
    @Input() public selectedRows: Array<any>;

}
