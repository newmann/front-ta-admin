import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzTabChangeEvent } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SimpleTableColumn } from '@delon/abc';

@Component({
    selector: 'pro-profile-advanced',
    templateUrl: './advanced.component.html',
    styleUrls: [ './advanced.component.less' ]
})
export class ProProfileAdvancedComponent implements OnInit {
    list: any[] = [];

    data = {
        advancedOperation1: [],
        advancedOperation2: [],
        advancedOperation3: []
    };

    opColumns: SimpleTableColumn[] = [
        { title: '��������', index: 'type' },
        { title: '������', index: 'name' },
        { title: 'ִ�н��', index: 'status', render: 'status' },
        { title: '����ʱ��', index: 'updatedAt', type: 'date' },
        { title: '��ע', index: 'memo', default: '-' }
    ];

    constructor(public msg: NzMessageService, private http: _HttpClient) {}

    ngOnInit() {
        this.http.get('/profile/advanced').subscribe((res: any) => {
            this.data = res;
            this.change({ index: 0, tab: null });
        });
    }

    change(args: NzTabChangeEvent) {
        this.list = this.data[`advancedOperation${args.index + 1}`];
    }
}
