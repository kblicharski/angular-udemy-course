import { Component } from '@angular/core';

import { AccountService } from '../account.service';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent {

  constructor(
    private loggerService: LoggerService,
    private accountService: AccountService
  ) {}

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount(accountName, accountStatus);
    this.loggerService.logChange('New server status: ' + accountStatus);
  }

}
