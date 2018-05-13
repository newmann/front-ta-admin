/**
 * @Description:
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-05-12 22:14
 **/
import {Pipe, PipeTransform} from "@angular/core";
import {BylBorrowMoneyTicketStatusManager} from "../model/borrow-money-ticket-status.enum";

@Pipe({name: 'bylBorrowMoneyTicketStatus'})
export class BylBorrowMoneyTicketStatusPipe implements PipeTransform {
    transform(value: number): string {
        return BylBorrowMoneyTicketStatusManager.getStatusCaption(value);
    }
}
