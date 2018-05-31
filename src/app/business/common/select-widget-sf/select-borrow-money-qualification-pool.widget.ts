import {Component, OnInit, ChangeDetectorRef, Inject} from '@angular/core';
import {ControlWidget, SFSchemaEnum, SFSchema, SFUISchemaItem, SFComponent, SFSchemaEnumType} from '@delon/form';
// import { getData } from './../../util';
// tslint:disable-next-line:import-blacklist
import {of, Observable} from 'rxjs';
import {delay, flatMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {BylEntityReference} from "../../../service/model/entity-reference.model";
import {BylResultBody} from "../../../service/model/result-body.model";
import {BylPersonService} from "../../../service/person/service/person.service";
import {BylBorrowMoneyQualificationPoolService} from "../../../service/project/service/borrow-money-qualification-pool.service";
import {BylBorrowMoneyQualificationPool} from "../../../service/project/model/borrow-money-qualification-pool.model";
import {simpleDeepCopy} from "../../../service/utils/object.utils";

@Component({
    selector: 'byl-select-borrow-money-qualification-pool',
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
export class BylBorrowMoneyQualificationPoolSelectWidgetSFComponent extends ControlWidget implements OnInit {
    /* 用于注册小部件 KEY 值 */
    static readonly KEY = 'bylBorrowMoneyQualificationPoolSelect';

    i: any;
    data: SFSchemaEnum[];
    hasGroup = false;

    constructor(@Inject(ChangeDetectorRef) public readonly cd: ChangeDetectorRef,
                @Inject(SFComponent) public readonly sfComp: SFComponent,
                public client: HttpClient,
                public borrowMoneyQualificationPoolService: BylBorrowMoneyQualificationPoolService) {
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
        console.log("search for pool:", text);
        if ((text) && (text.length > 0)) {
            // return this.projectManagerPoolService.fetchAvailableByCodeOrNamePromise(text);
            return this.borrowMoneyQualificationPoolService.fetchAvailableByCodeOrName(text)
                .toPromise().then(
                    (res) => {
                        if (res.code === BylResultBody.RESULT_CODE_SUCCESS) {
                            if (res.data) {
                                let searchResult: SFSchemaEnumType[] = [];

                                res.data.forEach(item => {
                                    let v = new BylBorrowMoneyQualificationPool();
                                    simpleDeepCopy(v, item);

                                    let i: SFSchemaEnumType = {};
                                    i.label = v.fullCaption;
                                    i.value = v;
                                    searchResult.push(i);
                                });

                                return searchResult;

                            } else {
                                return [];
                            }
                        } else {
                            console.error("获取可借款资源信息出错：", res);
                            return ([]);
                        }

                    }
                ).catch(error => (console.error("获取可借款信息出错：", error)));
        }

    }

    getSelectDataById(type: number,id: string): Observable<SFSchemaEnum[]> {
        console.log("in BylBorrowMoneyQualificationPoolSelect widget getSelectDataById text:", type, id);
        if ((id) && (id.length > 0)) {
            // return this.projectManagerPoolService.fetchAvailableByCodeOrNamePromise(text);
            return this.borrowMoneyQualificationPoolService.findByTypeAndPoolId(type,id)
                .map(
                    (res) => {
                        console.log("in BylBorrowMoneyQualificationPoolSelect widget getSelectDataById res:", res);
                        if (res.code === BylResultBody.RESULT_CODE_SUCCESS) {
                            if (res.data) {
                                let searchResult: SFSchemaEnum[] = [];
                                let v = new BylBorrowMoneyQualificationPool();
                                simpleDeepCopy(v, res.data);

                                let i: SFSchemaEnumType = {};
                                i.label = v.fullCaption;
                                i.value = v;
                                searchResult.push(i);


                                return searchResult;

                            } else {
                                return [];
                            }
                        } else {
                            console.error("获取可借款资源信息出错：", res);
                            return ([]);
                        }

                    }
                )

        } else {
            console.log("in BylBorrowMoneyQualificationPoolSelect widget getSelectDataById ，return empty array");
            return of([])
        }
    }

    reset(value: any) {
        if (value) {
            console.log('in BylBorrowMoneyQualificationPoolSelect widget reset:', value);
            this.getSelectDataById(value.type, value.poolId).subscribe(
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

    compareFn = (o1: any, o2: any) => o1 && o2 ? (o1.poolId === o2.poolId) && (o1.type === o2.type) : o1 === o2;

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


    }

    scrollToBottom(value: any) {
        if (this.ui.scrollToBottom) this.ui.scrollToBottom(value);
    }
}
