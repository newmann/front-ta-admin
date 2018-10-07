import { zip } from 'rxjs';
import {Component, OnInit, OnDestroy, ElementRef, ViewChild} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { getTimeDistance, yuan } from '@delon/util';
import { _HttpClient } from '@delon/theme';

import * as d3 from "d3";
import {BylAuthDataService} from "../../../service/auth/auth-data.service";

@Component({
    selector: 'byl-dashboard-workplace',
    templateUrl: './workplace.component.html',
    styleUrls: ['./workplace.component.less']
})
export class BylDashboardWorkplaceComponent implements OnInit, OnDestroy {
    data: any = {
        salesData: [],
        offlineData: [],
    };

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

    getUserCaption(){
        if(this.authDataService.Account){
            return this.authDataService.Account.username;
        }else {
            return null;
        }
    }

    getUserDescription(){
        if(this.authDataService.Account){
            return "你好，".concat(this.authDataService.Account.nickname).concat("！");
        }else {
            return null;
        }
    }
    // public diagram: go.Diagram = new go.Diagram();

    // @ViewChild('helpFlow')
    // private diagramRef: ElementRef;
    //
    // @ViewChild('d3')
    // private d3Ref: ElementRef;

    // private myGoMaker = go.GraphObject.make;
    // private myModel = go.GraphLinksModel;

    constructor(private http: _HttpClient,
                public authDataService: BylAuthDataService,
                public msg: NzMessageService) {

        // this.diagram.initialAutoScale = go.Diagram.Uniform;
        //
        // this.diagram.contentAlignment = go.Spot.Center;
        // this.diagram.toolManager.mouseWheelBehavior = go.ToolManager.WheelZoom;
        // this.diagram.layout = this.myGoMaker(go.ForceDirectedLayout,
        //     {maxIterations: 200, defaultSpringLength: 30, defaultElectricalCharge: 100});
        // // this.diagram.undoManager.isEnabled = true;
        // this.diagram.allowDelete = false;
        // this.diagram.allowInsert = false;
        // this.diagram.isEnabled = true;

        // this.diagram = this.myGoMaker(go.Diagram,this.diagramRef,
        //     {
        //         // start everything in the middle of the viewport
        //         initialContentAlignment: go.Spot.Center,
        //         // have mouse wheel events zoom in and out instead of scroll up and down
        //         "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
        //         // support double-click in background creating a new node
        //         "clickCreatingTool.archetypeNodeData": { text: "new node" },
        //         // enable undo & redo
        //         "undoManager.isEnabled": true
        //     });


        // this.diagram.nodeTemplate= this.myGoMaker(
        //     go.Node,"Auto",
        //     { locationSpot: go.Spot.Center },
        //     this.myGoMaker(go.Shape,"RoundedRectangle",
        //         {
        //             parameter1: 20,  // the corner has a large radius
        //             fill: this.myGoMaker(go.Brush, "Linear", { 0: "rgb(254, 201, 0)", 1: "rgb(254, 162, 0)" }),
        //             stroke: null,
        //             portId: "",  // this Shape is the Node's port, not the whole Node
        //             fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
        //             toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
        //             cursor: "pointer"
        //         }),
        //     this.myGoMaker(go.TextBlock,
        //         {
        //             font: "bold 11pt helvetica, bold arial, sans-serif",
        //             editable: true  // editing the text automatically updates the model data
        //         },
        //         new go.Binding("text", "text"))
        // );


        // this.diagram.groupTemplate = this.myGoMaker(
        //     go.Group,"Auto",
        //     this.myGoMaker(go.Shape, "Rectangle",
        //         { fill: null, stroke: "gray",     strokeWidth: 2 }),
        //     this.myGoMaker(go.Panel, "Vertical",
        //         { defaultAlignment: go.Spot.Left, margin: 4 },
        //         this.myGoMaker(go.Panel, "Horizontal",
        //             { defaultAlignment: go.Spot.Top },
        //             // the SubGraphExpanderButton is a panel that functions as a button to expand or collapse the subGraph
        //             this.myGoMaker("SubGraphExpanderButton"),
        //             this.myGoMaker(go.TextBlock,
        //                 { font: "Bold 18px Sans-Serif", margin: 4 },
        //                 new go.Binding("text", "key"))
        //         ),
        //         this.myGoMaker(go.Placeholder,
        //             { padding: new go.Margin(0, 10) })
        //     )
        // );
        // this.diagram.linkTemplate =
        //     this.myGoMaker(go.Link,  // the whole link panel
        //         this.myGoMaker(go.Shape,  // the link shape
        //             { stroke: "black" }),
        //         this.myGoMaker(go.Shape,  // the arrowhead
        //             { toArrow: "standard", stroke: null }),
        //         this.myGoMaker(go.Panel, "Auto",
        //             this.myGoMaker(go.Shape,  // the label background, which becomes transparent around the edges
        //                 { fill: this.myGoMaker(go.Brush, "Radial", { 0: "rgb(240, 240, 240)", 0.3: "rgb(240, 240, 240)", 1: "rgba(240, 240, 240, 0)" }),
        //                     stroke: null }),
        //             this.myGoMaker(go.TextBlock,  // the label text
        //                 { textAlign: "center",
        //                     font: "10pt helvetica, arial, sans-serif",
        //                     stroke: "#555555",
        //                     margin: 4 },
        //                 new go.Binding("text", "text"))
        //         )
        //     );


    }

    ngOnInit() {

        // this.diagram.div = this.diagramRef.nativeElement;

        // this.diagram.model = new go.GraphLinksModel(
        //     [
        //         { key: "account", "text": "账户" },
        //         { key: "permission",  "text": "权限" },
        //         { key: "role", "text": "角色" },
        //         { key: "person",  "text": "个体" },
        //         { key: "organization", "text": "组织" },
        //
        //         { key: "project",  "text": "项目定义" },
        //         { key: "operationPeriod",  "text": "业务期间" },
        //         { key: "employee", "text": "员工" },
        //         { key: "outersourcer",  "text": "外包工组" },
        //         { key: "outersourceEmployee", "text": "外包工组员工" },
        //         { key: "expenseType","text": "费用类型" },
        //         { key: "expenseTicket", "text": "费用单" },
        //         { key: "projectManagerPool", text: "项目经理资源池", color: "lightblue",group:'项目管理' },
        //         { key: "borrowMoneyPool", text: "可借款资源池", color: "lightblue",group:'项目管理' },
        //         { key: "borrowMoneyTicket", text: "借款单", color: "lightblue",group:'项目管理' },
        //         { key: "workloadTicket", text: "考勤登记单", color: "lightblue",group:'项目管理' },
        //         { key: "workType", text: "工种", color: "lightblue",group:'项目管理' },
        //         { key: "workTypeConfigTicket", text: "工种配置单", color: "lightblue",group:'项目管理' },
        //     ],
        //     [
        //         { from: "permission", to: "account" ,text: "拥有"},
        //         { from: "permission", to: "role" ,text: "拥有"},
        //         { from: "account", to: "role" ,text: "拥有"},
        //         { from: "account", to: "project",text: "操作者" },
        //         { from: "operationPeriod", to: "expenseTicket" ,text: "设置业务期间"},
        //         { from: "operationPeriod", to: "borrowMoneyTicket",text: "设置业务期间" },
        //         { from: "operationPeriod", to: "workloadTicket",text: "设置业务期间" },
        //         { from: "project", to: "expenseTicket",text: "设置所属项目" },
        //         { from: "project", to: "borrowMoneyTicket",text: "设置所属项目" },
        //         { from: "project", to: "workloadTicket",text: "设置所属项目" },
        //         { from: "employee", to: "projectManagerPool",text: "对应到员工" },
        //         { from: "employee", to: "borrowMoneyPool" ,text: "对应到员工" },
        //         { from: "employee", to: "workloadTicket",text: "设置考勤对象" },
        //
        //         { from: "outersourceEmployee", to: "borrowMoneyPool" ,text: "设置可借款" },
        //
        //         { from: "borrowMoneyPool", to: "borrowMoneyTicket",text: "选择可借款资源"  },
        //
        //         { from: "projectManagerPool", to: "project" ,text: "设置项目经理" },
        //
        //         { from: "expenseType", to: "expenseTicket",text: "定义费用类型"  },
        //
        //         { from: "outersourceEmployee", to: "outersourcer",text: "拥有"  },
        //         { from: "outersourceEmployee", to: "workTypeConfigTicket",text: "修改工种类型"  },
        //         { from: "employee", to: "workTypeConfigTicket",text: "修改工种类型"  },
        //         { from: "workType", to: "workTypeConfigTicket",text: "修改工种类型"  },
        //         { from: "organization", to: "outersourcer",text: "对应到组织定义"  },
        //         { from: "person", to: "employee" ,text: "对应到个人定义" },
        //         { from: "person", to: "outersourceEmployee",text: "对应到个人定义"  },
        //
        //     ]
        // );

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

    // radius = 10;
    //
    // d3Clicked(event: any){
    //     let d3Element = this.d3Ref.nativeElement;
    //
    //     d3.select(event.target).append('circle')
    //         .attr('cx', event.x)
    //         .attr('cy', event.y)
    //         .attr('r', () => {
    //             return this.radius;
    //         })
    //         .attr('fill', 'red');
    // }
}


