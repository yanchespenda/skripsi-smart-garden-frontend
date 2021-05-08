import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMcuTokenComponent } from './dialog-mcu-token.component';

describe('DialogMcuTokenComponent', () => {
  let component: DialogMcuTokenComponent;
  let fixture: ComponentFixture<DialogMcuTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMcuTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMcuTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
