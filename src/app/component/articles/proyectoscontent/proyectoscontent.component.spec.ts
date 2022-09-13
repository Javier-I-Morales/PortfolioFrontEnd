import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoscontentComponent } from './proyectoscontent.component';

describe('ProyectoscontentComponent', () => {
  let component: ProyectoscontentComponent;
  let fixture: ComponentFixture<ProyectoscontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectoscontentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyectoscontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
