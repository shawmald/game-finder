import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamefinderComponent } from './gamefinder.component';

describe('GamefinderComponent', () => {
  let component: GamefinderComponent;
  let fixture: ComponentFixture<GamefinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamefinderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamefinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
