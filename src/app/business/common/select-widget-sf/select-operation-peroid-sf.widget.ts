import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {ControlWidget, SFComponent, SFSchemaEnum, SFSchemaEnumType} from '@delon/form';
// import { getData } from './../../util';
// tslint:disable-next-line:import-blacklist
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BylResultBody} from "../../../service/model/result-body.model";
import {BylOperationPeriodService} from "../../../service/project/service/operation-period.service";
import {BylEmbeddableOperationPeriod} from "../../../service/project/model/embeddable-operation-period.model";
import {map} from "rxjs/operators";

@Component({
    selector: 'byl-select-operation-period',
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
export class BylOperationPeriodSelectWidgetSFComponent extends ControlWidget implements OnInit {
    /* 用于注册小部件 KEY 值 */
    static readonly KEY = 'bylOperationPeriodSelect';

    i: any;
    data: SFSchemaEnum[];
    hasGroup = false;

    constructor(@Inject(ChangeDetectorRef) public readonly cd: ChangeDetectorRef,
                @Inject(SFComponent) public readonly sfComp: SFComponent,
                public client: HttpClient,
                public operationPeriodService: BylOperationPeriodService) {
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

    searchByCodeName(text: string) {
        console.log("search for OperationPeriod:", text);
        if ((text) && (text.length > 0)) {
            // return this.projectManagerPoolService.fetchAvailableByCodeOrNamePromise(text);
            return this.operationPeriodService.fetchAvailableByCodeOrName(text)
                .toPromise().then(
                    (res) => {
                        if (res.code === BylResultBody.RESULT_CODE_SUCCESS) {
                            if (res.data) {
                                let searchResult: SFSchemaEnumType[] = [];

                                res.data.forEach(item => {
                                    let v = new BylEmbeddableOperationPeriod();
                                    v.operatonPeriodId = item.id;
                                    v.operatonPeriodCode = item.code;
                                    v.operatonPeriodName = item.name;
                                    v.operatonPeriodBeginDate = item.beginDate;
                                    v.operatonPeriodEndDate = item.endDate;

                                    let i: SFSchemaEnumType = {};
                                    i.label = v.getFullCaption;
                                    i.value = v;
                                    searchResult.push(i);
                                });

                                return searchResult;

                            } else {
                                return [];
                            }
                        } else {
                            console.error("获取业务期间定义资源出错：", res);
                            return ([]);
                        }

                    }
                ).catch(error => (console.error("获取业务期间出错：", error)));
        }

    }

    getSelectDataById(id: string): Observable<SFSchemaEnum[]> {
        // const domain = this.ui.domain;
        // const url = `api/${domain}/search`;
        // return this.client.get(url, {
        //     params: {
        //         keyword: text || '',
        //         value: value
        //     }
        // }) as any;

        // console.log("in BylSelect widget getSelectDataById text:", id);
        if ((id) && (id.length > 0)) {
            // return this.projectManagerPoolService.fetchAvailableByCodeOrNamePromise(text);
            return this.operationPeriodService.findById(id).pipe(
                map(
                    (res) => {
                        // console.log("in BylSelect widget getSelectDataById res:", res);
                        if (res.code === BylResultBody.RESULT_CODE_SUCCESS) {
                            if (res.data) {
                                let searchResult: SFSchemaEnum[] = [];
                                let v = new BylEmbeddableOperationPeriod();
                                v.operatonPeriodId = res.data.id;
                                v.operatonPeriodCode = res.data.code;
                                v.operatonPeriodName = res.data.name;
                                v.operatonPeriodBeginDate = res.data.beginDate;
                                v.operatonPeriodEndDate = res.data.endDate;

                                let i: SFSchemaEnum = {};
                                i.label = v.getFullCaption;
                                i.value = v;
                                searchResult.push(i);

                                // res.data.forEach(item => {
                                //     let v = new BylEntityReference();
                                //     v.id = item.poolId;
                                //     v.code = item.poolCode;
                                //     v.name = item.poolName;
                                //
                                //     let i: SFSchemaEnum = {};
                                //     i.label = v.getFullCaption();
                                //     i.value = v;
                                //     searchResult.push(i);
                                // });


                                // console.log("in BylSelect widget getSelectDataById searchResult:", searchResult);
                                return searchResult;

                            } else {
                                return [];
                            }
                        } else {
                            console.error("获取业务期间出错：", res);
                            return ([]);
                        }

                    }
                )
            )

        } else {
           return of([])
        }
    }

    reset(value: any) {
        if (value) {
            console.log('in BylOperationPeriodSelect widget reset:', value);
            this.getSelectDataById(value.operatonPeriodId).subscribe(
                list => {
                    this.data = list;
                    this.hasGroup = list.filter(w => w.group === true).length > 0;
                    this.detectChanges();
                }
            );

        }
        // this.ui.onSearch = (text: string) => this.getSelectDataById(value);
        // getData(this.schema, this.ui, this.formProperty.formData).subscribe(
        //     list => {
        //         this.data = list;
        //         this.hasGroup = list.filter(w => w.group === true).length > 0;
        //         this.detectChanges();
        //     },
        // );
    }

    compareFn = (o1: any, o2: any) => o1 && o2 ? o1.operatonPeriodId === o2.operatonPeriodId : o1 === o2;

    openChange(value: any) {
        if (this.ui.openChange) this.ui.openChange(value);
    }

    searchChange(text: string) {
        if ((text) && (text.length > 0)) {
            this.searchByCodeName(text).then((res: any[]) => {
                this.data = res;
                this.detectChanges();
            });
            return;
        }
        this.detectChanges();

        // if (this.ui.onSearch) {
        //     this.ui.onSearch(text).subscribe((res: any[]) => {
        //         this.data = res;
        //         this.detectChanges();
        //     });
        //     return;
        // }
        // this.detectChanges();
    }

    scrollToBottom(value: any) {
        if (this.ui.scrollToBottom) this.ui.scrollToBottom(value);
    }
}
