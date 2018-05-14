/**
 * @Description:
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-05-12 22:14
 **/
import {Pipe, PipeTransform} from "@angular/core";
import {BylProjectStatusManager} from "../model/project-status.enum";

@Pipe({name: 'bylProjectStatus'})
export class BylProjectStatusPipe implements PipeTransform {
    transform(value: number): string {
        return BylProjectStatusManager.getCaption(value);
    }
}
