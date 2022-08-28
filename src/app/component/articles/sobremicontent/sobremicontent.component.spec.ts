import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SobremicontentComponent } from './sobremicontent.component';

describe('SobremicontentComponent', () => {
  let component: SobremicontentComponent;
  let fixture: ComponentFixture<SobremicontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SobremicontentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SobremicontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
