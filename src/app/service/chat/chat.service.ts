import {Injectable, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs';
import {Message} from '@stomp/stompjs';
import {BylAuthDataService} from 'app/service/auth/auth-data.service';
// import * as SockJS from "sockjs-client";
// import * as Stomp from "@stomp/stompjs";
import {StompConfig, StompState} from '@stomp/ng2-stompjs';

import {CustomStompRService} from './custom.stomp.r.service';
import {StompHeaders} from '@stomp/ng2-stompjs/src/stomp-headers';
import {ChatMessageModel} from './chat.message.model';
// import { exitCodeFromResult } from '@angular/compiler-cli';
import {environment} from '@env/environment';
import {NzMessageService} from 'ng-zorro-antd';
import {StompSubscribeModel} from './stomp.subscribe.model';
import {map} from 'rxjs/operators';
/**
 *
 *
 * @export
 * @class ChatService
 */
@Injectable()
export class ChatService implements OnDestroy {
  ngOnDestroy(): void {
    // this.tokenSubscription.unsubscribe();
    // this.accountSubscription.unsubscribe();
  }

  public static WEBSOCKET_ENDPOINT = '/beiyelin';
  public static WEBSOCKET_CHANNEL_TOPIC = '/topic';
  public static WEBSOCKET_CHANNEL_SYSTEM = '/user/system';

  public static WEBSOCKET_PUBLISH_CRUD = '/app/crud/submit';
  public static WEBSOCKET_PUBLISH_CHAT = '/app/chat/submit';

  websocketState$: Observable<String>;
  generalMessage$: Observable<String>;
  chatMessage$: Observable<ChatMessageModel<any>>;

  generalSubscribe: StompSubscribeModel;
  chatSubscribe: StompSubscribeModel;

  defaultUri = ''; // = "http://localhost:8090/beiyelin?Authorization=123456";

  stompConfig: StompConfig; // 链接和断开的时候使用
  // 在publish之后，publis的url会写到headers中，造成后续断开操作在后台报错，所hi这里需要单独设置一个
  publishHeaders: StompHeaders;
  subscribeHeaders: StompHeaders;

  // tokenSubscription: Subscription;
  // accountSubscription: Subscription;

  // token$ = {
  //   next: t => {
  //     this.defaultUri = environment.WEBSOCKET + ChatService.WEBSOCKET_ENDPOINT + '?Authorization=' + t;
  //     this.stompConfig.url = this.defaultUri;
  //   },
  //   error: e => { console.log(e); }
  // };
  // account$ = {
  //   next: a => {
  //     this.stompConfig.headers = {
  //       user: a.id,
  //       passcode: '123456'
  //     };
  //     this.publishHeaders = {
  //       user: a.id,
  //       passcode: '123456'
  //     };
  //     this.subscribeHeaders = {
  //       user: a.id,
  //       passcode: '123456'
  //     };
  //   },
  //   error: e => { console.log(e); }
  // };

  constructor(private authData: BylAuthDataService,
    private msg: NzMessageService,
    private stompService: CustomStompRService) {
    this.websocketState$ = this.stompService.state.pipe(
            map((state: number) => StompState[state])
        );


    // 在stomp连接接成功后订阅两个频道
    this.stompService.connectObservable.subscribe(statue => {

      this.generalMessage$ = this.stompService.subscribe(ChatService.WEBSOCKET_CHANNEL_TOPIC).pipe(
            map((message: Message) => {
              console.log('topic:' + message.body);
              return message.body;
            })
        )
        ;
      this.generalMessage$.subscribe((m) => {
          console.log(m);
      });

      this.chatMessage$ = this.stompService.subscribe(ChatService.WEBSOCKET_CHANNEL_SYSTEM)
          .pipe(
            map((message: Message) => {
              console.log('/user/system:' + message.body);
              return JSON.parse(message.body);
            })
        )
        ;
      this.chatMessage$.subscribe((m) => {
        console.log(m.data);
      });

    });

  }

  private initStompConfig() {
    // 2
    this.defaultUri = environment.WEBSOCKET + ChatService.WEBSOCKET_ENDPOINT + '?Authorization=' + this.authData.currentUserId;
    // 先初始化变量，后订阅authData
    this.stompConfig = {
      // Which server?
      url: this.defaultUri,

      // Headers
      // Typical keys: login, passcode, host
      headers: {
        user: this.authData.currentUserId,
        token: this.authData.Token,
        passcode: '123456'
      },

      // How often to heartbeat?
      // Interval in milliseconds, set to 0 to disable
      heartbeat_in: 0, // Typical value 0 - disabled
      heartbeat_out: 20000, // Typical value 20000 - every 20 seconds

      // Wait in milliseconds before attempting auto reconnect
      // Set to 0 to disable
      // Typical value 5000 (5 seconds)
      reconnect_delay: 5000,

      // Will log diagnostics on console
      debug: true
    };

    this.publishHeaders = {
      user: this.authData.currentUserId,
      passcode: '123456'
    };
    this.subscribeHeaders = {
      user: this.authData.currentUserId,
      passcode: '123456'
    };
  }
  /**
   * 1、判断是否已经登录
   * 2、断开现有链接
   * 2、初始化config
   * 3、登录、订阅
   */
  public initAndConnect() {
    // 1
    if (!this.authData.authenticated) {
      console.log('还没有登录，无法打开消息通道。');
      this.msg.warning('还没有登录，无法打开消息通道。');
      return;
    }
    // 2
    this.disconnectStomp();

    // 3
    this.initStompConfig();
    // if (this.socketjs == null) {
    //   this.socketjs = new SockJS(this.defaultUri);
    // }
    // this.stompClient = Stomp.over(this.socketjs);
    // if (this.stompClient.connected) {
    //   console.log('Stomp client is connecting');
    // } else {
    //   this.stompClient.connect({'Authorization': this.authData.token},
    //     frame => {
    //       console.log('Connected: ' + frame);
    //     },
    //     err => {
    //       console.log('err', err);
    //     },
    //   );
    // 4
    this.connectStomp();

    this.sendMsg('test');

  }

  private connectStomp() {
    this.stompService.config = this.stompConfig;
    this.stompService.initAndConnect();
    // this.generalMessage$ = this.stompService.subscribe(ChatService.WEBSOCKET_CHANNEL_TOPIC)
    //   .map((message: Message) => {
    //     console.log('收到topic频道消息:' + message.body);
    //     return message.body;
    //   })
    //   ;
    // this.chatMessage$ = this.stompService.directSubscribe(ChatService.WEBSOCKET_CHANNEL_SYSTEM)
    //   .map((message: Message) => {
    //     console.log('收到/user/system频道消息:' + message.body);
    //     return JSON.parse(message.body);
    //   })
    //   ;
    // this.chatMessage$.subscribe((m) => {
    //   console.log(m.data);
    // });
  }

  /**
 * 1、判断是否已经登录
 * 2、断开现有链接
 * 3、初始化config
 * 4、设置指定的uri
 * 5、登录、订阅
 */
  public connectTargetURI(uri: string) {
    // 1
    if (!this.authData.authenticated) {
      console.log('还没有登录，无法打开消息通道。');
      this.msg.warning('还没有登录，无法打开消息通道。');
      return;
    }
    // 2
    this.disconnectStomp();
    // 3
    this.initStompConfig();
    // 4
    this.stompConfig.url = uri;
    // 5
    this.connectStomp();

  }

  public disconnectStomp() {
    if (this.stompService.connected()) {
      if (this.stompService.state.getValue() === StompState.CONNECTED) {
        console.log(`Will unsubscribe from ${ChatService.WEBSOCKET_CHANNEL_TOPIC} at Stomp`);
        // this.generalSubscribe.subscription.unsubscribe();
        console.log(`Will unsubscribe from ${ChatService.WEBSOCKET_CHANNEL_SYSTEM} at Stomp`);
        // this.chatSubscribe.subscription.unsubscribe();

      } else {
        console.log(`Stomp not connected, no need to unsubscribe at Stomp`);
      }
      this.stompService.disconnectWithHeader(this.stompConfig.headers);
    }
  }


  public sendMsg(msg: string) {
    const m = new ChatMessageModel<string>();
    m.id = '1';
    m.action = 'hello';
    m.data = msg;
    this.stompService.publish('/app/guest/hello', JSON.stringify(m), this.publishHeaders);
  }

  public CRUD(msg: any) {
    this.stompService.publish(ChatService.WEBSOCKET_PUBLISH_CRUD, JSON.stringify(msg), this.publishHeaders);
  }

  public Chat(msg: any) {
    this.stompService.publish(ChatService.WEBSOCKET_PUBLISH_CHAT, JSON.stringify(msg), this.publishHeaders);
  }

}
