import {Directive, ElementRef, HostListener} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Directive({
  selector: '[numero]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NumeroDirective,
    multi: true
  }
  ]
})
export class NumeroDirective implements ControlValueAccessor {

  onTouched: any
  onChange: any

  constructor(private el: ElementRef) {
  }

  writeValue(value: any): void {
    this.el.nativeElement.value = value
    }
    registerOnChange(fn: any): void {
        this.onChange = fn
    }
    registerOnTouched(fn: any): void {
    this.onTouched = fn
    }

  @HostListener('keyup', ['$event']) onKeyUp($event: any) {
    let valor = $event.target.value;
    let posDecimais = valor.indexOf('.');

    valor = valor.replace(/[\D]/g, '')

    if (posDecimais > 0) {
      valor = valor.substr(0, posDecimais) + '+' + valor.substr(posDecimais);
    }

    $event.target.value = valor;
    this.onChange(valor);
  }

}
