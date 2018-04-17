import { Client } from '../shared/models/client.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent implements OnInit {

  public client = new Client();
  public form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.form = this.fb.group(this.client.getDefaultValues());
  }

}
