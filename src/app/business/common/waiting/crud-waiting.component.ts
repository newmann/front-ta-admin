import {Component, Input, OnInit} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {NzModalRef} from 'ng-zorro-antd';

/**
 *  crud界面调用本界面之间的消息传递
 *  bylAdd,通知调用方继续新增
 *  bylSaveCorrect, 调用方通知本界面保存成功，
 *  bylSaveError，调用方通知本界面保存失败
 * **/
export enum BylCrudEvent {
    bylAdd,
    bylUpdate,
    bylSaveCorrect,
    bylSaveError,
    bylLoading,
    bylSaving
}

@Component({
    selector: 'byl-crud-waiting',
    template: `
        <div>
            <!--<h4>{{_name}}</h4>-->
            <!--<br/>-->
            <div class="customize-content">
                <nz-spin *ngIf="! showSaveCorrectMsg" nzTip="{{tipMsg}}"></nz-spin>
            </div>
            <div *ngIf="showSaveCorrectMsg">
                <h4> 保存成功！ </h4>
            </div>
            <div class="customize-footer" *ngIf="showSaveCorrectMsg">
                <!--<button nz-button [nzType]="'primary'" [nzSize]="'large'" (click)="emitDataOutside($event)">-->
                    <!--继续新增-->
                <!--</button>-->
                <button nz-button [nzType]="'default'" [nzSize]="'large'" (click)="handleCancel($event)">
                    退出
                </button>
            </div>
        </div>
    `,
    styles: [
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
export class BylCrudWaitingComponent implements OnInit {

    // _name: string;
    protected showSaveCorrectMsg = false;
    protected tipMsg= "...";

    emitDataOutside() {
        // this.subject.next(BylCrudEvent[BylCrudEvent.bylAdd]); // 通知调用新增
        this.subject.destroy(); // 退出界面
    }

    handleCancel(e) {
        this.subject.destroy();
    }

    constructor(private subject: NzModalRef) {

        // this.subject.on('onDestory', () => {
        //     console.log('destroy');
        // });

        // this.subject.on(BylCrudEvent[BylCrudEvent.bylSaveCorrect], () => {
        //     // this.showSaveCorrectMsg = true;
        //     this.tipMsg = "保存成功！";
        //     // this.subject.destroy();//退出显示界面
        //     // console.log(BylCrudEvent[BylCrudEvent.bylSaveCorrect]);
        // });
        //
        // this.subject.on(BylCrudEvent[BylCrudEvent.bylSaveError], () => {
        //     // this.showSaveCorrectMsg = true;
        //     this.tipMsg = "保存失败...";
        //     // this.subject.destroy();//退出显示界面
        //     // console.log(BylCrudEvent[BylCrudEvent.bylSaveCorrect]);
        // });
        //
        // this.subject.on(BylCrudEvent[BylCrudEvent.bylLoading], () => {
        //     this.tipMsg = "正在装载...";
        // });
        //
        // this.subject.on(BylCrudEvent[BylCrudEvent.bylSaving], () => {
        //     this.tipMsg = "正在提交...";
        // });

    }

    ngOnInit() {
    }
}
