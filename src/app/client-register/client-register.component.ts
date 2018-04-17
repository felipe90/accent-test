import * as moment from 'moment/moment';
import { Client } from '../shared/models/client.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyErrorStateMatcher } from '../shared/services/my-error-state-matcher';
import { RequestService } from '../shared/services/request.service';

const ADULT_AGE = 18;

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent implements OnInit {

  public client = new Client();
  public form: FormGroup;
  public matcher: MyErrorStateMatcher;
  public isClientCreated = false;
  public isErrorOnCreated = false;

  constructor(
    private fb: FormBuilder,
    private requestService: RequestService
  ) {

  }

  ngOnInit() {
    this.form = this.fb.group(this.client.getDefaultValues());
    this.matcher = new MyErrorStateMatcher();
    this.observeChanges();
  }

  public observeChanges() {
    const date$ = this.form.get('birthDate');

    date$.valueChanges.subscribe(res => {

      const ownDate = res ? moment(new Date(res)) : null;
      const nowDate = moment(new Date());

      const diff = nowDate.diff(ownDate, 'years', true);

     if (diff < ADULT_AGE) {
        date$.setErrors({ dateValidator: true });
        return;
      } else {
        date$.setErrors(date$.value === null ? { required: true } : null);
      }
    });
  }

  public onSubmit() {
    this.form['submitted'] = true;
    this.client = this.form.getRawValue();

    if (this.form.status === 'INVALID') {
      return;
    }

    this.requestService.createClient(this.client)
      .subscribe((res) => {
        this.isClientCreated = false;
        this.isErrorOnCreated = false;

        if (res) {
          this.isClientCreated = true;
        }
      },  error => {
        this.isErrorOnCreated = true;
      });

  }

}
