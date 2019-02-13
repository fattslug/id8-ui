import { Directive, ElementRef, OnInit, Input, Renderer2, HostBinding } from '@angular/core';

@Directive({
  selector: '[appId8Logo]'
})
export class Id8LogoDirective implements OnInit {
  @Input() logoStyle: string;
  @HostBinding('class')
  elementClass = 'id8-logo';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    const id8Text = this.el.nativeElement.innerHTML;
    this.el.nativeElement.innerHTML = '';
    const id8Array = id8Text.split('');

    id8Array.forEach((letter: string, index: number) => {
      const element = document.createElement('span');
      element.appendChild(document.createTextNode(letter));

      if (letter === '8') {
        element.style.color = '#FFD900';
      } else if (this.logoStyle === 'light') {
        element.style.color = '#FFFFFF';
      } else {
        element.style.color = '#333333';
      }

      this.renderer.appendChild(this.el.nativeElement, element);
    });
  }

}
