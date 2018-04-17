import * as moment from 'moment/moment';
import { Component, OnInit } from '@angular/core';
import { CreditApplication } from '../shared/models/credit-application.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyErrorStateMatcher } from '../shared/services/my-error-state-matcher';
import { RequestService } from '../shared/services/request.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-credit-application',
  templateUrl: './credit-application.component.html',
  styleUrls: ['./credit-application.component.css']
})
export class CreditApplicationComponent implements OnInit {

  public creditData = new CreditApplication();
  public form: FormGroup;
  public matcher: MyErrorStateMatcher;
  public isDisabled = true;
  public filteredUsers = [];
  public clientId: string;
  public isValidCredit = false;
  public isErrorOnCredit = false;
  public creditAmount = 0;

  constructor(
    private fb: FormBuilder,
    private requestService: RequestService
  ) { }

  ngOnInit() {
    this.form = this.fb.group(this.creditData.getDefaultValues());
    this.matcher = new MyErrorStateMatcher();
    this.observeChanges();
    this.requestService.getClients()
      .subscribe(data => {
        this.filteredUsers = data;
      });
  }

  public enabledFields() {
    this.form.get('companyName').enable();
    this.form.get('companyNIT').enable();
    this.form.get('clientSalary').enable();
    this.form.get('clientContractDate').enable();
  }

  public disableFields() {
    this.form.get('companyName').disable();
    this.form.get('companyNIT').disable();
    this.form.get('clientSalary').disable();
    this.form.get('clientContractDate').disable();
  }

  public validateSalary(value): boolean {
    if ((parseFloat(value) === parseInt(value, 10)) && !isNaN(value)) {
      return true;
    } else {
      return false;
    }
  }

  public observeChanges() {
    const salary$ = this.form.get('clientSalary');
    const id$ = this.form.get('id');
    const date$ = this.form.get('clientContractDate');

    date$.valueChanges.subscribe(res => {
      if (!date$.errors) {
        const ownDate = moment(new Date(res));
        const nowDate = moment(new Date());

        const diff = nowDate.diff(ownDate, 'days');


        if (diff <= 0) {
          date$.setErrors({ dateValidator: true });
          return;
        } else {
          date$.setErrors(date$.value === null ? { required: true } : null);
        }
      }

    });


    id$.valueChanges
      .subscribe((value) => {
        if (value) {
          this.enabledFields();
        }
        if (value === null) {
          this.disableFields();
        }
      });

    salary$.valueChanges
      .subscribe((value) => {
        const validation = this.validateSalary(value);

        if (!validation) {
          salary$.setErrors({ salaryValidator: true });
          return;
        } else {
          salary$.setErrors(salary$.value === null ? { required: true } : null);
        }
      });
  }

  public onSubmit() {
    this.form['submitted'] = true;
    const _salary = this.form.get('clientSalary').value;
    const _contractDate = this.form.get('clientSalary').value;

    this.isValidCredit = false;
    this.isErrorOnCredit = false;

    if (this.form.status === 'INVALID') {
      return;
    }

    this.evaluateCredit(_salary, _contractDate);
  }

  private evaluateCredit(value: number, refDate: Date): void {
    const nowDate = moment(new Date());
    const contracDate = moment(refDate);

    const dateDiff = nowDate.diff(contracDate, 'years', true);

    if (dateDiff < 1.5) {
      this.isErrorOnCredit = true;
      return;
    }

    if (value > 800000) {
      this.isValidCredit = true;
      if (value < 1000000) {
        this.creditAmount = 5000000;
      } else if (value < 4000000) {
        this.creditAmount = 20000000;
      } else {
        this.creditAmount = 50000000;
      }
    } else {
      this.isErrorOnCredit = true;
    }

  }
}
