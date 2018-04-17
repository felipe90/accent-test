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

  public validateSalary(salary): boolean {
    return false;
  }

  public observeChanges() {
    const salary$ = this.form.get('clientSalary');
    const id$ = this.form.get('id');

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
}
