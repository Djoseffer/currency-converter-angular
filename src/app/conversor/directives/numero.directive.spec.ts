import { NumeroDirective } from './numero.directive';
import {ElementRef} from "@angular/core";

describe('NumeroDirective', () => {
  let directive: NumeroDirective;
  let elementRef: ElementRef;

  beforeEach(() => {
    elementRef = {
      nativeElement: document.createElement('input')
    } as ElementRef;

    directive = new NumeroDirective(elementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
