import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelEmojiComponent } from './del-emoji.component';

describe('DelEmojiComponent', () => {
  let component: DelEmojiComponent;
  let fixture: ComponentFixture<DelEmojiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelEmojiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelEmojiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
