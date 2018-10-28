import {Component, Input, OnInit} from '@angular/core';
import {NzMessageService, NzModalRef, NzModalService} from 'ng-zorro-antd';
import {BylConfigService} from '../../../../service/constant/config.service';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {BylDatetimeUtils} from "../../../../service/utils/datetime.utils";
import {BylWorkloadTicket} from "../../../../service/project/model/workload-ticket.model";
import {BylCheckTypeEnum} from "../../../../service/project/model/check-type.enum";
import {BylWorkloadDetailDetailService} from "../../../../service/project/service/workload-detail-detail.service";
import {BylWorkloadDetail} from "../../../../service/project/model/workload-detail.model";
import {BylWorkloadDetailDetail} from "../../../../service/project/model/workload-detail-detail.model";
import {BylResultBody} from "../../../../service/model/result-body.model";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylDetail2BatchAddModel} from "../../../../service/model/detail2-batch-add.model";

@Component({
    selector: 'byl-workload-ticket-list',
    templateUrl: './list.component.html',
    styles: [
            `
            [nz-radio] {
                display: block;
            }
        `
    ]
})
export class BylWorkloadDetailDetailBrowserComponent implements OnInit {
    style = {
        display: 'block',
        height: '20px',
        lineHeight: '20px'
    };

    loading: boolean = false;

    get CheckType_Day() {
        return BylCheckTypeEnum.DAY;
    }

    get CheckType_Hour() {
        return BylCheckTypeEnum.HOUR;
    }

    // @Input()
    beginDate: Date;//开始日期
    // @Input()
    endDate: Date;//截止日期

    // @Input()
    // checkType: BylCheckTypeEnum;
    // @Input()
    // standardTimeLength: number;

    @Input()
    set setWorkloadTicket(value: BylWorkloadTicket) {
        this._workloadTicket = value;
        this.beginDate = BylDatetimeUtils.convertMillsToDateTime(value.operationPeriod.operatonPeriodBeginDate);
        this.endDate = BylDatetimeUtils.convertMillsToDateTime(value.operationPeriod.operatonPeriodEndDate);
        // this.beginDate =
    }

    private _workloadTicket: BylWorkloadTicket;

    @Input()
    workloadDetail: BylWorkloadDetail;


    type: string;
    count: number;

    // statusList: BylIStatusItem[]; //状态
    dayArray: Array<BylDayItem>;

    // public normalWorkTypeStatus: number = BylMasterDataStatusEnum.CONFIRMED;
    savedDetailList: Array<BylWorkloadDetailDetail>;

    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                public modalRef: NzModalRef,
                public router: Router,
                public workloadDetailDetailService: BylWorkloadDetailDetailService) {
        // super(message, configService, modalService, router);
        //
        // this.businessService = workloadDetailDetailService;
        // this.crudUrl = '/project/workload-ticket/crud';
        // this.businessCrudComponent = BylPersonCrudComponent;

        // this.statusList = BylMasterDataStatusManager.getArray();
        // this.querySchema.properties['status'].enum.push(...BylWorkloadTicketStatusManager.getSFSelectDataArray()); //设置查询条件中的状态字段
    }

    ngOnInit(): void {
        this.savedDetailList = []; //初始化为空数组

        this.initDayArray();//设置空数组。

        this.workloadDetailDetailService.findByDetailId(this.workloadDetail.id)
            .subscribe(
                data => {
                    // this.loading = false;
                    if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {

                        this.savedDetailList = [...data.data];
                        this.initDayArray();

                    } else {
                        this.showMsg(data.msg);
                    }
                },
                err => {
                    // this.loading = false;
                    console.log(err);
                    this.showMsg(err.toString());
                }
            );

    }

    initDayArray() {
        // console.log("in WorkoadDetailDetail list initDayArray, workloadTicket:", this._workloadTicket);
        //
        // console.log("in WorkoadDetailDetail list initDayArray, begindate:", this.beginDate);

        // this.beginDate.getFullYear(),this.beginDate.getMonth(),this.beginDate.getDate());
        //
        // console.log("in WorkoadDetailDetail list initDayArray, begindate Month:", this.beginDate.getMonth());
        // console.log("in WorkoadDetailDetail list initDayArray, begindate Day:", this.beginDate.getDay());

        // console.log("in WorkoadDetailDetail list initDayArray, moment:", moment(this.beginDate).toDate());
        //
        // console.log("in WorkoadDetailDetail list getPureDate:", BylDatetimeUtils.getPureDate(this.beginDate));
        let dayIndex = moment(BylDatetimeUtils.getPureDate(this.beginDate));

        this.dayArray = [];
        while (dayIndex.toDate() <= this.endDate) {
            let item = new BylDayItem();

            item.curDate = dayIndex.valueOf();
            item.curDetail = this.getSavedDetail(dayIndex.toDate());
            item.curCheckType = this.workloadDetail.checkType.toString();

            if (item.curDetail) {
                item.curHour = item.curDetail.shouldPayCount;

            } else {
                item.curHour = this.workloadDetail.standardTimeLength;
            }

            this.dayArray.push(item);

            dayIndex = dayIndex.add(1, "day");
        }
        console.log("in WorkoadDetailDetail list initDayArray:", this.dayArray);
    }

    showMsg(msg: string) {
        this.message.info(msg);
    }

    getDayArrayItem(curDate: Date) {

        if ((curDate < this.beginDate) || (curDate >= this.endDate)) return;

        let pureCurDate = moment(BylDatetimeUtils.getPureDate(curDate)).valueOf();

        // console.log("purCurDate:", pureCurDate);

        let filterList = this.dayArray
            .filter(detail => detail.curDate === pureCurDate);

        if (filterList.length > 0) {
            return filterList[0];//因为至于一条，所以取第一个，便于处理。
        } else {
            console.warn("没有找到定义好的Day Array。");
        }
    }

    getSavedDetail(curDate: Date) {
        // console.log("in WorkoadDetailDetail list ngOnInit, curDate:", curDate);

        if ((curDate < this.beginDate) || (curDate >= this.endDate)) return;
        let pureCurDate = moment(BylDatetimeUtils.getPureDate(curDate)).valueOf();

        let filterList = this.savedDetailList
            .filter(detail => detail.workDate === pureCurDate);

        if (filterList.length > 0) {
            return filterList[0];//因为至于一条，所以取第一个，便于处理。
        }
    }

    save() {
        let pools: Array<BylWorkloadDetailDetail> = [];
        let total: number = 0;

        for (let item of this.dayArray) {
            if (item.curDetail) {
                let t = new BylWorkloadDetailDetail();
                simpleDeepCopy(t, item.curDetail);

                /**
                 * 1、考勤时间的处理规则：
                 * 如果是按天考勤，这直接设置为1，
                 * 如果是按小时考勤，同时界面上选择全天，则设置为缺省时长，
                 *  如果界面上设置了具体额小时数，这按这个数据记录考勤。
                 *
                 */

                if (this.workloadDetail.checkType === BylCheckTypeEnum.DAY){
                    t.shouldPayCount = 1
                }else{
                    if (item.curCheckType === String(BylCheckTypeEnum.DAY)){
                        t.shouldPayCount = this.workloadDetail.standardTimeLength;
                    }else{
                        t.shouldPayCount = item.curHour;
                    }
                }
                total = total+ t.shouldPayCount;

                pools.push(t);

            }

        }

        /**
         * 为了避免每次都修改workloadDetail中的数字，在退出这个明细修改界面之后，进行一次性修改
         * 这里，记录一下最新的数字
         * 在quit过程中进行调整
         */
        this.workloadDetail.shouldPayCount = total;


        if (pools.length > 0) {
            //提交到数据库中,成功后显示到界面
            let batchData: BylDetail2BatchAddModel<BylWorkloadDetailDetail> = new BylDetail2BatchAddModel<BylWorkloadDetailDetail>();
            batchData.items = pools;
            batchData.masterId = this.workloadDetail.masterId;
            batchData.modifyDateTime = this._workloadTicket.modifyAction.modifyDateTime;
            batchData.detailId = this.workloadDetail.id;

            console.log("in WorkloadDetailDetail list save", batchData);
            // 根据类型生成角色或账户权限
            this.workloadDetailDetailService.batchAddDetail(batchData)
                .subscribe(
                    data => {
                        this.loading = false;
                        if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                            //1.修改当前的时间戳
                            this._workloadTicket.modifyAction.modifyDateTime = data.data.modifyDateTime;
                            //2。显示返回值
                            this.savedDetailList = [...data.data.items];
                            //3. 将时间戳返回到调用方
                            // this.changeModifyDateTime.emit(this.masterModifyDateTime);

                        } else {
                            this.showMsg(data.msg);
                        }
                    },
                    err => {
                        this.loading = false;
                        console.log(err);
                        this.showMsg(err.toString());
                    }
                );
        }
    }

    quit() {
        this.modalRef.destroy(this.workloadDetail);
    }

    setWholeDay(curDate: Date) {
        let d = new BylWorkloadDetailDetail();
        d.resourseId = this.workloadDetail.resourseId;
        d.resourseCode = this.workloadDetail.resourseCode;
        d.resourseName = this.workloadDetail.resourseName;
        d.workDate = BylDatetimeUtils.convertDateTimeToMills(curDate);
        simpleDeepCopy(d.workType, this.workloadDetail.workType);
        d.shouldPayCount = this.workloadDetail.shouldPayCount;

        this.getDayArrayItem(curDate).curDetail = d;

        console.log("设置为全天：", curDate)
    }

    deleteDetail(curDate: Date) {
        this.getDayArrayItem(curDate).curDetail = null;
    }

    reset() {
        this.initDayArray();
    }

}

class BylDayItem {
    curDate: number;
    curDetail: BylWorkloadDetailDetail;
    curCheckType: string;
    curHour: number;
}
