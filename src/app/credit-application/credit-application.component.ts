import { Component, OnInit } from '@angular/core';
import { CreditApplication } from '../shared/models/credit-application.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-credit-application',
  templateUrl: './credit-application.component.html',
  styleUrls: ['./credit-application.component.css']
})
export class CreditApplicationComponent implements OnInit {

  public creditData = new CreditApplication();
  public form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group(this.creditData.getDefaultValues);
  }
}
