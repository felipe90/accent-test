import { CommonModule } from '@angular/common';
import { HttpService } from './services/http.service';
import { NgModule } from '@angular/core';
import { RequestService } from './services/request.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    HttpService,
    RequestService
  ]
})
export class SharedModule { }
