import {
  Directive,
  Component,
  Input,
  DoCheck,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injector
} from '@angular/core';

@Directive({
  selector: '[dy-toastr]'
})
export class DyToastrDirective {

  constructor(
    private cfResolver: ComponentFactoryResolver,
    private vcRef: ViewContainerRef,
    private injector: Injector
  ) {
  }



}
