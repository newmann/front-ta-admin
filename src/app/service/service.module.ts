import { ChatService } from './chat/chat.service';
import { AuthService } from './auth/auth.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './../core/module-import-guard';
import { AuthDataService } from 'app/service/auth/auth.data.service';
import { CustomStompRService } from 'app/service/chat/custom.stomp.r.service';


@NgModule({
    providers: [
      AuthService,
      AuthDataService,
      ChatService,
      CustomStompRService
    ]
})
export class ServiceModule {
  constructor( @Optional() @SkipSelf() parentModule: ServiceModule) {
    throwIfAlreadyLoaded(parentModule, 'ServiceModule');
  }
}
