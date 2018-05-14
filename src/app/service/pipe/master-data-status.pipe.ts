/**
 * @Description:
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-05-12 22:14
 **/
import {Pipe, PipeTransform} from "@angular/core";
import {BylMasterDataStatusManager} from "../model/master-data-status.enum";

@Pipe({name: 'bylMasterDataStatus'})
export class BylMasterDataStatusPipe implements PipeTransform {
    transform(value: number): string {
        return BylMasterDataStatusManager.getCaption(value);
    }
}
