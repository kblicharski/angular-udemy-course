import { EventEmitter, Injectable } from '@angular/core';

import { Account } from './account';
import { LoggerService } from './logger.service';

@Injectable()
export class AccountService {

  accounts: Account[] = [
    {name: 'Master Account', status: 'active'},
    {name: 'Test Account', status: 'inactive'},
    {name: 'Hidden Account', status: 'unknown'}
  ];

  statusUpdated: EventEmitter<string> = new EventEmitter<string>();

  constructor(private loggerService: LoggerService) {}

  addAccount(name: string, status: string): void {
    this.accounts.push({name: name, status: status});
    this.loggerService.logChange('New server with status: ' + status);
  }

  updateStatus(id: number, newStatus: string): void {
    this.accounts[id].status = newStatus;
    this.loggerService.logChange('Server status updated: ' + newStatus);
  }

}
