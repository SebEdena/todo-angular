import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';

@Directive({
  selector: '[repeat]',
  standalone: true
})
export class RepeatDirective<T> {

  private templateRef = inject(TemplateRef<T>);
  private viewContainer = inject(ViewContainerRef);

  @Input({ required: true }) set repeat(times: number) {
    for(let i = 0; i < times; i++) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
