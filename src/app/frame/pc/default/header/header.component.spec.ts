import { TestBed, TestModuleMetadata } from '@angular/core/testing';
import { setUpTestBed } from '@testing/common.spec';

import { BylHeaderComponent } from './header.component';

describe('Layout: Header', () => {
  setUpTestBed(<TestModuleMetadata>{
    declarations: [BylHeaderComponent],
  });

  it('should create an instance', () => {
    const fixture = TestBed.createComponent(BylHeaderComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  });
});
