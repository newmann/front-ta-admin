import {Component, OnInit, ChangeDetectorRef, Inject} from '@angular/core';
import {ControlWidget, SFSchemaEnum, SFSchema, SFUISchemaItem, SFComponent, SFSchemaEnumType} from '@delon/form';
import {of, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BylEntityReference} from "../../../service/model/entity-reference.model";
import {BylResultBody} from "../../../service/model/result-body.model";
import {BylNationService} from "../../../service/person/service/nation.service";
import {map} from "rxjs/operators";
import {getData} from "./sf-utils";

@Component({
    selector: 'byl-select-nation',
    template:
            `
        <sf-item-wrap [id]="id" [schema]="schema" [ui]="ui" [showError]="showError" [error]="error"
                      [showTitle]="schema.title">
            <nz-select
                [nzDisabled]="disabled"
                [nzSize]="ui.size"
                [ngModel]="value"
                (ngModelChange)="setValue($event)"
                [nzPlaceHolder]="ui.placeholder"
                [nzAllowClear]="i.allowClear"
                [nzAutoFocus]="i.autoFocus"
                [nzDropdownClassName]="i.dropdownClassName"
                [nzDropdownMatchSelectWidth]="i.dropdownMatchSelectWidth"
                [nzServerSearch]="i.serverSearch"
                [nzMaxMultipleCount]="i.maxMultipleCount"
                [compareWith]="compareFn"
                [nzMode]="i.mode"
                [nzNotFoundContent]="i.notFoundContent"
                [nzShowSearch]="i.showSearch"
                (nzOpenChange)="openChange($event)"
                (nzOnSearch)="searchChange($event)"
                (nzScrollToBottom)="scrollToBottom($event)">
                <ng-container *ngIf="!hasGroup">
                    <nz-option
                        *ngFor="let o of data"
                        [nzLabel]="o.label"
                        [nzValue]="o.value"
                        [nzDisabled]="o.disabled">
                    </nz-option>
                </ng-container>
                <ng-container *ngIf="hasGroup">
                    <nz-option-group *ngFor="let i of data" [nzLabel]="i.label">
                        <nz-option
                            *ngFor="let o of i.children"
                            [nzLabel]="o.label"
                            [nzValue]="o.value"
                            [nzDisabled]="o.disabled">
                        </nz-option>
                    </nz-option-group>
                </ng-container>
            </nz-select>
        </sf-item-wrap>`,
    preserveWhitespaces: false,

})
export class BylNationSelectWidgetSFComponent extends ControlWidget implements OnInit {
    /* 用于注册小部件 KEY 值 */
    static readonly KEY = 'bylNationSelect';

    i: any;
    data: SFSchemaEnum[];
    hasGroup = false;

    constructor(@Inject(ChangeDetectorRef) public readonly cd: ChangeDetectorRef,
                @Inject(SFComponent) public readonly sfComp: SFComponent,
                public client: HttpClient,
                public nationService: BylNationService) {
        super(cd, sfComp);
    }

    ngOnInit(): void {
        this.i = {
            allowClear: this.ui.allowClear,
            autoFocus: this.ui.autoFocus || false,
            dropdownClassName: this.ui.dropdownClassName || null,
            dropdownMatchSelectWidth: this.ui.dropdownMatchSelectWidth || true,
            serverSearch: this.ui.serverSearch || false,
            maxMultipleCount: this.ui.maxMultipleCount || Infinity,
            mode: this.ui.mode || 'default',
            notFoundContent: this.ui.notFoundContent || '无法找到',
            showSearch: this.ui.showSearch || true,
        };
    }

    getSelectData(): Observable<SFSchemaEnum[]> {
            // return this.projectManagerPoolService.fetchAvailableByCodeOrNamePromise(text);
            return this.nationService.findByAll().pipe(
                map(
                    (res) => {
                        // console.log("in BylSelect widget getSelectDataById res:", res);
                        if (res.code === BylResultBody.RESULT_CODE_SUCCESS) {
                            if (res.data) {
                                let searchResult: SFSchemaEnum[] = [];

                                // let v = new BylEntityReference(res.data.id,
                                //     res.data.code,
                                //     res.data.name);
                                //
                                // let i: SFSchemaEnum = {};
                                // i.label = v.getFullCaption();
                                // i.value = v;
                                // searchResult.push(i);

                                res.data.forEach(item => {
                                    let v = new BylEntityReference(item.id,
                                        item.code,
                                        item.name);

                                    let i: SFSchemaEnum = {};
                                    i.label = v.getFullCaption();
                                    i.value = v;
                                    searchResult.push(i);
                                });


                                // console.log("in BylSelect widget getSelectDataById searchResult:", searchResult);
                                return searchResult;

                            } else {
                                return [];
                            }
                        } else {
                            console.error("获取民族出错：", res);
                            return ([]);
                        }

                    }
                )
        )

    }

    reset(value: any) {

        this.ui.asyncData = () => this.getSelectData();

        getData(this.schema, this.ui, this.formProperty.formData).subscribe(
            list => {
                this.data = list;
                this.hasGroup = list.filter(w => w.group === true).length > 0;
                this.detectChanges();
            },
        );
    }

    compareFn = (o1: any, o2: any) => o1 && o2 ? o1.id === o2.id : o1 === o2;

    openChange(value: any) {
        if (this.ui.openChange) this.ui.openChange(value);
    }

    searchChange(text: string) {
        // if ((text) && (text.length > 0)) {
        //     this.searchByCodeName(text).then((res: any[]) => {
        //         this.data = res;
        //         this.detectChanges();
        //     });
        //     return;
        // }
        // this.detectChanges();

        if (this.ui.onSearch) {
            this.ui.onSearch(text).subscribe((res: any[]) => {
                this.data = res;
                this.detectChanges();
            });
            return;
        }
        this.detectChanges();
    }

    scrollToBottom(value: any) {
        if (this.ui.scrollToBottom) this.ui.scrollToBottom(value);
    }
}
