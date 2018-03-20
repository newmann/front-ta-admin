/**
 * @Description:
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-20 20:19
 **/
import {NzLocaleService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {ApplicationRef, ComponentFactoryResolver, Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class CrudWaitingService {
    showSaving: NzModalSubject;

    constructor(  private modalService: NzModalService
                  ){

    }


}
