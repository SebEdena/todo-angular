import {
  afterNextRender,
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';

@Directive({
  selector: '[inViewport]',
  standalone: true,
})
export class InViewportDirective implements OnDestroy {
  @Output() visibleInViewport = new EventEmitter<void>();

  private observer?: IntersectionObserver;

  private callback: ConstructorParameters<typeof IntersectionObserver>[0] = (entries) =>
    entries
      .filter((entry) => entry.isIntersecting)
      .forEach((_entry) => {
        this.visibleInViewport.emit();
      });

  constructor(private el: ElementRef) {
    afterNextRender(() => {
      this.observer = new IntersectionObserver(this.callback, {
        rootMargin: '30px',
        threshold: 0.5,
        root: null,
      });
      this.observer.observe(this.el.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
