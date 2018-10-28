/**
 * @Description: 用于跟踪明细的明细对象。
 *  每个明细对象一定都有自己所属的主对象和一个顺序编号，以便于界面显示
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-03 14:23
 **/

export abstract class BylDetail2BaseModal{
    id: string;
    masterId: string;//所属主对象的id
    detailId: string;
    lineNo: number;
    remarks: string;
}
