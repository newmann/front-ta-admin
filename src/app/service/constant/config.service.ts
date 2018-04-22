/**
 * @Description: 常量定义
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-04 9:59
 **/
import {Injectable} from "@angular/core";

@Injectable()
export class BylConfigService{
    private pageSize = 10;

    private uploadFileUrl = "/api/file-manage/upload-file";
    private uploadMultiFileUrl = "/api/file-manage/upload-multi-file";


    get PAGESIZE(){ return this.pageSize;}

    get UPLOAD_FILE_URL(){ return this.uploadFileUrl;}

    get UPLOAD_MULTI_FILE_URL(){ return this.uploadMultiFileUrl;}
}
