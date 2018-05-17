import { Component } from '@angular/core';

@Component({
    selector: 'layout-passport',
    templateUrl: './mobile.component.html',
    styleUrls: ['./mobile.component.less']
})
export class LayoutMobileComponent {
    isFetching: boolean; //todo 什么用？

    links = [
        {
            title: '帮助',
            href: ''
        },
        {
            title: '隐私',
            href: ''
        },
        {
            title: '条款',
            href: ''
        }
    ];
}
