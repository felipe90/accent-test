import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ClientRegisterComponent } from './client-register/client-register.component';
import { CoreModule } from './core/core.module';
import { CreditApplicationComponent } from './credit-application/credit-application.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ClientRegisterComponent,
    CreditApplicationComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
