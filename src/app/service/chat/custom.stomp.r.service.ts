/**
 * @Description: ng2-stomp的StompRService中disconnect过程没有提交header信息。这里定制一下
 * @Author: newmann
 * @Date: Created in 22:25 2018-01-30
 */


import {StompRService, StompState} from '@stomp/ng2-stompjs';
import {StompHeaders} from '@stomp/ng2-stompjs/src/stomp-headers';
import {Injectable} from '@angular/core';

@Injectable()
export class CustomStompRService extends StompRService {

  disconnectWithHeader(header?: StompHeaders): void {
    // Disconnect if connected. Callback will set CLOSED state
    if (this.client && this.client.connected) {
      // Notify observers that we are disconnecting!
      this.state.next(StompState.DISCONNECTING);

      this.client.disconnect(
        () => this.state.next(StompState.CLOSED)
        , header
      );
    }

  }
}