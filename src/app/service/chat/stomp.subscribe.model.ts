import { Observable } from 'rxjs/Observable';
import { StompSubscription } from '@stomp/stompjs';
import * as Stomp from '@stomp/stompjs';
export class StompSubscribeModel {
    message: Observable<Stomp.Message>;
    subscription: StompSubscription;

    constructor(msg: Observable<Stomp.Message>, sub: StompSubscription) {
        this.message = msg;
        this.subscription = sub;
    }
}
