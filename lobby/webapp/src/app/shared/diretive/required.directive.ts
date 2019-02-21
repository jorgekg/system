import { Directive, ElementRef, Input, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { TranslateCompiler, TranslateService } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

const show = (id) => {
  const windowJ = window as any;
  windowJ.jQuery(`#${id}`).popover('show');
};

const hide = (id) => {
  const windowJ = window as any;
  windowJ.jQuery(`#${id}`).popover('hide');
};


@Directive({
  selector: '[appRequired]'
})
export class RequiredDirective implements OnInit, OnDestroy {

  @Input() place = 'top';

  @Input() set isValidate(validate) {
    this.validate(validate);
  }

  @Input() set formControl(field: FormControl) {
    this.isInvalidate = field.valid;
    this.subject = field.valueChanges.subscribe(val => {
      if (val) {
        this.isInvalidate = field.valid;
        this.validate(true);
      }
    });
  }

  private element: HTMLInputElement;
  private isInvalidate: boolean;
  private subject: Subscription;
  constructor(
    private el: ElementRef,
    private translateService: TranslateService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.element = this.el.nativeElement;
  }
  ngOnDestroy() {
    if (this.subject) {
      this.subject.unsubscribe();
    }
    hide(this.element.getAttribute('aria-describedby'))
  }

  private validate(isValid) {
    if (this.element) {
      if (isValid && !this.isInvalidate) {
        if (this.element.value.length < this.element.minLength) {
          this.renderer.addClass(this.el.nativeElement, 'required');
          this.renderer.setAttribute(this.el.nativeElement, 'data-toggle', 'popover');
          this.renderer.setAttribute(this.el.nativeElement, 'data-container', 'body');
          this.renderer.setAttribute(this.el.nativeElement, 'data-placement', this.place);
          this.renderer.setAttribute(this.element, 'data-content', `Minimo ${this.element.minLength} caractere!`);
          show(this.element.id);
        } else {
          this.renderer.removeClass(this.el.nativeElement, 'required');
          this.renderer.removeAttribute(this.el.nativeElement, 'data-toggle', 'popover');
          this.renderer.removeAttribute(this.el.nativeElement, 'data-container', 'body');
          this.renderer.removeAttribute(this.el.nativeElement, 'data-placement', this.place);
          this.renderer.removeAttribute(this.element, 'data-content', `Minimo ${this.element.minLength} caractere!`);
          hide(this.element.id);
        }
      } else {
        this.renderer.removeClass(this.el.nativeElement, 'required');
        hide(this.element.id);
      }
    }
  }

}
