/**
 * @Description: 借款单
 * @Author: newmann
 * @Date: Created in 21:05 2018-01-22
 */
import { BaseModel } from '../model/base.model';
import {EmbeddableAddress} from "../model/embeddable-address.model";
import {EmbeddableContactMethod} from "../model/embeddable-contact-method.model";
import {EmbeddableProject} from "../model/embeddable-project.model";

export class BorrowMoneyTicket extends BaseModel {
    billNo: string;
    name: string;
    project: EmbeddableProject;

    address: EmbeddableAddress;

    reason: string;
    amount: number;

    borrowAction: EmbeddableBorrowAction;
    checkAction:EmbeddableCheckAction;
    receiveAction:EmbeddableReceiveAction;

    settlementDateTime: number;
    settlementTicketId: string;
    settlementTicketNo: string;

    status: number;


}
