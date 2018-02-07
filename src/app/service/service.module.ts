import { ChatService } from './chat/chat.service';
import { AuthService } from './auth/auth.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './../core/module-import-guard';
import { AuthDataService } from 'app/service/auth/auth.data.service';
import { CustomStompRService } from 'app/service/chat/custom.stomp.r.service';
import { API_URL_LOGIN } from 'app/service/constant/backend.url.constant';


@NgModule({
    providers: [
      AuthService,
      AuthDataService,
      ChatService,
      CustomStompRService,
      {
        provide: API_URL_LOGIN,
        useValue: 'http://localhost:8090/api/auth/login'
      }
    ]
})
export class ServiceModule {
  constructor( @Optional() @SkipSelf() parentModule: ServiceModule) {
    throwIfAlreadyLoaded(parentModule, 'ServiceModule');
  }
}