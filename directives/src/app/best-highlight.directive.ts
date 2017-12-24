import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appBestHighlight]'
})
export class BestHighlightDirective {
  @HostBinding('style.backgroundColor') highlightColor = 'transparent';

  @HostListener('mouseenter')
  mouseEnter(eventData: Event) {
    this.highlightColor = 'blue';
  }

  @HostListener('mouseleave')
  mouseLeave(eventData: Event) {
    this.highlightColor = 'transparent';
  }

}
