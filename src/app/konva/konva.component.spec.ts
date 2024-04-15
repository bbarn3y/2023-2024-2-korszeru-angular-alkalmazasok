import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonvaComponent } from './konva.component';

describe('KonvaComponent', () => {
  let component: KonvaComponent;
  let fixture: ComponentFixture<KonvaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KonvaComponent]
    });
    fixture = TestBed.createComponent(KonvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
