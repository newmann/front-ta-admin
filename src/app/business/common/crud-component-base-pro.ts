import {ElementRef, OnInit, ViewChild} from '@angular/core';
import {NzMessageService, NzModalService, NzModalRef} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';

import {BylConfigService} from '../../service/constant/config.service';
import {Subject} from 'rxjs/Subject';
import {BylResultBody} from '../../service/model/result-body.model';
import {BylBaseService} from '../../service/service/base.service';

import {ReuseTabService} from '@delon/abc';
import {Observable} from 'rxjs/Observable';
import {SFComponent, SFSchema, SFUISchema} from '@delon/form';
import {simpleDeepCopy} from '../../service/utils/object.utils';
/**
 * @Description: crud组件对象的抽象类
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 9:46
 **/

export abstract class BylCrudComponentBasePro<T> implements OnInit {
    public isLoading:boolean;

    public defaultBusinessData: T;
    public businessData: T;
    public formUiSchema: SFUISchema = {};
    public emptyFormSchema: SFSchema = {
        properties: {}
    };

    public newSchema: SFSchema = {
        properties: {}
    };

    public modifySchema: SFSchema = null;
    public browseSchema: SFSchema = null;

    public curSchema: SFSchema = null; //当前的显示格式，由子类来配置，在这个类中只是在reset中直接调用

    public loading = false;
    public errMsg = '';  // 保存时错误信息
    // public savingReveal: any;
    public sourceId: string;
    public processType: string;

    public businessService: BylBaseService<T>;

    // public searchData$: Subject<string> = new Subject<string>();

    @ViewChild('sf') sfForm: SFComponent;

    /**
     * 设置窗口定义的缺省值
     */
    setSchemaDefaultValue(){

    };

    ngOnInit() {
        // //刷新schema
        // this.setSchemaDefaultValue();
        // this.sfForm.refreshSchema(this.newSchema);

        //从list窗口调入修改单据时，载入数据
        console.log('执行base init');
        if (this.sourceId) {
            this.loadData(this.sourceId);
        } else {
            this.reset();
        }
    }

    constructor(public msgService: NzMessageService,
                public configService: BylConfigService,
                // public modalService: NzModalService,
                // public modalSubject: NzModalRef,
                public activatedRoute: ActivatedRoute,
                public reuseTabService: ReuseTabService
    ) {
        this.defineForm();

        //初始化新增界面的缺省值
        this.defaultBusinessData = this.newBusinessData();
        this.businessData = this.newBusinessData();

        this.activatedRoute
            .paramMap
            .subscribe(params => {
                // this.logger.log('activedRoute', params);
                // this.logger.log('activedRoute', params.get('type'));
                this.processType = params.get('type') || '';
                if (this.processType.length > 0) {
                    if (this.processType !== 'new') {
                        this.sourceId = this.processType;
                        // this.loadData(this._sourceId);
                    }
                }

                console.log('processType', this.processType);
            });


        // this.loadData();
    }

    /**
     * 定义界面元素管理属性
     */
    abstract defineForm(): void;

    /**
     *  载入数据
     */
    loadData(id: string) {

        // this.showLoadingReveal();
        // this._loading = true;
        this.errMsg = '';
        this.businessService.findById(id).subscribe(
            data => {
                // this._loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                    console.info("in CrudBasePro loadData", data.data);
                    this.setFormData(data.data);

                    this.reset();
                } else {

                    this.errMsg = data.msg;
                }


            },
            err => {
                this.errMsg = err.toString();


            }
        );
    }

    /**
     * 保存
     */
    submitForm() {
        this.loading = true
        // const msgId = this.msgService.loading('正在保存..', {nzDuration: 0}).messageId;
        // this.showSavingReveal();
        // this._loading = true;
        this.errMsg = '';
        this.getFormData();
        let saveResult$: Observable<BylResultBody<T>>;

        console.log('in CrudBasePro submitform', this.businessData);

        if (this.sourceId) {
            //当前为修改界面
            saveResult$ = this.businessService.update(this.businessData);
        } else {
            //当前为新增界面
            saveResult$ = this.businessService.add(this.businessData);
        }

        saveResult$.subscribe(
            data => {
                // this._loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {

                    //重新显示返回的数据，重点是保证最后修改时间的前后台的一致性
                    this.setFormData(data.data);
                    this.reset(); //重置界面

                } else {
                    // 通知显示窗口保存错误，是否退出由显示界面控制
                    // this.savingReveal.next(BylCrudEvent[BylCrudEvent.bylSaveError]);
                    // this._savingReveal.destroy();
                    this.errMsg = data.msg;
                    // this.savingReveal.destroy(); //退出提示界面，原界面不动
                }
                this.loading = false;
                // this.msgService.remove(msgId);

            },
            err => {
                // 通知显示窗口保存错误，是否退出由显示界面控制
                // this.savingReveal.next(BylCrudEvent[BylCrudEvent.bylSaveError]);
                // this._loading = false;
                this.errMsg = err.toString();
                this.loading = false;
                // this.msgService.remove(msgId);
                // this.savingReveal.destroy(); //退出提示界面，原界面不动
            }
        );
    }

    /**
     *
     *  在提交之前对businessData进行一些个性化的处理
     *  首先要把值传到businessData上去
     *  个性化的处理放到子类中去
     */

    getFormData(): void{
        simpleDeepCopy(this.businessData, this.sfForm.value);
    };

    /**
     *  在调出一张历史单据进行修改的时候调用，可能需要一些个性化的处理
     */
    setFormData(data: T){
        console.log("in Crud-base-pro setFormData", data);

        this.businessData = this.newBusinessData();
        this.defaultBusinessData = this.newBusinessData();

        simpleDeepCopy(this.businessData, data);
        //重置当前的界面缺省值
        simpleDeepCopy(this.defaultBusinessData, data);

    }

    /**
     * 重置界面内容
     */
    reset(): void {
        this.setSchemaDefaultValue();
        if(this.curSchema) this.sfForm.refreshSchema(this.curSchema);

        if (this.processType === 'new') {
            //新增界面
            this.businessData =  this.newBusinessData();

        } else {

            // //修改界面，保存当前值到缺省值
            // this.defaultBusinessData = this.newBusinessData();
            // simpleDeepCopy(this.defaultBusinessData, this.businessData);
            this.sfForm.reset();
        }


    }


    abstract newBusinessData(): T;

}
