import { Component } from '@angular/core';

@Component({
    selector: 'byl-i18n-test',
    template: `
  <h2>angular</h2>
  <p>Date: {{now | date}}</p>
  <h2>ng-zorro-antd</h2>
  <nz-transfer [nzDataSource]="[]"></nz-transfer>
  <h2>@delon</h2>
  <div style="width: 200px">
    <tag-select>
      <nz-tag>1</nz-tag>
    </tag-select>
  </div>`,
})
export class BylI18nTestComponent {
    now = new Date();
}
