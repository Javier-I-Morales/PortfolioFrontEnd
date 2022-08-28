import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciacontentComponent } from './experienciacontent.component';

describe('ExperienciacontentComponent', () => {
  let component: ExperienciacontentComponent;
  let fixture: ComponentFixture<ExperienciacontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienciacontentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienciacontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
