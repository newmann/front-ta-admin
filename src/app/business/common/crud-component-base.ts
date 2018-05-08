import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OnInit} from '@angular/core';
import {NzMessageService, NzModalService, NzModalRef} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';

import {BylConfigService} from '../../service/constant/config.service';
import {Subject} from 'rxjs/Subject';
import {BylResultBody} from '../../service/model/result-body.model';
import {BylBaseService} from '../../service/service/base.service';
import {BylCrudEvent, BylCrudWaitingComponent} from './waiting/crud-waiting.component';
import {ReuseTabService} from '@delon/abc';
import {Observable} from 'rxjs/Observable';


/**
 * @Description: crud组件对象的抽象类
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-03-31 9:46
 **/

export abstract class BylCrudComponentBase<T> implements OnInit {

    public businessData: T;

    public form: FormGroup;
    public loading = false;
    public errMsg = '';  // 保存时错误信息
    public savingReveal: any;
    public sourceId: string;
    public processType: string;

    public businessService: BylBaseService<T>;

    public searchData$: Subject<string> = new Subject<string>();


    ngOnInit() {
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
                public reuseTabService: ReuseTabService,
                public fb: FormBuilder) {
        this.defineForm();

        //初始化businessData
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
                        // this.loadData(this.sourceId);
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
        this.getFormData();
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

                    this.afterSubmit(); //成功保存后对界面的处理，根据不同状态是否退出

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
    abstract getFormData(): void;

    /**
     * 重置界面内容
     */
    reset(): void {
        // this.form.reset({
        //     code: this._person.code,
        //     name: this._person.name,
        //     remarks: this._person.remarks
        // }, {onlySelf: true, emitEvent: false});

        this.form.markAsPristine();

        // this.logger.log('this.form.dirty' + this.form.dirty);
        // this.logger.log('this.form.invalid' + this.form.invalid);
    }

    afterSubmit() {
        switch (this.processType) {
            case 'new':
                //新增界面
                this.businessData = this.newBusinessData();
                this.reset();
                break;
            case 'modify':
                //修改界面
                // this.businessData = this.newBusinessData();
                this.reset();
                break;
            default:
                // 从list界面进入修改
                console.info('将修改后的数据传回list界面');
                //将修改后的数据传回list界面
                // this.modalSubject.next({type: BylCrudEvent[BylCrudEvent.bylUpdate], data: this.businessData});
                // this.modalSubject.destroy();
        }
    }

    // showSavingReveal() {
    //     this.savingReveal = this.modalService.create({
    //         nzTitle: '提交',
    //         nzZIndex: 9999, //最外层
    //         nzContent: BylCrudWaitingComponent,
    //         // onOk() {
    //         //
    //         // },
    //         // onCancel() {
    //         //     console.log('Click cancel');
    //         // },
    //         nzComponentParams: {
    //             // name: '测试渲染Component'
    //         },
    //         nzMaskClosable: false
    //     });
    //     // this.savingReveal.next(BylCrudEvent[BylCrudEvent.bylSaving]);
    //     //
    //     // this.savingReveal.subscribe(result => {
    //     //     console.info(result);
    //     //     //判断是否退出界面
    //     //     if (result === 'onDestroy') {
    //     //         console.log('退出提示界面');
    //     //         switch (this.processType) {
    //     //             case 'new':
    //     //                 //新增界面
    //     //                 this.businessData = this.newBusinessData();
    //     //                 this.reset();
    //     //                 break;
    //     //             case 'modify':
    //     //                 //修改界面
    //     //                 this.businessData = this.newBusinessData();
    //     //                 this.reset();
    //     //                 break;
    //     //             default:
    //     //                 // 从list界面进入修改
    //     //                 console.info('将修改后的数据传回list界面');
    //     //                 //将修改后的数据传回list界面
    //     //                 this.modalSubject.next({type: BylCrudEvent[BylCrudEvent.bylUpdate], data: this.businessData});
    //     //                 this.modalSubject.destroy();
    //     //
    //     //         }
    //     //
    //     //     }
    //     //
    //     // });
    // }
    //
    // destorySavingReveal() {
    //     if (this.savingReveal) this.savingReveal.destroy();
    // }


    abstract newBusinessData(): T;

}
