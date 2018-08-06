import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { deepGet } from '@delon/util';
import { UploadFile, UploadChangeParam, NzModalService } from 'ng-zorro-antd';
import {ControlWidget} from "@delon/form";
import {getData, toBool} from "@delon/form/src/src/utils";
import {BylFileServerService} from "../../../service/fileserver/service/file-server.service";
import {HttpResponse} from "@angular/common/http";
import { saveAs } from 'file-saver';

@Component({
  selector: 'byl-file-upload',
  template: `
  <sf-item-wrap [id]="id" [schema]="schema" [ui]="ui" [showError]="showError" [error]="error" [showTitle]="schema.title">

    <nz-upload
      [nzType]="i.type"
      [nzFileList]="fileList"
      [nzDisabled]="disabled"
      [nzAction]="i.action"
      [nzAccept]="i.accept"
      [nzLimit]="i.limit"
      [nzSize]="i.size"
      [nzFileType]="i.fileType"
      [nzHeaders]="ui.headers"
      [nzData]="ui.data"
      [nzListType]="i.listType"
      [nzMultiple]="i.multiple"
      [nzName]="i.name"
      [nzShowUploadList]="i.showUploadList"
      [nzWithCredentials]="i.withCredentials"
      [nzRemove]="ui.remove"
      [nzPreview]="handlePreview"
      (nzChange)="change($event)">
      <ng-container [ngSwitch]="btnType">
        <ng-container *ngSwitchCase="'plus'">
          <i class="anticon anticon-plus"></i>
          <div class="ant-upload-text" [innerHTML]="i.text"></div>
        </ng-container>
        <ng-container *ngSwitchCase="'drag'">
          <p class="ant-upload-drag-icon"><i class="anticon anticon-inbox"></i></p>
          <p class="ant-upload-text" [innerHTML]="i.text"></p>
          <p class="ant-upload-hint" [innerHTML]="i.hint"></p>
        </ng-container>
        <ng-container *ngSwitchDefault>
          <button type="button" nz-button>
            <i class="anticon anticon-upload"></i><span [innerHTML]="i.text"></span>
          </button>
        </ng-container>
      </ng-container>
    </nz-upload>

  </sf-item-wrap>
  `,
  preserveWhitespaces: false,
})
export class BylFileUploadWidgetSFComponent extends ControlWidget implements OnInit {
    /* 用于注册小部件 KEY 值 */
    static readonly KEY = 'bylFileUpload';

  i: any;
  fileList: UploadFile[] = [];
  btnType = '';

  constructor(cd: ChangeDetectorRef,
              private modalSrv: NzModalService,
              private fileServerService: BylFileServerService
  ) {
    super(cd);
  }

  ngOnInit(): void {
    this.i = {
      type: this.ui.type || 'select',
      text: this.ui.text || '点击上传',
      action: this.ui.action || '',
      accept: this.ui.accept || '',
      limit: this.ui.limit == null ? 0 : +this.ui.limit,
      size: this.ui.size == null ? 0 : +this.ui.size,
      fileType: this.ui.fileType || '',
      listType: this.ui.listType || 'text',
      multiple: toBool(this.ui.multiple, false),
      name: this.ui.name || 'file',
      showUploadList: toBool(this.ui.showUploadList, true),
      withCredentials: toBool(this.ui.withCredentials, false),
      resReName: (this.ui.resReName || '').split('.'),
    };
    if (this.i.listType === 'picture-card') this.btnType = 'plus';
    if (this.i.type === 'drag') {
      this.i.listType = null;
      this.btnType = 'drag';
      this.i.text = this.ui.text || `单击或拖动文件到该区域上传`;
      this.i.hint =
        this.ui.hint || `支持单个或批量，严禁上传公司数据或其他安全文件`;
    }
  }

  change(args: UploadChangeParam) {
    if (this.ui.change) this.ui.change(args);
    if (args.type !== 'success') return;
    this.notify(args.fileList);
  }

  reset(value: any) {
    getData(this.schema, this.ui, this.formProperty.formData).subscribe(
      list => {
        this.fileList = list as UploadFile[];
        this.notify(this.fileList);
        this.detectChanges();
      },
    );
  }

  private notify(fileList: UploadFile[]) {
    const res = fileList.map(item =>
      deepGet(item.response, this.i.resReName, item.response),
    );
    this.formProperty.setValue(
      this.i.multiple === true ? res : res.pop(),
      false,
    );
  }

  handlePreview = (file: UploadFile) => {
      console.log("in BylFileUploadWidget:", file);
      this.fileServerService.serveFile(file.url)
          .subscribe(
              (res: HttpResponse<Blob>) => {
                  if (res.status !== 200 || res.body.size <= 0) {
                      // this.error.emit(res);
                      return;
                  }
                  const disposition: any = this.getDisposition(
                      res.headers.get('content-disposition'),
                  );
                  const fileName =
                      file.name ||
                      disposition[`filename*`] ||
                      disposition[`filename`] ||
                      res.headers.get('filename') ||
                      res.headers.get('x-filename');
                  saveAs(res.body, decodeURI(fileName));
                  console.log('下载成功:',res);

              },
              err => {
                   console.error('下载错误：',err);

              }
          );
    // this.modalSrv
    //   .create({
    //     nzContent: `<img src="${file.url ||
    //       file.thumbUrl}" class="img-fluid" />`,
    //     nzFooter: null,
    //   })
    //   .afterClose.subscribe(() => this.detectChanges());
  };

    private getDisposition(data: string) {
        const arr: any = (data || '')
            .split(';')
            .filter(i => i.includes('='))
            .map(v => {
                const strArr = v.split('=');
                const utfId = `UTF-8''`;
                let value = strArr[1];
                if (value.startsWith(utfId)) value = value.substr(utfId.length);
                return { [strArr[0].trim()]: value };
            });
        return arr.reduce((o, item: any) => item, {});
    }
}
