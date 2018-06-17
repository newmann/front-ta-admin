import { TestBed, TestModuleMetadata } from '@angular/core/testing';

import { setUpTestBed } from '@testing/common.spec';

import { BylLayoutDefaultComponent } from './default.component';

describe('Layout', () => {
  setUpTestBed(<TestModuleMetadata>{
    declarations: [BylLayoutDefaultComponent],
  });

  it('should create an instance', () => {
    const fixture = TestBed.createComponent(BylLayoutDefaultComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  });
});
