import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoEmbadComponent } from './video-embad.component';

describe('VideoEmbadComponent', () => {
  let component: VideoEmbadComponent;
  let fixture: ComponentFixture<VideoEmbadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoEmbadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoEmbadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
