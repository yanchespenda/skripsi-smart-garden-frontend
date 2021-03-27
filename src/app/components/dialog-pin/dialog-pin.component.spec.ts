import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPinComponent } from './dialog-pin.component';

describe('DialogPinComponent', () => {
  let component: DialogPinComponent;
  let fixture: ComponentFixture<DialogPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
