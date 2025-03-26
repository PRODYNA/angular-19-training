import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
} from '@angular/core';

/*
Directive that emojifies text when hovered over.
Emojify means it places an emoji at the end of its inner text.
 */
@Directive({
  selector: '[appEmojifyOnHover]',
})
export class EmojifyOnHoverDirective {
  elementRef = inject(ElementRef);

  @Input() appEmojifyOnHover = '';

  @HostListener('mouseenter')
  onMouseEnter() {
    const originalInnerText = this.elementRef.nativeElement.innerText;
    this.elementRef.nativeElement.innerText = `${originalInnerText}${this.appEmojifyOnHover}`;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.elementRef.nativeElement.innerText =
      this.elementRef.nativeElement.innerText.replace(
        `${this.appEmojifyOnHover}`,
        ''
      );
  }
}
