import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { OnInit} from '@angular/core';
import {LoggerService} from '../../service/utils/logger';
import {NzMessageService, NzModalService, NzModalSubject} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';

import {BylConfigService} from '../../service/constant/config.service';
import {Subject} from 'rxjs/Subject';
import {BylResultBody} from '../../service/model/result-body.model';
import {BylBaseService} from '../../service/service/base.service';
import {BylCrudEvent, BylCrudWaitingComponent} from './waiting/crud-waiting.component';


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
        //在从list窗口调入的情况下，载入数据
        if (this.sourceId) this.loadData(this.sourceId);
    }

    constructor(public msgService: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public modalSubject: NzModalSubject,
                public activatedRoute: ActivatedRoute,
                public logger: LoggerService,
                public fb: FormBuilder) {
        this.defineForm();

        this.activatedRoute
            .paramMap
            .subscribe(params => {
                this.logger.log('activedRoute', params);
                this.logger.log('activedRoute', params.get('type'));
                this.processType = params.get('type') || '';

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
    loadData(id: String) {

        // this.showLoadingReveal();
        // this._loading = true;
        this.errMsg = '';
        this.businessService.findById(this.sourceId).subscribe(
            data => {
                // this._loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                    this.logger.info(data.data);
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
        this.showSavingReveal();
        // this._loading = true;
        this.errMsg = '';
        this.getFormData();

        this.businessService.add(this.businessData).subscribe(
            data => {
                // this._loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                    // 通知显示窗口保存正确
                    this.savingReveal.next(BylCrudEvent[BylCrudEvent.bylSaveCorrect]);
                    // this.msgService.success('保存正确！');
                    // 如果是通过浏览界面进入，则自动退出

                } else {
                    // 通知显示窗口保存错误，是否退出由显示界面控制
                    this.savingReveal.next(BylCrudEvent[BylCrudEvent.bylSaveError]);
                    // this._savingReveal.destroy();
                    this.errMsg = data.msg;
                }
            },
            err => {
                // 通知显示窗口保存错误，是否退出由显示界面控制
                this.savingReveal.next(BylCrudEvent[BylCrudEvent.bylSaveError]);
                // this._loading = false;
                this.errMsg = err.toString();
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
        this.logger.log('this.form.dirty' + this.form.dirty);
        this.logger.log('this.form.invalid' + this.form.invalid);
    }

    showSavingReveal() {
        this.savingReveal = this.modalService.open({
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
        this.savingReveal.next(BylCrudEvent[BylCrudEvent.bylSaving]);
        //
        this.savingReveal.subscribe(result => {
            this.logger.info(result);
            //判断是否退出界面
            if (result === 'onDestroy') {
                console.log('退出提示界面');
                switch (this.processType) {
                    case 'new':
                        //新增界面
                        this.businessData = this.newBusinessData();
                        this.reset();
                        break;
                    case 'modify':
                        break;
                    default:
                        // 从list界面进入修改
                        this.logger.info('将修改后的数据传回list界面');
                        //将修改后的数据传回list界面
                        this.modalSubject.next({type: BylCrudEvent[BylCrudEvent.bylUpdate], data: this.businessData});
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
        if (this.savingReveal) this.savingReveal.destroy();
    }

    abstract newBusinessData(): T;

}
