import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogActionHistoryComponent } from './dialog-action-history.component';

describe('DialogActionHistoryComponent', () => {
  let component: DialogActionHistoryComponent;
  let fixture: ComponentFixture<DialogActionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogActionHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogActionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
