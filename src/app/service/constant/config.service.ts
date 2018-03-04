/**
 * @Description: 常量定义
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-04 9:59
 **/
import {Injectable} from "@angular/core";

@Injectable()
export class ConfigService{
    private pageSize = 10;

    get PAGESIZE(){ return this.pageSize;}


}
