/**
 * @Description: 状态定义
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-04 19:40
 **/
export interface IStatusItem{
    value: number; //状态值
    caption: string; //状态显示名称

}

export const STATUS_NOT_FIND_VALUE = -9999;
export const STATUS_NOT_FIND_CAPTION = '没找到对应的status定义';

export class DefineStatus{
    data: IStatusItem[];
    constructor(item:IStatusItem,...restofItem: IStatusItem[]){
        this.data.push(item);
        this.data.push(...restofItem);
    }

    getValue(caption:string) : number{
        const filterItem = this.data.filter(item => item.caption === caption);
        if (filterItem.length = 0){
            return STATUS_NOT_FIND_VALUE;
        } else {
            return filterItem[0].value;
        }
    }

    getCaption(value: number) : string{
        const filterItem = this.data.filter(item => item.value === value);
        if (filterItem.length = 0){
            return STATUS_NOT_FIND_CAPTION;
        } else {
            return filterItem[0].caption;
        }
    }

}
