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


/**
 * @Description: crud组件对象的抽象类
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 9:46
 **/

export abstract class BylCrudComponentBasePro<T> implements OnInit {
    public defaultBusinessData: T;
    public businessData: T;
    public formUiSchema: SFUISchema = {};
    public formSchema: SFSchema = {
        properties: {}
    };

    public loading = false;
    public errMsg = '';  // 保存时错误信息
    public savingReveal: any;
    public sourceId: string;
    public processType: string;

    public businessService: BylBaseService<T>;

    public searchData$: Subject<string> = new Subject<string>();

    sfForm: SFComponent;

    ngOnInit() {
        //刷新schema
        // this.sfForm.refreshSchema();

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
                    console.info(data.data);
                    Object.assign(this.businessData, data.data);
                    //重置当前的界面缺省值
                    Object.assign(this.defaultBusinessData, data.data);

                    this.reset();
                } else {

                    this.errMsg = data.msg;
                }
                // 退出显示窗口
                // this._loading = false;
                // this.destorySavingReveal();

            },
            err => {
                this.errMsg = err.toString();

                // 退出显示窗口
                // this._loading = false;
                // this.destorySavingReveal();

            }
        );
    }

    /**
     * 保存
     */
    submitForm() {
        const msgId = this.msgService.loading('正在保存..', {nzDuration: 0}).messageId;
        // this.showSavingReveal();
        // this._loading = true;
        this.errMsg = '';
        // this.getFormData();
        let saveResult$: Observable<BylResultBody<T>>;

        console.log('submit form', this.businessData);

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
                    // 通知显示窗口保存正确
                    // this.savingReveal.next(BylCrudEvent[BylCrudEvent.bylSaveCorrect]);
                    // this.savingReveal.destroy(); //退出提示界面
                    if (this.processType === 'new') {
                        //新增界面
                        Object.assign(this.defaultBusinessData, this.newBusinessData());
                    } else {
                        //将返回值设置到default值中
                        Object.assign(this.defaultBusinessData, data.data);
                    }
                    this.reset(); //重置界面

                } else {
                    // 通知显示窗口保存错误，是否退出由显示界面控制
                    // this.savingReveal.next(BylCrudEvent[BylCrudEvent.bylSaveError]);
                    // this._savingReveal.destroy();
                    this.errMsg = data.msg;
                    // this.savingReveal.destroy(); //退出提示界面，原界面不动
                }

                this.msgService.remove(msgId);

            },
            err => {
                // 通知显示窗口保存错误，是否退出由显示界面控制
                // this.savingReveal.next(BylCrudEvent[BylCrudEvent.bylSaveError]);
                // this._loading = false;
                this.errMsg = err.toString();

                this.msgService.remove(msgId);
                // this.savingReveal.destroy(); //退出提示界面，原界面不动
            }
        );
    }

    /**
     *  将界面中的数据保存到businessData中去
     */

    // abstract getFormData(): void;

    /**
     * 重置界面内容
     */
    reset(): void {
        console.log('reset ,sfForm', this.sfForm);

        Object.assign(this.businessData, this.defaultBusinessData);
        this.sfForm.reset();
    }


    abstract newBusinessData(): T;

}