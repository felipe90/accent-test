import * as moment from 'moment/moment';
import {
  AbstractControl,
  NG_VALIDATORS,
  Validator,
  ValidatorFn,
  Validators
  } from '@angular/forms';
import {
  Attribute,
  Directive,
  forwardRef,
  Input,
  OnChanges,
  SimpleChanges
  } from '@angular/core';

const ADULT_AGE = 18;

@Directive({
  selector: '[app-dateValidator][formControlName]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => DateValidatorDirective), multi: true }
  ]
})

export class DateValidatorDirective implements Validator {

  constructor(
    @Attribute('app-dateValidator') public dateValidator: string,
  ) { }

  validate(c: AbstractControl): { [key: string]: any } {

    if (c.root !== undefined && c.value !== null) {

      const ownValue = c.value;

      const ownDate = ownValue ? moment(new Date(ownValue)) : null;
      const nowDate = moment(new Date());

      const diff = nowDate.diff(ownDate, 'years', true);

      console.log(ownDate);

      // check values
      if (diff < ADULT_AGE) {
        return { dateValidator: true };
      }

      // check and reverse
      if (diff >= ADULT_AGE) {
        ownValue.setErrors(null);
      }

    }
    return null;
  }
}
