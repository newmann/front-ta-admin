import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'byl-exception-403',
  template: `<exception type="403" style="min-height: 500px; height: 80%;"></exception>`,
})
export class BylException403Component {
  constructor(modalSrv: NzModalService) {
    modalSrv.closeAll();
  }
}
