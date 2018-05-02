import {Component, Input, OnInit} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {BylSimpleEntityLogger} from "../../../service/simple-entity-logger/model/simple-entity-logger.model";
import {BylSimpleEntityLoggerService} from "../../../service/simple-entity-logger/service/simple-entity-logger.service";
import {BylResultBody} from "../../../service/model/result-body.model";

@Component({
  selector: 'byl-entity-logger',
  templateUrl: './entity-logger.component.html',
})
export class BylEntityLoggerComponent implements OnInit {
    @Input() public title: string;
    @Input() public entityId: string;

    public entityLogList: Array<BylSimpleEntityLogger> = []; // 实体操作日志
    public entityLogErrorMsg: string;

    constructor(
        public entityLogger: BylSimpleEntityLoggerService,
    ) { }

    ngOnInit() {
    }
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
