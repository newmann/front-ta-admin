import { enableProdMode, ViewEncapsulation } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { hmrBootstrap } from './hmr';

import { preloaderFinished } from '@delon/theme';
import {CheckClientBrowserType} from './app/service/utils/client-browser-type.utils';
import {WxAppModule} from './wechat/wxapp.module';
preloaderFinished();

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => {
    // // 判断是否在微信环境，如果在微信环境，则进入微信界面，否则进入正常界面
    // const clientBrowseType = CheckClientBrowserType().from();
    // if (clientBrowseType === 'weixin') {
    //     return platformBrowserDynamic().bootstrapModule(WxAppModule, {
    //         defaultEncapsulation: ViewEncapsulation.Emulated,
    //         preserveWhitespaces: false
    //     });
    //
    // } else {
        return platformBrowserDynamic().bootstrapModule(AppModule, {
            defaultEncapsulation: ViewEncapsulation.Emulated,
            preserveWhitespaces: false
        });
    // }
};

if (environment.hmr) {
  if (module['hot']) {
      hmrBootstrap(module, bootstrap);
  } else {
      console.error('HMR is not enabled for webpack-dev-server!');
      console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap().then(() => {
    if ((<any>window).appBootstrap) {
      (<any>window).appBootstrap();
    }
  });
}
