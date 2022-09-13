import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardsoftkillscontentComponent } from './hardsoftkillscontent.component';

describe('HardsoftkillscontentComponent', () => {
  let component: HardsoftkillscontentComponent;
  let fixture: ComponentFixture<HardsoftkillscontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardsoftkillscontentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardsoftkillscontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
