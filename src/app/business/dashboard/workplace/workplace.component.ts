import { zip } from 'rxjs';
import {Component, OnInit, OnDestroy, ElementRef, ViewChild} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { getTimeDistance, yuan } from '@delon/util';
import { _HttpClient } from '@delon/theme';
import * as go from "gojs";

@Component({
    selector: 'byl-dashboard-workplace',
    templateUrl: './workplace.component.html',
    styleUrls: ['./workplace.component.less']
})
export class BylDashboardWorkplaceComponent implements OnInit, OnDestroy {
    notice: any[] = [];
    activities: any[] = [];
    radarData: any[] = [];
    loading = true;

    // region: mock data
    links = [
        {
          title: '操作一',
          href: '',
        },
        {
          title: '操作二',
          href: '',
        },
        {
          title: '操作三',
          href: '',
        },
        {
          title: '操作四',
          href: '',
        },
        {
          title: '操作五',
          href: '',
        },
        {
          title: '操作六',
          href: '',
        },
    ];
    members = [
        {
          id: 'members-1',
          title: '科学搬砖组',
          logo: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
          link: '',
        },
        {
          id: 'members-2',
          title: '程序员日常',
          logo: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
          link: '',
        },
        {
          id: 'members-3',
          title: '设计天团',
          logo: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
          link: '',
        },
        {
          id: 'members-4',
          title: '中二少女团',
          logo: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
          link: '',
        },
        {
          id: 'members-5',
          title: '骗你学计算机',
          logo: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
          link: '',
        },
      ];
    // endregion

    private diagram: go.Diagram = new go.Diagram();

    @ViewChild('helpFlow')
    private diagramRef: ElementRef;
    private myGoMaker = go.GraphObject.make;
    private myModel = go.GraphLinksModel;

    constructor(private http: _HttpClient, public msg: NzMessageService) {
        this.diagram.initialContentAlignment = go.Spot.Center;
        this.diagram.undoManager.isEnabled = true;


        this.diagram.nodeTemplate= this.myGoMaker(
            go.Node,"Auto",
            this.myGoMaker(go.Shape,
                "RoundedRectangle",{strokeWidth: 0},
                new go.Binding("fill","color")),
            this.myGoMaker(go.TextBlock,{margin:8},
                new go.Binding("text","key"))
        );

        this.diagram.groupTemplate = this.myGoMaker(
            go.Group,"Auto",
            this.myGoMaker(go.Shape, "Rectangle",
                { fill: null, stroke: "gray",     strokeWidth: 2 }),
            this.myGoMaker(go.Panel, "Vertical",
                { defaultAlignment: go.Spot.Left, margin: 4 },
                this.myGoMaker(go.Panel, "Horizontal",
                    { defaultAlignment: go.Spot.Top },
                    // the SubGraphExpanderButton is a panel that functions as a button to expand or collapse the subGraph
                    this.myGoMaker("SubGraphExpanderButton"),
                    this.myGoMaker(go.TextBlock,
                        { font: "Bold 18px Sans-Serif", margin: 4 },
                        new go.Binding("text", "key"))
                ),
                this.myGoMaker(go.Placeholder,
                    { padding: new go.Margin(0, 10) })
            )
        );
    }

    ngOnInit() {
        this.diagram.div = this.diagramRef.nativeElement;

        this.diagram.model = new go.GraphLinksModel(
            [
                { key: "账户", color: "pink",isGroup: true },
                { key: "用户", color: "lightblue",group:'账户' },
                { key: "权限", color: "lightblue",group:'账户' },
                { key: "角色", color: "lightblue",group:'账户' },

                { key: "个人", color: "pink",isGroup: true },

                { key: "个人定义", color: "lightblue",group:'个人' },

                { key: "组织", color: "pink",isGroup: true },

                { key: "组织定义", color: "lightblue",group:'组织' },

                { key: "项目管理", color: "pink",isGroup: true },
                { key: "项目定义", color: "lightblue",group:'项目管理' },



                { key: "业务期间", color: "lightblue",group:'项目管理' },
                { key: "员工", color: "lightblue",group:'项目管理' },
                { key: "外包工组", color: "lightblue",group:'项目管理' },
                { key: "外包工组员工", color: "lightblue",group:'项目管理' },
                { key: "费用类型", color: "lightblue",group:'项目管理' },
                { key: "费用单", color: "lightblue",group:'项目管理' },
                { key: "项目经理资源池", color: "lightblue",group:'项目管理' },
                { key: "可借款资源池", color: "lightblue",group:'项目管理' },
                { key: "借款单", color: "lightblue",group:'项目管理' },
                { key: "考勤登记单", color: "lightblue",group:'项目管理' },
                { key: "工种", color: "lightblue",group:'项目管理' },
                { key: "工种配置单", color: "lightblue",group:'项目管理' },
            ],
            [
                { from: "业务期间", to: "费用单" },
                { from: "业务期间", to: "借款单" },
                { from: "业务期间", to: "考勤登记单" },
                { from: "项目定义", to: "费用单" },
                { from: "项目定义", to: "借款单" },
                { from: "项目定义", to: "考勤登记单" },
                { from: "员工", to: "项目经理资源池" },
                { from: "员工", to: "可借款资源池" },
                { from: "外包工组员工", to: "可借款资源池" },
                { from: "外包工组员工", to: "借款单" },
                { from: "项目经理资源池", to: "项目定义" },
                { from: "费用类型", to: "费用单" },
                { from: "外包工组", to: "外包工组员工" },
                { from: "工种", to: "工种配置单" },
                { from: "工种配置单", to: "考勤登记单" },
                { from: "组织定义", to: "外包工组" },
                { from: "个人", to: "员工" },
                { from: "个人", to: "外包员工" },
            ]
        );

        // zip(
        //     this.http.get('/chart'),
        //     this.http.get('/api/notice'),
        //     this.http.get('/api/activities')
        // ).subscribe(([ chart, notice, activities ]: [ any, any, any ]) => {
        //     this.radarData = chart.radarData;
        //     this.notice = notice;
        //     this.activities = activities.map((item: any) => {
        //         item.template = item.template.split(/@\{([^{}]*)\}/gi).map((key: string) => {
        //             if (item[key]) return `<a>${item[key].name}</a>`;
        //             return key;
        //         });
        //         return item;
        //     });
        //     this.loading = false;
        // });
    }

    ngOnDestroy(): void {
    }
}
