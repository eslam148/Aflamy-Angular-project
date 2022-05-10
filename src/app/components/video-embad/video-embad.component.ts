import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'video-embad',
  templateUrl: './video-embad.component.html',
  styleUrls: ['./video-embad.component.scss'],
})
export class VideoEmbadComponent implements OnInit {
  @Input() site: string = 'YouTube';
  @Input() key: string | null = null;
  videoUrl: SafeResourceUrl = '';
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    switch (this.site) {
      case 'YouTube': {
        this.videoUrl = this.getSafeUrl(
          'https://www.youtube.com/embed/' + this.key
        );
        break;
      }
      case 'Vimeo': {
        this.videoUrl = this.getSafeUrl(
          'https://player.vimeo.com/video/390210775?h=' + this.key
        );
        break;
      }
    }
  }

  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
