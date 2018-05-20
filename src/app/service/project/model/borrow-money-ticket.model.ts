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
import {BylEntityReference} from "../../model/entity-reference.model";
import {BylBorrowMoneyQualificationPool} from "./borrow-money-qualification-pool.model";

export class BylBorrowMoneyTicket extends BylBaseModel {
    billNo: string;
    name: string;
    project: BylEmbeddableProject = new BylEmbeddableProject();

    address: BylEmbeddableAddress = new BylEmbeddableAddress();

    reason: string;
    amount: number;

    borrower: BylBorrowMoneyQualificationPool = new BylBorrowMoneyQualificationPool(); //界面用

    borrowAction: BylEmbeddableBorrowAction = new BylEmbeddableBorrowAction();
    checkAction: BylEmbeddableCheckAction = new BylEmbeddableCheckAction();
    receiveAction: BylEmbeddableReceiveAction =new BylEmbeddableReceiveAction();

    settlementDateTime: number;
    settlementTicketId: string;
    settlementTicketNo: string;

    status: number;


}
