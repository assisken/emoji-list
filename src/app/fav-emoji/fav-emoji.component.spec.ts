import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavEmojiComponent } from './fav-emoji.component';

describe('FavEmojiComponent', () => {
  let component: FavEmojiComponent;
  let fixture: ComponentFixture<FavEmojiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavEmojiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavEmojiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
