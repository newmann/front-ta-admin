import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {
    Router,
    NavigationEnd,
    RouteConfigLoadStart,
    NavigationError, NavigationCancel,
} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { ScrollService, MenuService, SettingsService } from '@delon/theme';

@Component({
  selector: 'byl-layout-default',
  templateUrl: './default.component.html',
  preserveWhitespaces: false,
  host: {
      '[class.alain-default]': 'true',
  },
})
export class BylLayoutDefaultComponent {
  isFetching = false;
    @ViewChild('settingHost', { read: ViewContainerRef })
    settingHost: ViewContainerRef;

  constructor(
    router: Router,
    scroll: ScrollService,
    private _message: NzMessageService,
    public menuSrv: MenuService,
    public settings: SettingsService,
  ) {
    // scroll to top in change page
    router.events.subscribe(evt => {
      if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
        this.isFetching = true;
      }
      if (evt instanceof NavigationError || evt instanceof NavigationCancel) {
        this.isFetching = false;
        _message.error(`无法加载${evt.url}路由`, { nzDuration: 1000 * 3 });
        return;
      }
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      setTimeout(() => {
        scroll.scrollToTop();
        this.isFetching = false;
      }, 100);
    });
  }
}
