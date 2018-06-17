import { TestBed, TestModuleMetadata } from '@angular/core/testing';
import { setUpTestBed } from '@testing/common.spec';

import { BylSidebarComponent } from './sidebar.component';

describe('Layout: Sidebar', () => {
  setUpTestBed(<TestModuleMetadata>{
    declarations: [BylSidebarComponent],
  });

  it('should create an instance', () => {
    const fixture = TestBed.createComponent(BylSidebarComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  });
});
