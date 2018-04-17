import { Client } from '../shared/models/client.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyErrorStateMatcher } from '../shared/services/my-error-state-matcher';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent implements OnInit {

  public client = new Client();
  public form: FormGroup;
  public matcher: MyErrorStateMatcher;

  constructor(
    private fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.form = this.fb.group(this.client.getDefaultValues());
    this.matcher = new MyErrorStateMatcher();
    console.log(this.form.controls['id'].errors);
  }

  onSubmit() {
    this.form['submitted'] = true;
    this.client = this.form.getRawValue();

    if (this.form.status === 'INVALID') {
      return;
    }

    console.log(this.client);

  }

}
