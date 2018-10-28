/**
 * @Description: 用于跟踪明细对象。
 *  每个明细对象一定都有自己所属的主对象和一个顺序编号，以便于界面显示
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-03 14:23
 **/

export abstract class BylDetailBaseModel{
    id: string;
    masterId: string;//所属主对象的id
    lineNo: number;
    remarks: string;
}
