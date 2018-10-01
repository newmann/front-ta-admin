import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'passport-register-result',
    templateUrl: './oauth-register-result.component.html',
    styleUrls: [ './oauth-register-result.component.less' ]
})
export class BylOAuthRegisterResultComponent {
    constructor(public msg: NzMessageService) {}
}
