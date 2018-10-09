/**
 * @Description: ng2-stomp的StompRService中disconnect过程没有提交header信息。这里定制一下
 * @Author: newmann
 * @Date: Created in 22:25 2018-01-30
 */


import {Injectable} from '@angular/core';

@Injectable()
export class CustomStompRService /*extends StompRService*/ {

  // public directSubscribe(queueName: string, headers: StompHeaders = {}): Observable<Stomp.Message> {
  //
  //   this.debug(`Request to subscribe ${queueName}`);
  //
  //   // By default auto acknowledgement of messages
  //   if (!headers['ack']) {
  //     headers['ack'] = 'auto';
  //   }
  //   // let stompSubscription: StompSubscription ;
  //
  //   const ob = Observable.create(
  //     (messages: Observer<Stomp.Message>) => {
  //       /*stompSubscription = */this.client.subscribe(queueName, (message: Stomp.Message) => {
  //         messages.next(message);
  //       }, headers);
  //
  //     }
  //   );
  //   // const result = new StompSubscribeModel(ob, stompSubscription);
  //   return ob;
  //
  //   // const coldObservable = Observable.create(
  //   //   (messages: Observer<Stomp.Message>) => {
  //   //     /*
  //   //      * These variables will be used as part of the closure and work their magic during unsubscribe
  //   //      */
  //   //     let stompSubscription: StompSubscription;
  //
  //   //     let stompConnectedSubscription: Subscription;
  //
  //   //     stompConnectedSubscription = this.connectObservable
  //   //       .subscribe(() => {
  //   //         this.debug(`Will subscribe to ${queueName}`);
  //   //         stompSubscription = this.client.subscribe(queueName, (message: Stomp.Message) => {
  //   //           messages.next(message);
  //   //         },
  //   //           headers);
  //   //       });
  //
  //   //     return () => { /* cleanup function, will be called when no subscribers are left */
  //   //       this.debug(`Stop watching connection state (for ${queueName})`);
  //   //       stompConnectedSubscription.unsubscribe();
  //
  //   //       if (this.state.getValue() === StompState.CONNECTED) {
  //   //         this.debug(`Will unsubscribe from ${queueName} at Stomp`);
  //   //         stompSubscription.unsubscribe();
  //   //       } else {
  //   //         this.debug(`Stomp not connected, no need to unsubscribe from ${queueName} at Stomp`);
  //   //       }
  //   //     };
  //   //   });
  //
  //   /**
  //    * Important - convert it to hot Observable - otherwise, if the user code subscribes
  //    * to this observable twice, it will subscribe twice to Stomp broker. (This was happening in the current example).
  //    * A long but good explanatory article at https://medium.com/@benlesh/hot-vs-cold-observables-f8094ed53339
  //    */
  //   // return coldObservable.share();
  //
  // }
  //
  // disconnectWithHeader(header?: StompHeaders): void {
  //   // Disconnect if connected. Callback will set CLOSED state
  //   if (this.client && this.client.connected) {
  //     // Notify observers that we are disconnecting!
  //     this.state.next(StompState.DISCONNECTING);
  //
  //     this.client.disconnect(
  //       () => this.state.next(StompState.CLOSED)
  //       , header
  //     );
  //   }
  //
  // }
}
