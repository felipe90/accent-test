import * as moment from 'moment/moment';
import { Component, OnInit } from '@angular/core';
import { CreditApplication } from '../shared/models/credit-application.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyErrorStateMatcher } from '../shared/services/my-error-state-matcher';

@Component({
  selector: 'app-credit-application',
  templateUrl: './credit-application.component.html',
  styleUrls: ['./credit-application.component.css']
})
export class CreditApplicationComponent implements OnInit {

  public creditData = new CreditApplication();
  public form: FormGroup;
  public matcher: MyErrorStateMatcher;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group(this.creditData.getDefaultValues());
    this.matcher = new MyErrorStateMatcher();
    this.observeChanges();
  }

  public observeChanges() {
    // const date$ = this.form.get('birthDate');

    // date$.valueChanges.subscribe(res => {

    //   const ownDate = res ? moment(new Date(res)) : null;
    //   const nowDate = moment(new Date());

    //   const diff = nowDate.diff(ownDate, 'years', true);

      // if (moment(ownDate, 'DD/MM/YYYY', true).isValid()) {
      //   date$.setErrors({ invalidDate: true });
      //   return;
      // } else if (diff < ADULT_AGE) {
      //   date$.setErrors({ dateValidator: true });
      //   return;
      // } else {
      //   date$.setErrors(date$.value === null ? { required: true } : null);
      // }
    // })
  }
}
