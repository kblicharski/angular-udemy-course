import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AccountService } from './account.service';
import { AccountComponent } from './account/account.component';
import { AppComponent } from './app.component';
import { LoggerService } from './logger.service';
import { NewAccountComponent } from './new-account/new-account.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    NewAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [LoggerService, AccountService],
  bootstrap: [AppComponent]
})
export class AppModule {}
