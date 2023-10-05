import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlvidarContrComponent } from './olvidar-contr.component';

describe('OlvidarContrComponent', () => {
  let component: OlvidarContrComponent;
  let fixture: ComponentFixture<OlvidarContrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlvidarContrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlvidarContrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
