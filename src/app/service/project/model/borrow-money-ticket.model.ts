/**
 * @Description: 借款单
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import { BylBaseModel } from '../../model/base.model';
import {BylEmbeddableAddress} from "../../model/embeddable-address.model";
import {BylEmbeddableContactMethod} from "../../model/embeddable-contact-method.model";
import {BylEmbeddableProject} from "../../model/embeddable-project.model";
import {BylEmbeddableBorrowAction} from './embeddable-borrow-action.model';
import {BylEmbeddableCheckAction} from '../../model/embeddable-check-action.model';
import {BylEmbeddableReceiveAction} from './embeddable-receive-action.model';

export class BylBorrowMoneyTicket extends BylBaseModel {
    billNo: string;
    name: string;
    project: BylEmbeddableProject;

    address: BylEmbeddableAddress;

    reason: string;
    amount: number;

    borrowAction: BylEmbeddableBorrowAction;
    checkAction: BylEmbeddableCheckAction;
    receiveAction: BylEmbeddableReceiveAction;

    settlementDateTime: number;
    settlementTicketId: string;
    settlementTicketNo: string;

    status: number;


}
