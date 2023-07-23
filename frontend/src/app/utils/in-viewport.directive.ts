import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[inViewport]',
  standalone: true,
})
export class InViewportDirective {
  private observer: IntersectionObserver;
  @Output() visibleInViewport = new EventEmitter<void>();

  constructor(private el: ElementRef) {
    this.observer = new IntersectionObserver(this.callback, {
      rootMargin: '30px',
      threshold: 0.5,
      root: null,
    });
    this.observer.observe(this.el.nativeElement);
  }

  private callback: ConstructorParameters<typeof IntersectionObserver>[0] = (entries) =>
    entries
      .filter((entry) => entry.isIntersecting)
      .forEach((_entry) => {
        this.visibleInViewport.emit();
      });
}
