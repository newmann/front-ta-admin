import {Component, HostBinding, Inject, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SettingsService, TitleService } from '@delon/theme';
import { filter } from 'rxjs/operators';
import {CacheService} from '@delon/cache';
import {DA_SERVICE_TOKEN, ITokenService, JWTTokenModel} from '@delon/auth';

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
    private titleSrv: TitleService,
    private cacheService: CacheService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
  }

  ngOnInit() {
    // 判断一下，如果当前有有效的token，就自动登录，否则显示登录界面
    console.log('IN AppComponent init...');

    //如果token有效，则获取本地的资源，恢复到上次退出状态。
    let token: JWTTokenModel;
    token = this.tokenService.get<JWTTokenModel>();
    console.log('IN AppComponent, token:', token.token);
    console.log('token expired? :', token.isExpired);
    if (token.isExpired) {
          //直接进入操作界面
          this.router.navigate(['/']);
    } else {
          //进入登录界面
          this.router.navigate(['/passport/login']);
    }

    this.router.events
        .pipe(filter(evt => evt instanceof NavigationEnd))
        .subscribe(() => this.titleSrv.setTitle());
  }
}
