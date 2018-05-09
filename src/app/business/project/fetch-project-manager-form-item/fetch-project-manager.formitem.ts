import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BylProjectManagerPool} from '../../../service/project/model/project-manager-pool.model';
import {BylProjectManagerPoolListComponent} from '../project-manager-pool/list/list.component';
import {NzModalRef, NzModalService} from 'ng-zorro-antd';
import {BylListFormFunctionModeEnum} from '../../../service/model/list-form-function-mode.enum';


// const noop = () => {
// };

@Component({
    selector: 'byl-fetch-project-manager-formitem',
    templateUrl: './fetch-project-manager.formitem.html'
})
export class BylFetchProjectManagerWidgetComponent {
    @Input() public controlName = 'managerCode';
    @Input() public labelCaption = '项目经理';
    @Input() public placeHolder: string;
    @Input() public hostForm: FormGroup;
    @Input() public controlPath = 'projectManager.managerCode';
    @Input() public isRequired: boolean;
    @Input() public validatedExtraInfo: string;

    get inputControl() {
        return this.hostForm.get(this.controlPath);
    }

    loading = false;
    public managerPoolReveal: NzModalRef; // 项目经理筛选窗口
    constructor(public modalService: NzModalService) {

    }

    searchManager($event: MouseEvent) {
        $event.preventDefault();
        console.log('search manager');
        /**
         * 从账户池中查找待加入的项目经理
         */

        this.managerPoolReveal = this.modalService.create({
            nzTitle: '查找项目经理',
            nzZIndex: 9999, //最外层
            nzWidth: '90%',
            nzContent: BylProjectManagerPoolListComponent,
            nzFooter: null,
            nzComponentParams: {
                functionMode: BylListFormFunctionModeEnum.SELECT,
                selectModalForm: this.managerPoolReveal
            },
            nzMaskClosable: false
        });
        // this.managerPoolReveal.next(BylCrudEvent[BylCrudEvent.bylSaving]);

        this.managerPoolReveal.afterClose.subscribe(result => {
            console.info(result);

            console.info(typeof result);

            //返回的是选中的项目经理
            let selectedItem: BylProjectManagerPool;
            if ((typeof result) === 'object') {
                console.log('添加新增的项目经理数据');
                selectedItem = result;
            }

            //设置选中的项目经理
            if (selectedItem) {
                this.managerId.patchValue(selectedItem.poolId);
                this.managerCode.patchValue(selectedItem.poolCode);
                this.managerName.patchValue(selectedItem.poolName);
            }

        });

    }

    get managerId() {
        return this.hostForm.get('projectManager.managerId');
    }

    get managerCode() {
        return this.inputControl;
    }

    get managerName() {
        return this.hostForm.get('projectManager.managerName');
    }
}
