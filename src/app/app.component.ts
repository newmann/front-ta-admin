import {Component, ElementRef, HostBinding, Inject, OnInit, Renderer2} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SettingsService, TitleService } from '@delon/theme';
import { filter } from 'rxjs/operators';
import {CacheService} from '@delon/cache';
import { VERSION as VERSION_ALAIN } from '@delon/theme';
import {DA_SERVICE_TOKEN, ITokenService, JWTTokenModel, SimpleTokenModel} from '@delon/auth';
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
    el: ElementRef,
    renderer: Renderer2,
    private settings: SettingsService,
    private router: Router,
    private titleSrv: TitleService,
    private cacheService: CacheService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
      renderer.setAttribute(
          el.nativeElement,
          'ng-alain-version',
          VERSION_ALAIN.full,
      );
      // renderer.setAttribute(el.nativeElement, 'ng-zorro-version', VERSION_ZORRO.full);

  }

  ngOnInit() {
      if (this.electronService.isElectron()) {
          console.log('Mode electron');
          // console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
          // console.log('NodeJS childProcess', this.electronService.childProcess);
      } else {
          console.log('Mode web');
      }

    // 判断一下，如果当前有有效的token，就自动登录，否则显示登录界面
    console.log('IN AppComponent init...');
      //todo delon的bug，先获取简单token，判断是否有效后再按JWTtoken方式获取
      let s: SimpleTokenModel;
      s = this.tokenService.get();
      console.log('IN AppComponent, SimpleTokenModel:', s);
      if (s.token) {
          //如果token有效，则获取本地的资源，恢复到上次退出状态。
          let token: JWTTokenModel;

          token = this.tokenService.get<JWTTokenModel>(JWTTokenModel);
          console.log('IN AppComponent, token:', token);
          // console.log('IN AppComponent, payload:', token.payload);
          // console.log('token expired? :', token.isExpired(0));
          if (token){
              console.log('IN AppComponent, token.token:', token.token);
              if (token.isExpired(0)) {
                  console.log('token expired, 进入登录界面'); //进入登录界面
                  console.log('token payload:', token.payload);
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

      }else{
          console.log('没有设置token, 需要登录。');
          this.router.navigate(['/passport/login']);
      }

    this.router.events
        .pipe(filter(evt => evt instanceof NavigationEnd))
        .subscribe(() => this.titleSrv.setTitle());
  }
}
