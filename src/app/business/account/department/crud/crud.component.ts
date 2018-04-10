import {Component, Input, OnInit} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {ActivatedRoute} from "@angular/router";
import {ReuseTabService} from "@delon/abc";
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {LoggerService} from "../../../../service/utils/logger";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfigService} from "../../../../service/constant/config.service";
import {RoleService} from "../../../../service/account/role.service";
import {DepartmentService} from "../../../../service/account/department.service";
import {Role, RoleStatus} from "../../../../service/account/role.model";
import {Department, DepartmentStatus} from "../../../../service/account/department.model";
import {debounceTime, distinctUntilChanged, first, flatMap, map} from "rxjs/operators";
import {ResultBody} from "../../../../service/model/result-body.model";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import {BylCrudEvent, BylCrudWaitingComponent} from "../../../common/waiting/crud-waiting.component";
import {Subject} from "rxjs/Subject";


@Component({
  selector: 'byl-department-crud',
  templateUrl: './crud.component.html',
})
export class BylDepartmentCrudComponent implements OnInit {
    private _department = new Department;
    private _firstLevelDepartment = new Department();//最顶级的部门，id = -
    public form: FormGroup;
    private _loading = false;
    public errMsg = '';  // 保存时错误信息

    private _savingReveal: any;

    @Input() sourceId: string;

    public processType: string = '';

    public searchedDepartments: Array<Department> = [];

    private _searchData$: Subject<string> = new Subject<string>();


    constructor(
        public msgService: NzMessageService,
        public departmentService: DepartmentService,
        public configService: ConfigService,
        public modalService: NzModalService,
        public modalSubject: NzModalSubject,
        public activatedRoute: ActivatedRoute,
        public logger: LoggerService,
        public fb: FormBuilder
    ) {
        // 绑定验证模式
        this.form = this.fb.group({
            parent:[null],
            code: [null, Validators.compose([Validators.required, Validators.minLength(2)]), this.codeValidator],
            name: [null, Validators.compose([Validators.required, Validators.minLength(1)])],
            remarks: [null]
        });

        this.registerSearchData();

        //设置第一级部门的上级部门
        this._firstLevelDepartment.id = '-';
        this._firstLevelDepartment.name = '未知';
        this._firstLevelDepartment.code = '-';
        this.searchedDepartments.push(this._firstLevelDepartment);

        this.activatedRoute
            .paramMap
            .subscribe(params => {
                this.logger.log("activedRoute", params);
                this.logger.log("activedRoute", params.get('type'));
                this.processType = params.get('type') || '';

            });

    }

    ngOnInit() {
        this.logger.info(" in ngOnInit");
        //在从list窗口调入的情况下，载入数据
        if (this.sourceId) this.loadDepartment(this.sourceId);
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
                    if (data.code === ResultBody.RESULT_CODE_SUCCESS) {
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
    };

    loadDepartment(id:String){

        // this.showLoadingReveal();
        this._loading = true;
        this.errMsg = '';
        this.departmentService.findById(this.sourceId).subscribe(
            data => {
                this._loading = false;
                if (data.code === ResultBody.RESULT_CODE_SUCCESS) {
                    this.logger.info(data.data);
                    Object.assign(this._department,data.data);
                    this.reset();
                } else {

                    this.errMsg = data.msg;
                }
                // 退出显示窗口
                this._loading = false;
                // this.destorySavingReveal();

            },
            err => {
                this.errMsg = err.toString();

                // 退出显示窗口
                this._loading = false;
                // this.destorySavingReveal();

            }
        );
    }
    /**
     * 保存
     */
    submitForm() {
        this.showSavingReveal();
        this._loading = true;
        this.errMsg = '';
        // tslint:disable-next-line:forin
        this.getFormData();

        this.departmentService.add(this._department).subscribe(
            data => {
                this._loading = false;
                if (data.code === ResultBody.RESULT_CODE_SUCCESS) {
                    // 通知显示窗口保存正确
                    this._savingReveal.next(BylCrudEvent[BylCrudEvent.bylSaveCorrect]);
                    // this.msgService.success('保存正确！');
                    // 如果是通过浏览界面进入，则自动退出

                } else {
                    // 通知显示窗口保存错误，是否退出由显示界面控制
                    this._savingReveal.next(BylCrudEvent[BylCrudEvent.bylSaveError]);
                    // this._savingReveal.destroy();
                    this.errMsg = data.msg;
                }
            },
            err => {
                // 通知显示窗口保存错误，是否退出由显示界面控制
                this._savingReveal.next(BylCrudEvent[BylCrudEvent.bylSaveError]);

                this._loading = false;
                this.errMsg = err.toString();

            }
        );
    }

    registerSearchData(){
        this._searchData$.pipe(
                debounceTime(1000),
                distinctUntilChanged(),
                flatMap(value =>{
                    return this.departmentService.fetchAvailableDepartmentByCodeOrName(value);
                    })
            ).subscribe(

                data => {
                    if (data.code === ResultBody.RESULT_CODE_SUCCESS) {

                        // this.listData = Array.from(data.data.rows);
                        this.logger.log(data.data);
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

    searchDepartment($event){
        this.logger.log("$event",$event);
        if ($event)  this._searchData$.next($event);
    }


    resetButtonClick($event: MouseEvent) {
        $event.preventDefault();
        this.reset();

    }

    getFormData(){
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        this.logger.log('log', this.form.value);
        this._department.parentId = this.parent.value.toString();
        this._department.code = this.code.value.toString();
        this._department.name = this.name.value.toString();

        if (this.remarks.value) {
            this._department.remarks = this.remarks.value.toString();
        }
        //todo 设置保存的对象状态
        this._department.status = DepartmentStatus.NORMAL_DEPARTMENT;
    }
    /**
     * 重置界面内容
     */
    reset() {
        this.form.reset({
            code: this._department.code,
            name: this._department.name,
            remarks: this._department.remarks
        },{onlySelf:true,emitEvent:false});

        this.form.markAsPristine();
        // for (const key in this.form.controls) {
        //     this.form.controls[key].markAsPristine();
        // }
        this.logger.log('this.form.dirty'+ this.form.dirty);
        this.logger.log('this.form.invalid'+ this.form.invalid);
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
            if(result === 'onDestroy'){
                console.log('退出提示界面');
                switch(this.processType){
                    case "new":
                        //新增界面
                        this._department = new Department();
                        this.reset();
                        break;
                    case "modify":
                        break;
                    default:
                        // 从list界面进入修改
                        console.log('this.modalSubject.destroy();');
                        //将修改后的数据传回list界面
                        this.modalSubject.next({type: BylCrudEvent[BylCrudEvent.bylUpdate],data: this._department});
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
    destorySavingReveal(){
        if (this._savingReveal)  this._savingReveal.destroy();
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

