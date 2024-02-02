import { Directive, TemplateRef, ViewContainerRef, effect, inject, input } from '@angular/core';

@Directive({
  selector: '[repeat]',
  standalone: true,
})
export class RepeatDirective<T> {
  private templateRef = inject(TemplateRef<T>);
  private viewContainer = inject(ViewContainerRef);

  repeat = input<number>(1);

  constructor() {
    effect(() => {
      this.viewContainer.clear();
      for (let i = 0; i < this.repeat(); i++) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }
}
