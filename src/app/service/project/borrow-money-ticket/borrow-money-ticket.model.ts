/**
 * @Description: 借款单
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import { BylBaseModel } from '../../model/base.model';
import {BylEmbeddableAddress} from "../../model/embeddable-address.model";
import {BylEmbeddableContactMethod} from "../../model/embeddable-contact-method.model";
import {BylEmbeddableProject} from "../../model/embeddable-project.model";
import {EmbeddableBorrowAction} from './embeddable-borrow-action.model';
import {BylEmbeddableCheckAction} from '../../model/embeddable-check-action.model';
import {EmbeddableReceiveAction} from './embeddable-receive-action.model';

export class BorrowMoneyTicket extends BylBaseModel {
    billNo: string;
    name: string;
    project: BylEmbeddableProject;

    address: BylEmbeddableAddress;

    reason: string;
    amount: number;

    borrowAction: EmbeddableBorrowAction;
    checkAction: BylEmbeddableCheckAction;
    receiveAction: EmbeddableReceiveAction;

    settlementDateTime: number;
    settlementTicketId: string;
    settlementTicketNo: string;

    status: number;


}
