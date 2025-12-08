import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaFeatureComponent } from './caja-feature.component';

describe('CajaFeatureComponent', () => {
  let component: CajaFeatureComponent;
  let fixture: ComponentFixture<CajaFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CajaFeatureComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CajaFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
