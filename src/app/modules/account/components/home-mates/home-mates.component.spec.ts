import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMatesComponent } from './home-mates.component';

describe('HomeMatesComponent', () => {
  let component: HomeMatesComponent;
  let fixture: ComponentFixture<HomeMatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
