import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogActionSettingComponent } from './dialog-action-setting.component';

describe('DialogActionSettingComponent', () => {
  let component: DialogActionSettingComponent;
  let fixture: ComponentFixture<DialogActionSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogActionSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogActionSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
