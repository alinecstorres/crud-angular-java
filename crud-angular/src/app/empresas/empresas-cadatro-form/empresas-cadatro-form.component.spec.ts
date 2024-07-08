import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasCadatroFormComponent } from './empresas-cadatro-form.component';

describe('EmpresasCadatroFormComponent', () => {
  let component: EmpresasCadatroFormComponent;
  let fixture: ComponentFixture<EmpresasCadatroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresasCadatroFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresasCadatroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
