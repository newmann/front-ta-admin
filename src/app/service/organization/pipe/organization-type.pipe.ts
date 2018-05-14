/**
 * @Description:
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-05-12 22:14
 **/
import {Pipe, PipeTransform} from "@angular/core";
import {BylOrganizationTypeManager} from "../model/organization-type.enum";


@Pipe({name: 'bylOrganizationType'})
export class BylOrganizationTypePipe implements PipeTransform {
    transform(value: number): string {
        return BylOrganizationTypeManager.getCaption(value);
    }
}
