import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'byl-exception-500',
  template: `<exception type="500" style="min-height: 500px; height: 80%;"></exception>`,
})
export class BylException500Component {
  constructor(modalSrv: NzModalService) {
    modalSrv.closeAll();
  }
}
