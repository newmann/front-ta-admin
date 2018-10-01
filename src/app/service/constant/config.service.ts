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
    private zhCN = 'assets/tmp/i18n/zh-CN.json';
    private defaultMenuUrl = 'assets/tmp/default-menu.json';
    get SETTING_LANG() {return 'assets/tmp/i18n/zh-CN.json';};
    get SETTING_APP() { return 'assets/tmp/app-data.json';}

    get PAGESIZE(){ return this.pageSize;}

    get UPLOAD_FILE_URL(){ return this.uploadFileUrl;}

    get UPLOAD_MULTI_FILE_URL(){ return this.uploadMultiFileUrl;}

    get SETTING_ZH() { return this.zhCN}

    get DEFAULT_MENU_URL() {return this.defaultMenuUrl}
}
