import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ReuseTabService} from '@delon/abc';
import {NzMessageService, NzModalService, NzModalSubject} from 'ng-zorro-antd';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylDepartmentService} from '../../../../service/account/service/department.service';
import {BylDepartment} from '../../../../service/account/model/department.model';
import {debounceTime, distinctUntilChanged, first, flatMap, map} from 'rxjs/operators';
import {BylResultBody} from '../../../../service/model/result-body.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import {Subject} from 'rxjs/Subject';
import {BylMasterDataStatusEnum} from '../../../../service/model/master-data-status.enum';
import {BylCrudComponentBase} from "../../../common/crud-component-base";


@Component({
    selector: 'byl-department-crud',
    templateUrl: './crud.component.html',
})
export class BylDepartmentCrudComponent extends BylCrudComponentBase<BylDepartment> {

    private _firstLevelDepartment = new BylDepartment(); // 最顶级的部门，id = -

    @Input()
    set setSourceId(value: string) {
        this.sourceId = value;
    }


    public searchedDepartments: Array<BylDepartment> = [];

    private _searchData$: Subject<string> = new Subject<string>();

    newBusinessData(): BylDepartment {
        return new BylDepartment();
    }

    defineForm(): void {
        // 绑定验证模式
        this.form = this.fb.group({
            parent: [null],
            code: [null, Validators.compose([Validators.required, Validators.minLength(2)]), this.codeValidator],
            name: [null, Validators.compose([Validators.required, Validators.minLength(1)])],
            remarks: [null]
        });

        this.registerSearchData();

        //设置第一级部门的上级部门
        this._firstLevelDepartment.id = '-';
        this._firstLevelDepartment.name = '第0级';
        this._firstLevelDepartment.code = '-';
        this.searchedDepartments.push(this._firstLevelDepartment);


    }

    constructor(public msgService: NzMessageService,
                public departmentService: BylDepartmentService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public modalSubject: NzModalSubject,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService,
                public fb: FormBuilder) {
        super(msgService, configService, modalService, modalSubject, activatedRoute, reuseTabService,fb);

        this.businessService = departmentService;

    }


    /**
     * 验证部门代码是否重复
     * @param {FormControl} control
     * @returns {Observable<any>}
     */
    codeValidator = (control: FormControl): Observable<any> => {
        return control.valueChanges.pipe(
            debounceTime(1000),
            distinctUntilChanged(),

            flatMap((value) => {

                    console.log(value);
                    return this.departmentService.checkCodeAvailable(value);
                }
            ),
            map((data) => {
                    console.log(data);
                    if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                        if (data.data) {
                            return null;
                        } else {
                            return ({duplicate: true});
                        }

                    } else {

                        return ({other: true, msg: data.msg});

                    }

                },
            ),
            // catchError((err) => {
            //     console.log(err);
            //     return({other: true })
            // }),

            first()
        );
    }



    registerSearchData() {
        this._searchData$.pipe(
            debounceTime(1000),
            distinctUntilChanged(),
            flatMap(value => {
                return this.departmentService.fetchAvailableDepartmentByCodeOrName(value);
            })
        ).subscribe(
            data => {
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {

                    // this.listData = Array.from(data.data.rows);
                    // this.logger.log(data.data);
                    console.dir(data.data);
                    this.searchedDepartments = data.data;
                    this.searchedDepartments.push(this._firstLevelDepartment);

                } else {
                    this.errMsg = data.msg;
                }
            },
            err => {
                console.log(err);
                this.errMsg = err.toString();
            }
        );


    }

    searchDepartment($event) {
        // this.logger.log('$event', $event);
        if ($event) this._searchData$.next($event);
    }


    resetButtonClick($event: MouseEvent) {
        $event.preventDefault();
        this.reset();

    }

    getFormData() {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        // this.logger.log('log', this.form.value);
        this.businessData.parentId = this.parent.value.toString();
        this.businessData.code = this.code.value.toString();
        this.businessData.name = this.name.value.toString();

        if (this.remarks.value) {
            this.businessData.remarks = this.remarks.value.toString();
        }
        //todo 设置保存的对象状态
        this.businessData.status = BylMasterDataStatusEnum.NORMAL;
    }

    /**
     * 重置界面内容
     */
    reset() {
        this.form.reset({
            code: this.businessData.code,
            name: this.businessData.name,
            remarks: this.businessData.remarks
        }, {onlySelf: true, emitEvent: false});

        super.reset();

        //设置可复用标签的名字：
        if (this.sourceId) {
            //说明是修改
            this.reuseTabService.title = '编辑-' + this.businessData.name;
        }

        // for (const key in this.form.controls) {
        //     this.form.controls[key].markAsPristine();
        // }
    }

    //#region get form fields
    get parent() {
        return this.form.controls.parent;
    }

    get code() {
        return this.form.controls.code;
    }

    get name() {
        return this.form.controls.name;
    }

    get remarks() {
        return this.form.controls.remarks;
    }

    //#endregion
}

