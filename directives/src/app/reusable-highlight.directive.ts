import {
  Directive, HostBinding, HostListener, Input,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[appReusableHighlight]'
})
export class ReusableHighlightDirective implements OnInit {
  @Input() defaultColor = 'transparent';
  @Input('appReusableHighlight') highlightColor = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor: string;

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter')
  mouseEnter(eventData: Event) {
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave')
  mouseLeave(eventData: Event) {
    this.backgroundColor = this.defaultColor;
  }

}
