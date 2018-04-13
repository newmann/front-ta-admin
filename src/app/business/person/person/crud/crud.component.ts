import {Component, Input, OnInit} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {LoggerService} from '../../../../service/utils/logger';

import {NzMessageService, NzModalService, NzModalSubject} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylPersonService} from '../../../../service/person/person/person.service';
import {BylPerson} from '../../../../service/person/person/person.model';
import {Subject} from 'rxjs/Subject';
import {BylResultBody} from '../../../../service/model/result-body.model';
import {BylCrudEvent, BylCrudWaitingComponent} from '../../../common/waiting/crud-waiting.component';
import {debounceTime, distinctUntilChanged, flatMap} from 'rxjs/operators';
import {Department, DepartmentStatus} from '../../../../service/account/department/department.model';
import {BylCrudComponentBase} from '../../../common/crud-component-base';

@Component({
    selector: 'byl-person-crud',
    templateUrl: './crud.component.html',
})
export class BylPersonCrudComponent extends BylCrudComponentBase<BylPerson> {
    // private _person = new BylPerson();
    // public errMsg = '';
    public searchedPersons: Array<BylPerson> = [];

    // public form: FormGroup;

    @Input() sourceId: string;

    // private _savingReveal: any;

    public processType = '';
    // private _loading = false;

    private _searchData$: Subject<string> = new Subject<string>();


    defineForm(): void {
        // 绑定验证模式
        this.form = this.fb.group({
            parent: [null],
            code: [null, Validators.compose([Validators.required, Validators.minLength(2)]), this.codeValidator],
            name: [null, Validators.compose([Validators.required, Validators.minLength(1)])],
            remarks: [null]
        });

    }

    constructor(public msgService: NzMessageService,
                public personService: BylPersonService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public modalSubject: NzModalSubject,
                public activatedRoute: ActivatedRoute,
                public logger: LoggerService,
                public fb: FormBuilder) {
        super(msgService, configService, modalService, modalSubject, activatedRoute, logger, fb);

        this.businessService = personService;

        // this.activatedRoute
        //     .paramMap
        //     .subscribe(params => {
        //         this.logger.log('activedRoute', params);
        //         this.logger.log('activedRoute', params.get('type'));
        //         this.processType = params.get('type') || '';
        //
        //     });
        //
        // this.registerSearchData();
    }

    // ngOnInit() {
    //     //在从list窗口调入的情况下，载入数据
    //     if (this.sourceId) this.loadPerson(this.sourceId);
    // }

    // loadPerson(id: String) {
    //
    //     // this.showLoadingReveal();
    //     this._loading = true;
    //     this.errMsg = '';
    //     this.personService.findById(this.sourceId).subscribe(
    //         data => {
    //             this._loading = false;
    //             if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
    //                 this.logger.info(data.data);
    //                 Object.assign(this._person, data.data);
    //                 this.reset();
    //             } else {
    //
    //                 this.errMsg = data.msg;
    //             }
    //             // 退出显示窗口
    //             this._loading = false;
    //             // this.destorySavingReveal();
    //
    //         },
    //         err => {
    //             this.errMsg = err.toString();
    //
    //             // 退出显示窗口
    //             this._loading = false;
    //             // this.destorySavingReveal();
    //
    //         }
    //     );
    // }
    //
    // /**
    //  * 保存
    //  */
    // submitForm() {
    //     this.showSavingReveal();
    //     this._loading = true;
    //     this.errMsg = '';
    //     // tslint:disable-next-line:forin
    //     this.getFormData();
    //
    //     this.personService.add(this._person).subscribe(
    //         data => {
    //             this._loading = false;
    //             if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
    //                 // 通知显示窗口保存正确
    //                 this._savingReveal.next(BylCrudEvent[BylCrudEvent.bylSaveCorrect]);
    //                 // this.msgService.success('保存正确！');
    //                 // 如果是通过浏览界面进入，则自动退出
    //
    //             } else {
    //                 // 通知显示窗口保存错误，是否退出由显示界面控制
    //                 this._savingReveal.next(BylCrudEvent[BylCrudEvent.bylSaveError]);
    //                 // this._savingReveal.destroy();
    //                 this.errMsg = data.msg;
    //             }
    //         },
    //         err => {
    //             // 通知显示窗口保存错误，是否退出由显示界面控制
    //             this._savingReveal.next(BylCrudEvent[BylCrudEvent.bylSaveError]);
    //
    //             this._loading = false;
    //             this.errMsg = err.toString();
    //
    //         }
    //     );
    // }

    registerSearchData() {
        // this._searchData$.pipe(
        //     debounceTime(1000),
        //     distinctUntilChanged(),
        //     flatMap(value =>{
        //         return this.personService.fetchAvailableDepartmentByCodeOrName(value);
        //     })
        // ).subscribe(
        //
        //     data => {
        //         if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
        //
        //             // this.listData = Array.from(data.data.rows);
        //             this.logger.log(data.data);
        //             this.searchedPersons = data.data;
        //             this.searchedPersons.push(this._firstLevelDepartment);
        //
        //         } else {
        //             this.errMsg = data.msg;
        //         }
        //     },
        //     err => {
        //         console.log(err);
        //         this.errMsg = err.toString();
        //     }
        // );


    }

    searchPerson($event) {
        this.logger.log('$event', $event);
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
        this.logger.log('log', this.form.value);
        this._person.code = this.code.value.toString();
        this._person.name = this.name.value.toString();

        if (this.remarks.value) {
            this._person.remarks = this.remarks.value.toString();
        }

    }

    /**
     * 重置界面内容
     */
    reset() {
        this.form.reset({
            code: this._person.code,
            name: this._person.name,
            remarks: this._person.remarks
        }, {onlySelf: true, emitEvent: false});

        this.form.markAsPristine();
        // for (const key in this.form.controls) {
        //     this.form.controls[key].markAsPristine();
        // }
        this.logger.log('this.form.dirty' + this.form.dirty);
        this.logger.log('this.form.invalid' + this.form.invalid);
    }


    showSavingReveal() {
        this._savingReveal = this.modalService.open({
            title: '提交',
            zIndex: 9999, //最外层
            content: BylCrudWaitingComponent,
            // onOk() {
            //
            // },
            // onCancel() {
            //     console.log('Click cancel');
            // },
            footer: false,
            componentParams: {
                // name: '测试渲染Component'
            },
            maskClosable: false
        });
        this._savingReveal.next(BylCrudEvent[BylCrudEvent.bylSaving]);
        //
        this._savingReveal.subscribe(result => {
            console.log(result);
            //判断是否退出界面
            if (result === 'onDestroy') {
                console.log('退出提示界面');
                switch (this.processType) {
                    case 'new':
                        //新增界面
                        this._person = new BylPerson();
                        this.reset();
                        break;
                    case 'modify':
                        break;
                    default:
                        // 从list界面进入修改
                        console.log('this.modalSubject.destroy();');
                        //将修改后的数据传回list界面
                        this.modalSubject.next({type: BylCrudEvent[BylCrudEvent.bylUpdate], data: this._person});
                        this.modalSubject.destroy();

                }

            }
            // if (result === BylCrudEvent[BylCrudEvent.bylAdd]) {
            //     // 新增界面
            //     this._role = new Role();
            //     this.reset();
            // }


        });
    }

    destorySavingReveal() {
        if (this._savingReveal) this._savingReveal.destroy();
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
