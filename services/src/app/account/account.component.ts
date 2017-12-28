import { Component, Input } from '@angular/core';

import { Account } from '../account';
import { AccountService } from '../account.service';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  @Input() account: Account;
  @Input() id: number;

  constructor(
    private loggerService: LoggerService,
    private accountService: AccountService
  ) {}

  onSetTo(status: string): void {
    this.accountService.updateStatus(this.id, status);
    this.loggerService.logChange('New server status: ' + status);
  }

}
