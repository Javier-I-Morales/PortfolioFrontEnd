import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardsoftkillsComponent } from './hardsoftkills.component';

describe('HardsoftkillsComponent', () => {
  let component: HardsoftkillsComponent;
  let fixture: ComponentFixture<HardsoftkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardsoftkillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardsoftkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
