import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudioscontentComponent } from './estudioscontent.component';

describe('EstudioscontentComponent', () => {
  let component: EstudioscontentComponent;
  let fixture: ComponentFixture<EstudioscontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudioscontentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudioscontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
