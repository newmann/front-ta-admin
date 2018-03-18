import {Component, Input, OnInit} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {NzModalSubject} from "ng-zorro-antd";

@Component({
  selector: 'byl-crud-waiting',
  template: `
    <div>
      <!--<h4>{{_name}}</h4>-->
      <!--<br/>-->
        <div class="customize-content">
          <nz-spin *ngIf="! showSaveCorrect" nzTip="正在提交..."></nz-spin>
          <h4 *ngIf="showSaveCorrect"> 保存成功！ </h4>
        </div>
      <div class="customize-footer">
        <button nz-button [nzType]="'primary'" [nzSize]="'large'" (click)="emitDataOutside($event)">
          新增新一条记录
        </button>
        <button nz-button [nzType]="'default'" [nzSize]="'large'" (click)="handleCancel($event)">
          退出
        </button>
      </div>
    </div>
  `,
    styles  : [
        `
        :host ::ng-deep .customize-content {
            text-align: center;
        }
            
      :host ::ng-deep .customize-footer {
        border-top: 1px solid #e9e9e9;
        padding: 10px 18px 0 10px;
        text-align: right;
        border-radius: 0 0 0px 0px;
        margin: 15px -16px -5px -16px;
      }
    `
    ]
})
export class BylCRUDWaitingComponent implements OnInit {

    // _name: string;
    showSaveCorrect= false;

    // @Input()
    // set name(value: string) {
    //     this._name = value;
    // }

    set saveCorrect(value: boolean){
        this.showSaveCorrect = value;
    }

    emitDataOutside() {
        this.subject.next('new');
    }

    handleCancel(e) {
        this.subject.destroy('onCancel');
    }

    constructor(private subject: NzModalSubject) {
        this.subject.on('onDestory', () => {
            console.log('destroy');
        });
    }

    ngOnInit() {
    }
}
