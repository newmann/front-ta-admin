/**
 * 与后台交互的业务bean的通用属性定义
 *
 * @export
 * @abstract
 * @class BylBaseModel
 */
import {BylEmbeddableCreateAction} from "./embeddable-create-action.model";
import {BylEmbeddableModifyAction} from "./embeddable-modify-action.model";
import {BylDatetimeUtils} from "../utils/datetime.utils";
import {BylStringUtils} from "../utils/string.utils";


export class BylBaseModel {
    id: string;
    createAction: BylEmbeddableCreateAction = new BylEmbeddableCreateAction();
    modifyAction: BylEmbeddableModifyAction = new BylEmbeddableModifyAction();
    remarks: string;

    get createrDisplay(){
        if ( this.createAction){
            if ( this.createAction.createId){
                return BylStringUtils.mixCodeName(this.createAction.createCode,this.createAction.createName);
            }
        }

    }
    set createrDisplay(value: string){

    }

    get modifierDisplay(){
        if ( this.modifyAction){
            if ( this.modifyAction.modifyId){
                return BylStringUtils.mixCodeName(this.modifyAction.modifyCode,this.modifyAction.modifyName);
            }
        }

    }

    set modifierDisplay(value: string){}

    get createDateTimeDisplay() {
        return BylDatetimeUtils.formatDateTime(this.createAction.createDateTime);
    }
    set createDateTimeDisplay(value:string){

    }

    get modifyDateTimeDisplay() {
        return BylDatetimeUtils.formatDateTime(this.modifyAction.modifyDateTime);
    }

    set modifyDateTimeDisplay(value: string) {
        //应付对象复制
    }

  }
