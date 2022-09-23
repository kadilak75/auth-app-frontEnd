import { Directive, Input } from '@angular/core';
import { UntypedFormControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
    selector: '[customMin][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: CustomMinDirective,
        multi: true
    }]
})
export class CustomMinDirective implements Validator {

    @Input() minimo!: number;

    constructor() {}

    validate( control: UntypedFormControl ) {
        const inputValue = control.value;
        return ( inputValue < this.minimo )
                ? { 'customMin': true }
                : null;
    }

}