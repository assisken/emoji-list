import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEmojiComponent } from './all-emoji.component';

describe('AllEmojiComponent', () => {
  let component: AllEmojiComponent;
  let fixture: ComponentFixture<AllEmojiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllEmojiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEmojiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
