import {Component, HostBinding, Inject, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SettingsService, TitleService } from '@delon/theme';
import { filter } from 'rxjs/operators';
import {CacheService} from '@delon/cache';
import {DA_SERVICE_TOKEN, ITokenService, JWTTokenModel} from '@delon/auth';
import {BylElectronService} from './service/electron/electron.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {

  @HostBinding('class.layout-fixed') get isFixed() { return this.settings.layout.fixed; }
  @HostBinding('class.layout-boxed') get isBoxed() { return this.settings.layout.boxed; }
  @HostBinding('class.aside-collapsed') get isCollapsed() { return this.settings.layout.collapsed; }

  constructor(
      private electronService: BylElectronService,
    private settings: SettingsService,
    private router: Router,
    private titleSrv: TitleService,
    private cacheService: CacheService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
  }

  ngOnInit() {
      if (this.electronService.isElectron()) {
          console.log('Mode electron');
          console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
          console.log('NodeJS childProcess', this.electronService.childProcess);
      } else {
          console.log('Mode web');
      }

    // 判断一下，如果当前有有效的token，就自动登录，否则显示登录界面
    console.log('IN AppComponent init...');

    //如果token有效，则获取本地的资源，恢复到上次退出状态。
    let token: JWTTokenModel;
    token = this.tokenService.get<JWTTokenModel>(JWTTokenModel);
    console.log('IN AppComponent, token:', token.token);
    // console.log('IN AppComponent, payload:', token.payload);
    // console.log('token expired? :', token.isExpired(0));
    if (token){
        if (token.isExpired(0)) {
            console.log('token expired, 进入登录界面'); //进入登录界面
            console.log('token payload:', token.payload);

            // console.log('token payload.exp:', token.payload.exp);
            //
            // const date = new Date(0);
            // date.setUTCSeconds(token.payload.exp);
            //
            // console.log("date.setUTCSeconds(token.payload.exp):",date.valueOf());
            // console.log("new Date().valueOf():", new Date().valueOf());
            // // return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
            // console.log("reslut:", !(date.valueOf() > new Date().valueOf() + 0 * 1000));

            this.router.navigate(['/passport/login']);

        } else {
            console.log('token validate, 进入主界面');
            //直接进入操作界面
            // this.router.navigate(['/']);

        }

    } else{
        console.log('没有设置token, 需要登录。');
        this.router.navigate(['/passport/login']);
    }

    this.router.events
        .pipe(filter(evt => evt instanceof NavigationEnd))
        .subscribe(() => this.titleSrv.setTitle());
  }
}
