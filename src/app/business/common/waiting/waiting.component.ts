import {Component, Input, OnInit} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {NzModalSubject} from "ng-zorro-antd";

@Component({
  selector: 'byl-waiting',
  template: `
    <div>
      <h4>{{_name}}</h4>
      <br/>
      <nz-spin [nzTip]="'正在提交...'" ></nz-spin>
      <div class="customize-footer">
        <button nz-button [nzType]="'primary'" [nzSize]="'large'" (click)="emitDataOutside($event)">
          传递数据到上层
        </button>
        <button nz-button [nzType]="'default'" [nzSize]="'large'" (click)="handleCancel($event)">
          返 回
        </button>
      </div>
    </div>
  `,
    styles  : [
        `
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
export class WaitingComponent implements OnInit {

    _name: string;

    @Input()
    set name(value: string) {
        this._name = value;
    }

    emitDataOutside() {
        this.subject.next('传出数据');
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
