/**
 * @Description: 用于跟踪明细对象。
 *  每个明细对象一定都有自己所属的主对象和一个顺序编号，以便于界面显示
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-03 14:23
 **/
import {BylBaseModel} from "./base.model";
import {BylEmbeddableCheckAction} from "./embeddable-check-action.model";
import {BylDatetimeUtils} from "../utils/datetime.utils";
import {BylStringUtils} from "../utils/string.utils";

export class BylTicketBaseModal extends BylBaseModel{
    billNo: string;
    status: number;
    checkAction: BylEmbeddableCheckAction = new BylEmbeddableCheckAction();

    get checkActionDisplay(){
        if(this.checkAction){
            return BylStringUtils.mixCodeName(this.checkAction.checkCode,this.checkAction.checkName)
                .concat('-')
                .concat(BylDatetimeUtils.formatDateTime(this.checkAction.checkDateTime || null))
        }
    }

    set checkActionDisplay(value: string){

    }
}
