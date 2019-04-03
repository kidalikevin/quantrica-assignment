import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductuploadComponent } from './productupload.component';

describe('ProductuploadComponent', () => {
  let component: ProductuploadComponent;
  let fixture: ComponentFixture<ProductuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
