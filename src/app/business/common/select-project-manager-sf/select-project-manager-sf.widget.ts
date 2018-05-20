/**
 * @Description:
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-05-18 20:20
 **/
import {Component, OnInit} from "@angular/core";
import {ControlWidget} from "@delon/form";


@Component({
    selector: 'byl-select-project-manager-sf',
    template: `
        <sf-item-wrap [id]="id" [schema]="schema" [ui]="ui" [showError]="showError" [error]="error" [showTitle]="schema.title">
            <ueditor
                [ngModel]="value"
                [config]="config"
                [loadingTip]="loading"
                (onContentChange)="change($event)">
            </ueditor>
        </sf-item-wrap>
    `,
    preserveWhitespaces: false
})
export class BylSelectProjectManagerSFComponent extends ControlWidget implements OnInit {
    static readonly KEY = 'bylSelectProjectManagerSF';

    config: any;
    loading: string;

    ngOnInit(): void {
        this.loading = this.ui.loading || '加载中……';
        this.config = this.ui.config || {};
    }

    change(value: string) {
        if (this.ui.change) this.ui.change(value);
        this.setValue(value);
    }


}
