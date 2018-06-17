import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from '@delon/theme';

@Component({
  selector: 'byl-layout-sidebar',
  templateUrl: './sidebar.component.html',
})
export class BylSidebarComponent {
  constructor(
    public settings: SettingsService,
    public msgSrv: NzMessageService,
  ) {}
}
