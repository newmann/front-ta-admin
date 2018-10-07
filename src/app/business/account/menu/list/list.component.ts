import {Component, HostListener, ViewChild} from '@angular/core';
import {
    NzDropdownContextComponent,
    NzDropdownService,
    NzFormatBeforeDropEvent,
    NzFormatEmitEvent,
    NzMessageService,
    NzModalRef,
    NzModalService,
    NzTreeComponent,
    NzTreeNode
} from 'ng-zorro-antd';
import {BylListFormData} from '../../../../service/model/list-form-data.model';
import {Router} from '@angular/router';
import {BylIStatusItem} from '../../../../service/model/status.model';
import {BylResultBody} from '../../../../service/model/result-body.model';
import * as moment from 'moment';
import {BylConfigService} from '../../../../service/constant/config.service';
import {BylDepartmentQuery} from '../../../../service/account/query/department-query.model';
import {BylTreeDispalyModel} from '../../../../service/model/tree-display.model';
import {Observable, of, Subject, zip} from 'rxjs';
import {debounceTime, distinctUntilChanged, flatMap} from 'rxjs/operators';
// import {Observable} from 'rxjs/Observable';
// import {zip} from 'rxjs/observable/zip';
import {BylListComponentBase} from '../../../common/list-component-base';
import {BylMasterDataStatusEnum, BylMasterDataStatusManager} from '../../../../service/model/master-data-status.enum';
import {SFSchema, SFUISchema} from "@delon/form";
import {BylMenu} from "../../../../service/account/model/menu.model";
import {BylMenuService} from "../../../../service/account/service/menu.service";
import {BYL_TREE_NODE_ID_DEFAULT_VALUE} from "../../../../service/constant/general.constant";
import {simpleDeepCopy} from "../../../../service/utils/object.utils";
import {BylMenuCrudComponent} from "../crud/crud.component";
import {catchError} from "rxjs/internal/operators";
import {HttpClient} from "@angular/common/http";
import {BylMenuLinkService} from "../../../../service/account/service/menu-link.service";
import {BylMenuLink} from "../../../../service/account/model/menu-link.model";
import {MenuService} from "@delon/theme";


@Component({
    selector: 'byl-menu-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.less']
})
export class BylMenuListComponent extends BylListComponentBase<BylMenu> {

    statusList: BylIStatusItem[]; //状态

    filterData: string;

    nodes: Array<NzTreeNode> = [];
    // nodes: Array<NzTreeNodeOptions> = [];
    // can active only one node
    activedNode: NzTreeNode;
    dragNodeElement;
    dropdown: NzDropdownContextComponent;

    dragPos: number;
    dragNode: NzTreeNode;
    dragTargetNode: NzTreeNode;

    public addForm: NzModalRef;//维护界面

    public loadingDefaultMenu = false;
    public importingMenuDefine = false;
    options = {
        allowDrag: false
        // getChildren: (node: any) => {
        //     return new Promise((resolve, reject) => {
        //         setTimeout(() => resolve([
        //             { name: 'async data1' },
        //             { name: 'async data2', hasChildren: true }
        //         ]), 1000);
        //     });
        // }
    };

    private _treeExpand$: Subject<BylTreeDispalyModel<BylMenu>> = new Subject<BylTreeDispalyModel<BylMenu>>();

    private _nodeObservable: Observable<BylTreeDispalyModel<BylMenu>>;
    private _departmentObservable: Observable<BylResultBody<Array<BylMenu>>>;
    private _expandObservable: any;


    @ViewChild(NzTreeComponent) tree: NzTreeComponent;

    ngOnInit(){
        //第一次进入界面，获取第一层的菜单，其他层级的菜单通过点击展开后调入。
        let rootMenu = new BylMenu();
        rootMenu.caption = BYL_TREE_NODE_ID_DEFAULT_VALUE;
        rootMenu.leaf =false;
        rootMenu.levelNo = 0;
        rootMenu.id = BYL_TREE_NODE_ID_DEFAULT_VALUE;
        rootMenu.parentId = BYL_TREE_NODE_ID_DEFAULT_VALUE;
        rootMenu.leftNodeId = BYL_TREE_NODE_ID_DEFAULT_VALUE;
        rootMenu.rightNodeId = BYL_TREE_NODE_ID_DEFAULT_VALUE;

        let node = this.newMenuNode(rootMenu);

        this.nodes.push(node);
    }

    // updateMenuNode(node: NzTreeNode, menu: BylMenu){
    //     node.title = menu.caption;
    //     node.key = menu.id;
    //     node.origin.item = simpleDeepCopy(new BylMenu(), menu);
    // }
    //

    newMenuNode(menu: BylMenu):NzTreeNode{
        // let node = new BylTreeDispalyModel<BylMenu>();
        // node.key = menu.id;
        // node.title = menu.caption;
        //
        // node.item = simpleDeepCopy(new BylMenu(), menu);

        return new NzTreeNode(
            {
                title: menu.caption,
                key: menu.id,
                isLeaf: menu.leaf,
                item: simpleDeepCopy(new BylMenu(), menu)
            }
        );
    }

    loadChild(node: NzTreeNode){
        node.origin.isLoading = true;

        this.bylMenuService.findAllByParentId(node.key)
            .subscribe(
                data => {

                    if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {

                        // this.updateListData(data.data);
                        node.addChildren(this.genChildNodeList(data.data));

                    } else {
                        this.showMsg(data.msg);
                    }
                    node.origin.isLoading = false;
                },
                err => {
                    console.log(err);
                    this.showMsg(err.toString());
                    node.origin.isLoading = false;

                }
            )
    }

    genChildNodeList(itemList: Array<BylMenu>): Array<NzTreeNode>{
        let nodes = [];
        let menu = itemList.find(item => item.leftNodeId === BYL_TREE_NODE_ID_DEFAULT_VALUE);
        if (! menu) return nodes; //如果没找到，则返回空数组

        nodes.push(this.newMenuNode(menu));

        while( menu.rightNodeId !== BYL_TREE_NODE_ID_DEFAULT_VALUE ){
            menu = itemList.find(item => item.id === menu.rightNodeId);
            nodes.push(this.newMenuNode(menu));
        }

        return nodes;
    }

    mouseAction(name: string, e: NzFormatEmitEvent): void {
        if (name === 'expand') {
            if (e.node.getChildren().length === 0 && e.node.isExpanded) {
                //载入子菜单
                e.node.origin.isLoading = true;
                this.loadChild(e.node);
                // e.node.addChildren([
                //     {
                //         title: 'childAdd-1',
                //         key  : '10031-' + (new Date()).getTime()
                //     },
                //     {
                //         title : 'childAdd-2',
                //         key   : '10032-' + (new Date()).getTime(),
                //         isLeaf: true
                //     } ]);
            }
        }
    }

    @HostListener('mouseleave', [ '$event' ])
    mouseLeave(event: MouseEvent): void {
        event.preventDefault();
        if (this.dragNodeElement && this.dragNodeElement.className.indexOf('is-dragging') > -1) {
            this.dragNodeElement.className = this.dragNodeElement.className.replace(' is-dragging', '');
        }
    }

    @HostListener('mousedown', [ '$event' ])
    mouseDown(): void {
        // do not prevent
        if (this.dragNodeElement && this.dragNodeElement.className.indexOf('is-dragging') > -1) {
            this.dragNodeElement.className = this.dragNodeElement.className.replace(' is-dragging', '');
        }
    }
    // 选中节点
    activeNode(data: NzTreeNode | NzFormatEmitEvent): void {

        if (this.activedNode) {
            this.activedNode = null;
        }
        let item: NzTreeNode;
        if (data instanceof NzTreeNode) {
            item = data;
        } else {
            item = data.node;
        }

        item.isSelected = true;
        this.activedNode = item;

    }

    dragStart(event: NzFormatEmitEvent): void {
        // disallow drag if root or search
        this.activedNode = null;
        this.dragNodeElement = event.event.srcElement;
        if (this.dragNodeElement.className.indexOf('is-dragging') === -1) {
            this.dragNodeElement.className = event.event.srcElement.className + ' is-dragging';
        }
    }

    dragDrop(event: NzFormatEmitEvent):void{
        // console.log("dragAction", this.dragAction);
        // console.log("drag Action Node", this.dragActionNode);
        // console.log("active node", this.activedNode);
        console.log("drag Drop :");

    }

    beforeDrop(arg: NzFormatBeforeDropEvent): Observable<boolean> {
        console.log("before Drop:", arg);
        // console.log((<any> window).bylTreeService instanceof BylMenuService);
        // return of(false);

        return (<any> window).bylTreeService.moveNode(arg.node.origin.item,arg.dragNode.origin.item,arg.pos)
            .pipe(
                flatMap(
                    data=>{
                        if ((<any>data).code === BylResultBody.RESULT_CODE_SUCCESS) {
                            // 将返回的数据同步到界面中
                            console.log(data);
                            simpleDeepCopy(arg.dragNode.origin.item, (<any>data).data);

                            return of(true);
                        } else {
                            console.error("ResultBody error:", (<any>data).msg);

                            return of(false);
                        }

                    }
                )
                ,
                catchError(err=>{
                    console.error("catchError:",err);
                    return of(false);
                })
            )
            ;

    }

    // dragEnter(event: NzFormatEmitEvent):void{
    //     this.dragAction = "enter";
    //     this.dragActionNode = event.node;
    // }
    //
    // dragLeave(event: NzFormatEmitEvent): void{
    //     this.dragAction = "leave";
    //     this.dragActionNode = event.node;
    // }

    openNode(data: NzTreeNode | NzFormatEmitEvent): void {
        // 双击刷新
        // change node's expand status
        let item: NzTreeNode;

        if (data instanceof NzTreeNode) {
            item = data;
        } else {
            item = data.node;
        }

        if (!item.isLeaf) {
            // close to open

            item.clearChildren();//重新载入，所以要先清空
            this.loadChild(item);
        }


    }

    /**
     * 新增子菜单
     * @param {NzTreeNode} node
     */
    addChildMenu(node: NzTreeNode){

        this.addForm = this.modalService.create({
            nzTitle: '添加菜单',
            nzZIndex: 9999, //最外层
            nzWidth: '90%',
            nzContent: BylMenuCrudComponent,
            nzFooter: null,
            // onOk() {
            //
            // },
            // onCancel() {
            //     console.log('Click cancel');
            // },
            nzComponentParams: {
                setSourceId: null,
                setParentMenu: node.origin.item
            },
            nzMaskClosable: false
        });
        // this.addForm.next(BylCrudEvent[BylCrudEvent.bylSaving]);

        this.addForm.afterClose.subscribe(result => {
            console.info(result);

            console.info(typeof result);

            //返回的是选中的账户数组
            let newMenu: BylMenu;
            if ((typeof result) === 'object') {
                console.log('添加新增的个体数据');
                newMenu = result;
            }

            if (newMenu) {
                //todo 提交到数据库中,成功后显示到界面
                let addMenu: Observable<BylResultBody< any >>;

                // 根据类型生成角色或账户权限
                addMenu = this.bylMenuService.add(newMenu);

                addMenu.subscribe(
                    data => {
                        this.loading = false;
                        if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                            // 正确添加数据后，直接添加到当前选中的权限，不像search过程，会重新刷新total值
                            node.addChildren([this.newMenuNode(data.data)]);

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
        });

    }

    /**
     * 修改菜单
     * @param {NzTreeNode} node
     */
    editMenu(node: NzTreeNode){
        this.addForm = this.modalService.create({
            nzTitle: '修改菜单',
            nzZIndex: 9999, //最外层
            nzWidth: '90%',
            nzContent: BylMenuCrudComponent,
            nzFooter: null,
            // onOk() {
            //
            // },
            // onCancel() {
            //     console.log('Click cancel');
            // },
            nzComponentParams: {
                setSourceId: node.origin.item.id,
                setParentMenu: node.origin.item
            },
            nzMaskClosable: false
        });
        // this.addForm.next(BylCrudEvent[BylCrudEvent.bylSaving]);

        this.addForm.afterClose.subscribe(result => {
            console.info(result);

            console.info(typeof result);

            let updatedMenu: BylMenu;
            if ((typeof result) === 'object') {
                updatedMenu = result;
            }

            if (updatedMenu) {
                //todo 提交到数据库中,成功后显示到界面
                let updateMenu: Observable<BylResultBody< any >>;

                updateMenu = this.bylMenuService.update(updatedMenu);

                updateMenu.subscribe(
                    data => {
                        this.loading = false;
                        if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                            node.title = data.data.caption;
                            node.key = data.data.id;
                            node.origin.item = simpleDeepCopy(new BylMenu(), data.data);

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
        });
    }

    addSlibedMenu($event: MouseEvent){
        console.log("addSlibedMenu",$event);
    }

    deleteMenu(node: NzTreeNode){
        console.log("deleteMenu",node);
        this.bylMenuService.deleteNode(node.origin.item)
            .subscribe(data =>{
                    if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {

                        node.clearChildren();
                        node.parentNode.children = node.parentNode.children.filter(item => item.key !== node.key);


                    } else {
                        this.showMsg(data.msg);
                    }

            },
                err =>{
                this.showMsg(err);
        });


    }

    onToggleExpanded(ev: any) {
        //只有在展开节点的时候重新从后台数据库刷新数据
        if (ev.isExpanded) {
            this._treeExpand$.next(ev.node);
        }

    }

    registerTreeToggleExpanded() {
        this._nodeObservable = this._treeExpand$.pipe(
            debounceTime(1000),
            distinctUntilChanged()
        );
        this._departmentObservable = this._nodeObservable.pipe(
            flatMap(node => {
                return this.bylMenuService.findAllByParentId(node.item.id);
            })
        );

        this._expandObservable = zip(
            this._nodeObservable,
            this._departmentObservable,
            (node: BylTreeDispalyModel<BylMenu>, data: BylResultBody<Array<BylMenu>>) => ({node, data})
        );
        this._expandObservable.subscribe(
            ({node, data}) => {

                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {

                    // this.listData = Array.from(data.data.rows);
                    node.data.children = this.genNodeData(data.data);
                    // this.tree.treeModel.update();

                } else {
                    this.showMsg(data.msg);
                }
            },
            err => {
                console.log(err);
                this.showMsg(err.toString());
            }
        );


    }


    constructor(public message: NzMessageService,
                public configService: BylConfigService,
                public modalService: NzModalService,
                private nzDropdownService: NzDropdownService,
                private menuService: MenuService,
                // public functionSubject$: NzModalRef,
                public router: Router,
                private httpClient: HttpClient,
                private menuLinkService: BylMenuLinkService,
                public bylMenuService: BylMenuService) {
        super(message, configService, modalService, router);

        this.businessService = bylMenuService;
        this.crudUrl = '/account/menu/crud';
        // this.businessCrudComponent = BylPersonCrudComponent;
        this.statusList = BylMasterDataStatusManager.getArray();

        this.querySchema.properties['status'].enum.push(...this.statusList); //设置查询条件中的状态字段

        this.registerTreeToggleExpanded();

        (<any> window).bylTreeService = bylMenuService;

    }


    /**
     * 查找
     */
    search() {
        this.loading = true;

        this.clearGrid();

        // this.menuService.findDepartmendByParentId('-').subscribe(
        //     data => {
        //         this.loading = false;
        //         if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
        //
        //             // this.listData = Array.from(data.data.rows);
        //             this.nodes = this.genNodeData(data.data);
        //
        //         } else {
        //             this.showMsg(data.msg);
        //         }
        //     },
        //     err => {
        //         this.loading = false;
        //         console.log(err);
        //         this.showMsg(err.toString());
        //     }
        // );
    }

    updateNodeData(data: Array<BylTreeDispalyModel<BylMenu>>, node: BylTreeDispalyModel<BylMenu>): void {
        node.children = data;
    }

    /**
     * 根据查询的结果，生成界面显示的内容，重点是处理好checkec和disabled字段的值。
     */
    genNodeData(findResult: Array<BylMenu>): Array<BylTreeDispalyModel<BylMenu>> {
        return findResult.map(data => {
            let item = new BylTreeDispalyModel<BylMenu>();
            item.item = new BylMenu();
            Object.assign(item.item, data);
            item.key = item.item.id;
            item.title = item.item.caption;//mixCodeName(item.item.name, item.item.code);
            item.checked = false;
            item.disableCheckbox = (data.status === BylMasterDataStatusEnum.SUBMITED_DELETED);
            item.hasChildren = true;
            return item;
        });
    }



    reset() {
        this.qData.title = '';
        this.qData.modifyDate = Date();

    }

    batchDelete() {

    }

    batchApproval() {

    }



    refreshStatus() {
        const allChecked = this.listData.every(value => value.disabled || value.checked);
        const allUnChecked = this.listData.every(value => value.disabled || !value.checked);
        this.allChecked = allChecked;
        this.indeterminate = (!allChecked) && (!allUnChecked);
        this.selectedRows = this.listData.filter(value => value.checked);
        // this.totalCallNo = this.selectedRows.reduce((total, cv) => total + cv.callNo, 0);
    }

    /**
     * 将当前记录锁定
     * @param {string} id
     */
    lockDepartment(id: string) {
        let lockItem = new BylMenu();
        this.listData.forEach(item => {
            if (item.item.id === id) {
                Object.assign(lockItem, item.item);
            }
        });

        console.log('lockItem: ' + lockItem);
        if (!lockItem) return;

        lockItem.status = BylMasterDataStatusEnum.LOCKED;

        this.bylMenuService.update(lockItem).subscribe(
            data => {
                this.loading = false;
                if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {

                    // this.listData = Array.from(data.data.rows);
                    this.updateListData(data.data);

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

    updateListData(newData: BylMenu) {
        this.listData.filter(item => item.item.id === newData.id)
            .map(item => {
                Object.assign(item.item, newData);
            });
    }

    importDefaultMenu(){
        this.loadingDefaultMenu = true;

        this.httpClient.get(this.configService.DEFAULT_MENU_URL)
            .subscribe(
                (menuList:any)=>{
                    // this.showMsg(JSON.stringify(menuList));
                    this.nodes = [];
                    if (menuList.menu){
                        this.nodes.push(...menuList.menu);
                    } else{
                        console.log(JSON.stringify(menuList));
                    }

                    this.loadingDefaultMenu =false;
                },
                err =>{
                    this.showMsg(err);
                    this.loadingDefaultMenu =false;
                }
            );

    }

    /**
     * 将菜单树中的菜单定义提交到数据库
     */
    importMenuDefine(){
        this.importingMenuDefine = true;

        let menuLinkList: Array<BylMenuLink> = [];
        this.menuService.visit((menu,parentMenu) => {
            if (menu.link){
                let menuLink = new BylMenuLink();
                menuLink.defaultCaption = menu.text;
                menuLink.targetLink = menu.link;
                menuLinkList.push(menuLink);
            }
        });

        console.log("In Menu List Component importMenuDefine:", menuLinkList);

        this.menuLinkService.initMenuLink(menuLinkList)
            .subscribe(
                data=>{

                    this.importingMenuDefine =false;
                    if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                        this.showMsg("成功导入菜单定义。");

                    } else {
                        this.showMsg(data.msg);
                    }
                },
                err =>{
                    this.showMsg(err);
                    this.importingMenuDefine =false;
                }
            );

    }


    /**
     * 重置Grid
     */
    clearGrid() {
        this.listData = []; // 显示内容
        this.selectedRows = [];
        this.indeterminate = false;
        this.allChecked = false;
    }

    genQueryModel(): any {
        let result = new BylDepartmentQuery();
        if (this.qData.name) result.name = this.qData.name;
        if (this.qData.modifyDateBegin) result.modifyDateBegin = moment(this.qData.modifyDateBegin).valueOf();
        if (this.qData.modifyDateEnd) result.modifyDateEnd = moment(this.qData.modifyDateEnd).add(1, 'days').valueOf(); //第二天的零点
        if (this.qData.status) result.status = this.qData.status;
        return result;
    }

    genListData(findResult: Array<BylMenu>): Array<BylListFormData<BylMenu>> {
        return findResult.map(data => {
            let item = new BylListFormData<BylMenu>();
            item.checked = false;
            // item.disabled = (data.status === BylRoleStatus.SUBMITED_DELETED);
            item.item = new BylMenu();
            Object.assign(item.item, data);
            return item;
        });
    }


    /**
     * 设置查询缺省值
     */
    setQDataDefaultValue(){
        let q = new BylDepartmentQuery();

        Object.assign(this.qData,q);
    }

    //#region 查询条件
    queryDefaultData: any = {
        modifyDateBegin: moment(moment.now()).subtract(6,"month").format("YYYY-MM-DD"),
        modifyDateEnd: moment(moment.now()).format("YYYY-MM-DD") };
    queryUiSchema: SFUISchema = {};
    querySchema: SFSchema = {
        properties: {
            code: { type: 'string',
                title: '代码类似于'
            },
            name: { type: 'string',
                title: '名称类似于'
            },
            status: {
                type: 'string',
                title: '状态',
                enum: [],
                ui: {
                    widget: 'tag'
                }
            },
            modifyDateBegin: { type: 'string',
                title: '最后修改日期大于等于',
                ui: { widget: 'date' }
            },
            modifyDateEnd: { type: 'string',
                title: '最后修改日期小于等于',
                ui: { widget: 'date' }
            }
        },
        required: []
    };
//#endregion

}
