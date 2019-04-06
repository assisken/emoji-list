import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-preview-image',
  templateUrl: './preview-image.component.html',
  styleUrls: ['./preview-image.component.scss']
})
export class PreviewImageComponent implements OnInit {
  @Input() alt: string
  @Input() src: string

  constructor() { }

  ngOnInit() {
  }

}
