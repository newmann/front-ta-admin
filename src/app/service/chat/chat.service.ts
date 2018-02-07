import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Message } from '@stomp/stompjs';
import { AuthDataService } from './auth-data.service';
// import * as SockJS from "sockjs-client";
// import * as Stomp from "@stomp/stompjs";
import { StompConfig, StompRService, StompState } from '@stomp/ng2-stompjs';

import { CustomStompRService } from './custom.stomp.r.service';
import { StompHeaders } from '@stomp/ng2-stompjs/src/stomp-headers';
import { ChatMessageModel } from './chat.message.model';
import { exitCodeFromResult } from '@angular/compiler-cli';
/**
 * 
 * 
 * @export
 * @class ChatService
 */
@Injectable()
export class ChatService {
  public static WEBSOCKET_ENDPOINT = '/beiyelin';
  public static WEBSOCKET_CHANNEL_TOPIC = '/topic';
  public static WEBSOCKET_CHANNEL_SYSTEM = '/user/system';

  public static WEBSOCKET_PUBLISH_CRUD = '/app/crud/submit';
  public static WEBSOCKET_PUBLISH_CHAT = '/app/chat/submit';

  websocketState: Observable<String>;
  generalMessage: Observable<String>;
  chatMessage: Observable<ChatMessageModel<any>>;

  defaultUri: string; // = "http://localhost:8090/beiyelin?Authorization=123456";

  stompConfig: StompConfig; // 链接和断开的时候使用
  // 在publish之后，publis的url会写到headers中，造成后续断开操作在后台报错，所hi这里需要单独设置一个
  publishHeaders: StompHeaders;
  subscribeHeaders: StompHeaders;

  constructor(private authData: AuthDataService, private stompService: CustomStompRService) {
    this.defaultUri = ChatService.WEBSOCKET_ENDPOINT + '?Authorization=' + this.authData.token;

    this.stompConfig = {
      // Which server?
      url: this.defaultUri,

      // Headers
      // Typical keys: login, passcode, host
      headers: {
        user: this.authData.currentUserId,
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

  public initStomp() {

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

    this.stompService.config = this.stompConfig;
    this.stompService.initAndConnect();
    this.websocketState = this.stompService.state
      .map((state: number) => StompState[state]);
    this.generalMessage = this.stompService.subscribe(WebsocketService.WEBSOCKET_CHANNEL_TOPIC)
      .map((message: Message) => {
        console.log('topic:' + message.body);
        return message.body;
      })
      ;
    this.chatMessage = this.stompService.subscribe(WebsocketService.WEBSOCKET_CHANNEL_SYSTEM)
      .map((message: Message) => {
        console.log('/user/system:' + message.body);
        return JSON.parse(message.body);
      })
      ;

  }

  //   public connectWS(uri: string){
  //     if ((this.ws == null) || (this.ws.readyState=== WebSocket.CLOSED)){
  //       this.ws = new WebSocket(uri);
  //       this.ws.onopen = function(e) {
  //         // Check the protocol chosen by the server
  //         console.log("WS opened ");
  //       };
  // // Event handler for receiving text messages
  //       this.ws.onmessage = function(e) {
  //         if(typeof e.data === "string"){
  //           console.log("WS String message received", e, e.data);
  //         } else {
  //           console.log("WS Other message received", e, e.data);
  //         }
  //       };
  // // Event handler for errors in the WebSocket object
  //       this.ws.onerror = function(e) {
  //         console.log("WS Error: " , e);
  //         //Custom function for handling errors
  //
  //       };
  // // Event handler for closed connections
  //       this.ws.onclose = function(e) {
  //         console.log("WS Connection closed", e);
  //       };
  //     }
  //   }
  //
  //   public disconnectWS(){
  //     this.ws.close();
  //   }
  //
  //   public connectSockjs(uri: string){
  //
  //     if (this.socketjs == null) {
  //       this.socketjs = new SockJS(uri);
  //       console.log('connect Sockjs')
  //     }
  //
  //   }
  //   public disconnectSockjs(){
  //     if (this.socketjs != null) {
  //       this.socketjs.close();
  //       this.socketjs = null;
  //       console.log('disconnect Sockjs')
  //     }
  //
  //   }
  public connectStomp(uri: string) {
    this.stompConfig.url = uri;
    this.initStomp();
  }
  public disconnectStomp() {

    this.stompService.disconnectWithHeader(this.stompConfig.headers);
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
