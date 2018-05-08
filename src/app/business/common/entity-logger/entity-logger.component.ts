import {Component, forwardRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {BylSimpleEntityLogger} from "../../../service/simple-entity-logger/model/simple-entity-logger.model";
import {BylSimpleEntityLoggerService} from "../../../service/simple-entity-logger/service/simple-entity-logger.service";
import {BylResultBody} from "../../../service/model/result-body.model";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {BylEmbeddableAddressComponent} from "../embeddable-address/embeddable-address.component";

// const noop = () => {
// };

@Component({
  selector: 'byl-entity-logger',
  templateUrl: './entity-logger.component.html',
  // host: {
  //       // 宿主元素 click 事件，触发 focus() 事件
  //       '(click)': 'entityLoggerClick()'
  //   },
    // providers: [{
    //     provide: NG_VALUE_ACCESSOR,
    //     useExisting: forwardRef(() => BylEntityLoggerComponent),
    //     multi: true
    // }],
  encapsulation: ViewEncapsulation.None
})
export class BylEntityLoggerComponent /*implements ControlValueAccessor */ {
    // @Input() public title: string;
    @Input() public entityId: string;

    // private _value: any;
    public entityLogList: Array<BylSimpleEntityLogger> = []; // 实体操作日志
    public entityLogErrorMsg: string;

    constructor(
        public entityLogger: BylSimpleEntityLoggerService,
    ) { }

    /** Callback registered via registerOnTouched (ControlValueAccessor)
     * 此属性在做表单校验的时候，不可少，
     * 如果缺少了这个属性，FormControl.touched 属性将监测不到，切记！！
     */
    // private _onTouchedCallback: () => void = noop;
    /** Callback registered via registerOnChange (ControlValueAccessor) */
    // private _onChangeCallback: (_: any) => void = noop;

    /**
     * Write a new value to the element.
     */
    // writeValue(value: any) {
    //     this._value = value;
    // }

    /**
     * Set the function to be called when the control receives a change event.
     */
    // registerOnChange(fn: any) {
    //     this._onChangeCallback = fn;
    // };

    /**
     * Set the function to be called when the control receives a touch event.
     */
    // registerOnTouched(fn: any) {
    //     this._onTouchedCallback = fn;
    // }
    entityLoggerClick(){

        // console.dir($event);
        // $event.stopPropagation();
        if (this.entityLogList.length === 0){
            this.fetchEntityLogList();
        }


    }

    fetchEntityLogList(){

        if (!(this.entityId)) {return ;} //新增窗口无法刷新

        this.entityLogList = []; //清空原来的数据

        this.entityLogger.findByTargetId(this.entityId).subscribe((data) => {
                console.log(data);
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                    //显示日志到界面
                    this.entityLogList.push(...data.data);

                } else {
                    //显示错误信息
                    this.entityLogErrorMsg = data.msg;

                }

            },
            (err) => {
                this.entityLogErrorMsg = err.toString();
            }
        )
    }
}
