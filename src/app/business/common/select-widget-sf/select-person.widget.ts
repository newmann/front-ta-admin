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
import {map} from "rxjs/operators";

@Component({
    selector: 'byl-select-person',
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
export class BylPersonSelectWidgetSFComponent extends ControlWidget implements OnInit {
    /* 用于注册小部件 KEY 值 */
    static readonly KEY = 'bylPersonSelect';

    i: any;
    data: SFSchemaEnum[];
    hasGroup = false;

    constructor(@Inject(ChangeDetectorRef) public readonly cd: ChangeDetectorRef,
                @Inject(SFComponent) public readonly sfComp: SFComponent,
                public client: HttpClient,
                public personService: BylPersonService) {
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
        console.log("search for manager:", text);
        if ((text) && (text.length > 0)) {
            // return this.projectManagerPoolService.fetchAvailableByCodeOrNamePromise(text);
            return this.personService.fetchAvailableByIdCardOrName(text)
                .toPromise().then(
                    (res) => {
                        if (res.code === BylResultBody.RESULT_CODE_SUCCESS) {
                            if (res.data) {
                                let searchResult: SFSchemaEnumType[] = [];

                                res.data.forEach(item => {
                                    let v = new BylEntityReference(item.id,
                                        item.idCard,
                                        item.name);

                                    let i: SFSchemaEnumType = {};
                                    i.label = v.getFullCaption();
                                    i.value = v;
                                    searchResult.push(i);
                                });

                                return searchResult;

                            } else {
                                return [];
                            }
                        } else {
                            console.error("获取个体信息出错：", res);
                            return ([]);
                        }

                    }
                ).catch(error => (console.error("获取个体信息出错：", error)));
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

        console.log("in BylSelect widget getSelectDataById text:", id);
        if ((id) && (id.length > 0)) {
            // return this.projectManagerPoolService.fetchAvailableByCodeOrNamePromise(text);
            return this.personService.findById(id).pipe(
                map(
                    (res) => {
                        console.log("in BylSelect widget getSelectDataById res:", res);
                        if (res.code === BylResultBody.RESULT_CODE_SUCCESS) {
                            if (res.data) {
                                let searchResult: SFSchemaEnum[] = [];
                                let v = new BylEntityReference(res.data.id,
                                    res.data.idCard,
                                    res.data.name);

                                let i: SFSchemaEnum = {};
                                i.label = v.getFullCaption();
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


                                return searchResult;

                            } else {
                                return [];
                            }
                        } else {
                            console.error("获取个体信息出错：", res);
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
            console.log('in BylSelect widget reset:', value);
            this.getSelectDataById(value.id).subscribe(
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

    compareFn = (o1: any, o2: any) => o1 && o2 ? o1.id === o2.id : o1 === o2;

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
