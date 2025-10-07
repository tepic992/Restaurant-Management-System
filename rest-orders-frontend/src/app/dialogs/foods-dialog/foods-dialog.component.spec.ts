import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodsDialogComponent } from './foods-dialog.component';

describe('FoodsDialogComponent', () => {
  let component: FoodsDialogComponent;
  let fixture: ComponentFixture<FoodsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
