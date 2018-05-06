import { Component, HostBinding, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SettingsService, TitleService } from '@delon/theme';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {

  @HostBinding('class.layout-fixed') get isFixed() { return this.settings.layout.fixed; }
  @HostBinding('class.layout-boxed') get isBoxed() { return this.settings.layout.boxed; }
  @HostBinding('class.aside-collapsed') get isCollapsed() { return this.settings.layout.collapsed; }

  constructor(
    private settings: SettingsService,
    private router: Router,
    private titleSrv: TitleService) {
  }

  ngOnInit() {
    // 判断一下，如果当前有有效的token，就自动登录，否则显示登录界面
    // console.log('IN AppComponent init...');
    // if (this.cacheService.get('token') == null) {

    //   this.router.navigate(['/passport/login']);
    // } else {
    //   console.log('token=' + this.cacheService.get('token') + '所以，自动登录。');
    // }
    this.router.events
        .pipe(filter(evt => evt instanceof NavigationEnd))
        .subscribe(() => this.titleSrv.setTitle());
  }
}
